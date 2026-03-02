import Link from 'next/link'

export function Footer() {
  return (
    <footer className="border-t border-border bg-slate-950 text-slate-300">
      <div className="container mx-auto px-4 py-16 md:px-6">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          {/* Brand */}
          <div className="space-y-3">
            <h3 className="text-xl font-bold text-white">INFNOVA Academy</h3>
            <p className="text-sm leading-relaxed text-slate-400">
              Empowering learners worldwide with cutting-edge technology courses.
              Start your journey to success with expert-led training.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-bold text-white text-sm uppercase tracking-wide">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-slate-400 hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/" className="text-slate-400 hover:text-primary transition-colors">
                  Courses
                </Link>
              </li>
              <li>
                <Link href="/" className="text-slate-400 hover:text-primary transition-colors">
                  Instructors
                </Link>
              </li>
              <li>
                <Link href="/" className="text-slate-400 hover:text-primary transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h4 className="font-bold text-white text-sm uppercase tracking-wide">Support</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-slate-400 hover:text-primary transition-colors">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/" className="text-slate-400 hover:text-primary transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/" className="text-slate-400 hover:text-primary transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/" className="text-slate-400 hover:text-primary transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-slate-800 mt-10" />

        {/* Copyright */}
        <div className="mt-10 text-center text-sm text-slate-500">
          <p>© 2026 INFNOVA Technologies. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
