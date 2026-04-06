import React, { useState, useEffect, useCallback } from "react";
import "../css/components.css";
import "../css/HomePage.css";

import Header from "../components/Header";
import StatsBar from "../components/StatsBar";
import FilterBar, { FilterType } from "../components/FilterBar";
import TaskCard from "../components/TaskCard";
import TaskModal, { ModalMode } from "../components/TaskModal";

import taskService, { ITask } from "../services/taskService";

// ── Toast hook ────────────────────────────────────────────────────────────────
type ToastType = "success" | "error" | "warn";
interface ToastItem { id: number; msg: string; type: ToastType; }

function useToast() {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const add = useCallback((msg: string, type: ToastType = "success") => {
    const id = Date.now();
    setToasts((p) => [...p, { id, msg, type }]);
    setTimeout(() => setToasts((p) => p.filter((t) => t.id !== id)), 3500);
  }, []);

  const remove = useCallback((id: number) =>
    setToasts((p) => p.filter((t) => t.id !== id)), []);

  return { toasts, add, remove };
}

// ── Modal state type ──────────────────────────────────────────────────────────
interface ModalState {
  open: boolean;
  mode: ModalMode;
  task?: ITask;
}

const CLOSED_MODAL: ModalState = { open: false, mode: "create" };

// ── HomePage ──────────────────────────────────────────────────────────────────
const HomePage: React.FC = () => {
  const [tasks, setTasks]       = useState<ITask[]>([]);
  const [loading, setLoading]   = useState(true);
  const [saving, setSaving]     = useState(false);
  const [error, setError]       = useState<string | null>(null);
  const [filter, setFilter]     = useState<FilterType>("all");
  const [modal, setModal]       = useState<ModalState>(CLOSED_MODAL);
  const { toasts, add: toast, remove: removeToast } = useToast();

  // ── Fetch all tasks ─────────────────────────────────────────────────────────
  const fetchTasks = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await taskService.getAll();
      if (res.success && res.data) setTasks(res.data);
      else setError(res.message ?? "Failed to load tasks.");
    } catch {
      setError("Could not reach the server. Is it running on port 3000?");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchTasks(); }, [fetchTasks]);

  // ── Create ──────────────────────────────────────────────────────────────────
  const handleCreate = async (form: Partial<ITask>) => {
    setSaving(true);
    try {
      const res = await taskService.create(form);
      if (res.success && res.data) {
        setTasks((p) => [res.data!, ...p]);
        toast("Task created!");
        setModal(CLOSED_MODAL);
      } else toast(res.message ?? "Failed to create task.", "error");
    } catch { toast("Failed to create task.", "error"); }
    finally { setSaving(false); }
  };

  // ── Update ──────────────────────────────────────────────────────────────────
  const handleUpdate = async (form: Partial<ITask>) => {
    if (!modal.task) return;
    setSaving(true);
    try {
      const res = await taskService.update(modal.task._id, form);
      if (res.success && res.data) {
        setTasks((p) => p.map((t) => t._id === modal.task!._id ? res.data! : t));
        toast("Task updated!");
        setModal(CLOSED_MODAL);
      } else toast(res.message ?? "Failed to update task.", "error");
    } catch { toast("Failed to update task.", "error"); }
    finally { setSaving(false); }
  };

  // ── Delete ──────────────────────────────────────────────────────────────────
  const handleDelete = async (id: string) => {
    if (!window.confirm("Delete this task?")) return;
    try {
      const res = await taskService.remove(id);
      if (res.success) { setTasks((p) => p.filter((t) => t._id !== id)); toast("Task deleted.", "warn"); }
      else toast(res.message ?? "Failed to delete.", "error");
    } catch { toast("Failed to delete task.", "error"); }
  };

  // ── Filtered tasks ──────────────────────────────────────────────────────────
  const filtered = filter === "all" ? tasks : tasks.filter((t) => t.status === filter);

  return (
    <div className="home-page">
      {/* ── Toasts ── */}
      <div className="toast-container">
        {toasts.map((t) => (
          <div key={t.id} className={`toast ${t.type}`} onClick={() => removeToast(t.id)}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d={t.type === "error" ? "M18 6L6 18M6 6l12 12" : "M20 6L9 17l-5-5"} />
            </svg>
            {t.msg}
          </div>
        ))}
      </div>

      {/* ── Header ── */}
      <Header onNewTask={() => setModal({ open: true, mode: "create" })} />

      {/* ── Content ── */}
      <main className="main-content">
        <StatsBar tasks={tasks} loading={loading} />
        <FilterBar
          active={filter}
          tasks={tasks}
          onChange={setFilter}
          onRefresh={fetchTasks}
          loading={loading}
        />

        {/* States */}
        {loading ? (
          <div className="state-center">
            <svg className="spinner" width="36" height="36" viewBox="0 0 24 24" fill="none"
              stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 12a9 9 0 1 1-6.219-8.56" />
            </svg>
            <p>Loading tasks…</p>
          </div>
        ) : error ? (
          <div className="state-center" style={{ color: "var(--danger)" }}>
            <svg width="38" height="38" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0zM12 9v4M12 17h.01" />
            </svg>
            <p>{error}</p>
            <button className="btn btn-primary" onClick={fetchTasks}>Try again</button>
          </div>
        ) : filtered.length === 0 ? (
          <div className="state-center">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none"
              stroke="var(--border)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 11l3 3L22 4M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
            </svg>
            <p>
              {filter === "all"
                ? "No tasks yet. Create your first one!"
                : `No "${filter}" tasks found.`}
            </p>
          </div>
        ) : (
          <div className="task-grid">
            {filtered.map((task, i) => (
              <TaskCard
                key={task._id}
                task={task}
                animationDelay={i * 50}
                onEdit={(t) => setModal({ open: true, mode: "edit", task: t })}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </main>

      {/* ── Modal ── */}
      <TaskModal
        open={modal.open}
        mode={modal.mode}
        initial={modal.task}
        loading={saving}
        onClose={() => setModal(CLOSED_MODAL)}
        onSubmit={modal.mode === "create" ? handleCreate : handleUpdate}
      />
    </div>
  );
};

export default HomePage;
