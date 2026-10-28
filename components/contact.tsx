import { ContactForm } from "./contact-form";

export function Contact() {
  return (
    <section id="contact" className="contact">
      <div className="container">
        <h2 className="section-title">Contact</h2>
        <div className="contact-content">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
