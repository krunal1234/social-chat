import Footer from '@/app/components/footer'
import Navbar from '@/app/components/navbar'
import Head from 'next/head'
import Link from 'next/link'

export default function Page() {
  return (
    <div className="min-h-screen">
      <Head>
        <title>About Us - Alinbox</title>
        <meta name="description" content="Learn more about Alinbox, the unified messaging app for all your social media platforms." />
      </Head>
      <Navbar/>

      <header className="bg-cyan-400 w-full py-4">
        <div className="container mx-auto text-dark text-center">
          <h1 className="text-3xl font-bold">About Alinbox</h1>
          <p className="mt-2 text-lg">Your Unified Inbox for All Social Media Messages</p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
          <p className="text-lg">
            At Alinbox, our mission is to simplify your digital communication experience. We believe that managing messages across multiple social media platforms should be effortless. That&apos;s why we&apos;ve created a single, unified inbox to bring all your conversations into one place, saving you time and reducing stress.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">What We Offer</h2>
          <ul className="list-disc list-inside text-lg">
            <li>**All Inbox**: Access messages from WhatsApp, Instagram, Messenger, Twitter, LinkedIn, SMS, and Email all in one place.</li>
            <li>**Seamless Integration**: Connect and manage all your social media accounts effortlessly.</li>
            <li>**User-Friendly Interface**: Enjoy an intuitive design that makes managing conversations simple and efficient.</li>
            <li>**Enhanced Productivity**: Spend less time switching between apps and more time engaging with your contacts.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Our Team</h2>
          <p className="text-lg">
            Alinbox was founded by a team of passionate individuals who are committed to improving the way people communicate online. Our diverse team brings together expertise in technology, design, and user experience to create a product that meets the needs of today’s digital world.
          </p>
        </section>

      </main>

      <Footer/>
    </div>
  )
}
