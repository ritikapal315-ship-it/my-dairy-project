
function Contact() {
  function handleSubmit(event) {
    event.preventDefault();

    alert("Thank you for contacting us!");
  }

  return (
    <div className="contact-page">

      <section className="contact-hero">
        <h1>Contact Us</h1>

        <p>
          Have any questions? We would love to hear from you.
        </p>
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
                required
              />
            </div>

            <div className="form-group">
              <label>Email</label>

              <input
                type="email"
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="form-group">
              <label>Message</label>

              <textarea
                placeholder="Enter your message"
                rows="5"
                required
              ></textarea>
            </div>

            <button type="submit">
              Send Message
            </button>

          </form>

        </div>

      </section>

    </div>
  );
}

export default Contact;

