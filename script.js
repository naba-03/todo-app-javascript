// ===============================
// Select Elements
// ===============================

const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

// ===============================
// Add Task
// ===============================

addTaskBtn.addEventListener("click", addTask);

// Add task when Enter key is pressed
taskInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        addTask();
    }
});

function addTask() {

    const taskText = taskInput.value.trim();

    // Don't allow empty tasks
    if (taskText === "") {
        alert("Please enter a task.");
        return;
    }

    // Create <li>
    const li = document.createElement("li");
    li.className = "task";

    // Task text
    const span = document.createElement("span");
    span.textContent = taskText;

    // Button container
    const buttonContainer = document.createElement("div");
    buttonContainer.className = "task-buttons";

    // Complete Button
    const completeBtn = document.createElement("button");
    completeBtn.textContent = "✔";
    completeBtn.className = "edit-btn";

    // Delete Button
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "🗑";
    deleteBtn.className = "delete-btn";

    // Append buttons
    buttonContainer.appendChild(completeBtn);
    buttonContainer.appendChild(deleteBtn);

    // Append to task
    li.appendChild(span);
    li.appendChild(buttonContainer);

    taskList.appendChild(li);

    // Clear input
    taskInput.value = "";

    // ===============================
    // Complete Task
    // ===============================

    completeBtn.addEventListener("click", function () {
        li.classList.toggle("completed");
    });

    // ===============================
    // Delete Task
    // ===============================

    deleteBtn.addEventListener("click", function () {
        li.remove();
    });

}
