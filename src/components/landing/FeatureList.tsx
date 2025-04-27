
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
    <section className={`grid grid-cols-2 md:flex gap-6 md:gap-5 px-6 md:px-0 ${className}`}>
      <div className="col-span-2 md:col-span-1 flex justify-center md:block">
        {features.slice(0, 2).map((feature, index) => (
          <div key={index} className="flex flex-col items-center gap-2.5 mx-3 md:mx-0">
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
      </div>
      {features.length > 2 && (
        <div className="col-span-2 flex justify-center md:block">
          <div className="flex flex-col items-center gap-2.5">
            <img 
              src={features[2].icon} 
              alt={`${features[2].title} Icon`} 
              className="w-[50px] h-[50px] md:w-[60px] md:h-[60px] rounded-[50px] border-[0.5px] border-solid border-[#F2EFEF]" 
            />
            <h3 className="text-white text-center font-normal text-sm md:text-base">
              {features[2].title}
            </h3>
          </div>
        </div>
      )}
    </section>
  );
};
