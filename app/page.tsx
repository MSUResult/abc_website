import Courses from "@/components/(courses)/courses";
import CenterVid from "@/components/(Homepage)/Center";
import Carousel from "@/components/(Homepage)/Courosol";
import TrustSection from "@/components/(Homepage)/HomePage";
import HomePage from "@/components/(Homepage)/HomePage";
import Reviews from "@/components/(Homepage)/Reviews";

// import Slider from "@/components/slider";

export const metadata = {
  title: "ABC institute",
  description: "Thise is the saharanpur most trusted Education platform ",
};

export default function Home() {
  return (
    <main>
      <Carousel />
      <HomePage />
      <Reviews />

      <CenterVid />

      <Courses />
    </main>
  );
}
