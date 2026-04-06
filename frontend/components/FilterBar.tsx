import React from "react";
import { ITask } from "../services/taskService";

export type FilterType = "all" | "pending" | "in-progress" | "done";

interface FilterBarProps {
  active: FilterType;
  tasks: ITask[];
  onChange: (f: FilterType) => void;
  onRefresh: () => void;
  loading: boolean;
}

const FILTERS: { key: FilterType; label: string }[] = [
  { key: "all",         label: "All"         },
  { key: "pending",     label: "Pending"     },
  { key: "in-progress", label: "In Progress" },
  { key: "done",        label: "Done"        },
];

const FilterBar: React.FC<FilterBarProps> = ({ active, tasks, onChange, onRefresh, loading }) => {
  const count = (key: FilterType) =>
    key === "all" ? tasks.length : tasks.filter((t) => t.status === key).length;

  return (
    <div className="filter-bar">
      {FILTERS.map((f) => (
        <button
          key={f.key}
          className={`filter-pill ${active === f.key ? "active" : ""}`}
          onClick={() => onChange(f.key)}
        >
          {f.label}
          <span className="count">{count(f.key)}</span>
        </button>
      ))}

      <span className="spacer" />

      <button className="btn btn-ghost" onClick={onRefresh} disabled={loading}>
        <svg
          className={loading ? "spinner" : ""}
          width="14" height="14" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
        >
          <path d="M21 12a9 9 0 1 1-6.219-8.56" />
        </svg>
        Refresh
      </button>
    </div>
  );
};

export default FilterBar;
