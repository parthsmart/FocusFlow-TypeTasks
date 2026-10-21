export type TaskStatus = "todo" | "in-progress" | "done";

export interface Task {
  id: number;
  title: string;
  status: TaskStatus;
  createdAt: number;
}

let nextId = 1;

export function addTask(
  tasks: Task[],
  title: string,
  status: TaskStatus = "todo",
): Task[] {
  const task: Task = {
    id: nextId++,
    title: title.trim(),
    status,
    createdAt: Date.now(),
  };

  return [...tasks, task];
}

export function advanceTask(tasks: Task[], id: number): Task[] {
  return tasks.map((task) => {
    if (task.id !== id) {
      return task;
    }

    const nextStatus: TaskStatus =
      task.status === "todo"
        ? "in-progress"
        : task.status === "in-progress"
          ? "done"
          : "done";

    return { ...task, status: nextStatus };
  });
}

export function deleteTask(tasks: Task[], id: number): Task[] {
  return tasks.filter((task) => task.id !== id);
}

export function filterByStatus(
  tasks: Task[],
  status: "all" | TaskStatus,
): Task[] {
  return status === "all"
    ? tasks
    : tasks.filter((task) => task.status === status);
}
