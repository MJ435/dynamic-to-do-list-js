document.addEventListener('DOMContentLoaded', () => {
    // Select DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Function to add a new task
    function addTask() {
        // Get the task text and trim any whitespace
        const taskText = taskInput.value.trim();
        
        // Check if the task input is not empty
        if (taskText === '') {
            alert('Please enter a task.');
            return;
        }

        // Create a new list item
        const li = document.createElement('li');
        li.textContent = taskText;
        
        // Create a remove button
        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.className = 'remove-btn';
        
        // Add event listener to remove button
        removeBtn.addEventListener('click', () => {
            taskList.removeChild(li);
        });

        // Append the remove button to the list item
        li.appendChild(removeBtn);

        // Append the list item to the task list
        taskList.appendChild(li);

        // Clear the task input field
        taskInput.value = '';
    }

    // Event listener for the "Add Task" button
    addButton.addEventListener('click', addTask);

    // Event listener for the Enter key in the task input field
    taskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addTask();
        }
    });
});
