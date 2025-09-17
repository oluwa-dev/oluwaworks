import  FeaturedWork  from "@/modules/home/featuredprojects";
import HeroFun from "@/modules/home/hero/hero";
import NewsletterCard from "@/ui/custom/newsletters";
import Testimonials from "@/modules/home/testimonials/testominial";
import ProcessSteps from "@/ui/custom/processsteps";
import Faq from "@/ui/custom/faq";
import AboutTeaser from "@/modules/home/teaser";
import me from "../../public/me.jpg";
import { Loader } from "@/ui/custom/loader";
export default function Home() {


  return (
    <div>
      <HeroFun />
      <AboutTeaser name="Faseein Ayokunumi Toluwani" photoSrc={me.src} />
      <div className="px-6 md:px-24 py-6 md:py-14">
        <ProcessSteps />
      </div>
      <FeaturedWork />
      <Testimonials />
      <div className="px-6 md:px-24 py-6 md:py-14">
        <Faq />
      </div>
      
      {/* <NewsletterCard /> */}
    </div>
  );
}
