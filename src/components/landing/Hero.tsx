
import React from "react";

interface HeroProps {
  className?: string;
}

export const Hero: React.FC<HeroProps> = ({
  className
}) => {
  return (
    <section className={`flex flex-col items-center ${className}`}>
      <div>
        <div dangerouslySetInnerHTML={{
          __html: '<svg id="209:942" width="720" height="209" viewBox="0 0 720 209" fill="none" xmlns="http://www.w3.org/2000/svg" class="nugget-svg" style="width: 720px; height: 209px"> <g filter="url(#filter0_df_209_942)"> <rect width="157.974" height="57.6633" rx="4" transform="matrix(0.996162 -0.0875249 0.0665667 0.997782 357 15.8267)" fill="#C7881F"></rect> <rect width="157.974" height="57.6633" rx="4" transform="matrix(0.996162 -0.0875249 0.0665667 0.997782 357 15.8267)" stroke="#A5631D" stroke-width="2" stroke-dasharray="1 1"></rect> </g> <g filter="url(#filter1_d_209_942)"> </g> <defs> <filter id="filter0_df_209_942" x="352.259" y="0.832947" width="170.689" height="81.1962" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"> <feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood> </defs> </svg>'
        }} />
      </div>
      <div className="text-center mt-4">
        <h2 className="text-[rgba(228,228,228,1)] text-xl font-medium leading-6">
          Wie ein Nugget
        </h2>
        <h1 className="text-[#F2EFEF] text-4xl font-unbounded font-bold tracking-wide leading-tight mt-4">
          Kompakte News für 
          <br />
          deinen Alltag.
        </h1>
        <p className="text-[rgba(228,228,228,1)] text-sm font-light mt-4">
          Trag dich jetzt ein und sei unter den Ersten, die Nugget ausprobieren.
        </p>
      </div>
    </section>
  );
};
