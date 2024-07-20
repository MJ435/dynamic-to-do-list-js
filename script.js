document.addEventListener('DOMContentLoaded', () => {
    // Select DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Load tasks from Local Storage
    loadTasks();

    // Function to load tasks from Local Storage
    function loadTasks() {
        // Get stored tasks from Local Storage or default to an empty array
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        // Add each task to the task list
        storedTasks.forEach(taskText => addTask(taskText, false)); // false to avoid saving again
    }

    // Function to add a new task
    function addTask(taskText, save = true) {
        // Create a new list item
        const li = document.createElement('li');
        li.textContent = taskText;
        
        // Create a remove button
        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.className = 'remove-btn';
        
        // Add event listener to remove button
        removeBtn.addEventListener('click', () => {
            // Remove the task from the DOM
            taskList.removeChild(li);
            // Remove the task from Local Storage
            removeTaskFromStorage(taskText);
        });

        // Append the remove button to the list item
        li.appendChild(removeBtn);

        // Append the list item to the task list
        taskList.appendChild(li);

        // Save the task to Local Storage if specified
        if (save) {
            saveTaskToStorage(taskText);
        }

        // Clear the task input field
        taskInput.value = '';
    }

    // Function to save a task to Local Storage
    function saveTaskToStorage(taskText) {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.push(taskText);
        localStorage.setItem('tasks', JSON.stringify(storedTasks));
    }

    // Function to remove a task from Local Storage
    function removeTaskFromStorage(taskText) {
        let storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks = storedTasks.filter(task => task !== taskText);
        localStorage.setItem('tasks', JSON.stringify(storedTasks));
    }

    // Event listener for the "Add Task" button
    addButton.addEventListener('click', () => {
        const taskText = taskInput.value.trim();
        if (taskText === '') {
            alert('Please enter a task.');
            return;
        }
        addTask(taskText);
    });

    // Event listener for the Enter key in the task input field
    taskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            const taskText = taskInput.value.trim();
            if (taskText === '') {
                alert('Please enter a task.');
                return;
            }
            addTask(taskText);
        }
    });
});
