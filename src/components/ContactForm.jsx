// ContactForm.jsx
import React, { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

const ContactForm = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      setStatus("Please fill in all fields 🥺");
      return;
    }

    try {
      await addDoc(collection(db, "contacts"), {
        ...form,
        timestamp: serverTimestamp(),
      });
      setStatus("Message sent successfully! 💌");
      setForm({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("Error sending message:", error);
      setStatus("Something went wrong 😓");
    }
  };

  return (
    <div className="max-w-full mx-auto mt-10 bg-[#
#fefaf9] p-8 rounded-2xl shadow-lg border border-white">
      <h2 className="text-2xl font-bold text-black mb-4 text-center"> Leave a comment</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Your name"
          value={form.name}
          onChange={handleChange}
          className="w-full p-3 rounded-lg border border-white focus:outline-none focus:ring-2 focus:ring-pink-400"
        />
        <input
          type="email"
          name="email"
          placeholder="Your email"
          value={form.email}
          onChange={handleChange}
          className="w-full p-3 rounded-lg border border-white focus:outline-none focus:ring-2 focus:ring-pink-400"
        />
        <textarea
          name="message"
          placeholder="Write your cute message..."
          rows="4"
          value={form.message}
          onChange={handleChange}
          className="w-full p-3 rounded-lg border border-white focus:outline-none focus:ring-2 focus:ring-pink-400"
        />
        <button
          type="submit"
          className="w-full bg-[#FFC4C4] hover:bg-pink-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
        >
          ✨ Send
        </button>
      </form>
      {status && <p className="mt-4 text-center text-pink-600">{status}</p>}
    </div>
  );
};

export default ContactForm;
