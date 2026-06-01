import { FaCoins, FaGift, FaTrophy, FaDollarSign } from "react-icons/fa";
import HeroSection from "@components/sections/HeroSection";
import HowItWorksSection from "@components/sections/HowItWorksSection";
import RifasSection from "@components/sections/RifasSection";
import BenefitsSection from "@components/sections/BenefitsSection";
import FooterSection from "@components/sections/FooterSection";
import useInicioData from "@hooks/useInicioData";

const Inicio = () => {
  const { rifas, loading, error, currentSlide, setCurrentSlide, nextSlide, prevSlide, sliderContent } = useInicioData();
  
  // Array de iconos para variar entre las rifas
  const icons = [
    <FaCoins className="text-yellow-400 text-4xl mb-2 mx-auto" />,
    <FaTrophy className="text-blue-400 text-4xl mb-2 mx-auto" />,
    <FaGift className="text-purple-400 text-4xl mb-2 mx-auto" />,
    <FaDollarSign className="text-green-500 text-4xl mb-2 mx-auto" />
  ];

  return (
    <div className="font-sans min-h-screen bg-gradient-to-b from-gray-50 to-blue-50">
      <HeroSection 
        currentSlide={currentSlide}
        sliderContent={sliderContent}
        nextSlide={nextSlide}
        prevSlide={prevSlide}
        setCurrentSlide={setCurrentSlide}
      />
      
      <HowItWorksSection />
      
      <RifasSection rifas={rifas} loading={loading} error={error} icons={icons} />
      
      <BenefitsSection />
      
      <FooterSection />
    </div>
  );
};

export default Inicio;