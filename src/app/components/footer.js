import Link from 'next/link'

const Footer = () => {
  return (
    <footer className="bg-cyan-500  py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Contact Details */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li>
                <strong>Email:</strong> <Link href="mailto:support@alinbox.com" className="hover:underline">support@alinbox.com</Link>
              </li>
              <li>
                <strong>Phone:</strong> <Link href="tel:+1234567890" className="hover:underline">+123 456 7890</Link>
              </li>
              <li>
                <strong>Address:</strong> 123 Main Street, Suite 400, City, Country
              </li>
            </ul>
          </div>

          {/* Links Column 1 */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li><Link href="/about">About Us</Link></li>
              <li><Link href="/careers">Careers</Link></li>
              <li><Link href="/contact">Contact</Link></li>
            </ul>
          </div>

          {/* Links Column 2 */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li><Link href="/faq">FAQ</Link></li>
              <li><Link href="/privacy-policy">Privacy Policy</Link></li>
              <li><Link href="/terms-of-service">Terms of Service</Link></li>
            </ul>
          </div>

          {/* Links Column 3 */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
            <ul className="space-y-2">
              <li><Link href="https://twitter.com/alinbox" target="_blank" rel="noopener noreferrer" className="hover:underline">Twitter</Link></li>
              <li><Link href="https://facebook.com/alinbox" target="_blank" rel="noopener noreferrer" className="hover:underline">Facebook</Link></li>
              <li><Link href="https://instagram.com/alinbox" target="_blank" rel="noopener noreferrer" className="hover:underline">Instagram</Link></li>
              <li><Link href="https://linkedin.com/company/alinbox" target="_blank" rel="noopener noreferrer" className="hover:underline">LinkedIn</Link></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
