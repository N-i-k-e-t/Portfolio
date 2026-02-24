import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/lib/auth-context";
import { Shield, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(email, password)) {
      navigate("/dashboard");
    } else {
      setError("Invalid email or password. Try signing up first!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 font-bold text-xl mb-4">
            <Shield className="w-7 h-7 text-primary" />
            <span className="gradient-text">Knowledge maevein</span>
          </Link>
          <h1 className="text-2xl font-bold">Welcome Back</h1>
          <p className="text-muted-foreground mt-1">Enter your credentials to continue</p>
        </div>
        <div className="glass-card p-8 rounded-2xl">
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && <div className="text-destructive text-sm text-center bg-destructive/10 py-2 rounded-lg">{error}</div>}
            <input type="email" placeholder="Email" className="w-full glass-input px-4 py-3 rounded-xl" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <input type="password" placeholder="Password" className="w-full glass-input px-4 py-3 rounded-xl" value={password} onChange={(e) => setPassword(e.target.value)} required />
            <button type="submit" className="w-full gradient-button py-4 rounded-xl font-bold flex items-center justify-center gap-2">
              Login <ArrowRight className="w-4 h-4" />
            </button>
          </form>
          <p className="text-center text-sm text-muted-foreground mt-6">
            Don't have an account?{" "}
            <Link to="/signup" className="text-primary hover:underline font-medium">Sign Up</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
