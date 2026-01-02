import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import Lenis from "lenis";
import Hero from "./Components/Hero";
import Navbar from "./Components/Navbar";
import Yo from "./Components/Yo";

gsap.registerPlugin(ScrollTrigger);

const App = () => {
  const rafRef = useRef(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
      syncTouch: true, // Add this for better touch sync
      touchInertiaMultiplier: 35, // Add this for better touch physics
    });

    // Connect Lenis with ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);

    const ticker = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(ticker);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(ticker);
    };
  }, []);

  return (
    <main>
      <Navbar />
      <Hero />
      {/* <Yo /> */}
    </main>
  );
};

export default App;
