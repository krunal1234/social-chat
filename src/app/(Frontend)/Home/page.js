'use client'
import Footer from '@/app/components/footer';
import Navbar from '@/app/components/navbar';
import Head from 'next/head'
import Image from 'next/image';

const Home = () => {
  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <Head>
        <title>Alinbox Social Inbox</title>
        <meta name="description" content="Manage all your social media messages in one place." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />

      <header className="bg-cyan-500 w-full py-8">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-bold text-white">Alinbox Social Inbox</h1>
          <p className="mt-4 text-lg text-gray-100">All your social media messages in one place.</p>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 py-24 text-center">
        <h2 className="text-3xl font-semibold mb-8">Connect with Your Favorite Platforms</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-8">
          {[
            { name: 'WhatsApp', icon: '/whatsapp.svg' },
            { name: 'Instagram', icon: '/instagram.svg' },
            { name: 'Messenger', icon: '/facebook-messenger.svg' },
            { name: 'Twitter', icon: '/twitter.svg' },
            { name: 'LinkedIn', icon: '/linkedin.svg' },
            { name: 'SMS', icon: '/sms.svg' },
            { name: 'Email', icon: '/email.svg' }
          ].map((platform) => (
            <div key={platform.name} className="bg-white shadow rounded-lg p-6">
              <div className="mb-4 flex justify-center">
                <Image src={platform.icon} alt={`${platform.name}-icon`} width={60} height={60} />
              </div>
              <h3 className="text-lg font-medium">{platform.name}</h3>
            </div>
          ))}
        </div>
      </main>

      <section className="py-24 bg-cyan-500">
        <div className="container mx-auto px-4 text-center text-white">
          <h2 className="text-3xl font-semibold mb-8">Why Choose Alinbox?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: 'Unified Inbox',
                description: 'View and respond to all your social media messages from a single, easy-to-use interface.',
                icon: '/unified-inbox.svg'
              },
              {
                title: 'Real-Time Notifications',
                description: 'Stay updated with instant notifications for new messages across all your platforms.',
                icon: '/notifications.svg'
              },
              {
                title: 'Analytics & Reporting',
                description: 'Track your social media performance with detailed analytics and reporting tools.',
                icon: '/analytics.svg'
              },
              {
                title: 'Secure & Private',
                description: 'Your data is encrypted and secure, ensuring your conversations remain private.',
                icon: '/secure.jpg'
              }
            ].map((feature) => (
              <div key={feature.title} className="bg-white text-cyan-500 shadow rounded-lg p-6">
                <div className="mb-4 flex justify-center">
                  <Image src={feature.icon} alt={`${feature.title}-icon`} width={150} height={150} />
                </div>
                <h3 className="text-xl font-medium mb-2">{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-semibold mb-8">What Our Users Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: 'John Doe',
                feedback: 'Alinbox has made managing my social media accounts so much easier. I love the unified inbox feature!',
              },
              {
                name: 'Jane Smith',
                feedback: 'The analytics tool is fantastic. It helps me track my social media performance and make informed decisions.',
              },
              {
                name: 'Mark Wilson',
                feedback: 'I was worried about security, but Alinbox ensures my data is always safe and secure.',
              }
            ].map((testimonial) => (
              <div key={testimonial.name} className="bg-gray-50 shadow rounded-lg p-6">
                <h3 className="text-xl font-medium mb-2">{testimonial.name}</h3>
                <p>&quot;{testimonial.feedback}&quot;</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-24 bg-cyan-500 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-semibold mb-4">Get Started with Alinbox Today</h2>
          <p className="text-lg mb-6">Sign up now and take control of your social media conversations.</p>
          <button className="bg-white text-cyan-500 font-medium py-2 px-6 rounded-lg">Sign Up Now</button>
        </div>
      </section>

      <section className="py-24">
      <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-semibold mb-4">Our Team</h2>
          <p className="text-lg">
            Alinbox was founded by a team of passionate individuals who are committed to improving the way people communicate online. Our diverse team brings together expertise in technology, design, and user experience to create a product that meets the needs of today’s digital world.
          </p>
          </div>
        </section>
      <Footer />
    </div>
  )
}

export default Home;
