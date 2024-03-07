import displayTasks from "./modules/displayTasks.js"; // Importera alla funktioner från displayTasks.js
import { getTasks, postTask, patchTask, deleteTask } from "./modules/fetchFunctions.js"; // Importera alla funktioner från fetchFunctions.js


const form = document.querySelector('#taskForm');

// Posta ny task
form.addEventListener('submit', event => {
    event.preventDefault();

    const newTask = {
        task: form.querySelector('#taskInput').value,
        category: form.querySelector('#categorySelect').value,
        status: "to do",
        assigned: "none"
    };
    form.reset();

    postTask(newTask).then(() => {
        getTasks().then(tasks => {
            displayTasks(tasks);
            form.reset();
        });
    });
});

// Assign task till ett namn och flyttar till "In Progress"
function assignTask(taskId, assignedPerson) {
    patchTask(taskId, { status: "in progress", assigned: assignedPerson }).then(() => {
        getTasks().then(tasks => {
            displayTasks(tasks);
        });
    });
}

// Task visas när sidan lddas
getTasks().then(tasks => {
    displayTasks(tasks);
});

export { assignTask, deleteTask }; 