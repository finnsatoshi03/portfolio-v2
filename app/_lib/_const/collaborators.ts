export type Collaborator = {
  id: number;
  name: string;
  specialization: string[];
  image?: string;
  role: string;
  status: "active" | "coming-soon";
  bio?: string;
  skills: string[];
  github?: string;
  linkedin?: string;
  portfolio?: string;
};

export const COLLABORATORS: Collaborator[] = [
  {
    id: 1,
    name: "Ashley Lumibao",
    specialization: ["Fullstack Development", "Machine Learning"],
    image: "", // Coming soon
    role: "Fullstack Developer & ML Engineer",
    status: "coming-soon",
    bio: "Passionate about creating end-to-end solutions and implementing intelligent systems through machine learning.",
    skills: [
      "React",
      "Node.js",
      "Python",
      "REST/FAST API",
      "TensorFlow",
      "PostgreSQL",
      "Docker",
    ],
    github: "https://github.com/sirashlumibao",
    linkedin: "https://www.linkedin.com/in/ashley-lumibao/",
    portfolio: "",
  },
  {
    id: 2,
    name: "Manuel Marin",
    specialization: ["Backend Development", "Machine Learning"],
    image: "", // Coming soon
    role: "Backend Developer & ML Engineer",
    status: "coming-soon",
    bio: "Specialized in building robust backend systems and implementing machine learning solutions for complex problems.",
    skills: [
      "Python",
      "Django",
      "REST/FAST API",
      "PostgreSQL",
      "Redis",
      "AWS",
      "TensorFlow",
    ],
    github: "https://github.com/mnuel1",
    linkedin: "https://www.linkedin.com/in/mnuelrin/",
    portfolio: "",
  },
  {
    id: 3,
    name: "Jerryboy Tejada",
    specialization: ["Embedded System (IoT)", "Backend Development"],
    image: "", // Coming soon
    role: "IoT Developer & Backend Engineer",
    status: "coming-soon",
    bio: "Expert in IoT systems and embedded programming, bridging the gap between hardware and software solutions.",
    skills: [
      "C/C++",
      "Arduino",
      "Raspberry Pi",
      "MQTT",
      "Node.js",
      "Python",
      "MongoDB",
    ],
    github: "",
    linkedin: "https://www.linkedin.com/in/jerry-boy-tejada-87a421283/",
    portfolio: "",
  },
  {
    id: 4,
    name: "Ezekiel Billona",
    specialization: ["Frontend Development", "Infrastructure"],
    image: "", // Coming soon
    role: "Frontend Developer & DevOps Engineer",
    status: "coming-soon",
    bio: "Focused on creating beautiful user interfaces and maintaining robust infrastructure for scalable applications.",
    skills: ["React", "TypeScript", "Kubernetes", "AWS", "Terraform"],
    github: "https://github.com/Ezekiele2",
    linkedin: "",
    portfolio: "",
  },
];

export const FEATURED_COLLABORATORS = COLLABORATORS.slice(0, 2);
