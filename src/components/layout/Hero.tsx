import { motion } from "motion/react";

export function Hero() {
  return (
    <section className="relative pt-32 pb-20 px-6 overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-[#ff00ff] to-white opacity-90 -z-10" />
      
      <div className="max-w-5xl mx-auto text-center text-white">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-6xl md:text-8xl font-black tracking-tighter uppercase mb-6 drop-shadow-2xl"
        >
          QR Code Styling
        </motion.h1>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="space-y-4 max-w-2xl mx-auto"
        >
          <span className="inline-block px-4 py-1 bg-white/20 backdrop-blur-md rounded-full text-sm font-semibold border border-white/30">
            Open Source JS Library
          </span>
          <p className="text-lg md:text-xl text-white/90 font-medium leading-relaxed drop-shadow-md">
            JavaScript library for generating highly customizable QR codes in the browser. 
            Styling, dots, corners, images and more.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
