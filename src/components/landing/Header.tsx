import React from "react";
interface HeaderProps {
  className?: string;
}
export const Header: React.FC<HeaderProps> = ({
  className
}) => {
  return <header className={`flex items-center justify-between w-[90%] md:w-4/5 max-w-[1200px] mt-5 ${className}`}>
      <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/3cdecd34ea3c5a897195254b4326a771dabb57fc?placeholderIfAbsent=true" alt="Nugget logo" className="w-[120px] md:w-[150px] h-auto object-contain" />
      <div className="border border-[#E4E4E4] rounded-full px-4 py-2 text-sm text-white">
        Coming soon
      </div>
    </header>;
};