
import React from "react";

export const Hero = () => {
  return (
    <div className="flex flex-col items-center text-center px-4 max-w-[800px]">
      <h1 className="text-5xl font-bold mb-4 max-md:text-[32px] max-sm:text-[28px]">
        Dein Persönlicher News-Assistent
      </h1>
      <p className="text-2xl text-[rgba(169,169,169,1)] mb-6 max-md:text-xl max-sm:text-lg">
        Trag dich jetzt ein und sei unter den Ersten, die Nugget ausprobieren.
      </p>
    </div>
  );
};
