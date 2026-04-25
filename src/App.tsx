import { useEffect, useState, type FormEvent } from "react";
import {
  AnimatePresence,
  MotionConfig,
  motion,
  useScroll,
  useTransform,
  type Variants
} from "motion/react";
import { Testimonials } from "@/components/ui/testimonials-demo";

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
  { icon: "shield", text: "Honest feedback, no sugarcoating" },
  { icon: "clock", text: "Classes that fit your life" },
  { icon: "users", text: "I actually listen and correct you" },
  { icon: "chat", text: "Stop translating in your head" },
  { icon: "target", text: "Only practice what moves your score" },
  { icon: "book", text: "I teach every class myself" }
];

const aboutStats: AboutStat[] = [
  { value: "No generic templates", note: "I don't hand you a PDF and leave. We build your responses together." },
  { value: "Live human correction", note: "If you hesitate or mispronounce, I stop you and fix it right there." },
  { value: "Tailored pacing", note: "Some students need a week, some need three months. We decide together." },
  { value: "Zero crowded batches", note: "I work with individuals or small groups where I know everyone's weak spots." }
];

const whyItems: WhyItem[] = [
  {
    title: "No generic syllabus. We practice only what you need.",
    copy: "We don't waste time on chapters you already know. On day one, we find your weak spots, map your goal, and work exclusively on what will actually move the needle for your exam or fluency.",
    icon: "target",
    tone: "bg-goldTint"
  },
  {
    title: "Immediate correction, not 'feedback at the end'.",
    copy: "If you stumble on a pronunciation or mess up a grammar tense, we pause. We fix it until it sounds natural. Fluency is built by correcting bad habits the moment they happen.",
    icon: "chat",
    tone: "bg-accent"
  },
  {
    title: "I actually look at your essays and rewrite them with you.",
    copy: "I don't just give you a band score. I take your paragraph, show you exactly why it feels clumsy, and we rewrite it live so you understand the logic behind the score.",
    icon: "layers",
    tone: "bg-[var(--soft-cream)]",
    featured: true
  },
  {
    title: "Built around your chaotic adult schedule.",
    copy: "Whether you're finishing college, managing a 9-to-5, or juggling a family—this isn't a rigid school. We find timings that let you remain consistent without burning out.",
    icon: "clock",
    tone: "bg-[#EEF3ED]"
  }
];

const courses: Course[] = [
  {
    name: "IELTS Prep",
    tag: "High impact",
    outcome: "Stop guessing what the examiner wants. We fix your exact speaking and writing blocks.",
    duration: "4-8 weeks",
    accent: "from-[#f3dfcc] via-[#fff7ee] to-white"
  },
  {
    name: "PTE Training",
    tag: "Score driven",
    outcome: "Master the algorithm. I'll show you exactly how the microphone picks up your confidence.",
    duration: "3-6 weeks",
    accent: "from-[#dfeaf2] via-[#f9fbfd] to-white"
  },
  {
    name: "CELPIP",
    tag: "Canada route",
    outcome: "Immigration-focused prep that doesn't feel like returning to high school.",
    duration: "4-6 weeks",
    accent: "from-[#efe3d7] via-[#fdf7f1] to-white"
  },
  {
    name: "Duolingo",
    tag: "Fast-track",
    outcome: "Quick, intense practice for students making sudden university leaps.",
    duration: "2-4 weeks",
    accent: "from-[#e6ece2] via-[#fafcf8] to-white"
  },
  {
    name: "LanguageCert",
    tag: "Hyper focused",
    outcome: "Targeted speaking drills to ensure you don't freeze under pressure.",
    duration: "3-5 weeks",
    accent: "from-[#ece6f4] via-[#fbfafe] to-white"
  },
  {
    name: "Real Fluency",
    tag: "Confidence",
    outcome: "Stop translating from your native language before you speak. Own your voice at work.",
    duration: "Until you're ready",
    accent: "from-[#f5e7dc] via-[#fffaf5] to-white"
  }
];

const formats: FormatCard[] = [
  {
    title: "1:1 Mentoring",
    text: "For professionals or students who have zero time to waste. Total focus on your exact speaking and writing blocks.",
    meta: "Best for immediate acceleration",
    icon: "spark"
  },
  {
    title: "Small Groups",
    text: "Instead of hiding in a batch of 50, you practice in a small circle where I still correct your pronunciation every day.",
    meta: "Best for consistency & routine",
    icon: "users"
  },
  {
    title: "Flexible Scheduling",
    text: "Your career and studies don't pause for coaching. We find morning, evening, or weekend slots that actually work.",
    meta: "Best for chaotic calendars",
    icon: "calendar"
  }
];

const isE2E =
  typeof window !== "undefined" &&
  new URLSearchParams(window.location.search).has("e2e");

const faqs = [
  [
    "Do you just hand out IELTS and PTE templates?",
    "No. Templates only get you so far before the algorithm flags you. I teach you the structure, then correct exactly how you apply it so it sounds completely natural."
  ],
  [
    "What if I'm extremely hesitant to speak in English?",
    "That's exactly why we do small groups or 1:1. You won't be judged. We will literally pause the class, fix the sentence structure together, and try again until you don't even have to think about it."
  ],
  [
    "How is this different from local batch coaching?",
    "I teach every class. There are no junior tutors or 50-student batches where you never get to speak. If you write an essay, I am the one grading it line by line."
  ],
  [
    "I work late. Can I still attend?",
    "Yes. Half my students are working professionals. We offer flexible early morning, late evening, and weekend slots so you don't have to miss meetings."
  ],
  [
    "Can I choose one-to-one classes instead of group sessions?",
    "Absolutely. If you have severe time constraints or very specific weaknesses, 1:1 is the fastest way to fix them."
  ],
  [
    "Can I try a class before committing?",
    "Yes. Book a free demo class. Let's look at where you currently are, and I'll tell you honestly exactly what it will take to hit your goal."
  ]
] as const;

const heroMetrics = [
  ["Never Outsourced", "I teach every class myself"],
  ["Live Correction", "We fix issues as you speak"],
  ["No Crowded Batches", "1:1 and small precision groups"]
] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 34 },
  show: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] as const, delay }
  })
};

const stagger = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.14, delayChildren: 0.1 }
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
            "flex items-center justify-between rounded-full border border-border/30 px-4 transition-all duration-300 md:px-6",
            scrolled ? "bg-cream/75 py-2 shadow-card " : "bg-cream/45 py-3 "
          ].join(" ")}
        >
          <a href="#" className="font-serif text-2xl tracking-[0.01em] text-navy">
            <span className="text-gold">Think</span> in English
          </a>
          <nav className="hidden items-center gap-8 md:flex">
            {navItems.map(([label, href]) => (
              <a key={label} href={href} className="group relative text-sm font-semibold text-ink/80 transition hover:text-navy">
                <span className="inline-block transition-transform duration-300 group-">{label}</span>
                <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-navy transition-transform duration-300 group-hover:scale-x-100" />
              </a>
            ))}
          </nav>
          <motion.a
            
            whileTap={{ scale: 0.99 }}
            href="#contact"
            className="gold-glow inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-bold text-primary-foreground shadow-sm"
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
          <motion.div variants={fadeUp} className="mb-10 border-t-2 border-navy/20 pt-4 max-w-[280px]">
            <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-navy/70">
              Founder-led mentoring &bull; Live online
            </p>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="text-balance max-w-3xl font-serif text-[3.6rem] leading-[1.05] tracking-[-0.02em] text-navy lg:text-[5.5rem]"
          >
            English isn't just grammar.
            <span className="block mt-1">
              It’s how you shape your voice.
            </span>
          </motion.h1>

          <motion.p variants={fadeUp} className="mt-8 max-w-2xl text-base leading-8 text-muted-foreground md:text-xl">
            Real fluency doesn't happen in crowded batches. Whether you're aiming for an IELTS 8.0, preparing for Canada, or just want to stop translating in your head before you speak—I work with you until it clicks. No templates, just real coaching.
          </motion.p>

          <motion.p variants={fadeUp} className="mt-5 text-sm font-semibold uppercase tracking-[0.22em] text-ink/55">
            Your Voice, Amplified
          </motion.p>

          <motion.div variants={fadeUp} className="mt-5 flex flex-wrap items-center gap-3 text-sm font-semibold text-ink/80">
            {["Live Classes", "Flexible Timings", "Personal Guidance"].map((item, index) => (
              <span key={item} className="flex items-center gap-3">
                {item}
                {index < 2 ? <span className="text-gold">/</span> : null}
              </span>
            ))}
          </motion.div>

          <motion.div variants={fadeUp} className="mt-10 flex flex-wrap gap-4">
            <motion.a
              
              whileTap={{ scale: 0.99 }}
              href="#contact"
              className="gold-glow inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-sm font-bold text-primary-foreground shadow-sm"
            >
              Let's Discuss Your Timeline
              <Icon path={icons.arrow} className="h-4 w-4" />
            </motion.a>
            <motion.a
              
              href="https://wa.me/919999999999"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-white/75 px-8 py-4 text-sm font-bold text-primary shadow-card "
            >
              Talk directly to me
              <Icon path={icons.chat} className="h-4 w-4" />
            </motion.a>
          </motion.div>

          <motion.div variants={fadeUp} className="mt-8 grid gap-3 sm:grid-cols-3">
            {heroMetrics.map(([title, copy]) => (
              <div key={title} className="rounded-xl border border-border/30 bg-white/55 p-4 shadow-card ">
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
            whileHover={isE2E ? undefined : { scale: 1.01, rotate: -0.5 }}
            className="relative mx-auto max-w-[560px] rounded-xl border border-border/30 bg-[linear-gradient(160deg,rgba(255,255,255,0.9),rgba(234,244,250,0.82))] p-4 shadow-sm  origin-bottom"
          >
            <div className="absolute -left-7 top-12 hidden h-52 w-40 rounded-xl border border-[var(--gold-accent)] bg-[var(--soft-cream)] lg:block rotate-3" />
            <div className="absolute -right-6 bottom-10 hidden h-48 w-36 rounded-xl border border-[#d7e1eb] bg-[var(--pastel-sky)] lg:block " />
            <div className="relative overflow-hidden rounded-xl">
              <div className="absolute inset-0 z-10 bg-gradient-to-t from-[var(--deep-blue)]/50 via-transparent to-transparent" />
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
                className="h-[520px] w-full object-cover md:h-[620px] scale-105"
              />
              <div className="absolute bottom-0 left-0 right-0 z-20 bg-gradient-to-t from-navy/80 to-transparent p-6 pt-24 text-center md:text-left">
                <p className="text-sm font-bold tracking-widest uppercase text-white/90">
                  Teaching doesn't happen without trust.
                </p>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-navy/10 pt-4">
              <div>
                <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-navy/50">Learning Model</p>
                <p className="mt-1 text-sm font-bold text-navy">Live classes / 1:1 & Group options</p>
              </div>
              <div className="text-right hidden sm:block">
                <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-navy/50">Student Trust</p>
                <p className="mt-1 text-sm font-bold text-navy whitespace-nowrap">Rigorous, measured progress</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function TrustStrip() {
  const list: TrustItem[] = trustItems;
  return (
    <section className="pb-10">
      <div className={`${pageContainer}`}>
        <div className="border-b border-navy/10 pb-6">
          <p className="text-xs font-extrabold uppercase tracking-[0.24em] text-navy/55">Why learners enquire</p>
          <p className="mt-4 font-serif text-3xl leading-tight text-navy max-w-3xl">
            Premium authority, personal guidance, and a path that feels genuinely human.
          </p>
        </div>
        <div className="mt-8 grid gap-x-8 gap-y-6 md:grid-cols-2 lg:grid-cols-3">
            {list.map((item, index) => (
              <div
                key={`${item.text}-${index}`}
                className="flex items-start gap-4"
              >
                <span className="mt-1 text-gold">
                  <Icon path={icons[item.icon]} className="h-5 w-5" />
                </span>
                <span className="text-sm font-semibold leading-7 text-navy/80">
                  {item.text}
                </span>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
}

function AboutSection() {
  return (
    <section id="about" className={`section-shell ${sectionSpacing}`}>
      <div className={`relative ${pageContainer} grid gap-14 lg:grid-cols-[1.25fr_0.75fr] items-center`}>
        <div className="relative z-10 lg:-mr-12">
          <SectionIntro
            eyebrow="My philosophy"
            title="Coaching is a conversation, not a lecture."
            copy="I didn't start this to build a factory. Most institutes fail because they hand you templates instead of teaching you how to think. Here, I sit with you, I hear your hesitations, and we correct your mistakes in real-time until they disappear."
            narrow
          />

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            variants={stagger}
            className="mt-10 grid gap-4 sm:grid-cols-2"
          >
            {aboutStats.map((item) => (
              <motion.article key={item.value} variants={fadeUp} className="rounded-none border-t border-navy/20 pt-6 pb-4">
                <p className="font-serif text-[1.35rem] leading-tight text-navy">{item.value}</p>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">{item.note}</p>
              </motion.article>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50, rotate: 2 }}
          whileInView={{ opacity: 1, y: 0, rotate: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="grid gap-6 relative"
        >
          <div className="rounded-xl border border-border bg-white p-6 shadow-[0_32px_80px_rgba(1,54,72,0.12)]">
            <div className="grid gap-6">
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
                className="h-[380px] w-full rounded-xl object-cover"
              />
              <div className="flex flex-col justify-between rounded-xl bg-almond/30 p-8">
                <div>
                  <p className="font-handwriting text-4xl leading-tight text-navy  opacity-90">
                    "Learners improve when they realize they aren't being judged, they're being guided."
                  </p>
                </div>
                <div className="mt-8">
                  <p className="text-sm font-bold text-navy uppercase tracking-widest">A. Mentor</p>
                  <p className="mt-1 text-sm text-slate">Founder, Think in English</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-[1.2fr_.8fr]">
            <div className="rounded-xl border border-border bg-primary p-6 text-primary-foreground shadow-sm">
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
            <div className="rounded-xl border border-border bg-almond p-6 shadow-card">
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
          eyebrow="My Approach"
          title="Premium without feeling distant. Personal without feeling casual."
          copy="I don't believe in running a factory. The coaching is designed to feel dependable and distinctly human. That means honest feedback and a clear sense of progress."
        />

        <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {whyItems.map((item, index) => {
            const isWide = index === 0 || index === 3;
            const spanClass = isWide ? "md:col-span-2 xl:col-span-2" : "col-span-1";
            return (
              <motion.article
                key={item.title}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1], delay: index * 0.08 }}
                
                className={[
                  "group flex flex-col justify-between gap-8 rounded-xl border border-border bg-white/80 p-8 sm:p-10 shadow-[0_12px_40px_rgba(1,54,72,0.06)]  transition-all",
                  spanClass,
                  isWide ? "lg:flex-row lg:items-center" : ""
                ].join(" ")}
              >
                <div>
                  <div className={`${item.tone} mb-8 flex h-16 w-16 items-center justify-center rounded-xl text-navy shadow-sm transition-transform duration-500 group-hover: group-hover:scale-110`}>
                    <Icon path={icons[item.icon]} className="h-7 w-7" />
                  </div>
                  <h3 className="text-2xl font-serif leading-tight text-navy lg:text-[1.8rem]">{item.title}</h3>
                </div>
                <div className={isWide ? "lg:max-w-md" : ""}>
                  <p className="text-sm leading-8 text-muted-foreground md:text-base">{item.copy}</p>
                  <div className="mt-6 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.15em] text-navy/70">
                    <span className="h-px w-10 bg-gold/50" />
                    Handcrafted pacing
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

const gridVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.2,
      ease: [0.16, 1, 0.3, 1], // Custom smooth ease out
    },
  },
  hover: {
    y: -8,
    scale: 1.015,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const iconVariants: Variants = {
  hidden: { y: 0, scale: 1 },
  show: { y: 0, scale: 1 },
  hover: { 
    y: -4, 
    scale: 1.05, 
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } 
  },
};

const arrowVariants: Variants = {
  hidden: { x: 0 },
  show: { x: 0 },
  hover: { 
    x: 6, 
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } 
  },
};

const badgeVariants: Variants = {
  hidden: { backgroundColor: "rgba(255,255,255,0.8)", borderColor: "rgba(213, 198, 180, 1)" },
  show: { backgroundColor: "rgba(255,255,255,0.8)", borderColor: "rgba(213, 198, 180, 1)" },
  hover: { 
    backgroundColor: "rgba(255,255,255,0.95)", 
    borderColor: "rgba(173, 151, 89, 0.5)", 
    transition: { duration: 0.4, ease: "easeOut" } 
  },
};

const glowVariants: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 0 },
  hover: { 
    opacity: 1, 
    transition: { duration: 0.6, ease: "linear" } 
  },
};

function CourseCard({ course }: { course: Course }) {
  return (
    <motion.article
      variants={cardVariants}
      whileHover="hover"
      className={["shimmer-line relative overflow-hidden rounded-xl border border-border bg-gradient-to-br p-8 shadow-[0_16px_50px_rgba(1,54,72,0.06)] hover:shadow-[0_24px_60px_rgba(1,54,72,0.12)] hover:border-navy/15 transition-all duration-700 flex flex-col cursor-pointer", course.accent].join(" ")}
      style={{ transformOrigin: "bottom center" }}
    >
      <motion.div variants={glowVariants} className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-gold to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-white/60 to-transparent" />
      </motion.div>

      <div className="flex items-start justify-between gap-4 relative z-10">
        <motion.div variants={iconVariants} className="gold-glow rounded-xl bg-white/78 p-3 text-navy shadow-sm">
          <Icon path={icons.book} className="h-6 w-6" />
        </motion.div>
        <motion.span variants={badgeVariants} className="rounded-full border px-4 py-2 text-[10px] font-extrabold uppercase tracking-[0.2em] text-ink/80 shadow-sm">
          {course.tag}
        </motion.span>
      </div>
      
      <h3 className="mt-10 font-serif text-[2rem] leading-tight text-navy relative z-10">{course.name}</h3>
      <p className="mt-5 max-w-md text-sm leading-8 text-muted-foreground md:text-[0.95rem] relative z-10">{course.outcome}</p>
      
      <div className="mt-auto relative z-10">
        <p className="mt-10 text-[10px] font-extrabold uppercase tracking-[0.2em] text-ink/40">Directed correction</p>
        <div className="mt-6 flex items-center justify-between gap-4 border-t border-navy/5 pt-6">
          <div>
            <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-ink/40">Duration</p>
            <p className="mt-1 text-sm font-bold text-navy">{course.duration}</p>
          </div>
          <div className="inline-flex items-center gap-2 text-sm font-bold text-navy">
            Discuss path
            <motion.span variants={arrowVariants}>
              <Icon path={icons.arrow} className="h-4 w-4" />
            </motion.span>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

function CoursesSection() {
  return (
    <section id="courses" className={`section-shell ${sectionSpacing}`}>
      <div className={`relative ${pageContainer}`}>
        <SectionIntro
          eyebrow="Courses"
          title="Programs built for strict score goals and unshakeable confidence."
          copy="Standardized tests shouldn't feel like a casino. We focus relentlessly on the exact rubrics so you don't just 'try' the exam—you control it."
        />

        <motion.div 
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          variants={gridVariants}
          className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3 items-stretch"
        >
          {courses.map((course) => (
            <CourseCard key={course.name} course={course} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function FormatSection() {
  return (
    <section id="format" className={`section-shell bg-primary ${sectionSpacing} text-primary-foreground`}>
      <div className={`relative ${pageContainer}`}>
        <SectionIntro
          eyebrow="Class structure"
          title="We mold the class around your calendar, so you don't burn out."
          copy="I don't force you into rigid batches. Whether you want intense 1:1 focus or a consistent small group, we figure out a structure that you actually look forward to attending."
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
                className="rounded-xl border border-border/30 bg-white/10 p-6 "
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-white/12 text-[#f3d7b5]">
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
            className="rounded-xl border border-border/30 bg-white/5 p-7 "
          >
            <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-white/50">Weekly flow</p>
            <div className="mt-8 space-y-5">
              {[
                ["01", "Goal mapping", "Current level, target, and class format selection."],
                ["02", "Live sessions", "Speaking practice, task work, correction, and strategy."],
                ["03", "Review rhythm", "Feedback loops that keep momentum visible."]
              ].map(([step, title, copy]) => (
                <div key={step} className="flex gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full border border-border/30 text-sm font-extrabold text-[#f1d7b8]">
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
  return (
    <section id="testimonials" className={`section-shell ${sectionSpacing} overflow-hidden`}>
      <div className={`relative ${pageContainer}`}>
        <div className="flex flex-col gap-8">
          <SectionIntro
            eyebrow="Outcomes"
            title="Don't just take my word for it."
            copy="The only metric that matters at the end of the day is whether you hit your goal. Here are real stories from students who stopped struggling with English and started using it with absolute confidence."
            narrow
          />
          <Testimonials />
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
          eyebrow="Clear answers"
          title="Questions people usually ask in the demo class."
          copy="I believe in complete transparency. If you have any other questions, you can always WhatsApp me directly."
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
                className="overflow-hidden rounded-xl border border-border bg-white/75 shadow-card "
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
        <div className="overflow-hidden rounded-xl border border-border bg-navy shadow-sm">
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
                    
                    key={label}
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="inline-flex items-center gap-3 rounded-full border border-border/30 bg-white/10 px-4 py-3 text-sm font-semibold text-white "
                  >
                    <span className="rounded-full bg-white/12 p-2">
                      <Icon path={icons[icon]} className="h-4 w-4" />
                    </span>
                    <span>{label}: {value}</span>
                  </motion.a>
                ))}
              </div>

              <div className="mt-10 rounded-xl border border-border/30 bg-[rgba(255,248,240,0.85)] p-6 shadow-[0_32px_64px_-16px_rgba(1,54,72,0.16),inset_0_1px_1px_rgba(255,255,255,0.6)]  saturate-150">
                <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-navy/60">Trust cues</p>
                <div className="mt-5 grid gap-3">
                  {[
                    "Founder-led training with personal feedback loops",
                    "Live online sessions for exam prep and spoken confidence",
                    "Suitable for students, professionals, and abroad aspirants"
                  ].map((item) => (
                    <div key={item} className="flex gap-3 text-sm leading-7 text-navy/80 font-medium">
                      <span className="mt-1 text-gold drop-shadow-sm">
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
                <p className="text-xs font-extrabold uppercase tracking-[0.26em] text-ink/55">Direct access</p>
                <p className="mt-4 text-3xl font-serif leading-tight text-navy md:text-4xl">
                  Stop scrolling. Let's look at your current level and build a roadmap.
                </p>
                <p className="mt-5 text-base leading-8 text-muted-foreground">
                  No sales teams, no pressure. You'll speak directly with me. We'll identify what's blocking your fluency or score, and decide if I'm the right mentor for you.
                </p>



                <motion.a
                  
                  href="https://wa.me/919999999999"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-8 flex w-fit items-center gap-3 rounded-full border border-[var(--gold-accent)] bg-white px-8 py-4 text-sm font-bold text-navy shadow-[0_12px_30px_rgba(1,54,72,0.08)] transition-shadow hover:shadow-[0_16px_40px_rgba(1,54,72,0.12)]"
                >
                  Message me on WhatsApp
                  <Icon path={icons.chat} className="h-[18px] w-[18px]" />
                </motion.a>

                <form onSubmit={handleSubmit} className="mt-10 grid gap-6">
                  <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-ink/40 flex items-center gap-4">
                    <span className="flex-1 h-px bg-border"></span>
                    Or send an email enquiry
                    <span className="flex-1 h-px bg-border"></span>
                  </p>
                  {[
                    ["Your Name", "text", "How should I address you?"],
                    ["WhatsApp Number", "tel", "So I can reach out directly"],
                    ["What are you struggling with?", "text", "Example: IELTS Writing or spoken hesitation"]
                  ].map(([label, type, placeholder]) => (
                    <label key={label} className="grid gap-2 text-sm font-bold text-navy">
                      {label}
                      <input
                        type={type}
                        placeholder={placeholder}
                        required
                        className="rounded-xl border border-border bg-white px-5 py-4 text-sm font-medium text-ink outline-none transition-all focus:-translate-y-[2px] focus:border-gold focus:shadow-[0_8px_20px_rgba(182,144,99,0.12)]"
                      />
                    </label>
                  ))}

                  <label className="grid gap-2 text-sm font-bold text-navy">
                    When is your exam? (If applicable)
                    <textarea
                      placeholder="Give me an idea of your timeline and constraints."
                      className="min-h-[120px] rounded-xl border border-border bg-white px-5 py-4 text-sm font-medium text-ink outline-none transition-all focus:-translate-y-[2px] focus:border-gold focus:shadow-[0_8px_20px_rgba(182,144,99,0.12)] resize-none"
                    />
                  </label>

                  <motion.button
                    
                    whileTap={{ scale: 0.99 }}
                    type="submit"
                    className={[
                      "mt-4 inline-flex items-center justify-center gap-3 rounded-full px-8 py-5 text-[13px] font-extrabold uppercase tracking-[0.16em] text-white shadow-sm transition-colors",
                      submitted ? "bg-[var(--deep-blue)]" : "bg-primary"
                    ].join(" ")}
                  >
                    {submitted ? "I'll be in touch soon" : "Send directly to my inbox"}
                    <Icon path={submitted ? icons.check : icons.arrow} className="h-4 w-4" />
                  </motion.button>
                  <p className="text-center text-[13px] font-semibold text-muted-foreground">I personally read and reply within hours.</p>
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
        
        whileTap={{ scale: 0.98 }}
        className="fixed bottom-5 right-5 z-50 hidden h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-sm md:inline-flex"
        aria-label="Chat on WhatsApp"
      >
        <Icon path={icons.chat} className="h-6 w-6" />
      </motion.a>
      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-cream/95 px-4 py-3  md:hidden">
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
