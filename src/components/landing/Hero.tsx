
import React from "react";

interface HeroProps {
  className?: string;
}

export const Hero: React.FC<HeroProps> = ({ className }) => {
  return (
    <section className={`flex flex-col items-center w-full px-6 ${className}`}>
      <div className="w-full max-w-[720px]">
        <h1 className="font-unbounded text-[32px] sm:text-[48px] leading-tight text-[#F2EFEF] text-center mb-4">
          Kompakte News für deinen Alltag.
        </h1>
        <h2 className="text-[rgba(228,228,228,1)] text-center text-sm sm:text-xl font-medium leading-6">
          Trag dich jetzt ein und sei unter den Ersten, die Nugget ausprobieren.
        </h2>
      </div>
    </section>
  );
};
