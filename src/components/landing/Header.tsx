
import React from "react";

interface HeaderProps {
  className?: string;
}

export const Header: React.FC<HeaderProps> = ({ className }) => {
  return (
    <header
      className={`flex items-center justify-between w-4/5 max-w-[1200px] mt-5 max-md:flex-col max-md:items-center max-sm:flex-row max-sm:justify-between max-sm:w-[90%] ${className}`}
    >
      <img 
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/3cdecd34ea3c5a897195254b4326a771dabb57fc?placeholderIfAbsent=true" 
        alt="Nugget logo" 
        className="w-[150px] h-[41px] object-contain" 
      />
      <nav className="flex gap-[50px] max-md:gap-[30px] max-sm:hidden">
        <a
          href="#"
          className="text-[rgba(169,169,169,1)] text-xl font-light tracking-[0.4px] hover:text-white transition-colors"
        >
          Home
        </a>
        <a
          href="#"
          className="text-[rgba(169,169,169,1)] text-xl font-light tracking-[0.4px] hover:text-white transition-colors"
        >
          Funktionen
        </a>
        <a
          href="#"
          className="text-[rgba(169,169,169,1)] text-xl font-light tracking-[0.4px] hover:text-white transition-colors"
        >
          Preise
        </a>
      </nav>
    </header>
  );
};

