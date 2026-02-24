import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { Shield, Zap, Brain, Gamepad2, Smartphone, Users, ChevronDown, ArrowRight, Sparkles, Target, BookOpen } from "lucide-react";
import Navbar from "@/components/Navbar";
import { MODULES } from "@/lib/game-data";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 2000;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [isInView, target]);

  return (
    <div ref={ref} className="text-4xl md:text-5xl font-bold gradient-text">
      {count.toLocaleString()}{suffix}
    </div>
  );
}

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" as const },
  }),
};

const FAQ_DATA = [
  { q: "What is Knowledge maevein?", a: "Knowledge maevein is an educational AI game where you prove your subject knowledge by interacting with AI maeveins. Each maevein protects a secret answer, and you must demonstrate understanding to unlock it." },
  { q: "How does the game work?", a: "Choose a subject module, then chat with the AI maevein. The maevein will challenge you with riddles and prompts. Demonstrate your knowledge to discover the secret, then submit your answer to advance." },
  { q: "Is it really free?", a: "Yes! During the beta period, Knowledge maevein is 100% free. We believe in making quality education accessible to everyone." },
  { q: "What subjects are available?", a: "We currently offer 6 subjects: Chemistry, Biology, Physics, Python Programming, Generative AI, and Data Structures & Algorithms. Each has 7 progressive levels." },
  { q: "Can teachers use this for their classes?", a: "Absolutely! Teachers can use Knowledge maevein as a supplementary learning tool. Students learn by actively demonstrating knowledge rather than passively reading." },
  { q: "How is my progress tracked?", a: "Your progress is tracked locally and synced to your profile. You earn XP for completing levels, and can see your rank on the global leaderboard." },
];

export default function Landing() {
  const [formData, setFormData] = useState({ name: "", email: "", role: "", subject: "", source: "", agree: false });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.role || !formData.agree) return;
    const waitlist = JSON.parse(localStorage.getItem("kg_waitlist") || "[]");
    waitlist.push({ ...formData, timestamp: new Date().toISOString() });
    localStorage.setItem("kg_waitlist", JSON.stringify(waitlist));
    setSubmitted(true);
    try {
      import("canvas-confetti").then((mod) => {
        mod.default({ particleCount: 150, spread: 80, origin: { y: 0.6 } });
      });
    } catch {}
  };

  return (
    <div className="relative min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <div className="inline-flex items-center gap-2 glass-card px-4 py-2 rounded-full mb-8 text-sm text-muted-foreground">
              <Sparkles className="w-4 h-4 text-primary" /> Beta Now Open — Join 500+ Students
            </div>
            <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight">
              Can You <span className="gradient-text">Outsmart</span><br />the maevein?
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
              Challenge AI maeveins by proving your knowledge in Chemistry, Biology, Physics, Python, Gen AI & DSA. Learn by doing, not memorizing.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <a href="#signup" className="gradient-button px-8 py-4 rounded-xl text-lg font-bold flex items-center justify-center gap-2">
                Join the Beta <ArrowRight className="w-5 h-5" />
              </a>
              <Link to="/login" className="glass-card px-8 py-4 rounded-xl text-lg font-semibold text-foreground hover:bg-[hsl(var(--glass-hover))] flex items-center justify-center gap-2">
                Watch Demo <Gamepad2 className="w-5 h-5" />
              </Link>
            </div>
            <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
              {["Built for Students", "6 Subjects", "42 Levels", "100% Free Beta"].map((t) => (
                <span key={t} className="glass px-4 py-2 rounded-full">{t}</span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="text-3xl md:text-4xl font-bold text-center mb-16">
            How It <span className="gradient-text">Works</span>
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Target, title: "Choose Challenge", desc: "Pick a subject module and difficulty level" },
              { icon: Brain, title: "Question maevein", desc: "Chat with the AI maevein to prove your knowledge" },
              { icon: BookOpen, title: "Prove Knowledge", desc: "Submit the secret answer to advance to the next level" },
            ].map((item, i) => (
              <motion.div key={item.title} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i} className="glass-card p-8 rounded-2xl text-center">
                <div className="w-16 h-16 rounded-xl gradient-button flex items-center justify-center mx-auto mb-6">
                  <item.icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-muted-foreground">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Modules */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="text-3xl md:text-4xl font-bold text-center mb-16">
            Subject <span className="gradient-text">Modules</span>
          </motion.h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {MODULES.map((mod, i) => (
              <motion.div key={mod.id} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i}>
                <Link to="/signup" className="glass-card p-8 rounded-2xl block group">
                  <div className="text-5xl mb-4">{mod.emoji}</div>
                  <h3 className="text-xl font-bold mb-1">{mod.name}</h3>
                  <p className="text-sm text-primary mb-3">{mod.maevein}</p>
                  <p className="text-sm text-muted-foreground">{mod.description}</p>
                  <div className="mt-4 text-sm text-muted-foreground">{mod.levels.length} Levels</div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Bento */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="text-3xl md:text-4xl font-bold text-center mb-16">
            Why <span className="gradient-text">Knowledge maevein</span>?
          </motion.h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Zap, title: "Progressive Difficulty", desc: "7 levels per subject, from beginner to expert" },
              { icon: Brain, title: "AI Validation", desc: "Intelligent maeveins adapt to your approach" },
              { icon: Gamepad2, title: "Gamification", desc: "XP, streaks, leaderboards, and achievements" },
              { icon: BookOpen, title: "Learn by Doing", desc: "Active knowledge demonstration, not passive reading" },
              { icon: Smartphone, title: "Mobile Friendly", desc: "Play anywhere, on any device" },
              { icon: Users, title: "Community", desc: "Compete globally and learn together" },
            ].map((f, i) => (
              <motion.div key={f.title} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i} className="glass-card p-6 rounded-2xl">
                <f.icon className="w-8 h-8 text-primary mb-4" />
                <h3 className="font-bold mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { target: 500, suffix: "+", label: "Signups" },
            { target: 6, suffix: "", label: "Subjects" },
            { target: 42, suffix: "", label: "Levels" },
            { target: 10000, suffix: "+", label: "Questions" },
          ].map((s) => (
            <div key={s.label} className="glass-card p-6 rounded-2xl">
              <AnimatedCounter target={s.target} suffix={s.suffix} />
              <div className="text-sm text-muted-foreground mt-2">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Signup Form */}
      <section id="signup" className="py-20 px-4">
        <div className="max-w-lg mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}>
            <div className="glass-card p-8 md:p-10 rounded-2xl">
              <h2 className="text-2xl md:text-3xl font-bold text-center mb-2">
                Join the <span className="gradient-text">Beta</span>
              </h2>
              <p className="text-center text-muted-foreground mb-8">Be among the first to challenge the maeveins</p>

              {submitted ? (
                <div className="text-center py-8">
                  <div className="text-6xl mb-4">🎉</div>
                  <h3 className="text-xl font-bold mb-2 gradient-text">You're on the list!</h3>
                  <p className="text-muted-foreground">We'll notify you when beta access opens for you.</p>
                  <Link to="/signup" className="gradient-button inline-block px-6 py-3 rounded-xl mt-6 font-semibold">
                    Create Account Now
                  </Link>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <input
                    type="text"
                    placeholder="Full Name"
                    className="w-full glass-input px-4 py-3 rounded-xl"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                  <input
                    type="email"
                    placeholder="Email Address"
                    className="w-full glass-input px-4 py-3 rounded-xl"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                  <select
                    className="w-full glass-input px-4 py-3 rounded-xl bg-transparent"
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    required
                  >
                    <option value="" disabled>Select Role</option>
                    <option value="student">Student</option>
                    <option value="teacher">Teacher</option>
                    <option value="developer">Developer</option>
                    <option value="curious">Just Curious</option>
                  </select>
                  <select
                    className="w-full glass-input px-4 py-3 rounded-xl bg-transparent"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  >
                    <option value="" disabled>Favorite Subject (optional)</option>
                    {MODULES.map((m) => (
                      <option key={m.id} value={m.id}>{m.emoji} {m.name}</option>
                    ))}
                  </select>
                  <select
                    className="w-full glass-input px-4 py-3 rounded-xl bg-transparent"
                    value={formData.source}
                    onChange={(e) => setFormData({ ...formData, source: e.target.value })}
                  >
                    <option value="" disabled>How did you hear about us?</option>
                    <option value="social">Social Media</option>
                    <option value="friend">Friend</option>
                    <option value="search">Search Engine</option>
                    <option value="other">Other</option>
                  </select>
                  <label className="flex items-center gap-3 text-sm text-muted-foreground cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.agree}
                      onChange={(e) => setFormData({ ...formData, agree: e.target.checked })}
                      className="w-4 h-4 accent-[hsl(var(--primary))]"
                      required
                    />
                    I agree to receive updates about Knowledge maevein
                  </label>
                  <button type="submit" className="w-full gradient-button py-4 rounded-xl font-bold text-lg">
                    Request Beta Access
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Frequently Asked <span className="gradient-text">Questions</span>
          </h2>
          <Accordion type="single" collapsible className="space-y-3">
            {FAQ_DATA.map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`} className="glass-card rounded-2xl border-none px-6">
                <AccordionTrigger className="text-left font-semibold hover:no-underline py-5">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-5">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-border/50">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-primary" />
            <span className="font-bold gradient-text">Knowledge maevein</span>
          </div>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-primary transition-colors">Home</Link>
            <Link to="/leaderboard" className="hover:text-primary transition-colors">Leaderboard</Link>
            <a href="#signup" className="hover:text-primary transition-colors">Beta Signup</a>
          </div>
          <p className="text-sm text-muted-foreground">© 2026 Knowledge maevein. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
