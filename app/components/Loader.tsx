"use client"

import { useEffect, useState } from "react"

export default function Loader() {
    const [progress, setProgress] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress((prev) => (prev >= 100 ? 0 : prev + 1))
        }, 30)
        return () => clearInterval(interval)
    }, [])

    return (
        <div className="min-h-screen flex items-center justify-center relative">
            {/* Blur backdrop */}
            <div className="absolute inset-0 backdrop-blur-2xl bg-white/10"></div>

            {/* Main loader */}
            <div className="relative z-10 flex flex-col items-center gap-12">
                {/* Hexagonal spinner with particles */}
                <div className="relative w-48 h-48 flex items-center justify-center">
                    {/* Rotating hexagon */}
                    <svg className="absolute inset-0 w-full h-full animate-spin-slow" viewBox="0 0 100 100">
                        <defs>
                            <linearGradient id="hexGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#4daeb2" />
                                <stop offset="50%" stopColor="#27b2c6" />
                                <stop offset="100%" stopColor="#bfdbf7" />
                            </linearGradient>
                        </defs>
                        <polygon 
                            points="50,10 90,30 90,70 50,90 10,70 10,30" 
                            fill="none" 
                            stroke="url(#hexGradient)" 
                            strokeWidth="2"
                            opacity="0.6"
                        />
                    </svg>

                    {/* Inner rotating hexagon - opposite direction */}
                    <svg className="absolute inset-6 w-5/6 h-5/6 animate-spin-reverse" viewBox="0 0 100 100">
                        <polygon 
                            points="50,10 90,30 90,70 50,90 10,70 10,30" 
                            fill="none" 
                            stroke="#1f7a8c" 
                            strokeWidth="3"
                            opacity="0.8"
                        />
                    </svg>

                    {/* Orbiting particles */}
                    <div className="absolute inset-0">
                        <div className="absolute top-0 left-1/2 w-3 h-3 bg-accent-500 rounded-full animate-orbit-1 shadow-lg shadow-accent-500/50"></div>
                        <div className="absolute top-0 left-1/2 w-2.5 h-2.5 bg-primary-500 rounded-full animate-orbit-2 shadow-lg shadow-primary-500/50"></div>
                        <div className="absolute top-0 left-1/2 w-2 h-2 bg-light-700 rounded-full animate-orbit-3 shadow-lg shadow-light-700/50"></div>
                    </div>

                    {/* Center glow */}
                    <div className="relative flex flex-col items-center gap-2">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary-500 via-accent-500 to-light-600 animate-pulse-glow flex items-center justify-center shadow-2xl">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-700 via-accent-700 to-primary-800 flex items-center justify-center">
                                <div className="text-light-100 font-bold text-xl">{progress}%</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Loading text with shimmer effect */}
                <div className="text-center space-y-4">
                    <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary-600 via-accent-500 to-light-700 bg-clip-text text-transparent animate-shimmer bg-[length:200%_100%]">
                        Loading
                    </h2>
                    
                    {/* Progress track */}
                    <div className="w-72 md:w-96 mx-auto space-y-2">
                        <div className="h-2 bg-primary-200/30 rounded-full overflow-hidden backdrop-blur-sm shadow-inner">
                            <div 
                                className="h-full bg-gradient-to-r from-primary-600 via-accent-500 to-light-600 rounded-full transition-all duration-300 ease-out shadow-lg"
                                style={{ width: `${progress}%` }}
                            ></div>
                        </div>
                        <p className="text-primary-700 text-sm font-medium">
                            Please wait while we prepare everything...
                        </p>
                    </div>
                </div>

                {/* Floating dots */}
                <div className="flex gap-3">
                    <div className="w-3 h-3 bg-primary-600 rounded-full animate-bounce-1 shadow-lg"></div>
                    <div className="w-3 h-3 bg-accent-600 rounded-full animate-bounce-2 shadow-lg"></div>
                    <div className="w-3 h-3 bg-light-800 rounded-full animate-bounce-3 shadow-lg"></div>
                    <div className="w-3 h-3 bg-primary-500 rounded-full animate-bounce-4 shadow-lg"></div>
                </div>
            </div>

            <style jsx>{`
                @keyframes spin-slow {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                @keyframes spin-reverse {
                    from { transform: rotate(360deg); }
                    to { transform: rotate(0deg); }
                }
                @keyframes orbit-1 {
                    from { transform: rotate(0deg) translateX(96px) rotate(0deg); }
                    to { transform: rotate(360deg) translateX(96px) rotate(-360deg); }
                }
                @keyframes orbit-2 {
                    from { transform: rotate(120deg) translateX(96px) rotate(-120deg); }
                    to { transform: rotate(480deg) translateX(96px) rotate(-480deg); }
                }
                @keyframes orbit-3 {
                    from { transform: rotate(240deg) translateX(96px) rotate(-240deg); }
                    to { transform: rotate(600deg) translateX(96px) rotate(-600deg); }
                }
                @keyframes pulse-glow {
                    0%, 100% { box-shadow: 0 0 20px rgba(77, 174, 178, 0.5), 0 0 40px rgba(39, 178, 198, 0.3); }
                    50% { box-shadow: 0 0 30px rgba(77, 174, 178, 0.8), 0 0 60px rgba(39, 178, 198, 0.5); }
                }
                @keyframes shimmer {
                    0% { background-position: -200% 0; }
                    100% { background-position: 200% 0; }
                }
                @keyframes bounce-1 {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-12px); }
                }
                @keyframes bounce-2 {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-12px); }
                }
                @keyframes bounce-3 {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-12px); }
                }
                @keyframes bounce-4 {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-12px); }
                }
                .animate-spin-slow {
                    animation: spin-slow 4s linear infinite;
                }
                .animate-spin-reverse {
                    animation: spin-reverse 3s linear infinite;
                }
                .animate-orbit-1 {
                    animation: orbit-1 3s linear infinite;
                }
                .animate-orbit-2 {
                    animation: orbit-2 3s linear infinite;
                }
                .animate-orbit-3 {
                    animation: orbit-3 3s linear infinite;
                }
                .animate-pulse-glow {
                    animation: pulse-glow 2s ease-in-out infinite;
                }
                .animate-shimmer {
                    animation: shimmer 3s linear infinite;
                }
                .animate-bounce-1 {
                    animation: bounce-1 1s ease-in-out infinite;
                }
                .animate-bounce-2 {
                    animation: bounce-2 1s ease-in-out 0.2s infinite;
                }
                .animate-bounce-3 {
                    animation: bounce-3 1s ease-in-out 0.4s infinite;
                }
                .animate-bounce-4 {
                    animation: bounce-4 1s ease-in-out 0.6s infinite;
                }
            `}</style>
        </div>
    )
}