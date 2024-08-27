    'use client'
import Footer from '@/app/components/footer';
import Navbar from '@/app/components/navbar';
import Head from 'next/head';

const FAQ = () => {
  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <Head>
        <title>FAQ - Alinbox Social Inbox</title>
        <meta name="description" content="Frequently Asked Questions about Alinbox Social Inbox." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />

      <main className="flex-grow container mx-auto px-4 py-12 text-center">
        <h1 className="text-3xl font-semibold mb-8">Frequently Asked Questions</h1>
        <div className="text-left max-w-3xl mx-auto">
          {[
            {
              question: "What is Alinbox Social Inbox?",
              answer: "Alinbox is a platform that allows you to manage all your social media messages in one place, making it easier to keep track of your conversations."
            },
            {
              question: "How does Alinbox work?",
              answer: "Alinbox integrates with popular social media platforms, allowing you to view and respond to messages from a unified inbox."
            },
            {
              question: "Is Alinbox secure?",
              answer: "Yes, your data is encrypted and stored securely, ensuring your privacy and security at all times."
            },
            {
              question: "How do I sign up?",
              answer: "You can sign up by clicking on the 'Sign Up Now' button on the homepage and following the registration process."
            },
            {
              question: "Can I use Alinbox for free?",
              answer: "We offer a free trial, after which you can choose from our affordable subscription plans."
            }
          ].map((faq, index) => (
            <div key={index} className="mb-6">
              <h3 className="text-xl font-medium mb-2">{faq.question}</h3>
              <p>{faq.answer}</p>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default FAQ;
