import { useEffect, useState, type FormEvent } from "react";
import {
  AnimatePresence,
  MotionConfig,
  motion,
  useScroll,
  useTransform
} from "motion/react";
import { TestimonialCarouselDemo } from "@/components/ui/testimonial-demo";

type IconName =
  | "spark"
  | "calendar"
  | "users"
  | "target"
  | "arrow"
  | "chat"
  | "shield"
  | "clock"
  | "book"
  | "check"
  | "plus"
  | "phone"
  | "mail"
  | "star"
  | "layers"
  | "trend";

type SectionIntroProps = {
  eyebrow: string;
  title: string;
  copy?: string;
  align?: "left" | "center";
  narrow?: boolean;
  eyebrowClass?: string;
  titleClass?: string;
  copyClass?: string;
};

type TrustItem = {
  icon: IconName;
  text: string;
};

type AboutStat = {
  value: string;
  note: string;
};

type WhyItem = {
  title: string;
  copy: string;
  icon: IconName;
  tone: string;
  featured?: boolean;
};

type Course = {
  name: string;
  tag: string;
  outcome: string;
  duration: string;
  accent: string;
};

type FormatCard = {
  title: string;
  text: string;
  meta: string;
  icon: IconName;
};

const pageContainer = "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8";
const sectionSpacing = "py-16 sm:py-24";

const icons: Record<IconName, string> = {
  spark: "M12 3l1.8 4.7L18.5 9l-4.7 1.3L12 15l-1.8-4.7L5.5 9l4.7-1.3L12 3z",
  calendar: "M8 2v4M16 2v4M3 10h18M5 6h14a2 2 0 012 2v11a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2z",
  users: "M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2M16 3.1a4 4 0 010 7.8M23 21v-2a4 4 0 00-3-3.9M9 7a4 4 0 110 8 4 4 0 010-8z",
  target: "M12 12l3-3M12 2v3M12 19v3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M2 12h3M19 12h3M4.9 19.1L7 17M17 7l2.1-2.1M12 8a4 4 0 100 8 4 4 0 000-8z",
  arrow: "M5 12h14M13 5l7 7-7 7",
  chat: "M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2v10z",
  shield: "M12 3l7 4v5c0 4.5-2.8 8.1-7 9-4.2-.9-7-4.5-7-9V7l7-4z",
  clock: "M12 7v5l3 3M12 21a9 9 0 100-18 9 9 0 000 18z",
  book: "M4 5.5A2.5 2.5 0 016.5 3H20v17H6.5A2.5 2.5 0 014 17.5v-12zM4 17.5A2.5 2.5 0 016.5 15H20",
  check: "M5 12l4 4L19 6",
  plus: "M12 5v14M5 12h14",
  phone: "M22 16.9v3a2 2 0 01-2.2 2 19.8 19.8 0 01-8.6-3.1 19.4 19.4 0 01-6-6A19.8 19.8 0 012 4.2 2 2 0 014 2h3a2 2 0 012 1.7l.5 3a2 2 0 01-.6 1.8l-1.3 1.3a16 16 0 006 6l1.3-1.3a2 2 0 011.8-.6l3 .5A2 2 0 0122 16.9z",
  mail: "M4 4h16v16H4V4zm0 2l8 6 8-6",
  star: "M12 3l2.9 5.9 6.5 1-4.7 4.6 1.1 6.5L12 18l-5.8 3 1.1-6.5L2.6 10l6.5-1L12 3z",
  layers: "M12 2L2 7l10 5 10-5-10-5zm-7 9l7 3.5 7-3.5M5 16l7 3.5 7-3.5",
  trend: "M4 16l5-5 4 4 7-8"
};

const navItems = [
  ["About", "#about"],
  ["Courses", "#courses"],
  ["Format", "#format"],
  ["Stories", "#testimonials"],
  ["FAQ", "#faq"]
] as const;

const trustItems: TrustItem[] = [
  { icon: "shield", text: "Exam-focused guidance" },
  { icon: "clock", text: "Flexible timings" },
  { icon: "users", text: "One-to-one attention" },
  { icon: "chat", text: "Speaking confidence" },
  { icon: "target", text: "Abroad aspirant success path" },
  { icon: "book", text: "Founder-led live classes" }
];

const aboutStats: AboutStat[] = [
  { value: "Started in 2024", note: "Built to offer personal online guidance, not batch-only coaching." },
  { value: "Live online classes", note: "Real-time feedback for fluency, accuracy, and exam strategy." },
  { value: "1:1 and group sessions", note: "Formats chosen around confidence level, pace, and goal." },
  { value: "Exam-focused coaching", note: "For IELTS, PTE, CELPIP, Duolingo, LanguageCert, and spoken English." }
];

const whyItems: WhyItem[] = [
  {
    title: "Exam-focused guidance with clear direction",
    copy: "We begin with level, target, and timeline so the classes move toward a real score or confidence outcome from week one.",
    icon: "layers",
    tone: "bg-goldTint"
  },
  {
    title: "Speaking correction that is continuous",
    copy: "Pronunciation, response structure, hesitation, and confidence are corrected inside the class rhythm, not left for later.",
    icon: "chat",
    tone: "bg-accent"
  },
  {
    title: "One-to-one or group support without generic teaching",
    copy: "Focused module work, mock feedback, and practical strategies keep learners improving instead of simply attending sessions.",
    icon: "target",
    tone: "bg-[#F7EBDD]",
    featured: true
  },
  {
    title: "Built for students, professionals, and abroad aspirants",
    copy: "Different goals need different pacing. The institute stays personal enough to adapt while remaining structured enough to deliver.",
    icon: "shield",
    tone: "bg-[#EEF3ED]"
  }
];

const courses: Course[] = [
  {
    name: "IELTS Coaching",
    tag: "Most requested",
    outcome: "Band-oriented strategy with weekly speaking and writing correction.",
    duration: "4-8 weeks",
    accent: "from-[#f3dfcc] via-[#fff7ee] to-white"
  },
  {
    name: "PTE Coaching",
    tag: "Score intensive",
    outcome: "Template discipline, task practice, and timed performance training.",
    duration: "3-6 weeks",
    accent: "from-[#dfeaf2] via-[#f9fbfd] to-white"
  },
  {
    name: "CELPIP Coaching",
    tag: "Canada route",
    outcome: "Preparation shaped for immigration and study-focused communication goals.",
    duration: "4-6 weeks",
    accent: "from-[#efe3d7] via-[#fdf7f1] to-white"
  },
  {
    name: "Duolingo Training",
    tag: "Fast-track",
    outcome: "Compact prep for students moving on short university timelines.",
    duration: "2-4 weeks",
    accent: "from-[#e6ece2] via-[#fafcf8] to-white"
  },
  {
    name: "LanguageCert Coaching",
    tag: "Focused prep",
    outcome: "Targeted speaking and accuracy work with mentor-led review.",
    duration: "3-5 weeks",
    accent: "from-[#ece6f4] via-[#fbfafe] to-white"
  },
  {
    name: "Communicative English",
    tag: "Confidence building",
    outcome: "Daily spoken English, clarity drills, and workplace-ready expression.",
    duration: "Ongoing",
    accent: "from-[#f5e7dc] via-[#fffaf5] to-white"
  }
];

const formats: FormatCard[] = [
  {
    title: "One-to-one mentoring",
    text: "For learners who want sharper personal correction, faster speaking confidence, or a precise test score plan.",
    meta: "Best for focused acceleration",
    icon: "spark"
  },
  {
    title: "Group sessions",
    text: "Interactive practice, peer energy, and structured accountability in a guided class environment.",
    meta: "Best for routine and consistency",
    icon: "users"
  },
  {
    title: "Flexible timings",
    text: "Morning, evening, and weekend options designed around college, work, and admission schedules.",
    meta: "Best for busy calendars",
    icon: "calendar"
  }
];

const isE2E =
  typeof window !== "undefined" &&
  new URLSearchParams(window.location.search).has("e2e");

const faqs = [
  [
    "Do you provide online IELTS coaching and online PTE coaching?",
    "Yes. Both are available as live online programs with guided practice, mock feedback, and structured improvement plans."
  ],
  [
    "Do you also offer CELPIP, Duolingo, and LanguageCert coaching?",
    "Yes. We coach all three with exam-specific practice, speaking correction, and personal guidance."
  ],
  [
    "Is communicative English available for daily fluency and work confidence?",
    "Yes. The communicative English program focuses on practical spoken English, confidence, expression, and real-use communication."
  ],
  [
    "Can working professionals attend after office hours?",
    "Yes. Flexible morning, evening, and weekend slots are available so training remains consistent."
  ],
  [
    "Can I choose one-to-one classes instead of group sessions?",
    "Yes. Learners can choose one-to-one mentoring or guided group sessions depending on their goal and comfort."
  ],
  [
    "Is there a free demo class before joining?",
    "Yes. You can enquire for a free demo to understand the teaching approach and choose the right course path."
  ]
] as const;

const heroMetrics = [
  ["Started 2024", "Founder-led from day one"],
  ["Online Classes", "Live and feedback-driven"],
  ["One-to-One & Group", "Formats that fit your goal"]
] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay }
  })
};

const stagger = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.08 }
  }
};

function Icon({ path, className = "h-5 w-5" }: { path: string; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d={path} />
    </svg>
  );
}

function SectionIntro({
  eyebrow,
  title,
  copy,
  align = "left",
  narrow = false,
  eyebrowClass = "text-ink/70",
  titleClass = "text-navy",
  copyClass = "text-slate"
}: SectionIntroProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
      variants={stagger}
      className={align === "center" ? "mx-auto max-w-3xl text-center" : narrow ? "max-w-2xl" : "max-w-4xl"}
    >
      <motion.p variants={fadeUp} className={`mb-4 text-xs font-extrabold uppercase tracking-[0.28em] ${eyebrowClass}`}>
        {eyebrow}
      </motion.p>
      <motion.h2 variants={fadeUp} className={`text-balance font-serif text-4xl leading-tight md:text-5xl ${titleClass}`}>
        {title}
      </motion.h2>
      {copy ? (
        <motion.p variants={fadeUp} className={`mt-5 text-base leading-8 md:text-lg ${copyClass}`}>
          {copy}
        </motion.p>
      ) : null}
    </motion.div>
  );
}

function NavBar() {
  const [scrolled, setScrolled] = useState<boolean>(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 18);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      animate={{ paddingTop: scrolled ? 8 : 18, paddingBottom: scrolled ? 8 : 18 }}
      className="fixed inset-x-0 top-0 z-50"
    >
      <div className={pageContainer}>
        <div
          className={[
            "flex items-center justify-between rounded-full border border-white/50 px-4 transition-all duration-300 md:px-6",
            scrolled ? "bg-cream/75 py-2 shadow-card backdrop-blur-xl" : "bg-cream/45 py-3 backdrop-blur-md"
          ].join(" ")}
        >
          <a href="#" className="font-serif text-2xl tracking-[0.01em] text-navy">
            <span className="text-gold">Think</span> in English
          </a>
          <nav className="hidden items-center gap-8 md:flex">
            {navItems.map(([label, href]) => (
              <a key={label} href={href} className="group relative text-sm font-semibold text-ink/80 transition hover:text-navy">
                <span className="inline-block transition-transform duration-300 group-hover:-translate-y-[1px]">{label}</span>
                <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-navy transition-transform duration-300 group-hover:scale-x-100" />
              </a>
            ))}
          </nav>
          <motion.a
            whileHover={{ y: -2, scale: 1.02 }}
            whileTap={{ scale: 0.99 }}
            href="#contact"
            className="gold-glow inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-bold text-primary-foreground shadow-float"
          >
            Book Free Demo
            <Icon path={icons.arrow} className="h-4 w-4" />
          </motion.a>
        </div>
      </div>
    </motion.header>
  );
}

function Hero() {
  const { scrollY } = useScroll();
  const yImage = useTransform(scrollY, [0, 500], [0, 40]);
  const yBadge = useTransform(scrollY, [0, 500], [0, -18]);
  const yParticle = useTransform(scrollY, [0, 500], [0, 24]);

  return (
    <section className="relative overflow-hidden pb-12 pt-36 md:pb-20 md:pt-40">
      <div className="absolute inset-x-0 top-0 h-[760px] bg-grain opacity-90" />
          <motion.div
        animate={
          isE2E
            ? { opacity: 0.55, scale: 1 }
            : { opacity: [0.45, 0.75, 0.45], scale: [1, 1.06, 1] }
        }
        transition={
          isE2E
            ? { duration: 0 }
            : { duration: 8, repeat: Infinity, ease: "easeInOut" }
        }
        className="absolute left-[-12%] top-16 h-72 w-72 rounded-full bg-goldTint/70 blur-3xl"
      />
      <motion.div
        animate={
          isE2E
            ? { opacity: 0.55, scale: 1 }
            : { opacity: [0.42, 0.7, 0.42], scale: [1, 1.08, 1] }
        }
        transition={
          isE2E
            ? { duration: 0 }
            : { duration: 9.5, repeat: Infinity, ease: "easeInOut" }
        }
        className="absolute right-[-8%] top-20 h-80 w-80 rounded-full bg-accent/80 blur-3xl"
      />
      <motion.div style={isE2E ? undefined : { y: yParticle }} className="absolute inset-0 hidden md:block">
        <span className="absolute left-[10%] top-[22%] h-2.5 w-2.5 rounded-full bg-gold/40 blur-[1px]" />
        <span className="absolute left-[19%] top-[34%] h-1.5 w-1.5 rounded-full bg-navy/20" />
        <span className="absolute right-[16%] top-[24%] h-3 w-3 rounded-full bg-goldTint/70 blur-[1px]" />
        <span className="absolute right-[12%] top-[44%] h-1.5 w-1.5 rounded-full bg-navy/20" />
      </motion.div>

      <div className={`relative ${pageContainer} grid items-center gap-12 lg:grid-cols-[1.05fr_.95fr] lg:gap-14`}>
        <motion.div initial="hidden" animate="show" variants={stagger} className="relative z-10">
          <motion.div variants={fadeUp} className="mb-7 flex flex-wrap gap-3">
            {["Founder-led mentoring", "Premium live online classes", "Serious exam coaching"].map((chip) => (
              <span
                key={chip}
                className="rounded-full border border-white/70 bg-white/65 px-4 py-2 text-xs font-extrabold uppercase tracking-[0.18em] text-ink/75 backdrop-blur"
              >
                {chip}
              </span>
            ))}
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="text-balance max-w-3xl font-serif text-[2.9rem] leading-[1] tracking-[-0.02em] text-navy md:text-[4.65rem] md:leading-[0.94]"
          >
            Learn English with
            <span className="block">
              <span className="text-gold">clarity</span>, confidence,
            </span>
            <span className="block">
              and <span className="text-gold">personal direction</span>.
            </span>
          </motion.h1>

          <motion.p variants={fadeUp} className="mt-6 max-w-2xl text-base leading-8 text-muted-foreground md:text-lg">
            Think in English is a serious online coaching institute for learners who want more than attendance. We guide IELTS, PTE,
            CELPIP, Duolingo, LanguageCert, and communicative English journeys with live feedback, warm accountability, and practical
            structure.
          </motion.p>

          <motion.p variants={fadeUp} className="mt-4 text-sm font-semibold uppercase tracking-[0.22em] text-ink/55">
            Unravel Your Journey of English
          </motion.p>

          <motion.div variants={fadeUp} className="mt-5 flex flex-wrap items-center gap-3 text-sm font-semibold text-ink/80">
            {["Live Classes", "Flexible Timings", "Personal Guidance"].map((item, index) => (
              <span key={item} className="flex items-center gap-3">
                {item}
                {index < 2 ? <span className="text-gold">/</span> : null}
              </span>
            ))}
          </motion.div>

          <motion.div variants={fadeUp} className="mt-8 flex flex-wrap gap-4">
            <motion.a
              whileHover={{ y: -3, scale: 1.02 }}
              whileTap={{ scale: 0.99 }}
              href="#contact"
              className="gold-glow inline-flex items-center gap-2 rounded-full bg-primary px-7 py-4 text-sm font-bold text-primary-foreground shadow-float"
            >
              Get Free Demo Class
              <Icon path={icons.arrow} className="h-4 w-4" />
            </motion.a>
            <motion.a
              whileHover={{ y: -2 }}
              href="https://wa.me/919999999999"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-white/75 px-7 py-4 text-sm font-bold text-primary shadow-card backdrop-blur"
            >
              WhatsApp Priority Enquiry
              <Icon path={icons.chat} className="h-4 w-4" />
            </motion.a>
          </motion.div>

          <motion.div variants={fadeUp} className="mt-8 grid gap-3 sm:grid-cols-3">
            {heroMetrics.map(([title, copy]) => (
              <div key={title} className="rounded-[1.6rem] border border-white/70 bg-white/55 p-4 shadow-card backdrop-blur">
                <p className="text-sm font-bold text-navy">{title}</p>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{copy}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.18 }}
          className="relative"
        >
          <motion.div
            style={isE2E ? undefined : { y: yImage }}
            whileHover={isE2E ? undefined : { scale: 1.01 }}
            className="relative mx-auto max-w-[560px] rounded-[2rem] border border-white/60 bg-[linear-gradient(160deg,rgba(255,255,255,0.9),rgba(234,244,250,0.82))] p-4 shadow-glow"
          >
            <div className="absolute -left-7 top-12 hidden h-52 w-40 rounded-[1.7rem] border border-[#d8c6b3] bg-[#efe2d4] lg:block" />
            <div className="absolute -right-6 bottom-10 hidden h-48 w-36 rounded-[1.7rem] border border-[#d7e1eb] bg-[#e5edf4] lg:block" />
            <div className="relative overflow-hidden rounded-[1.7rem]">
              <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#16253f]/40 via-transparent to-transparent" />
              <img
                src="https://images.unsplash.com/photo-1573496799652-408c2ac9fe98?auto=format&fit=crop&w=1200&q=80"
                srcSet="
                  https://images.unsplash.com/photo-1573496799652-408c2ac9fe98?auto=format&fit=crop&w=800&q=80 800w,
                  https://images.unsplash.com/photo-1573496799652-408c2ac9fe98?auto=format&fit=crop&w=1200&q=80 1200w,
                  https://images.unsplash.com/photo-1573496799652-408c2ac9fe98?auto=format&fit=crop&w=1600&q=80 1600w
                "
                sizes="(max-width: 1024px) 100vw, 560px"
                alt="Founder mentor of Think in English"
                width={1200}
                height={1440}
                loading="eager"
                fetchPriority="high"
                className="h-[520px] w-full object-cover md:h-[620px]"
              />
              <div className="absolute bottom-5 left-5 z-20 rounded-full border border-white/30 bg-[rgba(17,27,45,0.72)] px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-white backdrop-blur">
                Started in 2024 / Founder-led institute
              </div>
            </div>

            <motion.div
              style={isE2E ? undefined : { y: yBadge }}
              animate={isE2E ? { y: 0 } : { y: [0, -8, 0] }}
              transition={isE2E ? { duration: 0 } : { duration: 5.4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -left-6 top-6 hidden max-w-[220px] rounded-[1.4rem] border border-white/75 bg-white/82 p-4 shadow-card backdrop-blur md:block"
            >
              <div className="mb-2 flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.2em] text-ink/60">
                <Icon path={icons.star} className="h-4 w-4 text-gold" />
                Student trust
              </div>
              <p className="text-sm font-semibold leading-6 text-navy">
                Personal feedback, live correction, and measured progress instead of generic lectures.
              </p>
            </motion.div>

            <motion.div
              animate={isE2E ? { y: 0 } : { y: [0, 10, 0] }}
              transition={isE2E ? { duration: 0 } : { duration: 6.5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -right-5 bottom-7 hidden rounded-[1.4rem] border border-white/75 bg-white/85 p-4 shadow-card backdrop-blur md:block"
            >
              <div className="flex items-center gap-3">
                <div className="rounded-2xl bg-accent p-3 text-navy">
                  <Icon path={icons.trend} className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-ink/55">Learning model</p>
                  <p className="mt-1 text-sm font-semibold text-navy">Live classes / 1:1 / Group / Flexible</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function TrustStrip() {
  const list: TrustItem[] = [...trustItems, ...trustItems];
  return (
    <section className="pb-10">
      <div className={`${pageContainer} grid gap-5 lg:grid-cols-[.78fr_1.22fr]`}>
        <div className="rounded-[2rem] border border-border/70 bg-card/80 p-6 text-card-foreground shadow-card backdrop-blur">
          <p className="text-xs font-extrabold uppercase tracking-[0.24em] text-ink/55">Why learners enquire</p>
          <p className="mt-4 font-serif text-3xl leading-tight text-navy">
            Premium authority, personal guidance, and a path that feels genuinely human.
          </p>
        </div>
        <div className="marquee-wrap overflow-hidden rounded-[2rem] border border-border/70 bg-card/75 px-4 py-4 shadow-card backdrop-blur md:px-6">
          <div className={isE2E ? "flex flex-wrap gap-3" : "marquee-track flex gap-3"}>
            {list.map((item, index) => (
              <motion.div
                whileHover={{ y: -2 }}
                key={`${item.text}-${index}`}
                className="flex min-w-fit items-center gap-3 rounded-full border border-border bg-card px-4 py-3 text-sm font-semibold text-ink"
              >
                <span className="rounded-full bg-accent p-2 text-navy">
                  <Icon path={icons[item.icon]} className="h-4 w-4" />
                </span>
                {item.text}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function AboutSection() {
  return (
    <section id="about" className={`section-shell ${sectionSpacing}`}>
      <div className={`relative ${pageContainer} grid gap-10 lg:grid-cols-[1.05fr_.95fr]`}>
        <div>
          <SectionIntro
            eyebrow="About the institute"
            title="A warmer, sharper approach to English coaching."
            copy="Think in English was started in 2024 for learners who want guidance that feels serious, personal, and practical. We work with students, working professionals, and abroad aspirants who need real fluency, disciplined exam preparation, and the confidence to show up well."
            narrow
          />

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            variants={stagger}
            className="mt-8 grid gap-4 sm:grid-cols-2"
          >
            {aboutStats.map((item) => (
              <motion.article key={item.value} variants={fadeUp} className="rounded-[1.8rem] border border-border bg-white/80 p-6 shadow-card backdrop-blur">
                <p className="font-serif text-2xl text-navy">{item.value}</p>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">{item.note}</p>
              </motion.article>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="grid gap-5"
        >
          <div className="rounded-[2rem] border border-border bg-card p-5 shadow-card">
            <div className="grid gap-5 md:grid-cols-[1fr_1.15fr]">
              <img
                src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=900&q=80"
                srcSet="
                  https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=600&q=80 600w,
                  https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=900&q=80 900w,
                  https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=80 1200w
                "
                sizes="(max-width: 768px) 100vw, 420px"
                alt="Live founder-led English coaching session"
                width={900}
                height={1200}
                loading="lazy"
                className="h-full min-h-[280px] w-full rounded-[1.5rem] object-cover"
              />
              <div className="flex flex-col justify-between rounded-[1.5rem] bg-white p-6">
                <div>
                  <p className="text-xs font-extrabold uppercase tracking-[0.24em] text-ink/55">Founder note</p>
                  <p className="mt-5 font-serif text-3xl leading-tight text-navy">
                    "Learners do better when someone actually sees how they speak, think, and improve."
                  </p>
                </div>
                <div className="mt-6 border-t border-border pt-4">
                  <p className="text-sm font-bold text-navy">Think in English</p>
                  <p className="mt-1 text-sm leading-6 text-muted-foreground">
                    A founder-led online coaching institute with live correction, practical structure, and personal accountability.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-[1.2fr_.8fr]">
            <div className="rounded-[1.8rem] border border-border bg-primary p-6 text-primary-foreground shadow-float">
              <p className="text-xs font-extrabold uppercase tracking-[0.24em] text-white/55">Who we train</p>
              <ul className="mt-5 space-y-4 text-sm leading-7 text-white/82">
                {[
                  "12th graduates preparing for higher studies, interviews, and admissions.",
                  "Working professionals who need confident spoken English for career growth.",
                  "Abroad aspirants preparing for IELTS, PTE, CELPIP, Duolingo, and LanguageCert."
                ].map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-2 h-2 w-2 rounded-full bg-[#e2c8ab]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-[1.8rem] border border-border bg-almond p-6 shadow-card">
              <p className="text-xs font-extrabold uppercase tracking-[0.24em] text-ink/55">Teaching style</p>
              <p className="mt-4 text-lg font-semibold leading-8 text-navy">
                Less lecture. More guidance, speaking correction, and course design built around the learner.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function WhySection() {
  return (
    <section id="why-us" className={`section-shell bg-secondary/70 ${sectionSpacing}`}>
      <div className={`relative ${pageContainer}`}>
        <SectionIntro
          eyebrow="Why choose us"
          title="Premium without feeling distant. Personal without feeling casual."
          copy="The institute is designed to feel dependable and human. That means better pacing, better feedback, and a clearer sense of progress across every course."
        />

        <div className="mt-12 grid gap-5 lg:grid-cols-2">
          {whyItems.map((item, index) => (
            <motion.article
              key={item.title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.22 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: index * 0.08 }}
              whileHover={{ y: -6 }}
              className={[
                "group grid gap-6 rounded-[2rem] border border-border bg-white/70 p-7 shadow-card backdrop-blur hover:shadow-float",
                item.featured ? "lg:grid-cols-[.9fr_1.1fr] lg:p-8" : "md:grid-cols-[auto_1fr]"
              ].join(" ")}
            >
              <div className={`${item.tone} flex h-16 w-16 items-center justify-center rounded-[1.2rem] text-navy transition-transform duration-300 group-hover:-translate-y-1`}>
                <Icon path={icons[item.icon]} className="h-7 w-7" />
              </div>
              <div>
                <h3 className="text-2xl font-serif leading-tight text-navy">{item.title}</h3>
                <p className="mt-3 max-w-xl text-sm leading-7 text-muted-foreground md:text-base">{item.copy}</p>
                <div className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-navy">
                  <span className="h-px w-10 bg-navy/35" />
                  Intentional coaching design
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

function CoursesSection() {
  return (
    <section id="courses" className={`section-shell ${sectionSpacing}`}>
      <div className={`relative ${pageContainer}`}>
        <SectionIntro
          eyebrow="Courses"
          title="Programs built for score goals, communication confidence, and consistent improvement."
          copy="Each course is guided live and shaped around the learner's target, pace, and pressure points. The grid is intentionally varied so the section feels composed instead of templated."
        />

        <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-12">
          {courses.map((course, index) => {
            const layoutClass =
              index === 0 ? "xl:col-span-5 xl:row-span-2" :
              index === 1 ? "xl:col-span-4" :
              index === 2 ? "xl:col-span-3" :
              index === 3 ? "xl:col-span-3" :
              index === 4 ? "xl:col-span-4" : "xl:col-span-5";

            return (
              <motion.article
                key={course.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: index * 0.05 }}
                whileHover={{ y: -6 }}
                className={["shimmer-line group relative overflow-hidden rounded-[2rem] border border-border bg-gradient-to-br p-7 shadow-card hover:shadow-float", course.accent, layoutClass].join(" ")}
              >
                <div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold to-transparent" />
                </div>
                <div className="flex items-start justify-between gap-4">
                  <div className="gold-glow rounded-[1.15rem] bg-white/78 p-3 text-navy shadow-sm transition-transform duration-300 group-hover:-translate-y-1 group-hover:rotate-[-3deg]">
                    <Icon path={icons.book} className="h-6 w-6" />
                  </div>
                  <span className="rounded-full border border-[#d5c6b4] bg-white/70 px-3 py-2 text-[11px] font-extrabold uppercase tracking-[0.18em] text-ink/70">
                    {course.tag}
                  </span>
                </div>
                <h3 className={["mt-9 font-serif leading-tight text-navy", index === 0 ? "text-[2.3rem]" : "text-3xl"].join(" ")}>{course.name}</h3>
                <p className="mt-4 max-w-md text-sm leading-7 text-muted-foreground md:text-base">{course.outcome}</p>
                <p className="mt-4 text-xs font-extrabold uppercase tracking-[0.18em] text-ink/55">Outcome-led sessions with live correction</p>
                <div className="mt-8 flex items-center justify-between gap-4">
                  <div>
                    <p className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-ink/55">Duration</p>
                    <p className="mt-1 text-sm font-bold text-navy">{course.duration}</p>
                  </div>
                  <motion.a whileHover={{ x: 4 }} href="#contact" className="inline-flex items-center gap-2 text-sm font-bold text-navy">
                    Enquire course
                    <Icon path={icons.arrow} className="h-4 w-4" />
                  </motion.a>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function FormatSection() {
  return (
    <section id="format" className={`section-shell bg-primary ${sectionSpacing} text-primary-foreground`}>
      <div className={`relative ${pageContainer}`}>
        <SectionIntro
          eyebrow="Class format and timings"
          title="Choose the format that fits your pace, then keep the schedule realistic."
          copy="The right structure matters. Some learners need close correction. Others thrive in guided groups. Timings are designed to reduce friction so consistency becomes easier."
          eyebrowClass="text-white/52"
          titleClass="text-white"
          copyClass="text-white/72"
        />

        <div className="mt-12 grid gap-5 lg:grid-cols-[1.2fr_.8fr]">
          <div className="grid gap-5 md:grid-cols-3">
            {formats.map((item, index) => (
              <motion.article
                key={item.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: index * 0.08 }}
                className="rounded-[1.9rem] border border-white/10 bg-white/10 p-6 backdrop-blur"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-[1.1rem] bg-white/12 text-[#f3d7b5]">
                  <Icon path={icons[item.icon]} className="h-6 w-6" />
                </div>
                <h3 className="mt-8 font-serif text-3xl leading-tight text-white">{item.title}</h3>
                <p className="mt-4 text-sm leading-7 text-white/72">{item.text}</p>
                <p className="mt-7 text-xs font-extrabold uppercase tracking-[0.2em] text-white/48">{item.meta}</p>
              </motion.article>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.28 }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-[2rem] border border-white/10 bg-white/5 p-7 backdrop-blur"
          >
            <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-white/50">Weekly flow</p>
            <div className="mt-8 space-y-5">
              {[
                ["01", "Goal mapping", "Current level, target, and class format selection."],
                ["02", "Live sessions", "Speaking practice, task work, correction, and strategy."],
                ["03", "Review rhythm", "Feedback loops that keep momentum visible."]
              ].map(([step, title, copy]) => (
                <div key={step} className="flex gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/15 text-sm font-extrabold text-[#f1d7b8]">
                    {step}
                  </div>
                  <div>
                    <p className="text-lg font-semibold text-white">{title}</p>
                    <p className="mt-1 text-sm leading-7 text-white/70">{copy}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function TestimonialSection() {
  const testimonials = [
    {
      name: "Placeholder",
      role: "Student",
      quote: "Placeholder quote.",
      rating: "5.0",
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=320&q=80"
    }
  ];
  const [active, setActive] = useState<number>(0);
  const item = testimonials[active];

  return (
    <section id="testimonials" className={`section-shell ${sectionSpacing}`}>
      <div className={`relative ${pageContainer}`}>
        <div className="flex flex-col gap-8">
          <SectionIntro
            eyebrow="Student voices"
            title="Proof should feel human, not staged."
            copy="This reusable carousel now lives in the shadcn-style UI layer, making the testimonial block easier to reuse and maintain across the app."
            narrow
          />
          <div className="rounded-[2.2rem] border border-border bg-[linear-gradient(180deg,rgba(255,255,255,0.82),rgba(254,251,246,0.92))] px-4 py-8 shadow-glow backdrop-blur sm:px-8">
            <TestimonialCarouselDemo />
            <button
              type="button"
              onClick={() => setActive((current) => (current - 1 + testimonials.length) % testimonials.length)}
              className="hidden"
              aria-label="Previous testimonial"
            >
              <span className="text-lg">←</span>
            </button>
            <button
              type="button"
              onClick={() => setActive((current) => (current + 1) % testimonials.length)}
              className="hidden"
              aria-label="Next testimonial"
            >
              <span className="text-lg">→</span>
            </button>
          </div>
        </div>

        <div className="hidden">
          <div className="rounded-[2rem] border border-border bg-card p-7 shadow-card">
            <div className="flex gap-3">
              {testimonials.map((person, index) => (
                <button
                  key={person.name}
                  type="button"
                  onClick={() => setActive(index)}
                  className={[
                    "flex items-center gap-3 rounded-full border px-3 py-2 text-left transition",
                    index === active ? "border-navy bg-navy text-white shadow-card" : "border-border bg-white/80 text-navy"
                  ].join(" ")}
                >
                  <img src={person.image} alt={person.name} width={40} height={40} loading="lazy" className="h-10 w-10 rounded-full object-cover" />
                  <span className="hidden text-sm font-semibold sm:inline">{person.name}</span>
                </button>
              ))}
            </div>

            <div className="mt-10 grid gap-5">
              <div className="rounded-[1.6rem] bg-white p-6 shadow-card">
                <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-ink/55">Student type</p>
                <p className="mt-3 font-serif text-3xl text-navy">{item.role}</p>
              </div>
              <div className="rounded-[1.6rem] bg-primary p-6 text-white shadow-float">
                <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-white/50">Rating</p>
                <p className="mt-3 flex items-center gap-2 text-[#e7c89f]">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Icon key={index} path={icons.star} className="h-5 w-5" />
                  ))}
                </p>
                <p className="mt-3 text-sm font-semibold text-white/82">{item.rating} / 5 from guided student experience</p>
              </div>
            </div>
          </div>

          <div className="rounded-[2rem] border border-border bg-white/75 p-8 shadow-glow backdrop-blur">
            <AnimatePresence mode="wait">
              <motion.div
                key={item.name}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                  <div className="flex items-center gap-4">
                    <div className="gold-glow rounded-[1.5rem] p-1">
                      <img src={item.image} alt={item.name} width={64} height={64} loading="lazy" className="h-16 w-16 rounded-[1.2rem] object-cover shadow-card" />
                    </div>
                    <div>
                      <p className="text-lg font-bold text-navy">{item.name}</p>
                      <p className="text-sm text-muted-foreground">{item.role}</p>
                    </div>
                  </div>
                  <div className="rounded-full border border-border bg-card px-4 py-2 text-xs font-extrabold uppercase tracking-[0.18em] text-ink/60">
                    Demo testimonial
                  </div>
                </div>

                <p className="mt-10 max-w-3xl font-serif text-[2rem] leading-tight text-navy md:text-[2.8rem]">“{item.quote}”</p>

                <div className="mt-10 flex items-center justify-between border-t border-border pt-6">
                  <p className="max-w-md text-sm leading-7 text-muted-foreground">
                    The section uses timed motion and stronger quote treatment so the testimonials feel alive rather than parked in static cards.
                  </p>
                  <a href="#contact" className="inline-flex items-center gap-2 text-sm font-bold text-navy">
                    Book your demo
                    <Icon path={icons.arrow} className="h-4 w-4" />
                  </a>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

function FAQSection() {
  const [open, setOpen] = useState<number>(0);

  return (
    <section id="faq" className={`section-shell bg-secondary/70 ${sectionSpacing}`}>
      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <SectionIntro
          eyebrow="FAQ"
          title="Questions serious learners ask before they join."
          copy="The accordion has been rebuilt with better spacing, smoother transitions, and clearer scanability."
          align="center"
        />

        <div className="mt-12 space-y-4">
          {faqs.map(([question, answer], index) => {
            const isOpen = open === index;
            return (
              <motion.div
                key={question}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: index * 0.04 }}
                className="overflow-hidden rounded-[1.8rem] border border-border bg-white/75 shadow-card backdrop-blur"
              >
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? -1 : index)}
                  className="flex w-full items-center justify-between gap-4 px-6 py-6 text-left md:px-7"
                >
                  <span className="text-base font-bold leading-7 text-navy md:text-lg">{question}</span>
                  <motion.span animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3 }} className="text-navy">
                    <Icon path={isOpen ? "M5 12h14" : icons.plus} className="h-5 w-5" />
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen ? (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <div className="px-6 pb-7 text-sm leading-8 text-muted-foreground md:px-7 md:text-base">{answer}</div>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  const [submitted, setSubmitted] = useState<boolean>(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
    window.setTimeout(() => setSubmitted(false), 3000);
  };

  const contactChips = [
    ["WhatsApp", "+91 99999 99999", "https://wa.me/919999999999", "chat"],
    ["Email", "hello@thinkinenglish.in", "mailto:hello@thinkinenglish.in", "mail"],
    ["Call", "+91 99999 99999", "tel:+919999999999", "phone"]
  ] as const;

  return (
    <section id="contact" className={`section-shell ${sectionSpacing}`}>
      <div className={`relative ${pageContainer}`}>
        <div className="overflow-hidden rounded-[2.4rem] border border-border bg-[linear-gradient(135deg,#1c2a44_0%,#243453_45%,#efe4d3_45.1%,#fbf6ef_100%)] shadow-glow">
          <div className="grid gap-0 lg:grid-cols-[.95fr_1.05fr]">
            <div className="p-8 text-white md:p-10 lg:p-12">
              <p className="text-xs font-extrabold uppercase tracking-[0.26em] text-white/52">Contact / Enquiry</p>
              <h2 className="mt-5 max-w-lg font-serif text-4xl leading-tight text-white md:text-[3.2rem]">
                Start with a demo class and get the right recommendation.
              </h2>
              <p className="mt-5 max-w-xl text-base leading-8 text-white/74">
                Share your goal, target exam, or confidence challenge. We will suggest the most suitable course format and timing instead of pushing a generic batch.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                {contactChips.map(([label, value, href, icon]) => (
                  <motion.a
                    whileHover={{ y: -2 }}
                    key={label}
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="inline-flex items-center gap-3 rounded-full border border-white/14 bg-white/10 px-4 py-3 text-sm font-semibold text-white backdrop-blur"
                  >
                    <span className="rounded-full bg-white/12 p-2">
                      <Icon path={icons[icon]} className="h-4 w-4" />
                    </span>
                    <span>{label}: {value}</span>
                  </motion.a>
                ))}
              </div>

              <div className="mt-10 rounded-[1.7rem] border border-white/12 bg-white/8 p-6 backdrop-blur">
                <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-white/50">Trust cues</p>
                <div className="mt-5 grid gap-3">
                  {[
                    "Founder-led training with personal feedback loops",
                    "Live online sessions for exam prep and spoken confidence",
                    "Suitable for students, professionals, and abroad aspirants"
                  ].map((item) => (
                    <div key={item} className="flex gap-3 text-sm leading-7 text-white/76">
                      <span className="mt-2 text-[#e8c79d]">
                        <Icon path={icons.check} className="h-4 w-4" />
                      </span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-card p-8 md:p-10 lg:p-12">
              <div className="mx-auto max-w-xl">
                <p className="text-xs font-extrabold uppercase tracking-[0.26em] text-ink/55">Book a free demo</p>
                <p className="mt-4 text-2xl font-serif leading-tight text-navy md:text-4xl">
                  Reserve your demo class and get the right course recommendation today.
                </p>
                <p className="mt-4 text-base leading-8 text-muted-foreground">
                  Clean form styling, direct WhatsApp access, and visible response confidence make this block work harder for conversions.
                </p>

                <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-[#ead7b1] bg-[#fff7e8] px-4 py-2 text-xs font-extrabold uppercase tracking-[0.16em] text-[#8b7440] shadow-sm">
                  <span className="h-2 w-2 rounded-full bg-gold" />
                  Limited demo slots this week
                </div>

                <motion.a
                  whileHover={{ y: -2 }}
                  href="https://wa.me/919999999999"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex items-center gap-2 rounded-full border border-[#d6c8ab] bg-white px-5 py-3 text-sm font-bold text-navy shadow-card"
                >
                  Instant WhatsApp Contact
                  <Icon path={icons.chat} className="h-4 w-4" />
                </motion.a>

                <form onSubmit={handleSubmit} className="mt-8 grid gap-5">
                  {[
                    ["Full Name", "text", "Your name"],
                    ["Phone / WhatsApp", "tel", "+91"],
                    ["Target Score / Goal", "text", "Example: IELTS 7+ or spoken fluency"]
                  ].map(([label, type, placeholder]) => (
                    <label key={label} className="grid gap-2 text-sm font-bold text-navy">
                      {label}
                      <input
                        type={type}
                        placeholder={placeholder}
                        required
                        className="rounded-2xl border border-border bg-white px-4 py-4 text-sm font-medium text-ink outline-none focus:-translate-y-[1px] focus:border-gold focus:shadow-[0_0_0_4px_rgba(182,144,99,0.14)]"
                      />
                    </label>
                  ))}

                  <label className="grid gap-2 text-sm font-bold text-navy">
                    Course Interested
                    <select className="rounded-2xl border border-border bg-white px-4 py-4 text-sm font-medium text-ink outline-none focus:border-gold focus:shadow-[0_0_0_4px_rgba(182,144,99,0.14)]">
                      <option>IELTS</option>
                      <option>PTE</option>
                      <option>CELPIP</option>
                      <option>Duolingo</option>
                      <option>LanguageCert</option>
                      <option>Communicative English</option>
                    </select>
                  </label>

                  <label className="grid gap-2 text-sm font-bold text-navy">
                    Message
                    <textarea
                      placeholder="Preferred timings, current level, or what you want help with"
                      className="min-h-[136px] rounded-2xl border border-border bg-white px-4 py-4 text-sm font-medium text-ink outline-none focus:border-gold focus:shadow-[0_0_0_4px_rgba(182,144,99,0.14)]"
                    />
                  </label>

                  <motion.button
                    whileHover={{ y: -2, scale: 1.01 }}
                    whileTap={{ scale: 0.995 }}
                    type="submit"
                    className={[
                      "mt-2 inline-flex items-center justify-center gap-2 rounded-full px-6 py-4 text-sm font-extrabold uppercase tracking-[0.14em] text-white shadow-float",
                      submitted ? "bg-[#305f51]" : "bg-primary"
                    ].join(" ")}
                  >
                    {submitted ? "Enquiry Sent" : "Send Enquiry"}
                    <Icon path={submitted ? icons.check : icons.arrow} className="h-4 w-4" />
                  </motion.button>
                  <p className="text-center text-sm font-semibold text-muted-foreground">We respond within 15 mins</p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const socialIcons = [
    ["Instagram", "https://instagram.com/thinkinenglish", "M7 2C4.2 2 2 4.2 2 7v10c0 2.8 2.2 5 5 5h10c2.8 0 5-2.2 5-5V7c0-2.8-2.2-5-5-5H7zm10 2a3 3 0 110 6 3 3 0 010-6zm4.5-.9a1.1 1.1 0 110 2.2 1.1 1.1 0 010-2.2zM12 7a5 5 0 100 10 5 5 0 000-10z"],
    ["Facebook", "https://facebook.com/thinkinenglish", "M15 8h3V4h-3c-2.8 0-5 2.2-5 5v3H7v4h3v6h4v-6h3.2l.8-4H14V9c0-.6.4-1 1-1z"],
    ["YouTube", "https://youtube.com/@thinkinenglish", "M22 12s0-3.4-.4-5c-.2-1.1-1.1-2-2.2-2.2C17.8 4.4 12 4.4 12 4.4s-5.8 0-7.4.4c-1.1.2-2 1.1-2.2 2.2C2 8.6 2 12 2 12s0 3.4.4 5c.2 1.1 1.1 2 2.2 2.2 1.6.4 7.4.4 7.4.4s5.8 0 7.4-.4c1.1-.2 2-1.1 2.2-2.2.4-1.6.4-5 .4-5zM10 15.5v-7l6 3.5-6 3.5z"]
  ] as const;

  return (
    <footer className="border-t border-border bg-secondary/80 py-12">
      <div className={`${pageContainer} grid gap-8 lg:grid-cols-[1.2fr_.8fr]`}>
        <div>
          <a href="#" className="font-serif text-3xl text-navy">
            <span className="text-gold">Think</span> in English
          </a>
          <p className="mt-4 max-w-xl text-sm leading-7 text-muted-foreground">
            Premium, founder-led online English coaching for exam performance and practical confidence. Designed to feel serious, warm, and result-oriented from the first enquiry to the final class.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            {socialIcons.map(([label, href, path]) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-white/75 text-navy shadow-card"
                aria-label={label}
              >
                <Icon path={path} className="h-4 w-4" />
              </a>
            ))}
            <a href="#contact" className="gold-glow ml-1 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-bold text-primary-foreground">
              Book Demo
              <Icon path={icons.arrow} className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div className="grid gap-8 sm:grid-cols-2">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-ink/55">Navigate</p>
            <div className="mt-4 grid gap-3 text-sm font-semibold text-navy">
              {[
                ["About", "#about"],
                ["Courses", "#courses"],
                ["Stories", "#testimonials"],
                ["FAQ", "#faq"]
              ].map(([label, href]) => (
                <a key={label} href={href} className="transition hover:translate-x-1">
                  {label}
                </a>
              ))}
            </div>
          </div>
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-ink/55">Connect</p>
            <div className="mt-4 grid gap-3 text-sm font-semibold text-navy">
              {[
                ["Instagram", "https://instagram.com/thinkinenglish"],
                ["Facebook", "https://facebook.com/thinkinenglish"],
                ["YouTube", "https://youtube.com/@thinkinenglish"],
                ["WhatsApp", "https://wa.me/919999999999"],
                ["Email", "mailto:hello@thinkinenglish.in"]
              ].map(([label, href]) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="transition hover:translate-x-1"
                >
                  {label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className={`${pageContainer} mt-8 border-t border-border pt-6 text-sm text-muted-foreground`}>
        Copyright 2024 Think in English. Unravel Your Journey of English.
      </div>
    </footer>
  );
}

function FloatingWhatsApp() {
  return (
    <>
      <motion.a
        href="https://wa.me/919999999999"
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ y: -3 }}
        whileTap={{ scale: 0.98 }}
        className="fixed bottom-5 right-5 z-50 hidden h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-float md:inline-flex"
        aria-label="Chat on WhatsApp"
      >
        <Icon path={icons.chat} className="h-6 w-6" />
      </motion.a>
      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-cream/95 px-4 py-3 backdrop-blur md:hidden">
        <div className="mx-auto flex w-full max-w-md gap-3">
          <a href="#contact" className="flex-1 rounded-full bg-primary px-4 py-3 text-center text-sm font-extrabold uppercase tracking-[0.12em] text-primary-foreground">
            Book Demo
          </a>
          <a
            href="https://wa.me/919999999999"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 rounded-full border border-[#d8c9a9] bg-white px-4 py-3 text-center text-sm font-extrabold uppercase tracking-[0.12em] text-navy"
          >
            WhatsApp
          </a>
        </div>
      </div>
    </>
  );
}

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen">
        <NavBar />
        <main>
          <Hero />
          <TrustStrip />
          <AboutSection />
          <WhySection />
          <CoursesSection />
          <FormatSection />
          <TestimonialSection />
          <FAQSection />
          <ContactSection />
        </main>
        <Footer />
        <FloatingWhatsApp />
      </div>
    </MotionConfig>
  );
}
