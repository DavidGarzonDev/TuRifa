import React from "react";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";
import { useNavigate } from "react-router";

const HeroSection = ({ currentSlide, sliderContent, nextSlide, prevSlide, setCurrentSlide }) => {
  const navigate = useNavigate();
  
  return (
    <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-xl mb-16 overflow-hidden relative py-12">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full -translate-y-1/2 translate-x-1/4"></div>
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-indigo-300 opacity-20 rounded-full translate-y-1/2 -translate-x-1/3"></div>
      
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-6 md:px-10 max-w-6xl relative z-10">
        <div className="w-full md:w-1/2 flex flex-col justify-center px-4 md:px-0 py-8 md:py-16">
          {/* Contenido del slider - textos */}
          <div className="relative overflow-hidden h-48 md:h-70">
            {sliderContent.map((slide, index) => (
              <div 
                key={index}
                className={`absolute w-full transition-all duration-700 transform ${
                  index === currentSlide 
                    ? "translate-x-0 opacity-100" 
                    : index < currentSlide 
                      ? "-translate-x-full opacity-0" 
                      : "translate-x-full opacity-0"
                }`}
              >
                <h1 
                  className="text-4xl md:text-5xl font-extrabold leading-tight mb-6 text-center md:text-left"
                  dangerouslySetInnerHTML={{ __html: slide.title }}
                />
                <p 
                  className="mt-2 text-lg md:text-xl text-blue-100 font-medium text-center md:text-left leading-relaxed mb-8"
                  dangerouslySetInnerHTML={{ __html: slide.subtitle }}
                />
              </div>
            ))}
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start mt-20 md:mt-12">
            <button 
              onClick={() => navigate("/rifas")}
              className="bg-white text-indigo-700 hover:bg-yellow-300 py-3 px-8 rounded-full font-bold text-lg shadow-lg transition-all duration-300 hover:shadow-xl flex items-center justify-center">
              Explorar Rifas
              <FaChevronRight className="ml-2" />
            </button>
            <button 
              onClick={()=> navigate("/crear/rifa")}
              className="bg-transparent hover:bg-blue-700 border-2 border-white py-3 px-8 rounded-full font-bold text-lg transition-colors duration-300 flex items-center justify-center">
              Crear Rifa
            </button>
          </div>
          
          {/* Controles del slider */}
          <div className="flex justify-center md:justify-start mt-6 space-x-3">
            {sliderContent.map((_, index) => (
              <button 
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  currentSlide === index 
                    ? "bg-yellow-300 w-6" 
                    : "bg-white opacity-50 hover:opacity-75"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
        
        <div className="w-full md:w-1/2 flex items-center justify-center px-4 md:px-0 mt-8 md:mt-0 relative">
          <div className="absolute w-64 h-64 bg-yellow-300 rounded-full filter blur-3xl opacity-30"></div>
          
          {/* Contenido del slider - imágenes */}
          <div className="relative w-full h-80 flex justify-center items-center">
            {sliderContent.map((slide, index) => (
              <img
                key={index}
                src={slide.image}
                alt={`Slide ${index + 1}`}
                className={`absolute max-h-1000 w-auto object-contain mx-auto transform hover:scale-105 transition-all duration-700 bounce-slow
                  ${index === currentSlide 
                    ? "opacity-100 scale-100" 
                    : "opacity-0 scale-90"}`}
              />
            ))}
          </div>
          
          {/* Botones adicionales para el control del slider */}
          <div className="absolute inset-x-0 top-1/2 transform -translate-y-1/2 flex justify-between items-center px-4 md:px-8">
            <button 
              onClick={prevSlide}
              className="bg-white/30 backdrop-blur-sm hover:bg-white/50 rounded-full p-2 text-white transition-all duration-300"
              aria-label="Previous slide"
            >
              <FaChevronLeft className="w-5 h-5" />
            </button>
            <button 
              onClick={nextSlide}
              className="bg-white/30 backdrop-blur-sm hover:bg-white/50 rounded-full p-2 text-white transition-all duration-300"
              aria-label="Next slide"
            >
              <FaChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;