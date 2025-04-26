
import React from "react";

interface HeaderProps {
  className?: string;
}

export const Header: React.FC<HeaderProps> = ({ className }) => {
  return (
    <header
      className={`flex items-center justify-center w-4/5 max-w-[1200px] mt-5 max-md:flex-col max-md:items-center max-sm:flex-row max-sm:justify-center max-sm:w-[90%] ${className}`}
    >
      <img 
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/3cdecd34ea3c5a897195254b4326a771dabb57fc?placeholderIfAbsent=true" 
        alt="Nugget logo" 
        className="w-[150px] h-[41px] object-contain" 
      />
    </header>
  );
};
