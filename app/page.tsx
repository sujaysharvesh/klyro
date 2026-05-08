"use client";

import { useState, useEffect } from "react";
import { Navbar }       from "@/components/Navbar";
import { HeroSection }  from "@/components/HeroSection";
import { HeroImage }    from "@/components/HeroImage";
import { MenuOverlay }  from "@/components/MenuOverlay";
import BrandsPage from "./brandPage";
import SmoothScroll from "./SmoothScroll";
import { ServicesSection } from "./ServicesSection";
import ResultsPage from "./ResultsPage";
import CreativeShowcase from "./CreativeShowcase";
import AboutPage from "./Abount";

const MENU_LINKS = [
  { name: "Work",        sub: "Featured Projects" },
  { name: "Services",    sub: "Capabilities"      },
  { name: "About",       sub: "Our Story"         },
  { name: "Grow with us",sub: "Careers"           },
];

export default function DesignAgencyLanding() {
  const [open, setOpen] = useState(false);
  const [time, setTime] = useState("");

  /* Clock */
  useEffect(() => {
    const update = () =>
      setTime(new Date().toLocaleTimeString("en-US", {
        hour: "2-digit", minute: "2-digit", second: "2-digit",
        hour12: false, timeZone: "Asia/Kolkata",
      }));
    update();
    const t = setInterval(update, 1000);
    return () => clearInterval(t);
  }, []);

  /* Lock scroll */
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <div className="bg-[#f5f3ef] min-h-screen font-zalando">
<SmoothScroll/>
       <Navbar
        open={open}
        onToggle={() => setOpen((v) => !v)}
      />

      <HeroSection time={time} />


      <MenuOverlay
        open={open}
        time={time}
        onClose={() => setOpen(false)}
        links={MENU_LINKS}
      />

      <BrandsPage/>

      <ServicesSection/>

      <ResultsPage/>

      <CreativeShowcase/>

      <AboutPage/>

    </div>
  );
}