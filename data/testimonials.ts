export interface Testimonial {
  id: string;
  name: string;
  role: string;
  year: string;
  branch: string;
  company?: string;
  text: string;
  rating: number;
  photo: string;
}

export const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Rohit Mehta",
    role: "Software Engineer",
    year: "2024 Batch",
    branch: "CSE",
    company: "TCS",
    text: "Nexus completely transformed my placement journey. The mock interviews and DSA sessions gave me the confidence to crack my first interview at TCS. Joining this community is the best decision I made in college.",
    rating: 5,
    photo: "/images/testimonials/rohit.jpg",
  },
  {
    id: "2",
    name: "Meera Iyer",
    role: "Frontend Developer",
    year: "2024 Batch",
    branch: "IT",
    company: "Infosys",
    text: "Before Nexus, I had no idea where to start for placements. The roadmap sessions for each year helped me focus on the right skills at the right time. Got placed with a 6 LPA package!",
    rating: 5,
    photo: "/images/testimonials/meera.jpg",
  },
  {
    id: "3",
    name: "Aditya Kumar",
    role: "Data Analyst",
    year: "2024 Batch",
    branch: "CSE",
    company: "Wipro",
    text: "The aptitude sessions at Nexus are top-notch. They simulate real company tests and helped me build speed and accuracy. The community support during placement season was invaluable.",
    rating: 5,
    photo: "/images/testimonials/aditya.jpg",
  },
  {
    id: "4",
    name: "Shreya Joshi",
    role: "Backend Developer",
    year: "2025 Batch",
    branch: "CSE",
    text: "As a 2nd year student, Nexus helped me start competitive programming early. The coding contests every month pushed me to improve consistently. Now I'm confident about my placement next year.",
    rating: 5,
    photo: "/images/testimonials/shreya.jpg",
  },
  {
    id: "5",
    name: "Vikram Nair",
    role: "Full Stack Developer",
    year: "2024 Batch",
    branch: "EECS",
    company: "Accenture",
    text: "The hackathons organized by Nexus are incredible. Our team won 2nd place in HackNexus 2023 and that project directly helped in my interview. The mentors are always available to guide you.",
    rating: 5,
    photo: "/images/testimonials/vikram.jpg",
  },
  {
    id: "6",
    name: "Pooja Sharma",
    role: "Software Developer",
    year: "2024 Batch",
    branch: "IT",
    company: "Cognizant",
    text: "Resume building workshop at Nexus was a game-changer. My resume went from average to ATS-optimized. The team personally reviewed and improved it. I got interview calls from 8 companies!",
    rating: 5,
    photo: "/images/testimonials/pooja.jpg",
  },
];
