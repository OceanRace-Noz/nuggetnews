
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
    <section className={`grid grid-cols-1 gap-8 w-full ${className}`}>
      {features.map((feature, index) => (
        <div key={index} className="flex flex-col items-center gap-3">
          <div className="w-[60px] h-[60px] rounded-full border border-[#F2EFEF] flex items-center justify-center">
            <img 
              src={feature.icon} 
              alt={`${feature.title} Icon`}
              className="w-8 h-8 object-contain" 
            />
          </div>
          <h3 className="text-white text-center font-normal text-base">
            {feature.title}
          </h3>
        </div>
      ))}
    </section>
  );
};
