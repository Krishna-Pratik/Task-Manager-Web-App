const taskForm = document.getElementById('task-form');
const titleInput = document.getElementById('title');
const descInput = document.getElementById('description');
const dueDateInput = document.getElementById('due-date');
const dueTimeInput = document.getElementById('due-time');
const priorityInput = document.getElementById('priority');
const categoryInput = document.getElementById('category');
const recurringInput = document.getElementById('recurring');
const subtaskInput = document.getElementById('subtask-input');
const addSubtaskBtn = document.getElementById('add-subtask-btn');
const subtasksList = document.getElementById('subtasks-list');
const taskList = document.getElementById('task-list');
const filterBtns = document.querySelectorAll('.filters button');
const searchInput = document.getElementById('search-input');
const filterDateInput = document.getElementById('filter-date');
const sortSelect = document.getElementById('sort-select');
const clearAllBtn = document.getElementById('clear-all-btn');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
let currentFilter = 'all';
let currentSubtasks = [];
let searchKeyword = '';
let filterDate = '';
let sortBy = 'dueDate';

// Utility: Save tasks to localStorage
function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Utility: Generate unique ID
function generateId() {
    return '_' + Math.random().toString(36).substr(2, 9);
}

// Combine date and time into a single ISO string
function getDueDateTime(date, time) {
    if (!time) time = "23:59";
    return new Date(`${date}T${time}`);
}

// Check if task is due within 1 day
function isDueSoon(dueDate, dueTime) {
    const due = getDueDateTime(dueDate, dueTime);
    const now = new Date();
    const diff = (due - now) / (1000 * 60 * 60 * 24);
    return diff <= 1 && diff >= 0;
}

// Format date and time for display
function formatDateTime(date, time) {
    if (!date) return '';
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    let dateStr = new Date(date).toLocaleDateString(undefined, options);
    if (time) {
        dateStr += ' ' + time;
    }
    return dateStr;
}

// Get priority badge HTML
function getPriorityBadge(priority) {
    let cls = '';
    if (priority === 'Low') cls = 'priority-badge priority-low';
    else if (priority === 'Medium') cls = 'priority-badge priority-medium';
    else if (priority === 'High') cls = 'priority-badge priority-high';
    return `<span class="${cls}">${priority}</span>`;
}

// Get category badge HTML
function getCategoryBadge(category) {
    return `<span class="category-badge category-${category}">${category}</span>`;
}

// Get recurring badge HTML
function getRecurringBadge(recurring) {
    if (recurring === 'none') return '';
    let text = recurring === 'daily' ? 'Daily' : 'Weekly';
    return `<span class="recurring-badge">${text}</span>`;
}

// Render subtasks in the form
function renderSubtasksForm() {
    subtasksList.innerHTML = '';
    currentSubtasks.forEach((sub, idx) => {
        const div = document.createElement('div');
        div.className = 'subtask-item';
        div.innerHTML = `
            <input type="checkbox" disabled ${sub.completed ? 'checked' : ''}>
            <span>${sub.title}</span>
            <button type="button" class="remove-subtask-btn" data-idx="${idx}">&times;</button>
        `;
        div.querySelector('.remove-subtask-btn').onclick = () => {
            currentSubtasks.splice(idx, 1);
            renderSubtasksForm();
        };
        subtasksList.appendChild(div);
    });
}

// Render subtasks in the task view
function renderSubtasksView(subtasks, taskId) {
    if (!subtasks || !subtasks.length) return '';
    let html = `<div class="subtasks-list">`;
    subtasks.forEach((sub, idx) => {
        html += `
        <div class="subtask-view${sub.completed ? ' completed' : ''}">
            <input type="checkbox" data-taskid="${taskId}" data-idx="${idx}" ${sub.completed ? 'checked' : ''}>
            <label>${sub.title}</label>
        </div>`;
    });
    html += `</div>`;
    return html;
}

// Show/hide Clear All button based on tasks
function updateClearAllBtn(filteredTasks) {
    if (!clearAllBtn) return;
    if (tasks.length > 0 && filteredTasks.length > 0) {
        clearAllBtn.style.display = "block";
    } else {
        clearAllBtn.style.display = "none";
    }
}

// Render tasks based on filter, search, sort
function renderTasks() {
    taskList.innerHTML = '';
    let filteredTasks = tasks;

    // Filter by completion
    if (currentFilter === 'completed') {
        filteredTasks = filteredTasks.filter(task => task.completed);
    } else if (currentFilter === 'incomplete') {
        filteredTasks = filteredTasks.filter(task => !task.completed);
    }

    // Filter by search keyword
    if (searchKeyword) {
        filteredTasks = filteredTasks.filter(task =>
            task.title.toLowerCase().includes(searchKeyword) ||
            task.description.toLowerCase().includes(searchKeyword) ||
            (task.category && task.category.toLowerCase().includes(searchKeyword)) ||
            (task.subtasks && task.subtasks.some(sub => sub.title.toLowerCase().includes(searchKeyword)))
        );
    }

    // Filter by date
    if (filterDate) {
        filteredTasks = filteredTasks.filter(task => task.dueDate === filterDate);
    }

    // Sort
    if (sortBy === 'dueDate') {
        filteredTasks.sort((a, b) => getDueDateTime(a.dueDate, a.dueTime) - getDueDateTime(b.dueDate, b.dueTime));
    } else if (sortBy === 'priority') {
        const order = { 'High': 1, 'Medium': 2, 'Low': 3 };
        filteredTasks.sort((a, b) => order[a.priority] - order[b.priority]);
    } else if (sortBy === 'completed') {
        filteredTasks.sort((a, b) => a.completed - b.completed);
    }

    updateClearAllBtn(filteredTasks);

    if (filteredTasks.length === 0) {
        // Show styled placeholder if no tasks
        const placeholder = document.createElement('div');
        placeholder.className = "empty-placeholder";
        placeholder.innerHTML = `<span class="icon">🗒️</span>No tasks added yet. Start by creating a new task.`;
        taskList.appendChild(placeholder);
        return;
    }

    filteredTasks.forEach(task => {
        const li = document.createElement('li');
        li.className = 'task-item' + (task.completed ? ' completed' : '');
        let reminderText = '';
        if (!task.completed && isDueSoon(task.dueDate, task.dueTime)) {
            li.style.border = '2px solid #ffd166';
            li.style.background = '#fffbe6';
            reminderText = `<span class="reminder">⏰ Due Soon!</span>`;
        }
        li.innerHTML = `
            <div class="task-title">
                ${task.title}
                ${getPriorityBadge(task.priority)}
                ${getCategoryBadge(task.category)}
                ${getRecurringBadge(task.recurring)}
                ${reminderText}
            </div>
            <div class="task-desc">${task.description}</div>
            <div class="task-date">Due: ${formatDateTime(task.dueDate, task.dueTime)}</div>
            ${renderSubtasksView(task.subtasks, task.id)}
            <div class="task-actions">
                <button class="complete-btn">${task.completed ? 'Undo' : 'Complete'}</button>
                <button class="edit-btn">Edit</button>
                <button class="delete-btn">Delete</button>
            </div>
        `;
        li.querySelector('.complete-btn').onclick = () => toggleComplete(task.id);
        li.querySelector('.edit-btn').onclick = () => editTask(task.id);
        li.querySelector('.delete-btn').onclick = () => deleteTask(task.id);

        // Subtask completion
        li.querySelectorAll('.subtask-view input[type="checkbox"]').forEach(cb => {
            cb.onchange = function() {
                const idx = +cb.getAttribute('data-idx');
                const t = tasks.find(t => t.id === task.id);
                t.subtasks[idx].completed = cb.checked;
                // If all subtasks completed, mark main task as completed
                if (t.subtasks.length && t.subtasks.every(s => s.completed)) {
                    t.completed = true;
                } else {
                    t.completed = false;
                }
                saveTasks();
                renderTasks();
            };
        });

        taskList.appendChild(li);
    });
}

// Add or update task
taskForm.onsubmit = function (e) {
    e.preventDefault();
    const title = titleInput.value.trim();
    const description = descInput.value.trim();
    const dueDate = dueDateInput.value;
    const dueTime = dueTimeInput.value;
    const priority = priorityInput.value;
    const category = categoryInput.value;
    const recurring = recurringInput.value;
    const subtasks = currentSubtasks.map(s => ({ ...s })); // deep copy

    if (!title || !description || !dueDate || !dueTime || !priority || !category) return;

    if (taskForm.dataset.editing) {
        const id = taskForm.dataset.editing;
        const task = tasks.find(t => t.id === id);
        task.title = title;
        task.description = description;
        task.dueDate = dueDate;
        task.dueTime = dueTime;
        task.priority = priority;
        task.category = category;
        task.recurring = recurring;
        task.subtasks = subtasks;
        delete taskForm.dataset.editing;
        taskForm.querySelector('button[type="submit"]').textContent = 'Add Task';
    } else {
        tasks.push({
            id: generateId(),
            title,
            description,
            dueDate,
            dueTime,
            priority,
            category,
            recurring,
            subtasks,
            completed: false
        });
    }
    saveTasks();
    renderTasks();
    taskForm.reset();
    currentSubtasks = [];
    renderSubtasksForm();
    priorityInput.value = "Low";
    categoryInput.value = "Work";
    recurringInput.value = "none";
};

// Add subtask
addSubtaskBtn.onclick = function() {
    const subtaskTitle = subtaskInput.value.trim();
    if (subtaskTitle) {
        currentSubtasks.push({ title: subtaskTitle, completed: false });
        renderSubtasksForm();
        subtaskInput.value = '';
    }
};

// Toggle complete/incomplete
function toggleComplete(id) {
    const task = tasks.find(t => t.id === id);
    task.completed = !task.completed;
    // If recurring and completed, create next occurrence
    if (task.completed && task.recurring && task.recurring !== 'none') {
        let nextDate = new Date(task.dueDate);
        if (task.recurring === 'daily') nextDate.setDate(nextDate.getDate() + 1);
        if (task.recurring === 'weekly') nextDate.setDate(nextDate.getDate() + 7);
        tasks.push({
            ...task,
            id: generateId(),
            dueDate: nextDate.toISOString().slice(0,10),
            completed: false,
            subtasks: task.subtasks.map(s => ({ ...s, completed: false }))
        });
    }
    saveTasks();
    renderTasks();
}

// Edit task
function editTask(id) {
    const task = tasks.find(t => t.id === id);
    titleInput.value = task.title;
    descInput.value = task.description;
    dueDateInput.value = task.dueDate;
    dueTimeInput.value = task.dueTime;
    priorityInput.value = task.priority;
    categoryInput.value = task.category;
    recurringInput.value = task.recurring;
    currentSubtasks = task.subtasks ? task.subtasks.map(s => ({ ...s })) : [];
    renderSubtasksForm();
    taskForm.dataset.editing = id;
    taskForm.querySelector('button[type="submit"]').textContent = 'Update Task';
}

// Delete task
function deleteTask(id) {
    // If the deleted task is being edited, reset the form
    if (taskForm.dataset.editing === id) {
        delete taskForm.dataset.editing;
        taskForm.querySelector('button[type="submit"]').textContent = 'Add Task';
        taskForm.reset();
        currentSubtasks = [];
        renderSubtasksForm();
    }
    tasks = tasks.filter(t => t.id !== id);
    saveTasks();
    renderTasks();
}

// Clear all tasks on click (with confirmation)
if (clearAllBtn) {
    clearAllBtn.onclick = function() {
        if (window.confirm("Are you sure you want to clear all tasks? This cannot be undone.")) {
            tasks = [];
            saveTasks();
            renderTasks();
        }
    };
}

// Filter buttons
filterBtns.forEach(btn => {
    btn.onclick = function () {
        filterBtns.forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        if (this.id === 'completed-tasks') currentFilter = 'completed';
        else if (this.id === 'incomplete-tasks') currentFilter = 'incomplete';
        else currentFilter = 'all';
        renderTasks();
    };
});

// Search
searchInput.oninput = function() {
    searchKeyword = searchInput.value.trim().toLowerCase();
    renderTasks();
};

// Filter by date
filterDateInput.onchange = function() {
    filterDate = filterDateInput.value;
    renderTasks();
};

// Sort
sortSelect.onchange = function() {
    sortBy = sortSelect.value;
    renderTasks();
};

// Initial
renderSubtasksForm();
renderTasks();