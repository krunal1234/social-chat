'use client'
import Footer from '@/app/components/footer';
import Navbar from '@/app/components/navbar';
import Head from 'next/head';

const PrivacyPolicy = () => {

  const formatDate = (date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const year = date.getFullYear();
    
    return `${day}/${month}/${year}`;
  }

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <Head>
        <title>Privacy Policy - Alinbox Social Inbox</title>
        <meta name="description" content="Privacy Policy for Alinbox Social Inbox." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />

      <main className="flex-grow container mx-auto px-4 py-12 text-left">
        <h1 className="text-3xl font-semibold mb-8 text-center">Privacy Policy</h1>
        <div className="max-w-3xl mx-auto">
          <p className="mb-4">
            At Alinbox, we are committed to protecting your privacy. This Privacy Policy outlines how we collect, use, and protect your personal information.
          </p>
          <h2 className="text-2xl font-semibold mb-4">Information We Collect</h2>
          <p className="mb-4">
            We collect personal information such as your name, email address, and social media account details when you sign up for our services. We also collect data on how you use our services to improve our platform.
          </p>
          <h2 className="text-2xl font-semibold mb-4">How We Use Your Information</h2>
          <p className="mb-4">
            Your information is used to provide and improve our services, communicate with you, and ensure the security of our platform. We do not sell your personal information to third parties.
          </p>
          <h2 className="text-2xl font-semibold mb-4">Data Security</h2>
          <p className="mb-4">
            We implement a variety of security measures to maintain the safety of your personal information. Your data is encrypted and stored securely, and access is restricted to authorized personnel only.
          </p>
          <h2 className="text-2xl font-semibold mb-4">Your Rights</h2>
          <p className="mb-4">
            You have the right to access, update, or delete your personal information at any time. If you have any questions or concerns about our Privacy Policy, please contact us.
          </p>
          <p>
            This Privacy Policy is effective as of {formatDate(new Date())}. We may update this policy from time to time, so please check back periodically for any changes.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default PrivacyPolicy;
