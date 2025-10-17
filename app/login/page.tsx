"use client";

import { useState } from "react";
import { Mail, Lock } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import CustomInput from "../components/CustomInput";
import { toast } from "../components/ToastContainer";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("admin@example.com");
  const [password, setPassword] = useState("admin123");
  const [rememberMe, setRememberMe] = useState(false);

  const date = new Date();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === "admin@example.com" && password === "admin123") {
      toast.success("Login successful! Redirecting to dashboard...");
      router.push("/dashboard");
    } else {
      toast.error("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-light-700 via-light-600 to-light-500 grid grid-cols-1 md:grid-cols-2">
      <div className="min-h-screen flex justify-center items-center p-4">
        <form
          onSubmit={handleLogin}
          className="w-full max-w-md rounded-2xl shadow-lg p-6 md:p-8 flex flex-col bg-white/80 backdrop-blur-sm animate-[fadeIn_0.6s_ease-out]"
          style={{
            animation: 'fadeIn 0.6s ease-out, slideUp 0.6s ease-out'
          }}
        >
          <div className="mb-6 text-center animate-[fadeIn_0.8s_ease-out]">
            <h1 className="text-2xl md:text-3xl font-bold text-primary-700">Welcome Back</h1>
            <p className="text-base md:text-lg text-accent-600 mt-1">
              Enter your email & password to sign in
            </p>
          </div>

          <div className="mb-4 animate-[fadeIn_1s_ease-out]">
            <label className="block text-sm font-medium text-primary-800 mb-1">Email:</label>
            <CustomInput
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              icon={<Mail size={20} />}
            />
          </div>

          <div className="mb-4 animate-[fadeIn_1.2s_ease-out]">
            <label className="block text-sm font-medium text-primary-800 mb-1">Password:</label>
            <CustomInput
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              icon={<Lock size={20} />}
              showPasswordToggle
            />
          </div>

          <div className="flex items-center mb-4 text-sm animate-[fadeIn_1.4s_ease-out]">
            <label className="flex items-center text-primary-700 cursor-pointer">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded border-primary-300 text-accent-600 focus:ring-2 focus:ring-accent-600 mr-2"
              />
              Remember me
            </label>
          </div>

          <button
            type="submit"
            className="bg-gradient-to-r from-primary-700 to-primary-800 w-full rounded-lg py-2.5 text-white font-bold hover:from-primary-600 hover:to-primary-700 transition-all transform hover:scale-[1.02] active:scale-[0.98] animate-[fadeIn_1.6s_ease-out]"
          >
            Sign In
          </button>

          <p className="text-center mt-6 text-primary-700 font-semibold text-sm animate-[fadeIn_1.8s_ease-out]">
            © {date.getFullYear()} Duo Digital Prints. All rights reserved.
          </p>
        </form>
      </div>

      <div className="bg-gradient-to-br from-primary-700 via-primary-800 to-accent-700 justify-center p-4 items-center hidden md:flex relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl animate-[pulse_4s_ease-in-out_infinite]"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent-400 rounded-full blur-3xl animate-[pulse_6s_ease-in-out_infinite]"></div>
        </div>
        <div className="text-white text-6xl font-bold z-10 animate-[fadeIn_1s_ease-out]">
          <Image 
          src="/images/logo-1.png"
          alt="Logo"
          width={600}
          height={400}
        />
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes slideUp {
          from {
            transform: translateY(20px);
          }
          to {
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}