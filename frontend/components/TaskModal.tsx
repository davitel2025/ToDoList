import React, { useState, useEffect } from "react";
import { ITask } from "../services/taskService";

export type ModalMode = "create" | "edit";

interface TaskModalProps {
  open: boolean;
  mode: ModalMode;
  initial?: Partial<ITask>;
  loading: boolean;
  onClose: () => void;
  onSubmit: (data: Partial<ITask>) => void;
}

const EMPTY: Partial<ITask> = { title: "", description: "", status: "pending" };

const TaskModal: React.FC<TaskModalProps> = ({
  open, mode, initial, loading, onClose, onSubmit,
}) => {
  const [form, setForm] = useState<Partial<ITask>>(EMPTY);

  // Sync form when modal opens or initial changes
  useEffect(() => {
    if (open) setForm(initial ? { ...EMPTY, ...initial } : EMPTY);
  }, [open, initial]);

  if (!open) return null;

  const handle =
    (key: keyof ITask) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setForm((prev) => ({ ...prev, [key]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title?.trim()) return;
    onSubmit(form);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{mode === "create" ? "New Task" : "Edit Task"}</h2>
          <button className="btn btn-icon" onClick={onClose} aria-label="Close">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form className="modal-form" onSubmit={handleSubmit}>
          <div className="field">
            <label>Title *</label>
            <input
              value={form.title ?? ""}
              onChange={handle("title")}
              placeholder="What needs to be done?"
              required
              autoFocus
            />
          </div>

          <div className="field">
            <label>Description</label>
            <textarea
              value={form.description ?? ""}
              onChange={handle("description")}
              placeholder="Add some details…"
            />
          </div>

          <div className="field">
            <label>Status</label>
            <select value={form.status ?? "pending"} onChange={handle("status")}>
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="done">Done</option>
            </select>
          </div>

          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? (
              <>
                <svg className="spinner" width="15" height="15" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                </svg>
                Saving…
              </>
            ) : (
              <>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
                {mode === "create" ? "Create Task" : "Save Changes"}
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default TaskModal;
