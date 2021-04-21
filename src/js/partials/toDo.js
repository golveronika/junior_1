const isToDoPage = document.querySelector(".to-do-page");

if (isToDoPage)
    document.querySelector(".to-do-page").onload = function () {

        const myStorage = window.localStorage;
        let tasks = JSON.parse(myStorage.getItem("tasks")) || [];

        tasks.forEach((task, index) => {
            addTask(task.text, task.completed, index);
        });

        document.getElementById("btn_clear_done").addEventListener("click", () => {
            tasks = tasks.filter(task => !task.completed);
            localStorage.setItem("tasks", JSON.stringify(tasks));
            const taskList = document.getElementById("task_list");
            taskList.innerHTML = "";
            tasks.forEach((task, index) => {
                addTask(task.text, task.completed, index);
            });
        });

        document.getElementById("btn_clear_all").addEventListener("click", () => {
            tasks = [];
            localStorage.setItem("tasks", JSON.stringify(tasks));
            const taskList = document.getElementById("task_list");
            taskList.innerHTML = "";
        });

        document.getElementById("btn_filter_done").addEventListener("change", (event) => {
            filterTasks(true, event.target.checked);
        });

        document.getElementById("btn_filter_undone").addEventListener("change", (event) => {
            filterTasks(false, event.target.checked);
        });

        document.getElementById("create").addEventListener("click", () => {
            createTask();
        });

        document.getElementById("text_create").addEventListener("keyup", function(event) {
            if (event.key === "Enter") {
              createTask();
            }
          });

        function createTask() {
            const inputText = document.getElementById("text_create");
            const text = inputText.value;

            if (!text) {
                const parent = document.querySelector(".bottom-panel");
                const emptyAlert = document.createElement("span");
                emptyAlert.innerText = "Task should not be empty!";
                parent.appendChild(emptyAlert);
                setTimeout(() => {
                    parent.removeChild(emptyAlert);
                }, 2000);
            } else {
                addTask(text, false, tasks.length);
                inputText.value = "";
                tasks.push({
                    text: text,
                    completed: false,
                });
                localStorage.setItem("tasks", JSON.stringify(tasks));
            }
        }


        function addTask(text, completed, index) {


            const filterUndone = document.getElementById("btn_filter_undone").checked;
            const filterDone = document.getElementById("btn_filter_done").checked;
            
            const parent = document.getElementById("task_list");
            const item = document.createElement("li");
            item.style.display = ((filterDone && completed) || (filterUndone && !completed)) ? "none" : "list-item";
            const label = document.createElement("label");
            const input = document.createElement("input");
            input.type = "checkbox";
            input.checked = completed;
            input.addEventListener("change", (event) => {
                tasks[index].completed = event.target.checked;
                localStorage.setItem("tasks", JSON.stringify(tasks));
            });
            const span = document.createElement("span");
            span.innerText = text;
            label.appendChild(input);
            label.appendChild(span);
            const delBtn = document.createElement("button");
            delBtn.addEventListener("click", () => {
                tasks = tasks.filter((_, indx) => index !== indx);
                localStorage.setItem("tasks", JSON.stringify(tasks));
                parent.innerHTML = "";
                tasks.forEach((task, index) => {
                    addTask(task.text, task.completed, index);
                });
            });
            item.appendChild(label);
            item.appendChild(delBtn);
            parent.appendChild(item);
        }

        function filterTasks(isDoneFilter, checked) {
            const parent = document.getElementById("task_list");
            const taskList = parent.querySelectorAll("li");

            if (checked) {
                tasks.forEach((task, index) => {
                    if ((task.completed && isDoneFilter) || (!task.completed && !isDoneFilter)) {
                        taskList[index].style.display = "none";
                    }
                });                
            } else {
                tasks.forEach((task, index) => {
                    if ((task.completed && isDoneFilter) || (!task.completed && !isDoneFilter)) {
                        taskList[index].style.display = "list-item";
                    }
                }); 
            } 
        }
    
    };
