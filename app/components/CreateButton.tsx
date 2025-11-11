"use client";

import React from "react";

interface ButtonProps {
  label: string;
  icon: React.ReactNode;
  onClick?: () => void;
  gradient?: string;
  className?: string;
}

export default function CreateButton({
  label,
  icon,
  onClick,
  gradient = "from-accent-600 to-accent-500",
  className,
}: ButtonProps) {
  const defaultClasses = `
    bg-gradient-to-r ${gradient} text-white px-4 py-2 rounded 
    hover:from-accent-700 hover:to-accent-600 transition-all duration-200 
    hover:scale-110 flex flex-row justify-center items-center font-semibold 
    text-sm md:text-base
  `;

  return (
    <button
      className={className ? className : defaultClasses}
      onClick={onClick}
    >
      <div className="px-1">{icon}</div>
      {label}
    </button>
  );
}
