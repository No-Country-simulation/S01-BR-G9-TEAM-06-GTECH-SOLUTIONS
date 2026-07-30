import { Footer } from "../../components/landing/Footer";
import { Hero } from "../../components/landing/Hero";
import { HowItWorks } from "../../components/landing/HowItWorks";
import { Navbar } from "../../components/landing/Navbar";
import { Technologies } from "../../components/landing/Technologies";

export function Landing() {
  return (
    <>
      <Navbar />
      <Hero />
      <HowItWorks />
      <Technologies />
      <Footer />
    </>
  );
}