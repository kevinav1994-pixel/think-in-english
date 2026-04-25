import { TestimonialsColumn } from "@/components/ui/testimonials-columns-1";

const testimonials = [
  {
    text: "The founder doesn't just grade your essays. He corrects how you think when constructing sentences. The impact on my IELTS score was immediate.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=320&q=80",
    name: "Ayesha Malik",
    role: "IELTS 8.0 Achiever",
  },
  {
    text: "Finally, coaching that doesn't feel like a factory. We broke down my hesitations in spoken English during the 1:1 sessions until I stopped translating in my head.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=320&q=80",
    name: "Karan Desai",
    role: "Working Professional",
  },
  {
    text: "I was extremely anxious about speaking, but the live corrections were done with so much patience. It never felt like I was being judged.",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=320&q=80",
    name: "Sanya Kapoor",
    role: "Study Abroad Aspirant",
  },
  {
    text: "PTE templates only take you so far. The coaching helped me apply them so naturally that the algorithm didn't flag me. Got my desired score in 4 weeks.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=320&q=80",
    name: "Omar Raza",
    role: "PTE Cleared",
  },
  {
    text: "Flexible scheduling saved me. Being able to prep for my CELPIP during the weekends with direct founder guidance made all the difference.",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=320&q=80",
    name: "Zainab Hussain",
    role: "Migrating to Canada",
  },
  {
    text: "No junior tutors. No massive batches. Every single piece of my writing was reviewed line by line. You just don't get this level of care elsewhere.",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=320&q=80",
    name: "Aliza Khan",
    role: "Duolingo Prep",
  },
  {
    text: "My corporate emails and presentation confidence completely transformed. The focus is on authentic expression rather than robotic grammar.",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=320&q=80",
    name: "Farhan Siddiqui",
    role: "Marketing Director",
  },
  {
    text: "The roadmap we built in the demo class was exactly what we executed over the next two months. Absolute clarity and transparency from day one.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=320&q=80",
    name: "Sana Sheikh",
    role: "LanguageCert Passed",
  },
  {
    text: "He pushes you past your comfort zone but ensures you always feel supported. Best investment I made for my career communication.",
    image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=320&q=80",
    name: "Hassan Ali",
    role: "E-commerce Manager",
  },
];

const firstColumn = testimonials.slice(0, 3);
const secondColumn = testimonials.slice(3, 6);
const thirdColumn = testimonials.slice(6, 9);

export const Testimonials = () => {
  return (
    <div className="flex justify-center gap-6 mt-10 [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_55%,transparent)] max-h-[740px] overflow-hidden relative z-0">
      <TestimonialsColumn testimonials={firstColumn} duration={50} />
      <TestimonialsColumn testimonials={secondColumn} className="hidden md:block" duration={45} />
      <TestimonialsColumn testimonials={thirdColumn} className="hidden lg:block" duration={40} />
    </div>
  );
};
