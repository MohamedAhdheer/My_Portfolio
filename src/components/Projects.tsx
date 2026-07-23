import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaSearch, FaStar, FaCode, FaMobile, FaServer, FaLaptopCode, FaHeart } from 'react-icons/fa';
import FreshCo from '../assets/FreshCo.jpeg';
import BloodDonation from '../assets/BloodDonation.png';
import SLPAMedicalClaims from '../assets/SLPAMedicalClaims.png';

interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  github: string;
  category: string;
  technologies: string[];
  featured: boolean;
  stats: { stars: number; forks: number };
  difficulty: string;
  duration: string;
}

const Projects: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isLoading, setIsLoading] = useState(true);

  const categories = [
    { id: 'all', name: 'All Projects', icon: FaCode, count: 3 },
    { id: 'full-stack', name: 'Full Stack', icon: FaServer, count: 3 },
    { id: 'web-mini', name: 'Web Apps', icon: FaLaptopCode, count: 0 },
    { id: 'mobile', name: 'Mobile Apps', icon: FaMobile, count: 0 },
  ];

  const projects: Project[] = [
    
    {
      id: '1',
      title: 'Advanced Blood Donation System',
      description: 'A comprehensive MERN stack application for managing blood donations and requests. Features include donor registration, blood inventory management, real-time blood request tracking, and automated matching system for blood types.',
      image: BloodDonation,
      github: 'https://github.com/MohamedAhdheer/RedDrop-Project-Advanced-Blood-Donation-System',
      category: 'full-stack',
      technologies: ['MongoDB', 'Express.js', 'React.js', 'Node.js'],
      featured: true,
      stats: { stars: 145, forks: 38 },
      difficulty: 'Advanced',
      duration: '3 months',
    },
    {
      id: '2',
      title: 'FreshCoN Online Grocery',
      description: 'A comprehensive MERN stack application for managing online grocery shopping. Features include user authentication, product catalog, shopping cart, and order management.',
      image: FreshCo,
      github: 'https://github.com/MohamedAhdheer/Grocery-Management-System-/tree/master',
      category: 'full-stack',
      technologies: ['Java', 'MySQL', 'HTML5', 'CSS3', 'JavaScript', 'Bootstrap'],
      featured: true,
      stats: { stars: 145, forks: 38 },
      difficulty: 'Advanced',
      duration: '3 months',
    },
    {
      id: '3',
      title: 'SLPA Medical Claim Tracking System',
      description: 'An ongoing medical claim registration and tracking system for the Sri Lanka Ports Authority. It enables authorized administrators to review claim requests, monitor approval progress, update claim records, and manage employee details and remarks.',
      image: SLPAMedicalClaims,
      github: 'https://github.com/MohamedAhdheer/medical-claim-tracking-system-SLPA',
      category: 'full-stack',
      technologies: ['PHP', 'MySQL', 'JavaScript', 'HTML5', 'CSS3'],
      featured: true,
      stats: { stars: 0, forks: 0 },
      difficulty: 'Ongoing',
      duration: 'In development',
    },
  ];

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const filteredProjects = projects.filter(project => {
    const matchesCategory = selectedCategory === 'all' || project.category === selectedCategory;
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.technologies.some(tech => tech.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <section id="projects" className="section-spacing relative">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="heading gradient-text">Featured Projects</h2>
          <p className="subheading max-w-3xl mx-auto">
            Here are some of my recent projects that showcase my skills in full-stack development, 
            web applications, and mobile development.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="mb-8 sm:mb-12"
        >
          <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 items-center justify-between">
            <div className="relative flex-1 max-w-md w-full">
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-tertiary" />
              <input
                type="text"
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-field pl-12 w-full"
              />
            </div>

            <div className="flex flex-wrap gap-2 sm:gap-3">
              {categories.map((category) => (
                <motion.button
                  key={category.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center space-x-2 px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all duration-300 ${
                    selectedCategory === category.id
                      ? 'bg-secondary text-primary shadow-glow'
                      : 'bg-white/5 text-tertiary hover:text-secondary hover:bg-white/10 border border-white/10'
                  }`}
                >
                  <category.icon size={14} />
                  <span className="hidden sm:inline">{category.name}</span>
                  <span className="bg-white/10 px-2 py-0.5 rounded-full text-xs">
                    {category.count}
                  </span>
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {[...Array(6)].map((_, i) => (
                <div key={i} className="card animate-pulse">
                  <div className="skeleton h-48 rounded-lg mb-4" />
                  <div className="skeleton h-6 rounded mb-2" />
                  <div className="skeleton h-4 rounded mb-2" />
                  <div className="skeleton h-4 rounded w-3/4" />
                </div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="projects"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredProjects.map((project) => (
                <motion.div
                  key={project.id}
                  variants={cardVariants}
                  layout
                  className="group relative"
                >
                  <div className="card card-hover h-full flex flex-col overflow-hidden">
                    <div className="relative overflow-hidden rounded-t-2xl">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="flex space-x-3 sm:space-x-4">
                          <motion.a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="bg-black/50 text-white p-2 sm:p-3 rounded-full hover:bg-black/70 transition-all duration-300"
                            aria-label="View code"
                          >
                            <FaGithub size={16} />
                          </motion.a>
                        </div>
                      </div>

                      {project.featured && (
                        <div className="absolute top-3 sm:top-4 left-3 sm:left-4">
                          <span className="badge badge-primary text-xs">
                            <FaHeart size={10} className="mr-1" />
                            Featured
                          </span>
                        </div>
                      )}

                      <div className="absolute top-3 sm:top-4 right-3 sm:right-4 flex space-x-2">
                        <span className="badge bg-black/50 text-white text-xs">
                          <FaStar size={8} className="mr-1" />
                          {project.stats.stars}
                        </span>
                      </div>
                    </div>

                    <div className="p-4 sm:p-6 flex-1 flex flex-col">
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="text-lg sm:text-xl font-bold text-light group-hover:text-secondary transition-colors duration-300">
                          {project.title}
                        </h3>
                      </div>

                      <p className="text-tertiary text-sm leading-relaxed mb-4 flex-1">
                        {project.description}
                      </p>

                      <div className="flex items-center justify-between mb-4 text-xs text-tertiary">
                        <span className="badge badge-secondary">
                          {project.difficulty}
                        </span>
                        <span>{project.duration}</span>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.technologies.slice(0, 4).map((tech, index) => (
                          <span
                            key={index}
                            className="text-xs bg-white/5 text-tertiary px-2 py-1 rounded border border-white/10"
                          >
                            {tech}
                          </span>
                        ))}
                        {project.technologies.length > 4 && (
                          <span className="text-xs text-tertiary px-2 py-1">
                            +{project.technologies.length - 4} more
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {!isLoading && filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
          >
            <div className="text-4xl sm:text-6xl mb-4">🔍</div>
            <h3 className="text-xl sm:text-2xl font-bold text-light mb-2">No projects found</h3>
            <p className="text-tertiary">Try adjusting your search or filter criteria.</p>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Projects;
