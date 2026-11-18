import { LogoReveal } from "@/components/ui/logo-reveal";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Hero } from "@/components/sections/hero";
import { Services } from "@/components/sections/services";
import { Process } from "@/components/sections/process";
import { Gallery } from "@/components/sections/gallery";
import { About } from "@/components/sections/about";
import { Testimonials } from "@/components/sections/testimonials";
import { Contact } from "@/components/sections/contact";
import { WhatsAppFAB } from "@/components/ui/whatsapp-fab";

export default function HomePage() {
  return (
    <>
      <LogoReveal src="/brand/logo.png" alt="PsekPisos" background="#0B0B0C" />
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Process />
        <Gallery />
        <About />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
      <WhatsAppFAB />
    </>
  );
}
