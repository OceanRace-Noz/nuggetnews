
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
    <section className={`flex gap-5 px-6 sm:px-0 w-full justify-center ${className}`}>
      <div className="flex gap-4 sm:gap-5">
        {features.map((feature, index) => (
          <div key={index} className="flex flex-col items-center gap-2">
            <img 
              src={feature.icon} 
              alt={`${feature.title} Icon`} 
              className="w-[40px] h-[40px] sm:w-[60px] sm:h-[60px] rounded-[50px] border-[0.5px] border-solid border-[#F2EFEF]" 
            />
            <h3 className="text-white text-center font-normal text-xs sm:text-sm">
              {feature.title}
            </h3>
          </div>
        ))}
      </div>
    </section>
  );
};
