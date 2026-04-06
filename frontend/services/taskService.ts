// services/taskService.ts
// Adapt this to your existing service file.
// The components expect this interface and these return shapes.

const API_BASE = "http://localhost:5173/api/tasks";

// ── Types ─────────────────────────────────────────────────────────────────────

export interface ITask {
  _id: string;
  title: string;
  description?: string;
  status: "pending" | "in-progress" | "done";
  createdAt?: string;
  updatedAt?: string;
}

export interface ApiResponse<T = ITask> {
  success: boolean;
  message?: string;
  data?: T;
}

// ── Service ───────────────────────────────────────────────────────────────────

const taskService = {
  getAll: (): Promise<ApiResponse<ITask[]>> =>
    fetch(`${API_BASE}/get`).then((r) => r.json()),

  getOne: (id: string): Promise<ApiResponse<ITask>> =>
    fetch(`${API_BASE}/get/${id}`).then((r) => r.json()),

  create: (body: Partial<ITask>): Promise<ApiResponse<ITask>> =>
    fetch(`${API_BASE}/post`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    }).then((r) => r.json()),

  update: (id: string, body: Partial<ITask>): Promise<ApiResponse<ITask>> =>
    fetch(`${API_BASE}/update/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    }).then((r) => r.json()),

  remove: (id: string): Promise<ApiResponse<null>> =>
    fetch(`${API_BASE}/delete/${id}`, { method: "DELETE" }).then((r) => r.json()),
};

export default taskService;
