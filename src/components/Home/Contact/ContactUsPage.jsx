// components/ContactUsPage.js
import React from 'react';
import ContactForm from './ContactForm';

const ContactUsPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 shadow-md rounded-md">
        <h1 className="text-2xl font-bold mb-4">Contact Us</h1>
        <ContactForm />
      </div>
    </div>
  );
};

export default ContactUsPage;
