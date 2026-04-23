export default function Footer() {
  return (
    <footer className="bg-black text-white mt-auto">
      <div className="max-w-5xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-white/40 mb-4">
              About
            </p>
            <p className="font-serif font-black text-3xl leading-tight mb-4">
              Meta Workers for Change
            </p>
            <p className="font-sans text-sm text-white/50 leading-relaxed">
              We are current and former employees of Meta holding our employer
              accountable. This site documents what is happening inside and
              around the company.
            </p>
          </div>

          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-white/40 mb-4">
              Contact
            </p>
            <form className="flex flex-col gap-4">
              <input
                type="text"
                placeholder="Name"
                className="bg-white/10 text-white placeholder:text-white/30 font-sans text-sm px-4 py-3 outline-none focus:bg-white/15 transition-colors"
              />
              <input
                type="email"
                placeholder="Email"
                className="bg-white/10 text-white placeholder:text-white/30 font-sans text-sm px-4 py-3 outline-none focus:bg-white/15 transition-colors"
              />
              <textarea
                placeholder="Message"
                rows={4}
                className="bg-white/10 text-white placeholder:text-white/30 font-sans text-sm px-4 py-3 outline-none focus:bg-white/15 transition-colors resize-none"
              />
              <button
                type="submit"
                className="bg-white text-black font-mono text-xs uppercase tracking-widest px-6 py-4 hover:bg-[#e63329] hover:text-white transition-colors self-start"
              >
                Send →
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-white/10 mt-16 pt-6">
          <p className="font-mono text-xs text-white/20 uppercase tracking-widest">
            © {new Date().getFullYear()} Meta Workers for Change
          </p>
        </div>
      </div>
    </footer>
  );
}
