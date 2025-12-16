import React from "react";
import Sunset from "../assets/about/Sunset.png";
import "./Projects.css";
import { motion } from "framer-motion";

// Example project list — replace with yours anytime
const projects = [
  {
    title: "My Photo App",
    description: "A modern React photo app with animations and custom components.",
    image: Sunset, // local image
    tech: ["React", "CSS", "Vite"],
    github: "https://github.com/adevramsey/PhotoApp.git",
    demo: "#"
  },
  {
    title: "Task Manager App",
    description: "A productivity tool built using React, Zustand, and Material UI.",
    image: "/images/Sunset.png",
    tech: ["React", "Zustand", "MUI"],
    github: "https://github.com/yourusername/task-manager",
    demo: "#"
  }
];

const Projects = () => {
  return (
    <section className="projects-section">
      <h2 className="projects-title">My Projects</h2>

      <div className="projects-grid">
        {projects.map((project, index) => (
          <motion.div
            className="project-card"
            key={index}
            whileHover={{ scale: 1.03 }}
            transition={{ type: "spring", stiffness: 300 }}>
            <img 
              src={project.image} 
              alt={project.title} 
              className="project-image"
            />

            <div className="project-content">
              <h3>{project.title}</h3>
              <p>{project.description}</p>

              <div className="tech-stack">
                {project.tech.map((t, i) => (
                  <span key={i}>{t}</span>
                ))}
              </div>

              <div className="project-links">
                <a href={project.demo} target="_blank">Demo</a>
                <a href={project.github} target="_blank">GitHub</a>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
