// =======================================
// SELECT ELEMENTS
// =======================================

const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

const searchInput = document.getElementById("searchInput");

const clearAllBtn = document.getElementById("clearAllBtn");

const totalTasks = document.getElementById("totalTasks");
const completedTasks = document.getElementById("completedTasks");
const pendingTasks = document.getElementById("pendingTasks");

const filterButtons = document.querySelectorAll(".filter");

// =======================================
// TASK ARRAY
// =======================================

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

let currentFilter = "all";

// =======================================
// ADD TASK
// =======================================

function addTask() {

    const taskText = taskInput.value.trim();

    if (taskText === "") {

        alert("Please enter a task!");

        return;

    }

    const task = {

        id: Date.now(),

        text: taskText,

        completed: false

    };

    tasks.push(task);

    taskInput.value = "";

    saveTasks();

}

// =======================================
// SAVE TASKS
// =======================================

function saveTasks() {

    localStorage.setItem(

        "tasks",

        JSON.stringify(tasks)

    );

    renderTasks();

    updateStats();

}

// =======================================
// EVENTS
// =======================================

addTaskBtn.addEventListener(

    "click",

    addTask

);

taskInput.addEventListener(

    "keypress",

    function(e){

        if(e.key==="Enter"){

            addTask();

        }

    }

);

// =======================================
// RENDER TASKS
// =======================================

function renderTasks() {

    taskList.innerHTML = "";

    // Empty State
    if (tasks.length === 0) {

        taskList.innerHTML = `
            <div class="empty-message">
                🎉 No tasks yet! Add one above.
            </div>
        `;

        return;
    }

    tasks.forEach((task) => {

        // Filter
        if (currentFilter === "completed" && !task.completed) return;
        if (currentFilter === "pending" && task.completed) return;

        // Search
        if (
            !task.text
                .toLowerCase()
                .includes(searchInput.value.toLowerCase())
        ) return;

        const li = document.createElement("li");
        li.className = "task";

        if (task.completed) {
            li.classList.add("completed");
        }

        li.innerHTML = `

            <span>${task.text}</span>

            <div class="task-buttons">

                <button
                    class="complete-btn"
                    onclick="toggleTask(${task.id})">

                    ✔

                </button>

                <button
                    class="edit-btn"
                    onclick="editTask(${task.id})">

                    ✏

                </button>

                <button
                    class="delete-btn"
                    onclick="deleteTask(${task.id})">

                    🗑

                </button>

            </div>

        `;

        taskList.appendChild(li);

    });

}

// =======================================
// COMPLETE TASK
// =======================================

function toggleTask(id) {

    tasks = tasks.map(task => {

        if (task.id === id) {

            task.completed = !task.completed;

        }

        return task;

    });

    saveTasks();

}

// =======================================
// DELETE TASK
// =======================================

function deleteTask(id) {

    tasks = tasks.filter(task => task.id !== id);

    saveTasks();

}

// =======================================
// EDIT TASK
// =======================================

function editTask(id) {

    const task = tasks.find(task => task.id === id);

    const updatedText = prompt(

        "Edit your task:",

        task.text

    );

    if (

        updatedText !== null &&

        updatedText.trim() !== ""

    ) {

        task.text = updatedText.trim();

        saveTasks();

    }

}

// =======================================
// UPDATE STATISTICS
// =======================================

function updateStats() {

    const completed = tasks.filter(task => task.completed).length;

    const pending = tasks.length - completed;

    totalTasks.textContent = `Total: ${tasks.length}`;

    completedTasks.textContent = `Completed: ${completed}`;

    pendingTasks.textContent = `Pending: ${pending}`;

}

// =======================================
// LIVE SEARCH
// =======================================

searchInput.addEventListener("input", function () {

    renderTasks();

});

// =======================================
// FILTER BUTTONS
// =======================================

filterButtons.forEach(button => {

    button.addEventListener("click", function () {

        // Remove active class
        filterButtons.forEach(btn => {

            btn.classList.remove("active");

        });

        // Add active class
        this.classList.add("active");

        // Get filter value
        currentFilter = this.dataset.filter;

        renderTasks();

    });

});

// =======================================
// CLEAR ALL TASKS
// =======================================

clearAllBtn.addEventListener("click", function () {

    if (tasks.length === 0) {

        alert("No tasks to delete!");

        return;

    }

    const confirmDelete = confirm(

        "Are you sure you want to delete all tasks?"

    );

    if (confirmDelete) {

        tasks = [];

        saveTasks();

    }

});

// =======================================
// INITIALIZE APP
// =======================================

renderTasks();

updateStats();
