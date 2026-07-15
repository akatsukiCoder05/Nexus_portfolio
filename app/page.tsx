import PageLoader from "@/components/layout/PageLoader";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ScrollProgress from "@/components/ui/ScrollProgress";
import BackToTop from "@/components/ui/BackToTop";

import Hero from "@/components/sections/Hero";
import Stats from "@/components/sections/Stats";
import About from "@/components/sections/About";
import Timeline from "@/components/sections/Timeline";
import WhatWeDo from "@/components/sections/WhatWeDo";
import Events from "@/components/sections/Events";
import Achievements from "@/components/sections/Achievements";
import UpcomingEvent from "@/components/sections/UpcomingEvent";
import Gallery from "@/components/sections/Gallery";
import Team from "@/components/sections/Team";
import WhyJoin from "@/components/sections/WhyJoin";
import Roadmap from "@/components/sections/Roadmap";
import FAQ from "@/components/sections/FAQ";
import Sponsors from "@/components/sections/Sponsors";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      {/* Global UI */}
      <PageLoader />
      <ScrollProgress />
      <BackToTop />

      {/* Navigation */}
      <Navbar />

      {/* Main Content */}
      <main>
        <Hero />
        <Stats />
        <About />
        <Timeline />
        <WhatWeDo />
        <Events />
        <UpcomingEvent />
        <Achievements />
        <Gallery />
        <Team />
        <WhyJoin />
        <Roadmap />
        <FAQ />
        <Sponsors />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />
    </>
  );
}
