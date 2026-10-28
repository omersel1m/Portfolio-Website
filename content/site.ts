// Everything the site says lives here. Edit this file to update the portfolio;
// components only handle layout.

export type Link = { label: string; href: string };

export type Project = {
  title: string;
  description: string;
  tags: string[];
  // Leave empty for projects whose code isn't public.
  github?: string;
};

export type TimelineItem = {
  title: string;
  organization: string;
  period: string;
  points: string[];
};

export const profile = {
  name: "Ömer Selim Durman",
  greeting: ["Hello", "World!"],
  role: "Software Developer",
  tagline: "Data Scientist and Mobile Developer",
  location: "Bandırma, Türkiye",
  email: "omerselimdurmann@gmail.com",
  avatar: { src: "/images/avatar.png", alt: "Illustration of Ömer Selim Durman working on a laptop" },
  // Used for search results and link previews.
  description:
    "Software developer from Bandırma, Türkiye, working on data science, machine learning and mobile apps.",
  intro:
    "Hi! I'm Ömer Selim Durman. I combine my passion for software development with an analytical way of thinking to build user-friendly, innovative solutions. I'm specializing in data science and mobile app development, and in every project I use modern technologies and best practices to deliver the best possible user experience.",
};

export const socials = {
  github: { label: "GitHub", href: "https://github.com/omersel1m" },
  linkedin: { label: "LinkedIn", href: "https://www.linkedin.com/in/omerselim-durman/" },
};

export const navigation: Link[] = [
  { label: "Home", href: "#home" },
  { label: "About Me", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export const skills = [
  "HTML",
  "CSS",
  "JavaScript",
  "React Native",
  "Python",
  "Java",
  "OOP",
  "Data Structures",
  "C",
  "C++",
  "SQL",
];

export const experience: TimelineItem[] = [
  {
    title: "President",
    organization: "IEEE Computer Society, Bandırma Onyedi Eylül University",
    period: "Nov 2024 – Present",
    points: [
      "Managing 5 different project teams and a coordination team",
      "Taking an active role in the execution of projects",
    ],
  },
  {
    title: "Technical Team Member",
    organization: "IEEE Computer Society, Bandırma Onyedi Eylül University",
    period: "Feb 2024 – Nov 2024",
    points: [
      "Developed mobile applications using React Native",
      "Collaborated with the development team on various projects",
    ],
  },
];

export const education: TimelineItem[] = [
  {
    title: "Computer Engineering",
    organization: "Bandırma Onyedi Eylül University",
    period: "2021 – Present",
    points: [
      "GPA: 3.54/4.00",
      "Relevant Coursework: Data Structures, Algorithms, Object-Oriented Programming",
    ],
  },
  {
    title: "Erasmus+",
    organization: "Częstochowa University of Technology",
    period: "2023 – 2024",
    points: [],
  },
];

export const projects: Project[] = [
  {
    title: "Movalyze",
    description:
      "A workout and nutrition app that follows your body through the phone camera. Pose detection runs on the device during workouts, next to meal logging and progress stats.",
    tags: ["React Native", "TypeScript", "MediaPipe", "Supabase"],
    github: "https://github.com/omersel1m/Movalyze",
  },
  {
    title: "Fitness Form AI",
    description:
      "Scores how correctly an exercise is performed, live from a webcam. YOLOv8 pose estimation tracks elbow and hip keypoints and shows an accuracy percentage on screen.",
    tags: ["Python", "YOLOv8", "OpenCV", "NumPy"],
    github: "https://github.com/omersel1m/Fitness-Form-AI",
  },
  {
    title: "Blood Donation App",
    description:
      "A mobile application that connects blood donors with those in need. Users can request blood or offer donations based on their location, making the process faster and more convenient.",
    tags: ["React Native", "Firebase", "Google Maps API"],
  },
  {
    title: "Detection of Cancerous Cells",
    description:
      "A logistic regression model that classifies cells as cancerous or non-cancerous from preprocessed cell measurements.",
    tags: ["Python", "scikit-learn", "Pandas", "Seaborn"],
    github: "https://github.com/omersel1m/Cancer-Cell-Detection-Model",
  },
  {
    title: "COVID-19 Misinformation Network",
    description:
      "Social network analysis of how real and fake COVID-19 news spread on Twitter, using a graph of users, tweets and hashtags.",
    tags: ["Python", "scikit-learn", "Pandas", "Network Analysis"],
    github: "https://github.com/omersel1m/covid19-misinfo-sna",
  },
  {
    title: "AI Image Classifier",
    description:
      "A convolutional neural network that sorts images into two classes, trained with data augmentation and checked with batch testing on a held-out set.",
    tags: ["Python", "TensorFlow", "Keras", "OpenCV"],
    github: "https://github.com/omersel1m/Image-Classifier",
  },
  {
    title: "Store Review Sentiment Analysis",
    description:
      "Classifies customer reviews as positive, negative or neutral, so a business can see how satisfied its customers are.",
    tags: ["Python", "NLTK", "scikit-learn"],
    github: "https://github.com/omersel1m/Store-Reviews-Sentiment-Analysis",
  },
  {
    title: "IEEE BANU Mobile Application",
    description:
      "A mobile application for the IEEE BANU student branch, where members can follow the branch's events, projects and announcements.",
    tags: ["React Native", "Firebase"],
  },
];

export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3100");
