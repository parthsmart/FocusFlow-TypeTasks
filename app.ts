import {
  Task,
  TaskStatus,
  addTask,
  advanceTask,
  deleteTask,
  filterByStatus,
} from "./model.js";

let tasks: Task[] = [];
let activeFilter: "all" | TaskStatus = "all";

const titleInput = document.getElementById("title") as HTMLInputElement;
const statusInput = document.getElementById("status") as HTMLSelectElement;
const addButton = document.getElementById("add") as HTMLButtonElement;
const listElement = document.getElementById("list") as HTMLUListElement;
const chipsElement = document.getElementById("chips") as HTMLDivElement;
const countElement = document.getElementById("count") as HTMLSpanElement;

const filterOptions: Array<{ label: string; value: "all" | TaskStatus }> = [
  { label: "All", value: "all" },
  { label: "To do", value: "todo" },
  { label: "In progress", value: "in-progress" },
  { label: "Done", value: "done" },
];

function renderFilters(): void {
  chipsElement.replaceChildren(
    ...filterOptions.map(({ label, value }) => {
      const button = document.createElement("button");
      button.className = value === activeFilter ? "chip active" : "chip";
      button.type = "button";
      button.textContent = label;
      button.onclick = () => {
        activeFilter = value;
        render();
      };
      return button;
    }),
  );
}

function statusLabel(status: TaskStatus): string {
  return status === "in-progress"
    ? "In progress"
    : status === "todo"
      ? "To do"
      : "Done";
}

function renderTasks(): void {
  const visibleTasks = filterByStatus(tasks, activeFilter);
  countElement.textContent = `${visibleTasks.length} ${
    visibleTasks.length === 1 ? "task" : "tasks"
  }`;

  if (visibleTasks.length === 0) {
    const emptyState = document.createElement("li");
    emptyState.className = "empty-state";
    emptyState.textContent =
      tasks.length === 0
        ? "Your task list is empty. Add your first task above."
        : "No tasks match this filter.";
    listElement.replaceChildren(emptyState);
    return;
  }

  listElement.replaceChildren(
    ...visibleTasks.map((task) => {
      const item = document.createElement("li");
      item.className = `task task-${task.status}`;

      const content = document.createElement("div");
      content.className = "task-content";

      const title = document.createElement("span");
      title.className = task.status === "done" ? "task-title complete" : "task-title";
      title.textContent = task.title;

      const badge = document.createElement("span");
      badge.className = `badge badge-${task.status}`;
      badge.textContent = statusLabel(task.status);

      content.append(title, badge);

      const actions = document.createElement("div");
      actions.className = "task-actions";

      if (task.status !== "done") {
        const advanceButton = document.createElement("button");
        advanceButton.className = "icon-button advance";
        advanceButton.type = "button";
        advanceButton.title = "Advance task";
        advanceButton.textContent = "→";
        advanceButton.onclick = () => {
          tasks = advanceTask(tasks, task.id);
          render();
        };
        actions.append(advanceButton);
      }

      const deleteButton = document.createElement("button");
      deleteButton.className = "icon-button delete";
      deleteButton.type = "button";
      deleteButton.title = "Delete task";
      deleteButton.textContent = "×";
      deleteButton.onclick = () => {
        tasks = deleteTask(tasks, task.id);
        render();
      };
      actions.append(deleteButton);

      item.append(content, actions);
      return item;
    }),
  );
}

function render(): void {
  renderFilters();
  renderTasks();
}

function addCurrentTask(): void {
  const title = titleInput.value.trim();
  if (!title) {
    titleInput.focus();
    return;
  }

  tasks = addTask(tasks, title, statusInput.value as TaskStatus);
  titleInput.value = "";
  titleInput.focus();
  render();
}

addButton.onclick = addCurrentTask;
titleInput.onkeydown = (event: KeyboardEvent) => {
  if (event.key === "Enter") {
    addCurrentTask();
  }
};

render();
