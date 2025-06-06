
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
        href="https://fonts.googleapis.com/css2?family=Unbounded:wght@300;400;500&family=Fredoka:wght@300;400;500&display=swap"
        rel="stylesheet"
      />
      <style dangerouslySetInnerHTML={{
        __html: `
          .font-fredoka {
            font-family: 'Fredoka', sans-serif;
          }
        `
      }} />
      <main className="relative w-full min-h-[120vh] flex flex-col items-center justify-start mx-auto">
        <div className="fixed inset-0 bg-[radial-gradient(circle_at_bottom,#E7AB31_0%,#0C0C36_100%)] -z-10" />
        <Header />

        <div className="flex flex-col items-center gap-4 md:gap-6 mt-10 md:mt-[50px] w-full">
          <Hero />
          
          <h2 className="text-[#C8C8C9] text-center font-medium leading-6 px-6">
            <span className="text-sm md:text-lg font-fredoka w-full max-w-[600px] block mx-auto">
              <span className="font-light">Trag dich jetzt in die Warteliste ein und sei unter den Ersten, die </span> 
              <span className="text-[#E7AB31]">Nugget</span>
              <span className="font-light"> ausprobieren.</span>
            </span>
          </h2>

          <section className="flex flex-col items-center gap-4 w-full">
            <EmailSignupForm />
          </section>

          <FeatureList features={features} className="gap-6 md:gap-8 mt-8 md:mt-12" />
        </div>
      </main>
    </>
  );
}
