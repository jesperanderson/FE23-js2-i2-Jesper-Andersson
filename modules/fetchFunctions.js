const baseUrl = 'https://scrum-board-4eb67-default-rtdb.europe-west1.firebasedatabase.app';
const header = {
    "Content-type": "application/json; charset=UTF-8"
};

async function getTasks() {
    const url = `${baseUrl}/tasks.json`;

    const res = await fetch(url);
    const tasks = await res.json();
    return tasks;
}

async function postTask(task) {
    const url = `${baseUrl}/tasks.json`; 

    const options = {
        method: "POST",
        body: JSON.stringify(task), 
        headers: header
    }

    const res = await fetch(url, options);
    const info = await res.json();

    console.log(info);
    console.log(url)
    console.log(task.category)
}

async function patchTask(id, data) {
    const url = `${baseUrl}/tasks/${id}.json`;
    const options = {
        method: "PATCH",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json"
        }
    
    };
    console.log(url)

    const response = await fetch(url, options);
    return response.json();
}

async function deleteTask(id) {
    const url = `${baseUrl}/tasks/${id}.json`;
    const options = {
        method: "DELETE",
    };

    try {
        const res = await fetch(url, options);
        if (!res.ok) {
            throw new Error('Failed to delete task');
        }
        console.log('Task deleted successfully');
    } catch (error) {
        console.error('Error deleting task:', error.message);
    }
}

export { getTasks, postTask, patchTask, deleteTask };
