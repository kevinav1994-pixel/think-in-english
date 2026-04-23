import * as React from "react";
import { motion, type PanInfo } from "framer-motion";
import { cn } from "@/lib/utils";

interface Testimonial {
  id: number | string;
  name: string;
  avatar: string;
  description: string;
}

interface TestimonialCarouselProps extends React.HTMLAttributes<HTMLDivElement> {
  testimonials: Testimonial[];
  showArrows?: boolean;
  showDots?: boolean;
}

const TestimonialCarousel = React.forwardRef<HTMLDivElement, TestimonialCarouselProps>(
  ({ className, testimonials, showArrows = true, showDots = true, ...props }, ref) => {
    const [currentIndex, setCurrentIndex] = React.useState(0);
    const [exitX, setExitX] = React.useState<number>(0);

    const goToIndex = React.useCallback(
      (direction: 1 | -1) => {
        setCurrentIndex((prev) => (prev + direction + testimonials.length) % testimonials.length);
      },
      [testimonials.length]
    );

    const handleDragEnd = (
      _event: MouseEvent | TouchEvent | PointerEvent,
      info: PanInfo
    ) => {
      if (Math.abs(info.offset.x) > 100) {
        setExitX(info.offset.x);
        window.setTimeout(() => {
          goToIndex(info.offset.x < 0 ? 1 : -1);
          setExitX(0);
        }, 200);
      }
    };

    if (testimonials.length === 0) return null;

    return (
      <div
        ref={ref}
        className={cn("flex h-80 w-full items-center justify-center sm:h-72", className)}
        {...props}
      >
        <div className="relative h-64 w-full max-w-80">
          {testimonials.map((testimonial, index) => {
            const isCurrentCard = index === currentIndex;
            const isPrevCard = index === (currentIndex + 1) % testimonials.length;
            const isNextCard = index === (currentIndex + 2) % testimonials.length;

            if (!isCurrentCard && !isPrevCard && !isNextCard) return null;

            return (
              <motion.div
                key={testimonial.id}
                className={cn(
                  "absolute h-full w-full cursor-grab rounded-2xl bg-white shadow-xl active:cursor-grabbing",
                  "border border-border/60 dark:bg-card dark:shadow-[2px_2px_4px_rgba(0,0,0,0.4),-1px_-1px_3px_rgba(255,255,255,0.1)]"
                )}
                style={{
                  zIndex: isCurrentCard ? 3 : isPrevCard ? 2 : 1
                }}
                drag={isCurrentCard ? "x" : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.7}
                onDragEnd={isCurrentCard ? handleDragEnd : undefined}
                initial={{
                  scale: 0.95,
                  opacity: 0,
                  y: isCurrentCard ? 0 : isPrevCard ? 8 : 16,
                  rotate: isCurrentCard ? 0 : isPrevCard ? -2 : -4
                }}
                animate={{
                  scale: isCurrentCard ? 1 : 0.95,
                  opacity: isCurrentCard ? 1 : isPrevCard ? 0.6 : 0.3,
                  x: isCurrentCard ? exitX : 0,
                  y: isCurrentCard ? 0 : isPrevCard ? 8 : 16,
                  rotate: isCurrentCard ? exitX / 20 : isPrevCard ? -2 : -4
                }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 20
                }}
              >
                {showArrows && isCurrentCard ? (
                  <div className="absolute inset-x-0 top-2 flex justify-between px-4">
                    <button
                      type="button"
                      onClick={() => goToIndex(-1)}
                      className="text-2xl text-gray-300 transition hover:text-gray-400 dark:text-muted-foreground dark:hover:text-primary"
                      aria-label="Previous testimonial"
                    >
                      &larr;
                    </button>
                    <button
                      type="button"
                      onClick={() => goToIndex(1)}
                      className="text-2xl text-gray-300 transition hover:text-gray-400 dark:text-muted-foreground dark:hover:text-primary"
                      aria-label="Next testimonial"
                    >
                      &rarr;
                    </button>
                  </div>
                ) : null}

                <div className="flex h-full flex-col items-center gap-4 p-6 pt-10 text-center">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="h-16 w-16 rounded-full object-cover"
                  />
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-foreground">
                    {testimonial.name}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-muted-foreground">
                    {testimonial.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
          {showDots ? (
            <div className="absolute -bottom-8 left-0 right-0 flex justify-center gap-2">
              {testimonials.map((testimonial, index) => (
                <button
                  key={testimonial.id}
                  type="button"
                  onClick={() => setCurrentIndex(index)}
                  aria-label={`Go to testimonial ${index + 1}`}
                  className={cn(
                    "h-2 w-2 rounded-full transition-colors",
                    index === currentIndex
                      ? "bg-blue-500 dark:bg-primary"
                      : "bg-gray-300 dark:bg-muted-foreground/30"
                  )}
                />
              ))}
            </div>
          ) : null}
        </div>
      </div>
    );
  }
);

TestimonialCarousel.displayName = "TestimonialCarousel";

export { TestimonialCarousel, type Testimonial };
