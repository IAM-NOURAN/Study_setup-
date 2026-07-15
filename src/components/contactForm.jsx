import React, { useState, useRef } from "react";
import '../styles/home.css';
import emailjs from "@emailjs/browser";

function ContactForm() {
  const formRef = useRef(); 
  const [isSending, setIsSending] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  // Handle form submission via EmailJS
  const handleSendEmail = (e) => {
    e.preventDefault();
    setIsSending(true);
    setStatusMessage("");

    emailjs
      .sendForm(
        "service_7kxkph8",  
        "template_xc0qn9j", 
        formRef.current,
        "ttklBX86hejZMeHN7" 
      )
      .then(
        (result) => {
          console.log("Success:", result.text);
          setIsSending(false);
          setStatusMessage("Thank you! Your message has been sent successfully. ✨");
          formRef.current.reset(); // Clear fields on success
        },
        (error) => {
          console.log("Failed:", error.text);
          setIsSending(false);
          setStatusMessage("Oops! Something went wrong. Please try again.");
        }
      );
  };

  return (
    <div className="col-md-8 contact-form-panel p-5">
      <h3 className="font-headline mb-4"  style={{ color: 'var(--secondary)', fontWeight: '700' }}>
        contact us
      </h3>
      
      <form ref={formRef} onSubmit={handleSendEmail} className="d-flex flex-column gap-4">
        
        {/* Name Input */}
        <div className="form-group d-flex flex-column gap-2">
          <label className="form-label text-uppercase">Your Name</label>
          <input 
            type="text" 
            name="name" 
            className="form-control custom-input" 
            placeholder="Sarah Ahmed" 
            required 
          />
        </div>

        {/* Email Input */}
        <div className="form-group d-flex flex-column gap-2">
          <label className="form-label text-uppercase">Your Email</label>
          <input 
            type="email" 
            name="email" 
            className="form-control custom-input" 
            placeholder="sarah@example.com" 
            required 
          />
        </div>

        {/* Message Input */}
        <div className="form-group d-flex flex-column gap-2">
          <label className="form-label text-uppercase">Your Message</label>
          <textarea 
            name="message" 
            className="form-control custom-input" 
            rows="5" 
            placeholder="Write your academic inquiry here..." 
            required 
          ></textarea>
        </div>

        {/* Submit Button */}
        <button 
          type="submit" 
          className="btn py-3 mt-2 text-white"
          style={{ backgroundColor: 'var(--primary)', border: 'none', fontWeight: 'bold', letterSpacing: '0.05em' }}
          disabled={isSending}
        >
          {isSending ? "SENDING..." : "SEND MESSAGE"}
        </button>

        {/* Status Feedback */}
        {statusMessage && (
          <p 
            className="text-center mt-2 small fw-bold" 
            style={{ color: statusMessage.includes("successfully") ? "#10b981" : "#ef4444" }}
          >
            {statusMessage}
          </p>
        )}

      </form>
    </div>
  );
}

export default ContactForm;