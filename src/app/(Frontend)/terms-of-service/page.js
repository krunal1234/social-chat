'use client'
import Footer from '@/app/components/footer';
import Navbar from '@/app/components/navbar';
import Head from 'next/head';

const TermsOfService = () => {

  const formatDate = (date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const year = date.getFullYear();
    
    return `${day}/${month}/${year}`;
  }

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <Head>
        <title>Terms of Service - Alinbox Social Inbox</title>
        <meta name="description" content="Terms of Service for Alinbox Social Inbox." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />

      <main className="flex-grow container mx-auto px-4 py-12 text-left">
        <h1 className="text-3xl font-semibold mb-8 text-center">Terms of Service</h1>
        <div className="max-w-3xl mx-auto">
          <p className="mb-4">
            Welcome to Alinbox! By using our services, you agree to the following terms and conditions. Please read them carefully.
          </p>
          <h2 className="text-2xl font-semibold mb-4">Acceptance of Terms</h2>
          <p className="mb-4">
            By accessing and using Alinbox, you agree to comply with and be bound by these Terms of Service. If you do not agree to these terms, you may not use our services.
          </p>
          <h2 className="text-2xl font-semibold mb-4">Use of Services</h2>
          <p className="mb-4">
            You agree to use Alinbox for lawful purposes only. You are responsible for all content you share and must not engage in any activity that violates the rights of others or breaches any applicable laws.
          </p>
          <h2 className="text-2xl font-semibold mb-4">Account Security</h2>
          <p className="mb-4">
            You are responsible for maintaining the confidentiality of your account and password. Alinbox is not liable for any loss or damage resulting from unauthorized access to your account.
          </p>
          <h2 className="text-2xl font-semibold mb-4">Termination of Service</h2>
          <p className="mb-4">
            We reserve the right to suspend or terminate your access to Alinbox at any time, without notice, for any reason, including a breach of these Terms of Service.
          </p>
          <h2 className="text-2xl font-semibold mb-4">Changes to Terms</h2>
          <p className="mb-4">
            Alinbox reserves the right to update or modify these Terms of Service at any time. Your continued use of the service after any changes indicates your acceptance of the new terms.
          </p>
          <p>
            These Terms of Service are effective as of {formatDate(new Date())}. Please review these terms periodically for any updates or changes.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default TermsOfService;
