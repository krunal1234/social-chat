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

      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-semibold mb-8  text-center">Contact Us</h2>
          <form className="max-w-lg mx-auto">
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                Name
              </label>
              <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" type="text" placeholder="Your Name"/>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                Email
              </label>
              <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="email" placeholder="Your Email"/>
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="message">
                Message
              </label>
              <textarea className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="message" placeholder="Your Message" rows="4"></textarea>
            </div>
            <div className="flex items-center justify-center">
              <button className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                Send Message
              </button>
            </div>
          </form>
        </div>
      </section>
      
      <Footer/>
    </div>
  )
}
