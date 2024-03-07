import { assignTask, deleteTask } from "../main.js"; 
import { getTasks, patchTask,  } from "./fetchFunctions.js";

export default function displayTasks(tasks) {
    const todoTasksDiv = document.querySelector('#todoTasks');
    const inProgressTasksDiv = document.querySelector('#inProgressTasks');
    const doneTasksDiv = document.querySelector('#doneTasks');

    todoTasksDiv.innerHTML = '';
    inProgressTasksDiv.innerHTML = '';
    doneTasksDiv.innerHTML = '';

    for (const taskId in tasks) {
        const task = tasks[taskId];
        const taskCard = createAndAppend('div', task.status === 'to do' ? todoTasksDiv : task.status === 'in progress' ? inProgressTasksDiv : doneTasksDiv);
        taskCard.classList.add('task');
        taskCard.id = taskId;

        const taskHeader = createAndAppend('h3', taskCard, task.task,);

         // Tilldela bakgrundsfärg baserat på kategorin
         switch (task.category) {
            case 'ux':
                taskCard.style.backgroundColor = '#ffcccc'; // Röd färg för UX-kategorin
                break;
            case 'dev frontend':
                taskCard.style.backgroundColor = '#ccffcc'; // Grön färg för Frontend-kategorin
                break;
            case 'dev backend':
                taskCard.style.backgroundColor = '#ccccff'; // Blå färg för Backend-kategorin
                break;
        }

        // Baserat på Task status
        if (task.status === 'to do') {
            const assignForm = createAndAppend('form', taskCard);
            const assignInput = createAndAppend('input', assignForm);
            assignInput.type = 'text';
            assignInput.placeholder = 'Assign to:';
            const assignButton = createAndAppend('button', assignForm, 'Assign');
            assignButton.type = 'submit';

            // Lyssna på formulärskick-händelsen och anropa assignTask-funktionen med uppgiftens ID och tilldelad person
            assignForm.addEventListener('submit', (event) => {
                event.preventDefault();
                let id;
                id = event.target.closest('div').id
                const assignedPerson = document.querySelector(`#${id} input`).value;
                if (assignedPerson) {
                    assignTask(taskId, assignedPerson);
                    console.log('test' , assignedPerson, taskId) 
                }
            });
        } else if (task.status === 'in progress') {
            // Skapa en "Done" -knapp för uppgifter i statusen "in progress"
            const assignedTo = createAndAppend('p', taskCard, task.assigned)
            const doneButton = createAndAppend('button', taskCard, 'Done');
            
            doneButton.addEventListener('click', async (event) => {
                event.preventDefault();
                const taskIsDone = {
                    status: "done"
                }
                console.log(taskId)
                await patchTask(taskId, taskIsDone);
                const updatedTasks = await getTasks();
                displayTasks(updatedTasks);
            });
        } else if (task.status === 'done') {
            // Skapa en "Remove" -knapp för uppgifter i statusen "done"
            taskCard.classList.add('done');
            const assignedTo = createAndAppend('p', taskCard, task.assigned)
            const removeButton = createAndAppend('button', taskCard, 'Remove');
            removeButton.addEventListener('click', async (event) => {
                event.preventDefault();
                await deleteTask(taskId);
                const updatedTasks = await getTasks();
                displayTasks(updatedTasks);
            });
        }
    }
}

function createAndAppend(type, parent, content) {
    const el = document.createElement(type);
    if (content) {
        el.textContent = content;
    }
    parent.appendChild(el);
    return el;
}