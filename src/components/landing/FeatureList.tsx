
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
  return <section className={`grid grid-cols-2 md:flex justify-between gap-6 md:gap-5 px-6 md:px-0 w-full max-w-[600px] mx-auto ${className}`}>
      {/* First two features in a row */}
      <div className="grid grid-cols-2 col-span-2 gap-6 md:hidden">
        {features.slice(0, 2).map((feature, index) => <div key={index} className="flex flex-col items-center gap-2.5">
            <img src={feature.icon} alt={`${feature.title} Icon`} className="w-[50px] h-[50px] md:w-[60px] md:h-[60px] rounded-[50px] border-[0.5px] border-solid border-[#F2EFEF]" />
            <h3 className="text-white text-center font-fredoka font-normal text-sm md:text-base">
              {feature.title}
            </h3>
          </div>)}
      </div>
      {/* Last feature centered below */}
      <div className="col-span-2 flex justify-center md:hidden my-0">
        {features.slice(2, 3).map((feature, index) => <div key={index} className="flex flex-col items-center gap-2.5">
            <img src={feature.icon} alt={`${feature.title} Icon`} className="w-[50px] h-[50px] md:w-[60px] md:h-[60px] rounded-[50px] border-[0.5px] border-solid border-[#F2EFEF]" />
            <h3 className="text-white text-center font-fredoka font-normal text-sm md:text-base">
              {feature.title}
            </h3>
          </div>)}
      </div>
      {/* Desktop layout */}
      <div className="hidden md:flex md:justify-between md:w-full md:gap-5">
        {features.map((feature, index) => <div key={index} className="flex flex-col items-center gap-2.5 md:w-full">
            <img src={feature.icon} alt={`${feature.title} Icon`} className="w-[50px] h-[50px] md:w-[60px] md:h-[60px] rounded-[50px] border-[0.5px] border-solid border-[#F2EFEF]" />
            <h3 className="text-white text-center font-fredoka font-normal text-sm md:text-base">
              {feature.title}
            </h3>
          </div>)}
      </div>
    </section>;
};
