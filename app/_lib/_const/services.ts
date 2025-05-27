export type Service = {
  id: number;
  title: string;
  description: string;
  icon: string;
  features: string[];
};

export type PaymentOption = {
  id: number;
  title: string;
  description: string;
  type: "standard" | "student";
  percentage: string;
  features: string[];
};

export type Term = {
  id: number;
  title: string;
  description: string;
  type: "meeting" | "revision" | "additional";
  isIncluded: boolean;
};

export const SERVICES: Service[] = [
  {
    id: 1,
    title: "AI & Machine Learning",
    description:
      "Intelligent systems that learn and adapt to solve complex problems",
    icon: "🤖",
    features: [
      "Custom AI Model Development",
      "Machine Learning Algorithms",
      "Predictive Analytics",
      "Natural Language Processing",
      "Computer Vision Solutions",
    ],
  },
  {
    id: 2,
    title: "System Development",
    description: "End-to-end system solutions tailored to your business needs",
    icon: "⚙️",
    features: [
      "Web Applications",
      "Mobile Applications",
      "Desktop Software",
      "API Development",
      "System Integration",
    ],
  },
  {
    id: 3,
    title: "Data Structures & Algorithms",
    description: "Optimized solutions for complex computational challenges",
    icon: "📊",
    features: [
      "Algorithm Optimization",
      "Data Structure Design",
      "Performance Analysis",
      "Scalability Solutions",
      "Code Optimization",
    ],
  },
  {
    id: 4,
    title: "Database Solutions",
    description: "Robust database integration using modern technologies",
    icon: "🗄️",
    features: [
      "Supabase Integration",
      "Firebase Setup",
      "PostgreSQL & MySQL",
      "MongoDB & Redis",
      "Database Design & Migration",
    ],
  },
];

export const PAYMENT_OPTIONS: PaymentOption[] = [
  {
    id: 1,
    title: "Standard Payment",
    description:
      "Professional payment structure for businesses and organizations",
    type: "standard",
    percentage: "50%",
    features: [
      "50% upfront payment",
      "50% upon completion",
      "Contract signing required",
      "Professional invoicing",
      "Payment protection",
    ],
  },
  {
    id: 2,
    title: "Student Payment",
    description:
      "Flexible installment options for students and educational projects",
    type: "student",
    percentage: "Flexible",
    features: [
      "Installment payment plans",
      "Student-friendly rates",
      "Full payment before/after deadline",
      "Educational project discounts",
      "Flexible scheduling",
    ],
  },
];

export const TERMS: Term[] = [
  {
    id: 1,
    title: "Personal Meetings",
    description:
      "We can meet clients personally to discuss project requirements and sign contracts",
    type: "meeting",
    isIncluded: true,
  },
  {
    id: 2,
    title: "Online Consultations",
    description:
      "Scheduled online meetings for client convenience and project discussions",
    type: "meeting",
    isIncluded: true,
  },
  {
    id: 3,
    title: "Minor Revisions",
    description:
      "Bug fixes and minor adjustments are included at no additional cost",
    type: "revision",
    isIncluded: true,
  },
  {
    id: 4,
    title: "Major Revisions",
    description: "Significant changes to project scope or functionality",
    type: "revision",
    isIncluded: false,
  },
  {
    id: 5,
    title: "Additional Features",
    description: "New features beyond the original project scope",
    type: "additional",
    isIncluded: false,
  },
];

export const PROCESS_STEPS = [
  {
    id: 1,
    title: "Initial Consultation",
    description: "Discuss your project requirements and goals",
    icon: "💬",
  },
  {
    id: 2,
    title: "Contract & Planning",
    description: "Sign contract and create detailed project roadmap",
    icon: "📋",
  },
  {
    id: 3,
    title: "Development",
    description: "Build your solution with regular progress updates",
    icon: "⚡",
  },
  {
    id: 4,
    title: "Testing & Delivery",
    description: "Thorough testing and final delivery of your project",
    icon: "🚀",
  },
];
