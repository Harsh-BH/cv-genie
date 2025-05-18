"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FiSend, FiCheckCircle, FiArrowLeft } from "react-icons/fi";
import { useRouter } from "next/navigation";

export default function ContactPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "Bug Report",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({
        name: "",
        email: "",
        subject: "Bug Report",
        message: ""
      });
      
      // Reset success message after 5 seconds
      setTimeout(() => setIsSubmitted(false), 5000);
    }, 1500);
    
    // In a real implementation, you would send the form data to your server/API
    // const response = await fetch('/api/contact', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(formData)
    // });
  };

  return (
    <div className="min-h-screen relative overflow-hidden py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-indigo-50 via-purple-50 to-blue-100">
      {/* Background animated elements */}
      <div className="absolute top-0 left-0 w-full h-full z-0 overflow-hidden">
        <Bubbles />
        <FloatingStars />
        <DocumentIcons />
      </div>
      
      {/* Go Back Button */}
      <motion.div 
        className="absolute top-6 left-6 z-10"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.button
          onClick={() => router.back()}
          className="flex items-center space-x-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-lg shadow-md hover:bg-white transition-all duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <FiArrowLeft className="text-indigo-600" />
          <span className="font-medium text-indigo-600">Go Back</span>
        </motion.button>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-5xl mx-auto relative z-10"
      >
        <div className="text-center mb-16">
          <motion.h1 
            className="text-4xl font-bold text-gray-900 mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Get in Touch
          </motion.h1>
          <motion.p 
            className="text-lg text-gray-600 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Have a bug to report or a suggestion to make? We'd love to hear from you!
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Animated SVG */}
          <motion.div 
            className="hidden md:flex items-center justify-center"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <ContactSVG />
          </motion.div>

          {/* Contact Form */}
          <motion.div 
            className="bg-white/90 backdrop-blur-sm rounded-xl shadow-xl p-8 border border-indigo-100"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            {isSubmitted ? (
              <motion.div 
                className="h-full flex flex-col items-center justify-center text-center"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
              >
                <FiCheckCircle className="text-green-500 text-6xl mb-4" />
                <h3 className="text-2xl font-medium text-gray-900 mb-2">Thanks for reaching out!</h3>
                <p className="text-gray-600">We've received your message and will get back to you shortly.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
                    placeholder="John Doe"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
                    placeholder="john@example.com"
                  />
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                    Subject
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
                  >
                    <option value="Bug Report">Bug Report</option>
                    <option value="Feature Request">Feature Request</option>
                    <option value="Question">Question</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
                    placeholder="Please describe the issue or your message in detail..."
                  />
                </div>
                
                <div>
                  <motion.button
                    type="submit"
                    className="w-full flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending...
                      </span>
                    ) : (
                      <span className="flex items-center">
                        <FiSend className="mr-2" />
                        Send Message
                      </span>
                    )}
                  </motion.button>
                </div>
              </form>
            )}
          </motion.div>
        </div>

        <motion.div 
          className="mt-16 text-center text-gray-600"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <p className="mb-2">Or reach us directly at:</p>
          <a href="mailto:support@cvgenie.com" className="text-indigo-600 hover:text-indigo-800 transition">
            support@cvgenie.com
          </a>
        </motion.div>
      </motion.div>
    </div>
  );
}

const ContactSVG = () => (
  <motion.svg 
    width="400" 
    height="300" 
    viewBox="0 0 400 300" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 1 }}
  >
    {/* Envelope */}
    <motion.rect 
      x="100" 
      y="80" 
      width="200" 
      height="140" 
      rx="5" 
      fill="#e0e7ff" 
      stroke="#4f46e5" 
      strokeWidth="3"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 0.5, duration: 0.8, type: "spring" }}
    />
    
    {/* Envelope flap */}
    <motion.path 
      d="M100 85L200 150L300 85" 
      stroke="#4f46e5" 
      strokeWidth="3" 
      fill="none"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ delay: 1, duration: 1.5 }}
    />
    
    {/* Envelope content line 1 */}
    <motion.rect 
      x="150" 
      y="115" 
      width="100" 
      height="5" 
      rx="2.5" 
      fill="#818cf8"
      initial={{ scaleX: 0 }}
      animate={{ scaleX: 1 }}
      transition={{ delay: 1.8, duration: 0.5 }}
    />
    
    {/* Envelope content line 2 */}
    <motion.rect 
      x="150" 
      y="135" 
      width="100" 
      height="5" 
      rx="2.5" 
      fill="#818cf8"
      initial={{ scaleX: 0 }}
      animate={{ scaleX: 1 }}
      transition={{ delay: 2, duration: 0.5 }}
    />
    
    {/* Envelope content line 3 */}
    <motion.rect 
      x="150" 
      y="155" 
      width="100" 
      height="5" 
      rx="2.5" 
      fill="#818cf8"
      initial={{ scaleX: 0 }}
      animate={{ scaleX: 1 }}
      transition={{ delay: 2.2, duration: 0.5 }}
    />
    
    {/* Envelope content line 4 */}
    <motion.rect 
      x="150" 
      y="175" 
      width="60" 
      height="5" 
      rx="2.5" 
      fill="#818cf8"
      initial={{ scaleX: 0 }}
      animate={{ scaleX: 1 }}
      transition={{ delay: 2.4, duration: 0.5 }}
    />
    
    {/* Paper plane */}
    <motion.path 
      d="M50 50L80 65L65 75L50 50Z" 
      fill="#c7d2fe" 
      stroke="#4f46e5" 
      strokeWidth="2"
      initial={{ x: -50, y: -50 }}
      animate={{ 
        x: [0, 300, 350], 
        y: [0, -30, 20],
        rotate: [0, -15, -30]
      }}
      transition={{ 
        duration: 4,
        repeat: Infinity,
        repeatType: "loop",
        repeatDelay: 1
      }}
    />
    
    {/* Notification bell */}
    <motion.g
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 2.6, duration: 0.5 }}
    >
      <motion.path 
        d="M50 220C50 220 55 210 60 210H80C85 210 90 220 90 220" 
        stroke="#4f46e5" 
        strokeWidth="2" 
        fill="none"
      />
      <motion.path 
        d="M55 215H85V190C85 182.268 78.732 176 71 176H69C61.268 176 55 182.268 55 190V215Z" 
        fill="#e0e7ff" 
        stroke="#4f46e5" 
        strokeWidth="2"
      />
      <motion.circle 
        cx="70" 
        cy="225" 
        r="5" 
        fill="#4f46e5"
        animate={{ 
          y: [0, -3, 0],
        }}
        transition={{ 
          duration: 1,
          repeat: Infinity,
          repeatType: "reverse",
          delay: 3
        }}
      />
    </motion.g>
  </motion.svg>
);

// Background bubbles animation
const Bubbles = () => {
  const [bubbles, setBubbles] = useState<Array<{
    id: number;
    size: number;
    x: number;
    y: number;
    delay: number;
    duration: number;
  }>>([]);

  useEffect(() => {
    // Only generate random values on the client side after hydration
    setBubbles(
      Array.from({ length: 20 }).map((_, i) => ({
        id: i,
        size: Math.random() * 80 + 20,
        x: Math.random() * 100,
        y: Math.random() * 100,
        delay: Math.random() * 5,
        duration: Math.random() * 10 + 10
      }))
    );
  }, []);

  if (bubbles.length === 0) return null;

  return (
    <>
      {bubbles.map(bubble => (
        <motion.div
          key={bubble.id}
          className="absolute rounded-full bg-indigo-500/5 backdrop-blur-sm border border-white/20"
          style={{
            width: bubble.size,
            height: bubble.size,
            left: `${bubble.x}%`,
            top: `${bubble.y}%`,
            zIndex: 0
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ 
            scale: [0, 1, 1.1, 1],
            opacity: [0, 0.2, 0.1, 0],
            y: [0, -100]
          }}
          transition={{
            duration: bubble.duration,
            repeat: Infinity,
            delay: bubble.delay,
            ease: "easeInOut"
          }}
        />
      ))}
    </>
  );
};

// Floating stars animation
const FloatingStars = () => {
  const [stars, setStars] = useState<Array<{
    id: number;
    size: number;
    x: number;
    y: number;
    delay: number;
    duration: number;
  }>>([]);

  useEffect(() => {
    // Only generate random values on the client side after hydration
    setStars(
      Array.from({ length: 15 }).map((_, i) => ({
        id: i,
        size: Math.random() * 8 + 2,
        x: Math.random() * 100,
        y: Math.random() * 100,
        delay: Math.random() * 5,
        duration: Math.random() * 5 + 5
      }))
    );
  }, []);

  if (stars.length === 0) return null;

  return (
    <>
      {stars.map(star => (
        <motion.div
          key={star.id}
          className="absolute bg-purple-400"
          style={{
            width: star.size,
            height: star.size,
            borderRadius: '50%',
            left: `${star.x}%`,
            top: `${star.y}%`,
            boxShadow: '0 0 10px 2px rgba(167, 139, 250, 0.3)',
            zIndex: 0
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ 
            scale: [0, 1, 1.5, 1, 0],
            opacity: [0, 0.8, 1, 0.8, 0],
            rotate: [0, 90]
          }}
          transition={{
            duration: star.duration,
            repeat: Infinity,
            delay: star.delay,
            ease: "easeInOut"
          }}
        />
      ))}
    </>
  );
};

// Document/paper icons
const DocumentIcons = () => {
  const [documents, setDocuments] = useState<Array<{
    id: number;
    x: number;
    y: number;
    rotation: number;
    delay: number;
  }>>([]);

  useEffect(() => {
    // Only generate random values on the client side after hydration
    setDocuments(
      Array.from({ length: 6 }).map((_, i) => ({
        id: i,
        x: 10 + (i % 3) * 30,
        y: 10 + Math.floor(i / 3) * 70,
        rotation: Math.random() * 20 - 10,
        delay: i * 0.2
      }))
    );
  }, []);

  if (documents.length === 0) return null;

  return (
    <>
      {documents.map(doc => (
        <motion.div
          key={doc.id}
          className="absolute"
          style={{
            left: `${doc.x}%`,
            top: `${doc.y}%`,
            zIndex: 0
          }}
          initial={{ opacity: 0, y: 20, rotate: doc.rotation }}
          animate={{ 
            opacity: [0, 0.7, 0],
            y: [20, -100, -200],
            rotate: [doc.rotation, doc.rotation + 5, doc.rotation - 5]
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            delay: doc.delay,
            ease: "easeInOut"
          }}
        >
          <svg width="40" height="50" viewBox="0 0 40 50" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="2" y="2" width="36" height="46" rx="3" fill="#e0e7ff" stroke="#a5b4fc" strokeWidth="2" />
            <line x1="8" y1="12" x2="32" y2="12" stroke="#a5b4fc" strokeWidth="2" />
            <line x1="8" y1="20" x2="32" y2="20" stroke="#a5b4fc" strokeWidth="2" />
            <line x1="8" y1="28" x2="32" y2="28" stroke="#a5b4fc" strokeWidth="2" />
            <line x1="8" y1="36" x2="20" y2="36" stroke="#a5b4fc" strokeWidth="2" />
          </svg>
        </motion.div>
      ))}
    </>
  );
};
