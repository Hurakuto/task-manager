const section = document.getElementById('topSection');

export const ToDoList = {
    data: {
        numberOfTasks: 0,
        tasks: []
    },
    elements: {},

    init(container) {
        ToDoList.createElements(container);
        ToDoList.loadTasks();
        ToDoList.updateDisplay();
        ToDoList.attachEvents();
    },

    createElements(container) {
        ToDoList.elements.wrapper = document.createElement("div");
        ToDoList.elements.wrapper.classList.add("topDiv");

        ToDoList.elements.numberOfTasks = document.createElement("p");
        ToDoList.elements.numberOfTasks.classList.add('tasksNumber');

        ToDoList.elements.increaseButton = document.createElement("button");
        ToDoList.elements.increaseButton.classList.add('addTask', 'button');

        ToDoList.elements.resetButton = document.createElement('button');
        ToDoList.elements.resetButton.classList.add('resetTasks', 'button');

        ToDoList.elements.taskNameInput = document.createElement('input');
        ToDoList.elements.taskNameInput.classList.add('taskNameInput', 'input');
        ToDoList.elements.taskNameInput.placeholder = "Name of the Task";

        ToDoList.elements.taskDescrInput = document.createElement('textarea');
        ToDoList.elements.taskDescrInput.classList.add('taskDescrInput', 'input');
        ToDoList.elements.taskDescrInput.placeholder = "Description of the Task";

        ToDoList.elements.tasksList = document.createElement('ul');

        ToDoList.elements.increaseButton.textContent = "New Task";
        ToDoList.elements.resetButton.textContent = "Reset";

        ToDoList.elements.Title = document.createElement("h2");
        ToDoList.elements.Title.textContent = "Task Manager";

        ToDoList.elements.themeButton = document.createElement("button");
        ToDoList.elements.themeButton.classList.add('themeButton', 'button');
        ToDoList.elements.themeButton.textContent = "Switch Theme";

        ToDoList.elements.wrapper.append(
            ToDoList.elements.Title,
            ToDoList.elements.themeButton,
            ToDoList.elements.taskNameInput,
            ToDoList.elements.taskDescrInput,
            ToDoList.elements.increaseButton,
            ToDoList.elements.resetButton,
            ToDoList.elements.numberOfTasks
        );

        section.append(ToDoList.elements.wrapper);

        container.append(ToDoList.elements.tasksList);
    },

    updateDisplay() {
        ToDoList.elements.numberOfTasks.textContent = `Number of Tasks : ${ToDoList.data.numberOfTasks}.`;
    },

    loadTasks() {
        const storedTasks = localStorage.getItem('tasks');
        if (storedTasks) {
            ToDoList.data.tasks = JSON.parse(storedTasks);
            ToDoList.data.numberOfTasks = ToDoList.data.tasks.length;
            ToDoList.data.tasks.forEach(task => ToDoList.renderTask(task));
        }
    },

    saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(ToDoList.data.tasks));
    },

    renderTask(taskData) {
        const taskElement = document.createElement('li');

        const taskName = document.createElement('p');
        taskName.classList.add('task_title');
        taskName.textContent = taskData.name;

        const taskDescription = document.createElement('p');
        taskDescription.classList.add('task_descr');
        taskDescription.textContent = taskData.description;

        const decreaseButton = document.createElement('button');
        decreaseButton.classList.add('delete_button', 'button');
        decreaseButton.textContent = "Delete Task";

        decreaseButton.addEventListener("click", () => {
            const taskIndex = ToDoList.data.tasks.indexOf(taskData);
            if (taskIndex > -1) {
                ToDoList.data.tasks.splice(taskIndex, 1);
            }

            ToDoList.data.numberOfTasks -= 1;
            ToDoList.saveTasks();
            ToDoList.updateDisplay();

            taskElement.remove();
        });

        taskElement.append(taskName, taskDescription, decreaseButton);
        ToDoList.elements.tasksList.appendChild(taskElement);
    },

    incrementToDoList() {
        if (ToDoList.elements.taskNameInput.value && ToDoList.elements.taskDescrInput.value) {
            const newTask = {
                name: ToDoList.elements.taskNameInput.value,
                description: ToDoList.elements.taskDescrInput.value
            };

            ToDoList.data.tasks.push(newTask);
            ToDoList.data.numberOfTasks += 1;

            ToDoList.saveTasks();
            ToDoList.updateDisplay();
            ToDoList.renderTask(newTask);

            ToDoList.elements.taskNameInput.value = "";
            ToDoList.elements.taskDescrInput.value = "";
        }
    },

    resetToDoList() {
        ToDoList.data.numberOfTasks = 0;
        ToDoList.data.tasks = [];
        ToDoList.saveTasks();
        ToDoList.updateDisplay();

        while (ToDoList.elements.tasksList.firstChild) {
            ToDoList.elements.tasksList.removeChild(ToDoList.elements.tasksList.firstChild);
        }
    },

    attachEvents() {
        ToDoList.elements.increaseButton.addEventListener(
            "click",
            ToDoList.incrementToDoList
        );

        ToDoList.elements.themeButton.addEventListener("click", () => {
            document.body.classList.toggle("light-mode");
        });

        ToDoList.elements.resetButton.addEventListener(
            "click",
            ToDoList.resetToDoList
        );
    },
}