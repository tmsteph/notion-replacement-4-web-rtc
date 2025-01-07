let notes = [];
let tasks = [];

function renderNotes() {
    const content = document.getElementById("content");
    content.innerHTML = `
        <h2>Notes</h2>
        <textarea id="note-input" placeholder="Write a new note..."></textarea>
        <button id="add-note">Add Note</button>
        <ul>
            ${notes.map((note, index) => `
                <li>
                    ${note}
                    <button class="delete" data-index="${index}">Delete</button>
                </li>
            `).join("")}
        </ul>
    `;

    document.getElementById("add-note").addEventListener("click", () => {
        const noteInput = document.getElementById("note-input").value.trim();
        if (noteInput) {
            notes.push(noteInput);
            renderNotes();
        }
    });

    document.querySelectorAll(".delete").forEach(button => {
        button.addEventListener("click", (e) => {
            notes.splice(e.target.dataset.index, 1);
            renderNotes();
        });
    });
}

function renderTasks() {
    const content = document.getElementById("content");
    content.innerHTML = `
        <h2>Tasks</h2>
        <input id="task-input" placeholder="Enter a new task..." />
        <button id="add-task">Add Task</button>
        <ul>
            ${tasks.map((task, index) => `
                <li>
                    ${task.text} - ${task.completed ? "Done" : "Pending"}
                    <button class="delete" data-index="${index}">Delete</button>
                </li>
            `).join("")}
        </ul>
    `;

    document.getElementById("add-task").addEventListener("click", () => {
        const taskInput = document.getElementById("task-input").value.trim();
        if (taskInput) {
            tasks.push({ text: taskInput, completed: false });
            renderTasks();
        }
    });

    document.querySelectorAll(".delete").forEach(button => {
        button.addEventListener("click", (e) => {
            tasks.splice(e.target.dataset.index, 1);
            renderTasks();
        });
    });
}

document.getElementById("notes-tab").addEventListener("click", renderNotes);
document.getElementById("tasks-tab").addEventListener("click", renderTasks);

renderNotes();
