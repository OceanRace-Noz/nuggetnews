
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
    <section className={`flex gap-4 justify-center flex-wrap px-4 ${className}`}>
      {features.map((feature, index) => (
        <div key={index} className="flex flex-col items-center gap-2">
          <img 
            src={feature.icon} 
            alt={`${feature.title} Icon`} 
            className="w-[45px] h-[45px] md:w-[60px] md:h-[60px] rounded-[50px] border-[0.5px] border-solid border-[#F2EFEF]" 
          />
          <h3 className="text-white text-center font-normal text-xs md:text-sm">
            {feature.title}
          </h3>
        </div>
      ))}
    </section>
  );
};
