'use client'

import Link from "next/link";
import { getCookie } from 'cookies-next';
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaCircleUser } from "react-icons/fa6";
import { RiMenu3Fill, RiCloseFill } from "react-icons/ri";
import { FaUser, FaUpload, FaSignOutAlt } from "react-icons/fa";

const Navbar = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [hydrated, setHydrated] = useState(false);
    const [avatar, setAvatar] = useState('');
    const [userName, setUserName] = useState('');
    const [useremail, setUseremail] = useState('');
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const flag = getCookie('isLoggedIn');
        setIsAuthenticated(flag === 'true');
        setHydrated(true);
    }, []);

    const Logout = async () => {
        const res = await fetch('/api/logout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        const data = await res.json();

        if(data.success) {
            setIsAuthenticated(false);
            setIsMobileMenuOpen(false);
            window.location.href = '/';
        }
    }

    const getUserDetails = async () => {
        const res = await fetch('/api/auth/me', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        const data = await res.json();
        if(data.status === 200) {
            setAvatar(data.user.avatar);
            setUserName(data.user.name.split(' ')[0]);
            setUseremail(data.user.email);
        }
    }

    useEffect(() => {
        if (isAuthenticated) {
            getUserDetails();
        }
    }, [isAuthenticated]);

    // Track mouse position for interactive background effect
    useEffect(() => {
        const handleMouseMove = (e:any) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };
        
        window.addEventListener('mousemove', handleMouseMove);
        
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    // Close mobile menu on window resize
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 768) {
                setIsMobileMenuOpen(false);
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Animation variants for text
    const titleVariants = {
        initial: {
            opacity: 0,
            y: -20
        },
        animate: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                ease: "easeOut"
            }
        },
        hover: {
            scale: 1.05,
            textShadow: "0px 0px 8px rgb(236, 72, 153, 0.7)",
            transition: {
                duration: 0.3,
                yoyo: Infinity,
                ease: "easeInOut"
            }
        }
    };

    // Mobile menu animation variants
    const sidebarVariants = {
        closed: {
            x: "100%",
            opacity: 0,
            transition: {
                type: "spring",
                stiffness: 400,
                damping: 40
            }
        },
        open: {
            x: "0%",
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 400,
                damping: 40
            }
        }
    };

    // Backdrop animation for mobile menu
    const backdropVariants = {
        closed: {
            opacity: 0,
            transition: {
                delay: 0.2
            }
        },
        open: {
            opacity: 1
        }
    };

    if(!hydrated) return null; // Prevents hydration issues

    return (
        <div className="p-2 fixed top-0 z-50 w-full flex justify-center items-center">
            <motion.nav 
                className="flex h-[80px] w-full max-w-[2000px] bg-pink-700/10 rounded-2xl backdrop-blur-2xl shadow-md items-center justify-between px-4 md:px-8 border-white/10 border-1 overflow-visible"
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
            >   
            <div className="flex w-[100%] h-[100%] overflow-hidden absolute left-0">
                {/* Animated background gradient */}
                <motion.div 
                    className="absolute inset-0 rounded-2xl opacity-30"
                    style={{
                        background: "linear-gradient(45deg, rgba(219, 39, 119, 0.3), rgba(139, 92, 246, 0.3))",
                        filter: "blur(20px)",
                    }}
                    animate={{
                        backgroundPosition: `${mousePosition.x / 20}px ${mousePosition.y / 20}px`,
                    }}
                />
                
                {/* Animated light spots */}
                <motion.div 
                    className="absolute h-24 w-24 rounded-full bg-pink-500/30"
                    animate={{
                        x: mousePosition.x / 10,
                        y: mousePosition.y / 10,
                        scale: [1, 1.2, 1],
                    }}
                    transition={{
                        scale: {
                            duration: 4,
                            repeat: Infinity,
                            repeatType: "reverse",
                        }
                    }}
                    style={{ 
                        filter: "blur(40px)",
                        left: "20%",
                        top: "10%"
                    }}
                />
                
                <motion.div 
                    className="absolute h-32 w-32 rounded-full bg-purple-400/20"
                    animate={{
                        x: -mousePosition.x / 15,
                        y: -mousePosition.y / 15,
                        scale: [1.2, 1, 1.2],
                    }}
                    transition={{
                        scale: {
                            duration: 5,
                            repeat: Infinity,
                            repeatType: "reverse",
                        }
                    }}
                    style={{ 
                        filter: "blur(40px)",
                        right: "20%",
                        bottom: "0%"
                    }}
                />
                </div>

                {/* Logo with animation */}
                <Link href="/" className="relative">
                    <motion.span 
                        className="text-white font-bold text-2xl font-space-grotesk relative z-10"
                        variants={titleVariants}
                        initial="initial"
                        animate="animate"
                        whileHover="hover"
                    >
                        CV Genie
                        <motion.span 
                            className="absolute -bottom-1 left-0 h-1 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: "100%" }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                        />
                    </motion.span>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex gap-4 justify-center items-center relative z-10 overflow-visible">
                    {isAuthenticated ? (
                        <>
                            <motion.div
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <button onClick={Logout} className="text-black font-bold text-lg font-space-grotesk transition duration-200 border-[1.3px] bg-white px-2 py-2 w-[100px] rounded-lg hover:text-pink-400 shadow-lg hover:shadow-pink-300/20 hover:border-white hover:scale-105">Log Out</button>
                            </motion.div>
                            <motion.button 
                                className="px-2 py-3 w-[100px] flex justify-center bg-gradient-to-r from-pink-500 to-purple-600 rounded-lg text-white font-bold text-md shadow-lg hover:border-2 border-white hover:shadow-pink-500/30 transition-all duration-200"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <Link href="/upload" className="flex items-center">
                                Upload
                                </Link>
                            </motion.button>
                            <motion.div
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                className="relative overflow-visible"
                            >
                                <Link href="/dashboard" className="text-white w-[38px] transition duration-200 flex justify-center items-center rounded-full border-white border-[2px] hover:border-pink-500 shadow-black shadow-md hover:shadow-pink-500/40 hover:scale-105 overflow-visible">
                                    <div className="relative group overflow-visible">
                                        {avatar ? 
                                            <img src={avatar} width={38} height={38} className="object-cover object-center rounded-full" alt="User Avatar"/>
                                            :
                                            <div className="text-[34.98px] text-white/60"><FaCircleUser /></div>
                                        }
                                        <div className="absolute opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 bg-pink-700/20 backdrop-blur-xl text-white p-3 rounded-lg right-0 top-full mt-2 z-50 border border-white/10 shadow-lg min-w-[150px] pointer-events-none w-max">
                                            <p className="font-bold text-md">{userName}</p>
                                            <p className="text-sm text-gray-200">{useremail}</p>
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        </>
                    ) : (
                        <>
                            <motion.div
                                whileHover={{ scale: 1.05, x: 0 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <Link href="/signup" className="text-white font-bold text-lg font-space-grotesk hover:text-gray-300 transition duration-200 border-[1px] border-white px-3 py-2 rounded-lg">Sign Up</Link>
                            </motion.div>
                            <motion.div
                                whileHover={{ scale: 1.02, x: 0 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <Link href="/login" className="text-white font-bold text-lg font-space-grotesk hover:text-gray-300 transition duration-200">Login</Link>
                            </motion.div>
                        </>
                    )}
                </div>

                {/* Mobile Menu Toggle */}
                <div className="md:hidden relative z-10">
                    <motion.button
                        className="text-white text-2xl p-2"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? <RiCloseFill className="text-3xl" /> : <RiMenu3Fill className="text-3xl" />}
                    </motion.button>
                </div>
            </motion.nav>

            {/* Mobile Sidebar Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
                            initial="closed"
                            animate="open"
                            exit="closed"
                            variants={backdropVariants}
                            onClick={() => setIsMobileMenuOpen(false)}
                        />

                        {/* Sidebar */}
                        <motion.div
                            className="fixed right-0 top-0 bottom-0 w-[280px] bg-gradient-to-b from-pink-900/90 to-purple-900/90 backdrop-blur-xl z-50 shadow-xl border-l border-white/10 p-6 overflow-y-auto"
                            initial="closed"
                            animate="open"
                            exit="closed"
                            variants={sidebarVariants}
                        >
                            <div className="flex flex-col h-full">
                                <div className="flex justify-between items-center mb-10">
                                    <motion.span 
                                        className="text-white font-bold text-2xl font-space-grotesk"
                                        variants={titleVariants}
                                        initial="initial"
                                        animate="animate"
                                    >
                                        CV Genie
                                    </motion.span>
                                    <motion.button
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        <RiCloseFill className="text-white text-3xl" />
                                    </motion.button>
                                </div>

                                {/* Mobile Menu Content */}
                                <div className="flex flex-col gap-6">
                                    {isAuthenticated ? (
                                        <>
                                            {/* User Profile Section */}
                                            <div className="flex items-center gap-4 mb-6 p-4 bg-white/10 rounded-xl backdrop-blur-md">
                                                <div className="w-[50px] h-[50px] rounded-full border-2 border-pink-400 overflow-hidden flex-shrink-0">
                                                    {avatar ? (
                                                        <img 
                                                            src={avatar} 
                                                            className="w-full h-full object-cover" 
                                                            alt="User Avatar" 
                                                        />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center bg-purple-800">
                                                            <FaCircleUser className="text-white/80 text-3xl" />
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="overflow-hidden">
                                                    <p className="text-white font-semibold text-lg">{userName || 'User'}</p>
                                                    <p className="text-gray-300 text-sm truncate">{useremail || 'user@example.com'}</p>
                                                </div>
                                            </div>

                                            {/* Navigation Links */}
                                            <Link 
                                                href="/dashboard" 
                                                className="flex items-center gap-3 text-white text-lg p-3 rounded-lg hover:bg-white/10 transition-all"
                                                onClick={() => setIsMobileMenuOpen(false)}
                                            >
                                                <FaUser className="text-pink-400" />
                                                My Profile
                                            </Link>
                                            
                                            <Link 
                                                href="/upload" 
                                                className="flex items-center gap-3 font-sem text-white text-lg p-3 rounded-lg bg-gradient-to-r from-pink-600 to-purple-600 border-white border-[2px] transition-all"
                                                onClick={() => setIsMobileMenuOpen(false)}
                                            >
                                                <FaUpload className="text-white" />
                                                Upload CV
                                            </Link>
                                            
                                            <button 
                                                onClick={Logout} 
                                                className="flex items-center gap-3 text-black text-lg p-3 rounded-lg hover:bg-white/90 bg-white  transition-all mt-auto"
                                            >
                                                <FaSignOutAlt className="text-black" />
                                                Log Out
                                            </button>
                                        </>
                                    ) : (
                                        <>
                                            <Link 
                                                href="/login" 
                                                className="flex items-center justify-center gap-2 text-white font-semibold text-lg py-3 px-4 rounded-lg bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 transition-all"
                                                onClick={() => setIsMobileMenuOpen(false)}
                                            >
                                                Login
                                            </Link>
                                            
                                            <Link 
                                                href="/signup" 
                                                className="flex items-center justify-center gap-2 text-white font-semibold text-lg py-3 px-4 rounded-lg border border-white hover:bg-white/10 transition-all"
                                                onClick={() => setIsMobileMenuOpen(false)}
                                            >
                                                Sign Up
                                            </Link>
                                        </>
                                    )}
                                </div>

                                {/* Footer */}
                                <div className="mt-auto pt-6">
                                    <p className="text-white/50 text-sm text-center">© 2025 CV Genie</p>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );



export default Navbar;