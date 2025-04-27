
import React from "react";
import { Header } from "@/components/landing/Header";
import { Hero } from "@/components/landing/Hero";
import { EmailSignupForm } from "@/components/landing/EmailSignupForm";
import { FeatureList } from "@/components/landing/FeatureList";

const features = [
  {
    icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/e95bb7b780e81ba3af2654640ef8af854a3d56d2?placeholderIfAbsent=true",
    title: "Keine Werbung.",
  },
  {
    icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/08915bbf9581738952f0ea89d20423d0911e5d6d?placeholderIfAbsent=true",
    title: "Kein Clickbait.",
  },
  {
    icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/c084db25bae95b8f2243947bf4c10d65ce6df73d?placeholderIfAbsent=true",
    title: "Nur das, was zählt.",
  },
];

export default function Index() {
  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Unbounded:wght@300;400;500&family=Fredoka:wght@400;500&display=swap"
        rel="stylesheet"
      />
      <main className="relative max-w-none w-full min-h-screen flex flex-col items-center justify-center mx-auto">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,#E7AB31_0%,#1C1C1E_100%)] -z-10" />
        <Header />

        <div className="flex flex-col items-center gap-1 md:gap-4 mt-10 md:mt-[50px] w-full max-w-[1200px]">
          <Hero />
          <EmailSignupForm className="w-full md:max-w-[800px] mx-auto mt-0 md:mt-4" />
          <FeatureList features={features} className="mt-6 md:mt-[30px]" />
        </div>
      </main>
    </>
  );
}
