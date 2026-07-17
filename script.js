// ===============================
// Select Elements
// ===============================

const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

// ===============================
// Local Storage
// ===============================

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// ===============================
// Display Tasks
// ===============================

function renderTasks() {

    taskList.innerHTML = "";

    tasks.forEach((task, index) => {

        const li = document.createElement("li");
        li.className = "task";

        if (task.completed) {
            li.classList.add("completed");
        }

        const span = document.createElement("span");
        span.textContent = task.text;

        const buttonContainer = document.createElement("div");
        buttonContainer.className = "task-buttons";

        // Complete Button
        const completeBtn = document.createElement("button");
        completeBtn.textContent = "✔";
        completeBtn.className = "edit-btn";

        completeBtn.addEventListener("click", () => {
            tasks[index].completed = !tasks[index].completed;
            saveTasks();
        });

        // Edit Button
        const editBtn = document.createElement("button");
        editBtn.textContent = "✏";
        editBtn.className = "edit-btn";

        editBtn.addEventListener("click", () => {

            const updatedTask = prompt(
                "Edit your task:",
                task.text
            );

            if (
                updatedTask !== null &&
                updatedTask.trim() !== ""
            ) {

                tasks[index].text = updatedTask.trim();
                saveTasks();

            }

        });

        // Delete Button
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "🗑";
        deleteBtn.className = "delete-btn";

        deleteBtn.addEventListener("click", () => {

            tasks.splice(index, 1);

            saveTasks();

        });

        buttonContainer.appendChild(completeBtn);
        buttonContainer.appendChild(editBtn);
        buttonContainer.appendChild(deleteBtn);

        li.appendChild(span);
        li.appendChild(buttonContainer);

        taskList.appendChild(li);

    });

}

// ===============================
// Add Task
// ===============================

function addTask() {

    const taskText = taskInput.value.trim();

    if (taskText === "") {
        alert("Please enter a task.");
        return;
    }

    tasks.push({
        text: taskText,
        completed: false
    });

    taskInput.value = "";

    saveTasks();

}

// ===============================
// Save Tasks
// ===============================

function saveTasks() {

    localStorage.setItem(
        "tasks",
        JSON.stringify(tasks)
    );

    renderTasks();

}

// ===============================
// Events
// ===============================

addTaskBtn.addEventListener("click", addTask);

taskInput.addEventListener("keypress", (e) => {

    if (e.key === "Enter") {
        addTask();
    }

});

// ===============================
// Initial Load
// ===============================

renderTasks();
