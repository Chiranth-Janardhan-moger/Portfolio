// Project data for the portfolio website
const projects = [
  {
    id: "project1",
    title: "GoodWill",
    description: "A fully responsive healthcare platform GoodWill that connects donors with hospitals to facilitate blood donations, helping people receive emergency blood when needed.",
    imageUrl: "./image/img1.png", // Local PNG image
    imageAlt: "Goodwill website screenshot",
   
    codeUrl: "https://github.com/Chiranth-Janardhan-moger/GoodWill",
    technologies: ["React","TypeScript"],
    featured: true
  },
  {
    id: "project2",
    title: "SmartHome",
    description: "The SmartHome is an IoT-based project designed to continuously monitor atmospheric conditions and detect the presence of harmful gases in the environment. This system aims to provide real-time data for improved environmental safety, pollution control, and weather forecasting.",
    imageUrl: "./image/img2.png", // Local PNG image
    imageAlt: "Weather application interface",

    codeUrl: "https://github.com/Chiranth-Janardhan-moger/SmartHome",
    technologies: ["JavaScript", "HTML", "CSS", "IOT Sensors","Flask"],
    featured: false
  },
  {
    id: "project3",
    title: "Hospital Management",
    description: "A collaborative task management platform for teams with real-time updates and progress tracking. Features include task assignment, due dates, priority levels, comments, file attachments, and status updates that sync in real-time across all team members.",
    imageUrl: "./image/img4.png", // Local PNG image
    imageAlt: "Hospital management dashboard",
   
    codeUrl: "https://github.com/Chiranth-Janardhan-moger/HospitalManagement",
    technologies: ["Java Swings"],
    featured: false
  },
  {
    id: "project4",
    title: "Portfolio Website",
    description: "A customizable portfolio template for developers and designers to showcase their work. The template is fully responsive, includes dark/light mode, animations, and is easy to customize with minimal coding knowledge required.",
    imageUrl: "./image/img3.png", // Local PNG image
    imageAlt: "Portfolio website template preview",
  
    codeUrl: "https://github.com/Chiranth-Janardhan-moger/Portfolio",
    technologies: ["HTML", "CSS", "JavaScript"],
    featured: false
  },
 
];

// Function to get all projects
function getAllProjects() {
  return projects;
}

// Function to get project by ID
function getProjectById(id) {
  return projects.find(project => project.id === id);
}

// Function to get featured projects
function getFeaturedProjects() {
  return projects.filter(project => project.featured);
}

