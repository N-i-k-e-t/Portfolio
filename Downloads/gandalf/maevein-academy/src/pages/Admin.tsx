import { useState } from "react";
import Navbar from "@/components/Navbar";
import { MODULES } from "@/lib/game-data";
import { motion } from "framer-motion";
import { Users, Activity, UserPlus, Gamepad2 } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar } from "recharts";

const dailyData = Array.from({ length: 14 }, (_, i) => ({
  day: `Feb ${i + 1}`,
  signups: Math.floor(Math.random() * 30 + 10),
}));

const roleData = [
  { name: "Student", value: 320, color: "hsl(205, 98%, 65%)" },
  { name: "Teacher", value: 80, color: "hsl(240, 60%, 65%)" },
  { name: "Developer", value: 65, color: "hsl(180, 100%, 50%)" },
  { name: "Curious", value: 35, color: "hsl(160, 60%, 45%)" },
];

const subjectData = MODULES.map((m) => ({ name: m.name, players: Math.floor(Math.random() * 200 + 50) }));

const mockWaitlist = Array.from({ length: 8 }, (_, i) => ({
  id: i + 1,
  name: `User ${i + 1}`,
  email: `user${i + 1}@example.com`,
  role: ["Student", "Teacher", "Developer", "Curious"][i % 4],
  date: `2026-02-${(i + 1).toString().padStart(2, "0")}`,
  status: i < 3 ? "approved" : "pending",
}));

export default function Admin() {
  const [waitlist, setWaitlist] = useState(mockWaitlist);

  const stats = [
    { icon: Users, label: "Total Users", value: "500+", color: "text-primary" },
    { icon: Activity, label: "Active Today", value: "142", color: "text-success" },
    { icon: UserPlus, label: "Signups (Week)", value: "87", color: "text-secondary" },
    { icon: Gamepad2, label: "Games Played", value: "2,340", color: "text-accent" },
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 pt-24 pb-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-3xl font-bold mb-2"><span className="gradient-text">Admin Dashboard</span></h1>
          <p className="text-muted-foreground mb-8">Overview of Knowledge Guardian stats</p>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            {stats.map((s) => (
              <div key={s.label} className="glass-card p-5 rounded-2xl">
                <s.icon className={`w-6 h-6 ${s.color} mb-2`} />
                <div className="text-2xl font-bold">{s.value}</div>
                <div className="text-sm text-muted-foreground">{s.label}</div>
              </div>
            ))}
          </div>

          {/* Charts */}
          <div className="grid md:grid-cols-2 gap-6 mb-10">
            <div className="glass-card p-6 rounded-2xl">
              <h3 className="font-bold mb-4">Daily Signups</h3>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={dailyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(235, 15%, 25%)" />
                  <XAxis dataKey="day" tick={{ fill: "hsl(220, 15%, 60%)", fontSize: 12 }} />
                  <YAxis tick={{ fill: "hsl(220, 15%, 60%)", fontSize: 12 }} />
                  <Tooltip contentStyle={{ background: "hsl(235, 20%, 18%)", border: "1px solid hsl(235, 15%, 25%)", borderRadius: "12px", color: "hsl(220, 20%, 95%)" }} />
                  <Line type="monotone" dataKey="signups" stroke="hsl(205, 98%, 65%)" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="glass-card p-6 rounded-2xl">
              <h3 className="font-bold mb-4">Users by Role</h3>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie data={roleData} cx="50%" cy="50%" innerRadius={60} outerRadius={90} dataKey="value" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                    {roleData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                  </Pie>
                  <Tooltip contentStyle={{ background: "hsl(235, 20%, 18%)", border: "1px solid hsl(235, 15%, 25%)", borderRadius: "12px", color: "hsl(220, 20%, 95%)" }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="glass-card p-6 rounded-2xl mb-10">
            <h3 className="font-bold mb-4">Popular Subjects</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={subjectData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(235, 15%, 25%)" />
                <XAxis dataKey="name" tick={{ fill: "hsl(220, 15%, 60%)", fontSize: 12 }} />
                <YAxis tick={{ fill: "hsl(220, 15%, 60%)", fontSize: 12 }} />
                <Tooltip contentStyle={{ background: "hsl(235, 20%, 18%)", border: "1px solid hsl(235, 15%, 25%)", borderRadius: "12px", color: "hsl(220, 20%, 95%)" }} />
                <Bar dataKey="players" fill="hsl(240, 60%, 65%)" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Waitlist */}
          <div className="glass-card p-6 rounded-2xl">
            <h3 className="font-bold mb-4">Waitlist</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border/50 text-muted-foreground">
                    <th className="py-3 text-left">#</th>
                    <th className="py-3 text-left">Name</th>
                    <th className="py-3 text-left">Email</th>
                    <th className="py-3 text-left">Role</th>
                    <th className="py-3 text-left">Date</th>
                    <th className="py-3 text-left">Status</th>
                    <th className="py-3 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {waitlist.map((w) => (
                    <tr key={w.id} className="border-b border-border/30">
                      <td className="py-3">{w.id}</td>
                      <td className="py-3 font-medium">{w.name}</td>
                      <td className="py-3 text-muted-foreground">{w.email}</td>
                      <td className="py-3">{w.role}</td>
                      <td className="py-3 text-muted-foreground">{w.date}</td>
                      <td className="py-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${w.status === "approved" ? "bg-success/20 text-success" : "bg-secondary/20 text-secondary"}`}>
                          {w.status}
                        </span>
                      </td>
                      <td className="py-3">
                        {w.status === "pending" && (
                          <div className="flex gap-2">
                            <button
                              onClick={() => setWaitlist((wl) => wl.map((x) => x.id === w.id ? { ...x, status: "approved" } : x))}
                              className="text-xs px-3 py-1 rounded-lg bg-success/20 text-success hover:bg-success/30"
                            >
                              Approve
                            </button>
                            <button
                              onClick={() => setWaitlist((wl) => wl.filter((x) => x.id !== w.id))}
                              className="text-xs px-3 py-1 rounded-lg bg-destructive/20 text-destructive hover:bg-destructive/30"
                            >
                              Reject
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
