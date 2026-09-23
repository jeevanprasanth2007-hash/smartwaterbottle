import { Menu } from 'lucide-react';

export default function Navbar({ online, setOpen }) {
  return (
    <header className="flex items-center justify-between p-4 gap-4">

      {/* Mobile Menu Button */}
      <button
        type="button"
        className="md:hidden p-2 glass !rounded-xl"
        aria-label="Open menu"
        onClick={() => setOpen(true)}
      >
        <Menu size={24} />
      </button>

      {/* Empty Space */}
      <div className="flex-1" />

      {/* Right Side */}
      <div className="flex items-center gap-3">

        {/* ESP32 Connection Status */}
        <div className="hidden sm:flex glass !rounded-full px-4 py-2 items-center gap-2 text-sm font-semibold">
          <span
            className={`h-2.5 w-2.5 rounded-full ${
              online
                ? 'bg-emerald-500 animate-pulse'
                : 'bg-red-500'
            }`}
          />

          <span>
            {online ? 'ESP32 Connected' : 'ESP32 Offline'}
          </span>
        </div>

        {/* Company JPEG Logo */}
        <img
          src="/company-logo.jpeg"
          alt="Company Logo"
          className="h-11 w-11 rounded-xl object-contain bg-white/80 p-1 shadow-md border border-white/60"
        />

      </div>
    </header>
  );
}