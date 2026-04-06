import React from "react";
import { ITask } from "../services/taskService";

interface StatsBarProps {
  tasks: ITask[];
  loading: boolean;
}

interface StatItem {
  label: string;
  value: number;
  color: string;
}

const StatsBar: React.FC<StatsBarProps> = ({ tasks, loading }) => {
  const stats: StatItem[] = [
    { label: "Total",       value: tasks.length,                                          color: "var(--accent)" },
    { label: "Pending",     value: tasks.filter((t) => t.status === "pending").length,     color: "var(--warn)"   },
    { label: "In Progress", value: tasks.filter((t) => t.status === "in-progress").length, color: "#60a5fa"       },
    { label: "Done",        value: tasks.filter((t) => t.status === "done").length,        color: "var(--success)"},
  ];

  return (
    <div className="stats-bar">
      {stats.map((s) => (
        <div className="stat-card" key={s.label}>
          <p className="stat-label">{s.label}</p>
          <p className="stat-value pulsing" style={{ color: s.color, animationPlayState: loading ? "running" : "paused", opacity: loading ? undefined : 1 }}>
            {loading ? "–" : s.value}
          </p>
        </div>
      ))}
    </div>
  );
};

export default StatsBar;
