import { Contact } from "@/components/Contact";
import { FinalCta } from "@/components/FinalCta";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Memory } from "@/components/Memory";
import { Nav } from "@/components/Nav";
import { Product } from "@/components/Product";
import { Trust } from "@/components/Trust";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Product />
        <Memory />
        <Trust />
        <FinalCta />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
