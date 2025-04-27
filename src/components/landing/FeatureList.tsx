
import React from "react";

interface Feature {
  icon: string;
  title: string;
}

interface FeatureListProps {
  features: Feature[];
  className?: string;
}

export const FeatureList: React.FC<FeatureListProps> = ({
  features,
  className
}) => {
  return (
    <section className={`grid grid-cols-1 md:flex gap-6 md:gap-5 px-6 md:px-0 ${className}`}>
      {features.map((feature, index) => (
        <div key={index} className="flex flex-col items-center gap-2.5">
          <img 
            src={feature.icon} 
            alt={`${feature.title} Icon`} 
            className="w-[50px] h-[50px] md:w-[60px] md:h-[60px] rounded-[50px] border-[0.5px] border-solid border-[#F2EFEF]" 
          />
          <h3 className="text-white text-center font-normal text-sm md:text-base">
            {feature.title}
          </h3>
        </div>
      ))}
    </section>
  );
};
