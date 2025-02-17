// Mobil menü işlevselliği
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const navLinksItems = document.querySelectorAll('.nav-links a');

hamburger.addEventListener('click', () => {
    navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
    hamburger.classList.toggle('active');
});

// Mobil menüde link tıklandığında menüyü kapat
navLinksItems.forEach(item => {
    item.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
            navLinks.style.display = 'none';
            hamburger.classList.remove('active');
        }
    });
});

// Sayfa kaydırma animasyonu
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// İletişim formu gönderimi
const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    console.log('Form submit edildi');
    
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        message: document.getElementById('message').value
    };

    console.log('Form verileri:', formData);

    try {
        console.log('İstek gönderiliyor...');
        const response = await fetch('http://localhost:5000/api/messages', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Origin': 'http://127.0.0.1:5500'
            },
            body: JSON.stringify(formData)
        });

        console.log('Response status:', response.status);
        console.log('Response headers:', response.headers);

        const result = await response.json();
        console.log('Response data:', result);

        if (result.success) {
            // Formu temizle
            contactForm.reset();
            
            // Başarılı mesajı göster
            alert('Mesajınız başarıyla gönderildi! Size en kısa sürede dönüş yapılacaktır.');
        } else {
            throw new Error(result.message || 'Bir hata oluştu');
        }
    } catch (error) {
        console.error('Hata detayı:', error);
        alert('Mesaj gönderilirken bir hata oluştu. Lütfen daha sonra tekrar deneyin.');
    }
});

// Slider functionality
const sliderWrapper = document.querySelector('.slider-wrapper');
const navBtns = document.querySelectorAll('.nav-btn');
let currentIndex = 0;

navBtns.forEach((btn, index) => {
    btn.addEventListener('click', () => {
        currentIndex = index;
        updateSlider();
    });
});

function updateSlider() {
    sliderWrapper.style.transform = `translateX(-${currentIndex * 100}%)`;
    navBtns.forEach((btn, index) => {
        btn.classList.toggle('active', index === currentIndex);
    });
}

// Auto slide every 5 seconds
setInterval(() => {
    currentIndex = (currentIndex + 1) % 3;
    updateSlider();
}, 5000); 