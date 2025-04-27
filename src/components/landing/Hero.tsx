
import React from "react";

interface HeroProps {
  className?: string;
}

export const Hero: React.FC<HeroProps> = ({ className }) => {
  return (
    <section className={`flex flex-col items-center px-6 w-full ${className}`}>
      <h1 className="text-[#E4E4E4] text-center font-medium max-w-[720px] mb-4">
        <span className="block text-2xl md:text-3xl mb-6">
          Wie ein Nugget
          <img 
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/e95bb7b780e81ba3af2654640ef8af854a3d56d2?placeholderIfAbsent=true" 
            alt="Nugget" 
            className="inline-block ml-2 w-[45px] h-[45px] md:w-[60px] md:h-[60px] rounded-[50px] border-[0.5px] border-solid border-[#F2EFEF]"
          />
        </span>
        <span className="block text-3xl md:text-5xl leading-tight">
          Kompakte News für deinen Alltag.
        </span>
      </h1>
      <h2 className="text-[rgba(228,228,228,1)] text-center text-base md:text-xl font-medium leading-6 mt-4">
        <span className="font-light">
          Trag dich jetzt ein und sei unter den Ersten, die Nugget ausprobieren.
        </span>
      </h2>
    </section>
  );
};
