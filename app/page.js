import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Collections from "@/components/Collections";
import Products from "@/components/Products";
import Why from "@/components/Why";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Gallery from "@/components/Gallery";
import Testimonials from "@/components/Testimonials";
import Marquee from "@/components/Marquee";
import { SmoothScroll, ScrollProgress } from "@/components/fx";

export default function Home() {
  return (
    <>
      <SmoothScroll />
      <ScrollProgress />
      <Header />
      <main>
        <Hero />
        <Marquee />
        <Collections />
        <Products />
        <Why />
        <About />
        <Gallery />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
