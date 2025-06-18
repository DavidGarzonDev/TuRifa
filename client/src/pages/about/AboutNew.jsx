import React, { useState } from 'react';
import { FaLaptopCode, FaLightbulb, FaUsers, FaHandshake, FaRocket, FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';


const AboutNew = () => {
  const [activeTab, setActiveTab] = useState('nosotros');

  const tabs = [
    { id: 'nosotros', label: 'Quiénes Somos' },
    { id: 'mision', label: 'Nuestra Misión' },
    { id: 'valores', label: 'Valores' },
    { id: 'equipo', label: 'Equipo' }
  ];

  // Información del equipo
  const teamMembers = [
    {
      name: 'Oscar David Estrada',
      role: 'Full Stack Developer',
      image: '/image/oscar.jpg',
      bio: 'Apasionado por la tecnología y las soluciones innovadoras. Developor en React y Node.js con enfoque en aplicaciones escalables y de alto rendimiento.',
      skills: ['React', 'Node.js', 'Firebase', 'MongoDB', 'AWS'],
      social: {
        github: 'https://github.com',
        linkedin: 'https://linkedin.com',
        email: 'eduardo@turifa.com'
      }
    },
    {
      name: 'Juan David Garzon',
      role: 'Full Stack Developer',
      image: 'https://avatars.githubusercontent.com/u/135771912?s=400&u=aa7b37e816d7d5fe284e39bfda2d8e94bc55e7a5&v=4',
      bio: 'Soy programador junior fullstack. Me mueven las ideas que se pueden convertir en soluciones reales. Cada proyecto es una forma de entender mejor el mundo a través del código.',
      skills: ['UI/UX Design', 'React', 'Tailwind CSS', 'Figma', 'Animation', "Node.js"],
      social: {
        github: 'https://github.com/DavidGarzonDev',
        linkedin: 'https://www.linkedin.com/in/juan-david-garzon-montenegro-5b1bb136b/',
        email: 'juanxavif@gmail.com'
      }
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-blue-50">
      {/* Header de la página */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-xl overflow-hidden relative py-20">
        {/* Elementos decorativos */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full -translate-y-1/2 translate-x-1/4"></div>
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-indigo-300 opacity-20 rounded-full translate-y-1/2 -translate-x-1/3"></div>

        <div className="container mx-auto px-6 relative z-10 text-center">
          <span className="inline-block bg-blue-400/30 backdrop-blur-sm px-4 py-1 rounded-full text-sm font-medium mb-4">
            Conoce a TuRifa
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
            Sobre <span className="text-yellow-300">Nosotros</span>
          </h1>
          <p className="max-w-2xl mx-auto text-blue-100 text-lg">
            Un dúo de programadores apasionados por crear soluciones digitales innovadoras
            que hagan la vida más sencilla para todos.
          </p>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="container mx-auto mt-8 px-4">
        <div className="flex flex-wrap justify-center mb-8 gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                activeTab === tab.id
                  ? "bg-blue-600 text-white shadow-lg"
                  : "bg-white text-blue-800 hover:bg-blue-50"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Contenido de las tabs */}
        <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden mb-16">
          {/* Quiénes somos */}
          {activeTab === 'nosotros' && (
            <div className="p-8 md:p-12">
              <div className="flex flex-col md:flex-row items-center gap-8 mb-12">
                <div className="w-full md:w-1/2">
                  <h2 className="text-3xl font-bold text-gray-800 mb-4">
                    Simplificando la creación y participación en rifas
                  </h2>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    En TuRifa, somos un equipo de desarrolladores apasionados por la tecnología y la innovación. 
                    Nuestra plataforma nació de una idea simple: hacer que organizar y participar en rifas 
                    sea una experiencia fácil, segura y transparente para todos.
                  </p>
                  <p className="text-gray-600 leading-relaxed">
                    Combinamos nuestros conocimientos técnicos con una profunda comprensión de las 
                    necesidades de nuestros usuarios para crear una plataforma intuitiva que conecta 
                    organizadores y participantes de rifas de manera efectiva.
                  </p>
                </div>
                <div className="w-full md:w-1/2">
                  <img 
                    src="/image/gift.png" 
                    alt="TuRifa Team" 
                    className="rounded-lg shadow-md w-full object-cover"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                <div className="bg-blue-50 p-6 rounded-xl">
                  <FaLaptopCode className="text-4xl text-blue-600 mb-4" />
                  <h3 className="text-xl font-semibold mb-2 text-gray-800">Tecnología Avanzada</h3>
                  <p className="text-gray-600">
                    Utilizamos las tecnologías más modernas para garantizar una plataforma rápida, 
                    segura y fácil de usar en cualquier dispositivo.
                  </p>
                </div>
                <div className="bg-indigo-50 p-6 rounded-xl">
                  <FaUsers className="text-4xl text-indigo-600 mb-4" />
                  <h3 className="text-xl font-semibold mb-2 text-gray-800">Enfoque en el Usuario</h3>
                  <p className="text-gray-600">
                    Cada decisión que tomamos está orientada a mejorar la experiencia de nuestros 
                    usuarios, simplificando procesos y agregando valor.
                  </p>
                </div>
                <div className="bg-purple-50 p-6 rounded-xl">
                  <FaLightbulb className="text-4xl text-purple-600 mb-4" />
                  <h3 className="text-xl font-semibold mb-2 text-gray-800">Innovación Constante</h3>
                  <p className="text-gray-600">
                    Nos apasiona la mejora continua, siempre buscamos nuevas formas de hacer 
                    nuestra plataforma más útil y eficiente.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Nuestra misión */}
          {activeTab === 'mision' && (
            <div className="p-8 md:p-12">
              <div className="text-center mb-12">
                <div className="inline-block p-4 rounded-full bg-blue-100 mb-4">
                  <FaRocket className="text-3xl text-blue-600" />
                </div>
                <h2 className="text-3xl font-bold text-gray-800 mb-4">Nuestra Misión</h2>
                <p className="text-gray-600 max-w-3xl mx-auto">
                  Transformar y democratizar la forma en que se organizan y participan en rifas 
                  a través de la tecnología, creando una comunidad digital donde todos puedan 
                  participar de manera segura y transparente.
                </p>
              </div>
              
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-2xl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="bg-white p-6 rounded-xl shadow-sm">
                    <h3 className="text-xl font-semibold mb-3 text-indigo-700">Lo que buscamos lograr</h3>
                    <ul className="space-y-3 text-gray-700">
                      <li className="flex items-start">
                        <span className="bg-blue-100 rounded-full p-1 mr-3 mt-1">
                          <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </span>
                        <span>Simplificar la organización y participación en rifas digitales</span>
                      </li>
                      <li className="flex items-start">
                        <span className="bg-blue-100 rounded-full p-1 mr-3 mt-1">
                          <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </span>
                        <span>Garantizar la transparencia y confianza en cada sorteo</span>
                      </li>
                      <li className="flex items-start">
                        <span className="bg-blue-100 rounded-full p-1 mr-3 mt-1">
                          <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </span>
                        <span>Conectar organizadores con participantes de manera efectiva</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="bg-white p-6 rounded-xl shadow-sm">
                    <h3 className="text-xl font-semibold mb-3 text-indigo-700">Nuestro compromiso</h3>
                    <ul className="space-y-3 text-gray-700">
                      <li className="flex items-start">
                        <span className="bg-green-100 rounded-full p-1 mr-3 mt-1">
                          <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </span>
                        <span>Innovación constante en nuestras soluciones tecnológicas</span>
                      </li>
                      <li className="flex items-start">
                        <span className="bg-green-100 rounded-full p-1 mr-3 mt-1">
                          <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </span>
                        <span>Seguridad y protección de datos de nuestros usuarios</span>
                      </li>
                      <li className="flex items-start">
                        <span className="bg-green-100 rounded-full p-1 mr-3 mt-1">
                          <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </span>
                        <span>Soporte y asesoramiento continuos a todos nuestros usuarios</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Valores */}
          {activeTab === 'valores' && (
            <div className="p-8 md:p-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-2 text-center">Nuestros Valores</h2>
              <p className="text-gray-600 text-center max-w-3xl mx-auto mb-12">
                Los principios que guían nuestras decisiones y definen nuestra cultura de trabajo
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="flex bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-xl">
                  <div className="mr-5">
                    <div className="bg-blue-100 p-4 rounded-lg">
                      <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-3 text-gray-800">Confianza</h3>
                    <p className="text-gray-600">
                      Construimos relaciones de confianza con nuestros usuarios a través de 
                      procesos transparentes y seguros en cada paso.
                    </p>
                  </div>
                </div>
                
                <div className="flex bg-gradient-to-r from-purple-50 to-purple-100 p-6 rounded-xl">
                  <div className="mr-5">
                    <div className="bg-purple-100 p-4 rounded-lg">
                      <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-3 text-gray-800">Innovación</h3>
                    <p className="text-gray-600">
                      Buscamos constantemente nuevas formas de mejorar nuestra plataforma y 
                      ofrecer soluciones creativas a los desafíos de nuestros usuarios.
                    </p>
                  </div>
                </div>
                
                <div className="flex bg-gradient-to-r from-green-50 to-green-100 p-6 rounded-xl">
                  <div className="mr-5">
                    <div className="bg-green-100 p-4 rounded-lg">
                      <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-3 text-gray-800">Comunidad</h3>
                    <p className="text-gray-600">
                      Creemos en el poder de conectar personas con intereses similares, 
                      creando una comunidad donde todos pueden beneficiarse.
                    </p>
                  </div>
                </div>
                
                <div className="flex bg-gradient-to-r from-yellow-50 to-yellow-100 p-6 rounded-xl">
                  <div className="mr-5">
                    <div className="bg-yellow-100 p-4 rounded-lg">
                      <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path>
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-3 text-gray-800">Accesibilidad</h3>
                    <p className="text-gray-600">
                      Nos esforzamos por hacer que nuestra plataforma sea accesible para todos, 
                      independientemente de sus conocimientos técnicos o recursos.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-12 text-center">
                <div className="inline-block p-6 rounded-full bg-indigo-50 mb-6">
                  <FaHandshake className="text-4xl text-indigo-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                  Compromiso con la Excelencia
                </h3>
                <p className="text-gray-600 max-w-3xl mx-auto">
                  Nos comprometemos a proporcionar la mejor experiencia posible para nuestros usuarios, 
                  manteniendo altos estándares de calidad en todo lo que hacemos.
                </p>
              </div>
            </div>
          )}

          {/* Equipo */}
          {activeTab === 'equipo' && (
            <div className="p-8 md:p-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-2 text-center">Conoce a Nuestro Equipo</h2>
              <p className="text-gray-600 text-center max-w-3xl mx-auto mb-12">
                Un dúo apasionado de profesionales que trabajan juntos para hacer de TuRifa una realidad
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {teamMembers.map((member, index) => (
                  <div key={index} className="bg-white rounded-2xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1">
                    <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-6 text-center">
                      <img 
                        src={member.image} 
                        alt={member.name}
                        className="w-32 h-32 rounded-full border-4 border-white mx-auto mb-4 object-cover"
                      />
                      <h3 className="text-xl font-bold text-white">{member.name}</h3>
                      <p className="text-blue-100">{member.role}</p>
                    </div>
                    <div className="p-6">
                      <p className="text-gray-700 mb-6">{member.bio}</p>
                      
                      <h4 className="text-sm font-semibold text-gray-500 uppercase mb-2">Habilidades:</h4>
                      <div className="flex flex-wrap gap-2 mb-6">
                        {member.skills.map((skill, idx) => (
                          <span 
                            key={idx}
                            className="bg-blue-100 text-blue-700 text-xs font-medium px-2.5 py-0.5 rounded"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                      
                      <div className="pt-4 border-t border-gray-200">
                        <div className="flex justify-center space-x-4">
                          <a 
                            href={member.social.github} 
                            className="text-gray-500 hover:text-gray-800 transition-colors"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="GitHub"
                          >
                            <FaGithub className="text-2xl" />
                          </a>
                          <a 
                            href={member.social.linkedin} 
                            className="text-gray-500 hover:text-blue-700 transition-colors"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="LinkedIn"
                          >
                            <FaLinkedin className="text-2xl" />
                          </a>
                          <a 
                            href={`mailto:${member.social.email}`} 
                            className="text-gray-500 hover:text-red-600 transition-colors"
                            aria-label="Email"
                          >
                            <FaEnvelope className="text-2xl" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* CTA Section */}
      <section className="max-w-5xl mx-auto mb-16 px-6">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl shadow-xl overflow-hidden">
          <div className="flex flex-col md:flex-row justify-between items-center p-8 md:p-10">
            <div className="text-white mb-6 md:mb-0">
              <h4 className="font-bold text-2xl mb-3">¡Únete a nuestra comunidad!</h4>
              <p className="text-blue-100">
                Crea o participa en rifas de manera fácil y segura.<br/>
                Sé parte de la revolución digital de las rifas.
              </p>
              <button 
                onClick={() => navigate("/register")}
                className="mt-4 bg-white text-indigo-700 hover:bg-blue-100 px-6 py-2 rounded-lg font-medium transition-colors inline-flex items-center"
              >
                Comenzar ahora
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </button>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6 text-white border border-white/30">
              <h4 className="font-bold text-xl mb-2 text-white">Contacta con nosotros</h4>
              <p className="text-blue-50">Estamos aquí para ayudarte</p>
              <a 
                href="mailto:contacto@turifa.com" 
                className="mt-4 bg-white/30 hover:bg-white/40 px-6 py-2 rounded-lg font-medium transition-colors inline-flex items-center"
              >
                contacto@turifa.com
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutNew;
