"use client";

import React from "react";

interface ButtonProps {
  label: string;
  icon: React.ReactNode;
  onClick?: () => void;
  gradient?: string; // optional override
}

export default function CreateButton({
  label,
  icon,
  onClick,
  gradient = "from-accent-600 to-accent-500"
}: ButtonProps) {
  return (
    <button
      className={`bg-gradient-to-r ${gradient} text-white px-4 py-2 rounded 
        hover:from-accent-700 hover:to-accent-600 transition-all duration-200 
        hover:scale-110 flex flex-row justify-center items-center font-semibold 
        text-sm md:text-base`}
      onClick={onClick}
    >
      <div className="px-1">{icon}</div>
      {label}
    </button>
  );
}
