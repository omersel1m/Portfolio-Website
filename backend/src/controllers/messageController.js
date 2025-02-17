const Message = require('../models/Message');
const nodemailer = require('nodemailer');

// E-posta gönderme için transporter oluştur
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'omerselimdurmann@gmail.com',
        pass: 'rbjqzikjtgnnwkem'
    }
});

// Transporter'ı test et ve hata detaylarını göster
transporter.verify((error, success) => {
    if (error) {
        console.log("SMTP Bağlantı Hatası:", error);
        console.log("Kimlik Bilgileri:", {
            user: process.env.SMTP_USER,
            passLength: process.env.SMTP_PASS ? process.env.SMTP_PASS.length : 0
        });
    } else {
        console.log("SMTP Sunucusu hazır");
    }
});

// @desc    Yeni mesaj gönder
// @route   POST /api/messages
// @access  Public
const sendMessage = async (req, res) => {
    try {
        console.log('İstek gövdesi:', req.body);
        console.log('İstek başlıkları:', req.headers);
        
        const { name, email, message } = req.body;
        
        if (!name || !email || !message) {
            console.log('Eksik alan var:', { name, email, message });
            return res.status(400).json({
                success: false,
                message: 'Tüm alanları doldurun'
            });
        }

        // Önce mesajı veritabanına kaydet
        const newMessage = await Message.create({
            name,
            email,
            message
        });
        console.log('Mesaj veritabanına kaydedildi:', newMessage);

        try {
            // Admin'e bildirim e-postası gönder
            console.log('Admin e-postası gönderiliyor...');
            const adminMailResult = await transporter.sendMail({
                from: 'omerselimdurmann@gmail.com',
                to: 'omerselimdurmann@gmail.com',
                subject: 'Yeni İletişim Formu Mesajı',
                html: `
                    <h3>Yeni Mesaj Detayları:</h3>
                    <p><strong>İsim:</strong> ${name}</p>
                    <p><strong>E-posta:</strong> ${email}</p>
                    <p><strong>Mesaj:</strong> ${message}</p>
                `
            });
            console.log('Admin e-postası gönderildi:', adminMailResult);

            // Gönderene otomatik yanıt
            console.log('Otomatik yanıt gönderiliyor...');
            const userMailResult = await transporter.sendMail({
                from: 'omerselimdurmann@gmail.com',
                to: email,
                subject: 'Mesajınız Alındı',
                html: `
                    <h3>Merhaba ${name},</h3>
                    <p>Mesajınız başarıyla alındı. En kısa sürede size dönüş yapacağım.</p>
                    <p>İlginiz için teşekkür ederim.</p>
                    <br>
                    <p>Saygılarımla,</p>
                    <p>Ömer Selim Durman</p>
                `
            });
            console.log('Otomatik yanıt gönderildi:', userMailResult);

            res.status(201).json({
                success: true,
                message: 'Mesaj kaydedildi ve e-postalar gönderildi',
                data: newMessage
            });
        } catch (emailError) {
            console.error('E-posta Gönderim Hatası:', emailError);
            console.error('Hata Detayları:', {
                code: emailError.code,
                command: emailError.command,
                response: emailError.response
            });
            // E-posta gönderilemese bile mesaj kaydedildi
            res.status(201).json({
                success: true,
                message: 'Mesaj kaydedildi fakat e-posta gönderilemedi',
                error: emailError.message,
                data: newMessage
            });
        }
    } catch (error) {
        console.error('Mesaj Kaydetme Hatası:', error);
        res.status(500).json({
            success: false,
            message: 'Mesaj kaydedilemedi',
            error: error.message
        });
    }
};

// @desc    Tüm mesajları getir
// @route   GET /api/messages
// @access  Private/Admin
const getMessages = async (req, res) => {
    try {
        const messages = await Message.find({}).sort({ createdAt: -1 });
        res.json(messages);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Mesaj durumunu güncelle
// @route   PUT /api/messages/:id
// @access  Private/Admin
const updateMessageStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const message = await Message.findById(req.params.id);

        if (message) {
            message.status = status;
            const updatedMessage = await message.save();
            res.json(updatedMessage);
        } else {
            res.status(404).json({ message: 'Message not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    sendMessage,
    getMessages,
    updateMessageStatus
}; 