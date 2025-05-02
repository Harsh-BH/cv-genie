"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import IconMap from "@/components/IconMap";
import AnimatedSvg from "@/components/AnimatedSvg";
import pageData from "@/constants/pageData.json";

export default function Home() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "200%"]);
  
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  // Destructure data from pageData
  const { hero, features, howItWorks, cta, stats, testimonials, footer } = pageData;

  return (
    <div ref={ref} className="relative overflow-hidden bg-gradient-to-b from-black via-purple-900 to-black min-h-screen">
      {/* Background animated gradient elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -inset-[10px] opacity-30">
          <div className="absolute top-0 -left-40 w-80 h-80 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
          <div className="absolute top-0 -right-20 w-80 h-80 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-40 left-20 w-80 h-80 bg-pink-600 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
        </div>
      </div>
      
      {/* Decorative dots floating across the screen */}
      <AnimatedSvg type="floatingDots" className="top-20 left-10 z-10 opacity-50" />
      <AnimatedSvg type="floatingDots" className="top-40 right-10 z-10 opacity-40" />
      <AnimatedSvg type="floatingDots" className="bottom-20 left-20 z-10 opacity-30" />

      {/* Hero Section with Parallax */}
      <section className="relative min-h-screen flex items-center justify-center px-4 py-20 overflow-hidden">
        <motion.div 
          style={{ y: textY }}
          className="relative z-10 text-center flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16"
        >
          {/* CV reading animation on the left side */}
          <motion.div
            className="hidden md:block"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <AnimatedSvg type="cvReading" className="w-[450px] h-[450px]" />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center"
          >
            <motion.div 
              className="w-20 h-20 mb-6"
              animate={{ 
                rotate: [0, 10, -10, 10, 0],
                scale: [1, 1.05, 1, 1.05, 1] 
              }}
              transition={{ 
                duration: 5, 
                repeat: Infinity, 
                repeatType: "reverse" 
              }}
            >
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-white">
                <path d="M7 18H17V16H7V18Z" fill="currentColor" />
                <path d="M17 14H7V12H17V14Z" fill="currentColor" />
                <path d="M7 10H11V8H7V10Z" fill="currentColor" />
                <path fillRule="evenodd" clipRule="evenodd" d="M6 2C4.34315 2 3 3.34315 3 5V19C3 20.6569 4.34315 22 6 22H18C19.6569 22 21 20.6569 21 19V5C21 3.34315 19.6569 2 18 2H6ZM5 5C5 4.44772 5.44772 4 6 4H18C18.5523 4 19 4.44772 19 5V19C19 19.5523 18.5523 20 18 20H6C5.44772 20 5 19.5523 5 19V5Z" fill="currentColor" />
              </svg>
            </motion.div>
            
            <motion.h1 
              className="text-5xl md:text-7xl font-bold mb-6 text-gradient-primary font-space-grotesk"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {hero.title}
            </motion.h1>
            
            <motion.p 
              className="text-xl md:text-2xl text-white/80 mb-8 max-w-xl font-outfit"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {hero.description}
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <motion.button 
                className="px-8 py-3 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full text-white font-semibold shadow-lg hover:shadow-pink-500/30 transition-all duration-300 ease-in-out"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {hero.primaryButton}
              </motion.button>
              
              <motion.button 
                className="px-8 py-3 bg-white/10 backdrop-blur-md rounded-full text-white font-semibold border border-white/20 shadow-lg hover:bg-white/20 transition-all duration-300 ease-in-out"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {hero.secondaryButton}
              </motion.button>
            </motion.div>
          </motion.div>
        </motion.div>
        
        <motion.div 
          style={{ y: backgroundY }}
          className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black to-transparent z-10"
        />
        
        <motion.div 
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 5V19M12 19L6 13M12 19L18 13" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </motion.div>
      </section>

      {/* Wavy line separator */}
      <div className="relative">
        <AnimatedSvg type="wavyLine" className="w-full h-20 -mt-10" />
      </div>

      {/* Stats Section with Animated Circular Progress */}
      <section className="relative py-10 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            {stats.items.map((stat, i) => (
              <motion.div
                key={i}
                className="bg-white/5 backdrop-blur-sm rounded-xl p-6 text-center relative overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                {/* Add animated circle behind the stats for visual interest */}
                <div className="absolute -right-4 -bottom-4 opacity-20">
                  <AnimatedSvg type="circularProgress" />
                </div>
                
                <motion.div 
                  className="text-3xl md:text-4xl font-bold text-white mb-2 relative z-10 font-space-grotesk"
                  initial={{ scale: 0.5 }}
                  whileInView={{ scale: 1 }}
                  transition={{ 
                    type: "spring",
                    stiffness: 200,
                    delay: i * 0.1 + 0.2
                  }}
                  viewport={{ once: true }}
                >
                  {stat.value}
                </motion.div>
                <div className="text-sm text-white/70 relative z-10">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section with Glassmorphism Cards and Animated Icons */}
      <section className="relative py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.h2 
            className="text-4xl font-bold text-center mb-16 text-white font-space-grotesk"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            {features.title}
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.items.map((feature, i) => (
              <motion.div
                key={feature.id}
                className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 hover:border-white/40 transition-all duration-500 hover:shadow-xl hover:shadow-purple-500/10 relative overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                {/* Animated background effect for cards */}
                <motion.div 
                  className="absolute -right-20 -bottom-20 w-40 h-40 rounded-full bg-gradient-to-tr from-purple-600/20 to-pink-600/20 blur-2xl"
                  animate={{ 
                    scale: [1, 1.2, 1], 
                    opacity: [0.5, 0.7, 0.5]
                  }}
                  transition={{ 
                    duration: 4, 
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                />
                
                <div className="mb-5 relative">
                  <motion.div
                    whileHover={{ rotate: 10, scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <IconMap type={feature.iconType} />
                  </motion.div>
                </div>
                
                <h3 className="text-xl font-bold text-white mb-3 relative font-space-grotesk">{feature.title}</h3>
                <p className="text-white/70 relative font-outfit">{feature.description}</p>
                
                {/* Feature-specific animations that appear in the corner of the card */}
                {feature.id === 2 && (
                  <div className="absolute right-5 bottom-5 opacity-70 w-16 h-16">
                    <AnimatedSvg type="codingAnimation" />
                  </div>
                )}
                {feature.id === 4 && (
                  <div className="absolute right-5 bottom-5 opacity-70 w-16 h-16">
                    <AnimatedSvg type="analyticsAnimation" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section with Parallax and Better Visualizations */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        
        {/* Add floating animated elements in the background */}
        <AnimatedSvg type="floatingDots" className="top-40 left-40 z-0 opacity-30" />
        <AnimatedSvg type="floatingDots" className="bottom-40 right-40 z-0 opacity-30" />
        
        <div className="max-w-6xl mx-auto relative">
          <motion.h2 
            className="text-4xl font-bold text-center mb-20 text-white font-space-grotesk"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            {howItWorks.title}
          </motion.h2>
          
          {howItWorks.steps.map((item, i) => (
            <motion.div 
              key={item.id}
              className="flex flex-col md:flex-row items-start gap-6 mb-20 relative"
              initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <div className="flex-shrink-0 relative">
                <motion.div 
                  className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center text-white font-bold text-xl font-space-grotesk"
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  {item.step}
                </motion.div>
                {/* Animated ring around step numbers */}
                <motion.div 
                  className="absolute -inset-2 rounded-full border-2 border-purple-500/30"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ 
                    duration: 3, 
                    repeat: Infinity, 
                    repeatType: "reverse"
                  }}
                />
              </div>
              
              <div>
                <h3 className="text-2xl font-bold text-white mb-3 font-space-grotesk">{item.title}</h3>
                <p className="text-lg text-white/70 max-w-2xl font-outfit">{item.description}</p>
                
                {/* Add step-specific animations */}
                {item.id === 1 && (
                  <motion.div 
                    className="mt-6 bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10 flex items-center gap-3"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    viewport={{ once: true }}
                  >
                    <svg className="w-6 h-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                    </svg>
                    <span className="text-white/80">Drag & drop your file or <span className="text-purple-400">browse</span></span>
                  </motion.div>
                )}
                
                {item.id === 2 && (
                  <motion.div 
                    className="mt-6 w-40 h-40"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 }}
                    viewport={{ once: true }}
                  >
                    <AnimatedSvg type="analyticsAnimation" />
                  </motion.div>
                )}
              </div>
              
              {i < howItWorks.steps.length - 1 && (
                <motion.div 
                  className="absolute left-8 top-16 bottom-0 w-px bg-gradient-to-b from-purple-500 to-transparent h-20 md:h-40"
                  initial={{ scaleY: 0, originY: 0 }}
                  whileInView={{ scaleY: 1 }}
                  transition={{ duration: 1, delay: 0.5 }}
                  viewport={{ once: true }}
                />
              )}
            </motion.div>
          ))}
        </div>
      </section>

      {/* Testimonials with animated decorative elements */}
      <section className="relative py-20 px-4">
        {/* Add decorative elements */}
        <div className="absolute top-20 left-20 w-20 h-20 opacity-20">
          <AnimatedSvg type="circularProgress" />
        </div>
        <div className="absolute bottom-20 right-20 w-20 h-20 opacity-20">
          <AnimatedSvg type="circularProgress" />
        </div>
        
        <div className="max-w-6xl mx-auto">
          <motion.h2 
            className="text-4xl font-bold text-center mb-16 text-white font-space-grotesk"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            {testimonials.title}
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.items.map((testimonial, i) => (
              <motion.div
                key={testimonial.id}
                className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10 relative"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ 
                  y: -5,
                  boxShadow: "0 20px 25px -5px rgba(167, 139, 250, 0.1), 0 8px 10px -6px rgba(167, 139, 250, 0.1)"
                }}
              >
                {/* Quotation mark decorative element */}
                <motion.svg 
                  className="absolute top-4 right-4 w-12 h-12 text-purple-500/10"
                  viewBox="0 0 24 24"
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.2 + 0.3 }}
                  viewport={{ once: true }}
                >
                  <path 
                    d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" 
                    fill="currentColor"
                  />
                </motion.svg>
                
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 rounded-full bg-purple-500/30 flex items-center justify-center mr-4">
                    {/* Use placeholder avatar if image is not available */}
                    <div className="text-xl font-bold text-white">
                      {testimonial.name.charAt(0)}
                    </div>
                  </div>
                  <div>
                    <div className="font-bold text-white font-space-grotesk">{testimonial.name}</div>
                    <div className="text-sm text-white/70 font-outfit">{testimonial.position}, {testimonial.company}</div>
                  </div>
                </div>
                
                <p className="text-white/80 italic relative font-outfit">
                  {/* Animated underline effect for key phrases */}
                  <motion.span className="relative">
                    "{testimonial.text}"
                    <motion.span 
                      className="absolute -bottom-1 left-0 w-full h-px bg-gradient-to-r from-pink-500/50 to-purple-500/50"
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      transition={{ delay: i * 0.2 + 0.5, duration: 0.8 }}
                      viewport={{ once: true }}
                    />
                  </motion.span>
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section with enhanced visuals */}
      <section className="relative py-20 px-4">
        <motion.div 
          className="max-w-4xl mx-auto bg-gradient-to-r from-purple-900/50 to-pink-900/50 backdrop-blur-xl rounded-3xl p-10 border border-white/10 overflow-hidden"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -inset-[10px] opacity-30">
              <div className="absolute top-0 left-0 w-72 h-72 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl"></div>
              <div className="absolute bottom-0 right-0 w-72 h-72 bg-pink-600 rounded-full mix-blend-multiply filter blur-3xl"></div>
            </div>
          </div>
          
          {/* Add animated particles */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <AnimatedSvg type="floatingDots" className="inset-0 opacity-30" />
          </div>
          
          <div className="relative z-10 text-center">
            <motion.h2 
              className="text-3xl md:text-4xl font-bold mb-6 text-white font-space-grotesk"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              {cta.title}
            </motion.h2>
            
            <motion.p 
              className="text-xl text-white/80 mb-10 max-w-2xl mx-auto font-outfit"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              {cta.description}
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="relative"
            >
              <motion.button 
                className="px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full text-white font-bold text-lg shadow-xl hover:shadow-pink-500/30 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {cta.buttonText}
              </motion.button>
              
              {/* Pulsing effect behind the button */}
              <motion.div 
                className="absolute inset-0 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 blur-xl -z-10"
                animate={{ 
                  opacity: [0.3, 0.5, 0.3],
                  scale: [1, 1.05, 1]
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity, 
                  repeatType: "reverse"
                }}
              />
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Footer with subtle animations */}
      <footer className="bg-black/50 backdrop-blur-md py-10 px-4 border-t border-white/10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-6 md:mb-0">
            <motion.svg 
              className="w-8 h-8 text-purple-500 mr-2"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              animate={{ rotate: [0, 5, 0, -5, 0] }}
              transition={{ duration: 5, repeat: Infinity }}
            >
              <path d="M7 18H17V16H7V18Z" fill="currentColor" />
              <path d="M17 14H7V12H17V14Z" fill="currentColor" />
              <path d="M7 10H11V8H7V10Z" fill="currentColor" />
              <path fillRule="evenodd" clipRule="evenodd" d="M6 2C4.34315 2 3 3.34315 3 5V19C3 20.6569 4.34315 22 6 22H18C19.6569 22 21 20.6569 21 19V5C21 3.34315 19.6569 2 18 2H6ZM5 5C5 4.44772 5.44772 4 6 4H18C18.5523 4 19 4.44772 19 5V19C19 19.5523 18.5523 20 18 20H6C5.44772 20 5 19.5523 5 19V5Z" fill="currentColor" />
            </motion.svg>
            <span className="text-white font-bold text-xl font-space-grotesk">CV Genie</span>
          </div>
          
          <div className="flex space-x-6">
            {footer.links.map((link, i) => (
              <motion.a 
                key={i}
                href={link.url} 
                className="text-white/70 hover:text-white transition-colors font-outfit"
                whileHover={{ y: -2, color: "rgba(255, 255, 255, 1)" }}
              >
                {link.text}
              </motion.a>
            ))}
          </div>
        </div>
        
        {footer.copyright && (
          <div className="mt-6 text-center text-white/50 text-sm font-outfit">
            {footer.copyright}
          </div>
        )}
      </footer>
      
      {/* Add styles needed for animations */}
      <style jsx global>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}
