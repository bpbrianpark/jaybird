"use client"
import { useState } from "react";
import { Send, CheckCircle, AlertCircle } from "lucide-react";
import "./contact-form.css";

const ContactForm = () => {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);

    async function handleSubmit(event) {
        event.preventDefault();
        setLoading(true);
        setSuccess(false);
        setError(false);
        
        const data = {
            name: String(event.target.name.value),
            email: String(event.target.email.value),
            message: String(event.target.message.value),
        };

        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                setSuccess(true);
                event.target.name.value = "";
                event.target.email.value = "";
                event.target.message.value = "";
            } else {
                setError(true);
            }
        } catch (err) {
            setError(true);
        } finally {
            setLoading(false);
        }
    }

  return (
    <form onSubmit={handleSubmit} className="contact-form-container">
        <div className="contact-form-title">
            Send a Message
        </div>

        <div className="contact-form-fields">
            <div className="contact-form-field">
                <label className="contact-form-label" htmlFor="name">
                    Name *
                </label>
                <input 
                    type="text" 
                    minLength={3}
                    maxLength={55}
                    placeholder="Your full name"
                    required
                    className="contact-form-input" 
                    id="name" 
                    autoComplete="name"
                />
            </div>

            <div className="contact-form-field">
                <label className="contact-form-label" htmlFor="email">
                    Email *
                </label>
                <input 
                    type="email"
                    minLength={5}
                    maxLength={150} 
                    placeholder="your.email@example.com"
                    required
                    className="contact-form-input" 
                    autoComplete="email" 
                    id="email"
                />
            </div>

            <div className="contact-form-field">
                <label className="contact-form-label" htmlFor="message">
                    Message *
                </label>
                <textarea 
                    rows={5} 
                    name="message" 
                    required 
                    minLength={10} 
                    maxLength={500} 
                    placeholder="Tell me about your project or question..." 
                    className="contact-form-textarea"
                />
            </div>
        </div>

        {success && (
            <div className="contact-form-status success">
                <CheckCircle className="contact-form-status-icon" />
                <span>Message sent successfully!</span>
            </div>
        )}

        {error && (
            <div className="contact-form-status error">
                <AlertCircle className="contact-form-status-icon" />
                <span>Failed to send message. Please try again.</span>
            </div>
        )}

        <button 
            type="submit" 
            disabled={loading}
            className="contact-form-submit"
        >
            {loading ? (
                <>
                    <div className="contact-form-spinner"></div>
                    <span>Sending...</span>
                </>
            ) : (
                <>
                    <Send className="contact-form-submit-icon" />
                    <span>Send Message</span>
                </>
            )}
        </button>
    </form>
  ); 
};

export default ContactForm;
