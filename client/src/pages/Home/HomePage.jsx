import { Container } from "@mui/material";

import PageWrapper from "../../components/PageWrapper/PageWrapper";
import HeroSection from "../../components/Home/HeroSection";
import KeyFeatures from "../../components/Home/KeyFeatures";
import HowItWork from "../../components/Home/HowItWork";
import Elder from "../../components/Home/Elder";
import WhyDocmate from "../../components/Home/WhyDocmate";
import Testimonial from "../../components/Home/Testimonial";
import Faq from "../../components/Home/Faq";
import Security from "../../components/Home/Security";
import Blog from "../../components/Home/Blog";
import Newsletter from "../../components/Home/Newsletter";

const HomePage = () => {
  return (
    <PageWrapper>
      <Container maxWidth="lg">
        {/* Hero Section */}
        <HeroSection />

        {/* Features Overview */}
        <KeyFeatures />

        {/* How It Works Section */}
        <HowItWork />

        {/*Elder Section  */}
        <Elder />

        {/* Why Choose Docmate Section */}
        <WhyDocmate />

        {/* Testimonials Section */}
        <Testimonial />

        {/* FAQ Section */}
        <Faq />

        {/* Security and Privacy Section */}
        <Security />

        {/* Blog or News Section */}
        <Blog />

        {/* Newsletter Signup Section */}
        <Newsletter />
      </Container>
    </PageWrapper>
  );
};

export default HomePage;
