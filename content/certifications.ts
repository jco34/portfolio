import type { CertificationItem } from "@/types/content";

const logos: Record<string, string> = {
  OpenEDG: "/icons/certifications/openedg.png",
  freeCodeCamp: "/icons/certifications/freecodecamp.png",
  "Zuitt Coding Bootcamp": "/icons/certifications/zuitt.png",
};

export const certifications: CertificationItem[] = [
  {
    name: "JSE – Certified Entry-Level JavaScript Programmer",
    issuer: "OpenEDG",
    year: "Jan 2025",
    url: "https://verify.openedg.org/?id=jDbo.fym5.nfJJ",
    logo: logos.OpenEDG,
  },
  {
    name: "JavaScript Algorithms and Data Structures",
    issuer: "freeCodeCamp",
    year: "Oct 2025",
    url: "https://www.freecodecamp.org/certification/jimmyboi_14/javascript-algorithms-and-data-structures",
    logo: logos.freeCodeCamp,
  },
  {
    name: "Full-Stack Development",
    issuer: "Zuitt Coding Bootcamp",
    year: "May 2023",
    url: "https://share.zertify.zuitt.co/certificate/e6fa861d-50b1-4430-912c-4d5c8923ad2d/",
    logo: logos["Zuitt Coding Bootcamp"],
  },
  {
    name: "Intro to MySQL for MongoDB Developers Short Course",
    issuer: "Zuitt Coding Bootcamp",
    year: "May 2023",
    url: "https://share.zertify.zuitt.co/certificate/7f1e6d98-2705-4384-88b8-d5fa63e0ccb3/",
    logo: logos["Zuitt Coding Bootcamp"],
  },
  {
    name: "Spring Boot Short Course",
    issuer: "Zuitt Coding Bootcamp",
    year: "May 2023",
    url: "https://share.zertify.zuitt.co/certificate/1a07eae7-0787-4d3e-b5af-6c028ee69dff/",
    logo: logos["Zuitt Coding Bootcamp"],
  },
  {
    name: "IT Coding Bootcamp Completion",
    issuer: "Zuitt Coding Bootcamp",
    year: "May 2023",
    url: "https://share.zertify.zuitt.co/certificate/8b86cb29-1ca2-4364-8f9f-202aae7a90e0/",
    logo: logos["Zuitt Coding Bootcamp"],
  },
];
