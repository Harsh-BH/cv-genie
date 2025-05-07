'use client'

import Link from "next/link";
import { getCookie } from 'cookies-next';
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaCircleUser } from "react-icons/fa6";

const Navbar = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [hydrated, setHydrated] = useState(false);
    const [avatar, setAvatar] = useState('');
    const [userName, setUserName] = useState('');
    const [useremail, setUseremail] = useState('');
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

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

    if(!hydrated) return null; // Prevents hydration issues

    return (
        <div className="p-2 absolute z-50 w-full flex justify-center items-center">
            <motion.nav 
                className="flex h-[80px] w-full max-w-[2000px] bg-pink-700/10 rounded-2xl backdrop-blur-2xl shadow-md items-center justify-between px-8 border-white/10 border-1 overflow-visible"
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
            >
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

                <div className="flex gap-4 justify-center items-center relative z-10 overflow-visible">
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
                                            <img src={avatar} width={38} height={38} className="object-cover object-center rounded-full"/>
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
            </motion.nav>
        </div>
    );
}

export default Navbar;