"use client"
import Link from "next/link";
import Image from "next/image";
import NavItem from "./NavItem";

const ContactForm = () => {
    async function handleSubmit(event) {
        event.preventDefault();
        
        const data = {
            name: String(event.target.name.value),
            email: String(event.target.email.value),
            message: String(event.target.message.value),
        };

        const response = await fetch ("/api/contact", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
    })

    if (response.ok) {
        console.log("Message sent successfully");
    }
    if (!response.ok) {
        console.log("Error sending message");
    }

  return (
    <form onSubmit={handleSubmit}>
        <div className="w-full flex flex-col my-4">
            <label className="font-bold text-gray-800" htmlFor="name">Name</label>
            <input type="text" 
            minLength={3}
            maxLength={55}
            required
            className="p-4 bg-gray-50 border border-gray-110" 
            id="name" 
            autoComplete="off"/>
        </div>

        <div className="w-full flex flex-col my-4">
            <label className="font-bold text-gray-800" htmlFor="email">Email</label>
            <input 
            type="email"
            minLength={5}
            maxLength={150} 
            required
            className="p-4 bg-gray-50 border border-gray-110" 
            autoComplete="off" 
            id="email"/>
        </div>
        <div>
            <label className="font-bold text-gray-800" htmlFor="email">Message</label>
            <textarea 
            rows={4} 
            name="message" 
            required 
            minLength={10} 
            maxLength={500} 
            placeholder="Type message here." 
            className="w-full p-4 bg-gray-50 border border-gray-110"></textarea>
        </div>
        <button type="submit" className="px-4 py-2 w-24 bg-gray-700 text-white font-medium">Submit</button>
    </form>
  ); 
};

export default ContactForm;
