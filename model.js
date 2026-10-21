let nextId = 1;
export function addTask(tasks, title, status = "todo") {
    const task = {
        id: nextId++,
        title: title.trim(),
        status,
    };
    return [...tasks, task];
}
export function advanceTask(tasks, id) {
    return tasks.map((task) => {
        if (task.id !== id) {
            return task;
        }
        const nextStatus = task.status === "todo"
            ? "in-progress"
            : task.status === "in-progress"
                ? "done"
                : "done";
        return { ...task, status: nextStatus };
    });
}
export function completeTask(tasks, id) {
    return tasks.map((task) => task.id === id ? { ...task, status: "done" } : task);
}
export function deleteTask(tasks, id) {
    return tasks.filter((task) => task.id !== id);
}
export function filterByStatus(tasks, status) {
    return tasks.filter((task) => task.status === status);
}
