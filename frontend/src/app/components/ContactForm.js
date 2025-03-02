"use client"
import Link from "next/link";
import Image from "next/image";
import NavItem from "./NavItem";
import { useState } from "react";

const ContactForm = () => {
    const [loading, setLoading] = useState(false);
    async function handleSubmit(event) {
        event.preventDefault();
        setLoading(true);
        
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
        setLoading(false);
        event.target.name.value= "";
        event.target.email.value ="";
        event.target.message.value ="";
    }
    if (!response.ok) {
        console.log("Error sending message");
        setLoading(false);
    }
}

  return (
    <form onSubmit={handleSubmit} className="text-left px-10">
        <div className="w-full flex flex-col my-4">
            <label className="font-regular text-[#ef983f] text-left" htmlFor="name">Name</label>
            <input type="text" 
            minLength={3}
            maxLength={55}
            placeholder="Enter name here"
            required
            className="p-4 bg-gray-50 border border-gray-110 rounded-lg" 
            id="name" 
            autoComplete="off"/>
        </div>

        <div className="w-full flex flex-col my-4">
            <label className="font-regular text-[#ef983f] text-left" htmlFor="email">Email</label>
            <input 
            type="email"
            minLength={5}
            maxLength={150} 
            placeholder="Enter email here"
            required
            className="p-4 bg-gray-50 border border-gray-110 rounded-lg" 
            autoComplete="off" 
            id="email"/>
        </div>
        <div>
            <label className="font-regular text-[#ef983f] text-left" htmlFor="email">Message</label>
            <textarea 
            rows={4} 
            name="message" 
            required 
            minLength={10} 
            maxLength={500} 
            placeholder="Type message here" 
            className="w-full p-4 bg-gray-50 border border-gray-110 rounded-lg"></textarea>
        </div>
        <div className="flex justify-center">
        <button type="submit" 
        disabled={loading}
        className="px-4 py-4 w-24 mt-4 disabled:bg-gray-100 disabled:text-gray-100 bg-[#ef983f] text-white font-medium rounded-2xl">Submit</button>
        </div>
    </form>
  ); 
};

export default ContactForm;
