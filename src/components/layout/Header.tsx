import { Github } from "lucide-react";

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-[#24292e] text-white z-50 flex items-center px-6 justify-between shadow-md">
      <div className="flex items-center gap-2 font-bold text-xl tracking-tight">
        <span className="bg-white text-[#24292e] px-2 py-0.5 rounded text-sm">QR</span>
        <span>code styling</span>
      </div>
      <div className="flex items-center gap-6 text-sm font-medium text-gray-300">
        <a 
          href="https://www.npmjs.com/package/qr-code-styling" 
          target="_blank" 
          rel="noopener noreferrer"
          className="hover:text-white transition-colors"
        >
          npm v1.8.3
        </a>
        <a 
          href="https://github.com/denyskozak/qr-code-styling" 
          target="_blank" 
          rel="noopener noreferrer"
          className="hover:text-white transition-colors flex items-center gap-2"
        >
          <Github className="w-4 h-4" />
          GitHub
        </a>
      </div>
    </header>
  );
}
