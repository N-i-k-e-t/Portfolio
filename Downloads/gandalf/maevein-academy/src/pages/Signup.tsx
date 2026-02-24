import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/lib/auth-context";
import { MODULES } from "@/lib/game-data";
import { Shield, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function Signup() {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "student", favoriteSubject: "chemistry" });
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.password.length < 4) { setError("Password too short"); return; }
    if (signup(form)) {
      navigate("/dashboard");
    } else {
      setError("Email already registered");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-20">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 font-bold text-xl mb-4">
            <Shield className="w-7 h-7 text-primary" />
            <span className="gradient-text">Knowledge Guardian</span>
          </Link>
          <h1 className="text-2xl font-bold">Create Account</h1>
          <p className="text-muted-foreground mt-1">Begin your journey to outsmart the guardians</p>
        </div>
        <div className="glass-card p-8 rounded-2xl">
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && <div className="text-destructive text-sm text-center bg-destructive/10 py-2 rounded-lg">{error}</div>}
            <input type="text" placeholder="Full Name" className="w-full glass-input px-4 py-3 rounded-xl" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
            <input type="email" placeholder="Email" className="w-full glass-input px-4 py-3 rounded-xl" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
            <input type="password" placeholder="Password (min 4 chars)" className="w-full glass-input px-4 py-3 rounded-xl" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required />
            <select className="w-full glass-input px-4 py-3 rounded-xl bg-transparent" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })}>
              <option value="student">Student</option>
              <option value="teacher">Teacher</option>
              <option value="developer">Developer</option>
              <option value="curious">Just Curious</option>
            </select>
            <select className="w-full glass-input px-4 py-3 rounded-xl bg-transparent" value={form.favoriteSubject} onChange={(e) => setForm({ ...form, favoriteSubject: e.target.value })}>
              {MODULES.map((m) => <option key={m.id} value={m.id}>{m.emoji} {m.name}</option>)}
            </select>
            <button type="submit" className="w-full gradient-button py-4 rounded-xl font-bold flex items-center justify-center gap-2">
              Create Account <ArrowRight className="w-4 h-4" />
            </button>
          </form>
          <p className="text-center text-sm text-muted-foreground mt-6">
            Already have an account?{" "}
            <Link to="/login" className="text-primary hover:underline font-medium">Login</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
