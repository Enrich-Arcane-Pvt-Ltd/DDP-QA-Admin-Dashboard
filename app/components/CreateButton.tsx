"use client";

import React from "react";

interface ButtonProps {
  label: string,
  icon: React.ReactNode
}

export default function CreateButton({ label, icon} : ButtonProps) {
  return (
    <button 
      className="bg-primary-700 text-white px-4 py-2 rounded hover:bg-accent-600 flex flex-row justify-center items-center font-semibold text-sm md:text-base"
    >
      {icon}
      {label}
    </button>
  );
}
