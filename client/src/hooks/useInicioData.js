import { useState, useEffect, useCallback } from "react";
import { getAllRifas } from "../api/rifa";

const useInicioData = () => {
  const [rifas, setRifas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Array de contenido para el slider (imágenes y frases)
  const sliderContent = [
    {
      title: '¡Gana <span class="text-yellow-300">increíbles</span><br/>premios con solo<br/>un <span class="text-yellow-300">click</span>!',
      subtitle: 'Crea o participa en rifas de manera<br/><span class="font-bold text-white">segura, rápida y transparente</span>.',
      image: '/image/prize-3.png',
    },
    {
      title: 'Convierte tus <span class="text-yellow-300">sueños</span><br/>en realidad<br/>con <span class="text-yellow-300">TuRifa</span>!',
      subtitle: 'Premios exclusivos que<br/><span class="font-bold text-white">están esperando por ti</span>.',
      image: '/image/prize-2.png',
    },
    {
      title: 'Cada boleto es una<br/><span class="text-yellow-300">oportunidad</span><br/>de <span class="text-yellow-300">ganar</span>!',
      subtitle: 'Miles de ganadores<br/><span class="font-bold text-white">¡El próximo podrías ser tú!</span>',
      image: '/image/prize-1.png',
    }
  ];
  
  // Función para avanzar al siguiente slide
  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % sliderContent.length);
  }, [sliderContent.length]);
  
  // Función para retroceder al slide anterior
  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === 0 ? sliderContent.length - 1 : prev - 1));
  }, [sliderContent.length]);
  
  // Efecto para el cambio automático de slides
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000); // Cambia cada 5 segundos
    
    return () => clearInterval(interval);
  }, [nextSlide]);
  
  useEffect(() => {
    const fetchRifas = async () => {
      try {
        setLoading(true);
        const response = await getAllRifas();
        setRifas(response.data.rifas || []);
      } catch (err) {
        setError("No se pudieron cargar las rifas. Intenta de nuevo más tarde.");
      } finally {
        setLoading(false);
      }
    };
    
    fetchRifas();
  }, []);
  
  return {
    rifas,
    loading,
    error,
    currentSlide,
    setCurrentSlide,
    nextSlide,
    prevSlide,
    sliderContent
  };
};

export default useInicioData;