
import React from "react";

interface HeaderProps {
  className?: string;
}

export const Header: React.FC<HeaderProps> = ({ className }) => {
  return (
    <header
      className={`flex items-center justify-center w-full max-w-[1200px] mt-4 sm:mt-5 px-4 sm:px-0 ${className}`}
    >
      <img 
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/3cdecd34ea3c5a897195254b4326a771dabb57fc?placeholderIfAbsent=true" 
        alt="Nugget logo" 
        className="w-[120px] sm:w-[150px] h-auto object-contain" 
      />
    </header>
  );
};
