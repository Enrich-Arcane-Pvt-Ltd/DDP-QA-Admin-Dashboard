import { Search } from "lucide-react";

interface SearchBarProps {
  placeholder?: string;
  onChange?: (value: string) => void;
  className?: string;
}

export default function SearchBar({ placeholder = "Search...", onChange, className = "" }: SearchBarProps) {
  return (
    <div className={`relative w-72 ${className}`}>
      <Search size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-primary-500" />
      <input
        type="text"
        placeholder={placeholder}
        onChange={(e) => onChange && onChange(e.target.value)}
        className="w-full pl-10 pr-4 py-2 border-2 border-primary-200 rounded-lg text-primary-900 placeholder:text-primary-400 focus:outline-none focus:border-accent-600 focus:ring-2 focus:ring-accent-100 transition-all"
      />
    </div>
  );
}