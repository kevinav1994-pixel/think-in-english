import { TestimonialCarousel } from "@/components/ui/testimonial";

const TESTIMONIAL_DATA = [
  {
    id: 1,
    name: "Riya Patel",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=320&q=80",
    description:
      "My IELTS prep finally felt structured. Weekly feedback made the improvement obvious instead of vague."
  },
  {
    id: 2,
    name: "Arjun Mehta",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=320&q=80",
    description:
      "The speaking sessions were practical and direct. I stopped memorizing and started answering with confidence."
  },
  {
    id: 3,
    name: "Sneha Nair",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=320&q=80",
    description:
      "Flexible timings mattered, but the real difference was how personal the corrections felt in every class."
  }
];

export function TestimonialCarouselDemo() {
  return (
    <TestimonialCarousel
      testimonials={TESTIMONIAL_DATA}
      className="mx-auto w-full max-w-2xl"
    />
  );
}
