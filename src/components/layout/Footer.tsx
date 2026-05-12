export function Footer() {
  return (
    <footer className="bg-[#24292e] text-gray-400 py-8 px-6 border-t border-gray-800">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="text-sm font-medium">
          © 2024 Denys Kozak. All rights reserved.
        </div>
        <div className="flex items-center gap-6 text-sm">
          <a href="#" className="hover:text-white transition-colors">Documentation</a>
          <a href="#" className="hover:text-white transition-colors">Issues</a>
          <a href="#" className="hover:text-white transition-colors">License</a>
        </div>
      </div>
    </footer>
  );
}
