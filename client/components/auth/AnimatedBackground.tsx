"use client";

import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";

export function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme, systemTheme } = useTheme();
  const [currentTheme, setCurrentTheme] = useState<"light" | "dark">("light");
  
  // Determine if we're in dark mode
  useEffect(() => {
    const isDark = 
      theme === "dark" || 
      (theme === "system" && systemTheme === "dark");
    
    setCurrentTheme(isDark ? "dark" : "light");
  }, [theme, systemTheme]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      canvas!.width = window.innerWidth;
      canvas!.height = window.innerHeight;
    };

    setCanvasDimensions();
    window.addEventListener("resize", setCanvasDimensions);

    // Create particles class with proper TypeScript definitions
    class Particle {
      // Define class properties
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;

      constructor() {
        this.x = Math.random() * canvas!.width;
        this.y = Math.random() * canvas!.height;
        this.size = Math.random() * 5 + 1;
        this.speedX = Math.random() * 1 - 0.5;
        this.speedY = Math.random() * 1 - 0.5;
        
        // Higher base opacity for more visibility
        const opacity = Math.random() * 0.4 + 0.3; // 0.3 to 0.7
        
        // More vibrant colors for both themes
        this.color = currentTheme === "dark" 
          ? `rgba(192, 132, 252, ${opacity})` // Bright vibrant purple for dark theme
          : `rgba(31, 41, 55, ${opacity})`; // Dark gray for light theme
      }

      update(): void {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.size > 0.2) this.size -= 0.01;

        if (this.x < 0 || this.x > canvas!.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas!.height) this.speedY *= -1;
      }

      draw(): void {
        ctx!.fillStyle = this.color;
        ctx!.beginPath();
        ctx!.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx!.fill();
      }
    }

    // Create particle array
    const particlesArray: Particle[] = [];
    const numberOfParticles = Math.min(100, Math.floor((canvas!.width * canvas!.height) / 10000));
    
    for (let i = 0; i < numberOfParticles; i++) {
      particlesArray.push(new Particle());
    }

    // Connect particles within a certain distance
    function connect() {
      const maxDistance = 150;
      
      for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a; b < particlesArray.length; b++) {
          const dx = particlesArray[a].x - particlesArray[b].x;
          const dy = particlesArray[a].y - particlesArray[b].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < maxDistance) {
            // Increase the opacity factor for more visible connections
            const opacity = (1 - distance / maxDistance) * 0.5; // Increased from 0.2 to 0.5
            
            ctx!.strokeStyle = currentTheme === "dark"
              ? `rgba(192, 132, 252, ${opacity})` // Bright vibrant purple for dark theme
              : `rgba(31, 41, 55, ${opacity})`; // Dark gray for light theme
            
            ctx!.lineWidth = 1.5; // Slightly thicker lines for visibility
            ctx!.beginPath();
            ctx!.moveTo(particlesArray[a].x, particlesArray[a].y);
            ctx!.lineTo(particlesArray[b].x, particlesArray[b].y);
            ctx!.stroke();
          }
        }
      }
    }

    // Animation loop
    function animate() {
      ctx!.clearRect(0, 0, canvas!.width, canvas!.height);
      
      particlesArray.forEach(particle => {
        particle.update();
        particle.draw();
      });
      
      connect();
      requestAnimationFrame(animate);
    }

    animate();

    return () => {
      window.removeEventListener("resize", setCanvasDimensions);
    };
  }, [currentTheme]); // Re-initialize when theme changes

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 z-0 opacity-100" // Increased from opacity-70 to opacity-80
      style={{ pointerEvents: "none" }}
    />
  );
}