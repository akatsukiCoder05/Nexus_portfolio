export interface Event {
  id: string;
  title: string;
  date: string;
  description: string;
  type: "hackathon" | "coding" | "aptitude" | "workshop" | "placement";
  poster: string;
  registrationLink: string;
  isUpcoming: boolean;
  venue?: string;
  prize?: string;
}

export const events: Event[] = [
  {
    id: "1",
    title: "HackNexus 2026",
    date: "2026-08-15",
    description: "24-hour hackathon with 200+ participants competing to build innovative solutions for real-world problems. Cash prizes worth ₹50,000.",
    type: "hackathon",
    poster: "/images/events/hacknexus.jpg",
    registrationLink: "https://vexta.collegecrm.in",
    isUpcoming: true,
    venue: "Main Auditorium",
    prize: "₹50,000",
  },
  {
    id: "2",
    title: "Code Sprint #12",
    date: "2025-07-25",
    description: "Monthly competitive coding contest featuring DSA problems across Beginner, Intermediate, and Advanced tracks.",
    type: "coding",
    poster: "/images/events/codesprint.jpg",
    registrationLink: "https://vexta.collegecrm.in",
    isUpcoming: true,
    venue: "Computer Lab Block A",
  },
  {
    id: "3",
    title: "Aptitude Blitz",
    date: "2025-07-30",
    description: "Intensive aptitude test simulating real placement rounds from top companies. Covers Quant, Logical and Verbal sections.",
    type: "aptitude",
    poster: "/images/events/aptitude.jpg",
    registrationLink: "https://vexta.collegecrm.in",
    isUpcoming: true,
    venue: "Seminar Hall",
  },
  {
    id: "4",
    title: "DSA Bootcamp Season 3",
    date: "2025-06-10",
    description: "4-week intensive Data Structures and Algorithms bootcamp covering arrays, trees, graphs, and dynamic programming.",
    type: "workshop",
    poster: "/images/events/dsa.jpg",
    registrationLink: "#",
    isUpcoming: false,
  },
  {
    id: "5",
    title: "Mock Placement Drive",
    date: "2025-05-20",
    description: "Full simulation of placement process including aptitude, technical round, and HR interview with industry professionals.",
    type: "placement",
    poster: "/images/events/placement.jpg",
    registrationLink: "#",
    isUpcoming: false,
  },
  {
    id: "6",
    title: "Web Dev Workshop",
    date: "2025-04-15",
    description: "Hands-on workshop covering React, Node.js and full-stack development basics with project building exercises.",
    type: "workshop",
    poster: "/images/events/webdev.jpg",
    registrationLink: "#",
    isUpcoming: false,
  },
];

export const upcomingEvent = events.find((e) => e.isUpcoming && e.type === "hackathon")!;
