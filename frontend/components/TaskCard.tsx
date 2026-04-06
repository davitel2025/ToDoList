import React from "react";
import { ITask } from "../services/taskService";

interface TaskCardProps {
  task: ITask;
  onEdit: (task: ITask) => void;
  onDelete: (id: string) => void;
  animationDelay?: number;
}

const STATUS_MAP: Record<string, string> = {
  pending:      "Pending",
  "in-progress":"In Progress",
  done:         "Done",
};

const TaskCard: React.FC<TaskCardProps> = ({ task, onEdit, onDelete, animationDelay = 0 }) => {
  return (
    <div className="task-card" style={{ animationDelay: `${animationDelay}ms` }}>
      <div className="task-card-top">
        <h3 className="task-title">{task.title}</h3>
        <span className={`status-badge ${task.status}`}>
          {STATUS_MAP[task.status] ?? task.status}
        </span>
      </div>

      {task.description && (
        <p className="task-description">{task.description}</p>
      )}

      <div className="task-actions">
        <button
          className="btn btn-icon edit"
          title="Edit task"
          onClick={() => onEdit(task)}
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
          </svg>
        </button>
        <button
          className="btn btn-icon del"
          title="Delete task"
          onClick={() => onDelete(task._id)}
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 6h18M19 6l-1 14H6L5 6M10 11v6M14 11v6M9 6V4h6v2" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
