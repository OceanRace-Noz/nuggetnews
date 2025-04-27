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
    <section className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5 ${className}`}>
      {features.map((feature, index) => (
        <div key={index} className="flex flex-col items-center gap-2.5">
          <img 
            src={feature.icon} 
            alt={`${feature.title} Icon`} 
            className="w-[50px] h-[50px] sm:w-[60px] sm:h-[60px] rounded-[50px] border-[0.5px] border-solid border-[#F2EFEF]" 
          />
          <h3 className="text-white text-center font-normal text-sm sm:text-base">
            {feature.title}
          </h3>
        </div>
      ))}
    </section>
  );
};
