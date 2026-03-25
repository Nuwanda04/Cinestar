import ContactSection from "../components/ContactSection";
import HeroSection from "../components/HeroSection";
import LatestBlogSection from "../components/LatestBlogSection";
import PortfolioSection from "../components/PortfolioSection";
import ServiceSection from "../components/ServiceSection";
import SoMeSection from "../components/SoMeSection";
import StorySection from "../components/StorySection";
import StudioSection from "../components/StudioSection";
import TestimonialSection from "../components/TestimonialSection";

const Home = () => {
  return (
    <>
      <HeroSection />
      <StudioSection />
      <PortfolioSection />
      <ServiceSection />
      <StorySection />
      <TestimonialSection />
      <ContactSection />
      <LatestBlogSection />
      <SoMeSection />
    </>
  );
};

export default Home;
