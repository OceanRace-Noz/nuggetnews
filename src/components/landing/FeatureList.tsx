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
  className,
}) => {
  return (
    <section
      className={`flex gap-5 max-md:flex-col max-md:gap-[15px] max-sm:flex-col max-sm:gap-2.5 ${className}`}
    >
      {features.map((feature, index) => (
        <div key={index} className="flex flex-col items-center gap-2.5">
          <img
            src={feature.icon}
            alt={`${feature.title} Icon`}
            className="w-[60px] h-[60px] rounded-[50px] border-[0.5px] border-solid border-[#F2EFEF]"
          />
          <h3 className="text-white text-center text-2xl font-normal">
            {feature.title}
          </h3>
        </div>
      ))}
    </section>
  );
};
