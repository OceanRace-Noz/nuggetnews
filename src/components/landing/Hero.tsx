
import React from "react";

interface HeroProps {
  className?: string;
}

export const Hero: React.FC<HeroProps> = ({ className }) => {
  return (
    <section className={`flex flex-col items-center px-6 w-full ${className}`}>
      <h1 className="text-[#E4E4E4] text-center font-medium max-w-[720px] mb-4">
        <span className="block text-2xl md:text-3xl mb-6">Wie ein Nugget</span>
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
