'use client'
import Head from 'next/head';
import FacebookForm from './components/FacebookForm';
import TwitterForm from './components/TwitterForm';
import LinkedInForm from './components/LinkedInForm';

export default function Home() {
  return (
    <div className="container mx-auto p-4">
      <main>
        <div className="mt-6 space-y-8">
          <FacebookForm />
          <TwitterForm />
          <LinkedInForm />
        </div>
      </main>
    </div>
  );
}
