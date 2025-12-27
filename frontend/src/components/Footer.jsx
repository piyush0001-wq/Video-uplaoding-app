export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black/30 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
        <p>© {new Date().getFullYear()} VideoSense. All rights reserved.</p>
        <p className="mt-2 md:mt-0">
          Created by Piyush Solakhiya, Built with React, Node & MongoDB
        </p>
      </div>
    </footer>
  );
}
