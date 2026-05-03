import logo from '../assets/logo.png';
function Footer() {
  return (
    <>
    <footer className="bg-slate-950 text-white px-4 sm:px-8 md:px-16 lg:px-24 py-12">
  
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 border-b border-slate-800 pb-10">
    
    {/* Brand */}
    <div>
      <div className="flex items-center mb-4">
        <img className="w-10" src={logo} alt="logo" />
        <h2 className="text-2xl font-bold ml-2">
          Short<span className="text-blue-500">URL</span>
        </h2>
      </div>

      <p className="text-slate-400 text-sm leading-6">
        Simplify your links, track analytics, and share smarter with
        powerful URL shortening tools.
      </p>
    </div>

    {/* Product */}
    <div>
      <h3 className="text-lg font-semibold mb-4">Product</h3>
      <div className="flex flex-col gap-3 text-slate-400 text-sm">
        <a href="#">Features</a>
        <a href="#">Pricing</a>
        <a href="#">Analytics</a>
        <a href="#">API Access</a>
      </div>
    </div>

    {/* Company */}
    <div>
      <h3 className="text-lg font-semibold mb-4">Company</h3>
      <div className="flex flex-col gap-3 text-slate-400 text-sm">
        <a href="#">About Us</a>
        <a href="#">Blog</a>
        <a href="#">Careers</a>
        <a href="#">Contact</a>
      </div>
    </div>

    {/* Support */}
    <div>
      <h3 className="text-lg font-semibold mb-4">Support</h3>
      <div className="flex flex-col gap-3 text-slate-400 text-sm">
        <a href="#">Help Center</a>
        <a href="#">Privacy Policy</a>
        <a href="#">Terms of Service</a>
        <a href="#">FAQ</a>
      </div>
    </div>

  </div>

  {/* Bottom */}
  <div className="flex flex-col sm:flex-row justify-between items-center pt-6 text-sm text-slate-500">
    <p>© 2026 ShortURL. All rights reserved.</p>

    <div className="flex gap-5 mt-3 sm:mt-0">
      <a href="#">Twitter</a>
      <a href="#">LinkedIn</a>
      <a href="#">GitHub</a>
    </div>
  </div>

</footer>
    </>
  )
}

export default Footer
