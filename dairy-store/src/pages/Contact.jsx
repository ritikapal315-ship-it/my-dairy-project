import { useState } from "react";

function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setSending(true);

    try {
      const response = await fetch("http://localhost:5001/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message })
      });

      const result = await response.json();

      if (!response.ok) {
        alert(result.message || "Message nahi gaya");
        return;
      }

      alert("Thank you for contacting us!");
      setName("");
      setEmail("");
      setMessage("");
    } catch (err) {
      alert("Server se connect nahi ho paya");
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="contact-page">
      <section className="contact-hero">
        <h1>Contact Us</h1>

        <p>Have any questions? We would love to hear from you.</p>
      </section>

      <section className="contact-content">
        <div className="contact-info">
          <h2>Get In Touch</h2>

          <p>
            Feel free to contact us for any questions or
            information about our dairy products.
          </p>

          <div className="contact-detail">
            <strong>Email:</strong>
            <span>dairystore@gmail.com</span>
          </div>

          <div className="contact-detail">
            <strong>Phone:</strong>
            <span>+91 9876543210</span>
          </div>

          <div className="contact-detail">
            <strong>Address:</strong>
            <span>Meerut, Uttar Pradesh</span>
          </div>
        </div>

        <div className="contact-form">
          <h2>Send Us a Message</h2>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Name</label>

              <input
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Email</label>

              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Message</label>

              <textarea
                placeholder="Enter your message"
                rows="5"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              ></textarea>
            </div>

            <button type="submit" disabled={sending}>
              {sending ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}

export default Contact;