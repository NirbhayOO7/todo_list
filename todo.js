(function (){
    let tasks = [];
    const tasksList = document.getElementById('list');
    const addTaskInput = document.getElementById('add');
    const tasksCounter = document.getElementById('tasks-counter');

    // console.log('Working');


    async function fetchTodo(){
        // fetch("https://jsonplaceholder.typicode.com/todos").then(function (response){
        //     console.log(response);
        //     return response.json();
        // })
        // .catch(function (error){
        //     console.log('error', error)
        // })
        // .then(function(data){
        //     console.log(data);
        //     tasks = data.splice(0, 10);
        //     renderList();
        // })

        // Or we can use below asyn awiat funcitions instead of above one

        try{
            const response = await fetch('https://jsonplaceholder.typicode.com/todos');
            const data = await response.json();
            tasks = data.splice(0, 10);
            renderList();
        }
        catch{
            alert('error');
        }

    }

    function addTaskToDOM(task)
    {
        const li = document.createElement('li');

        li.innerHTML = `<input type="checkbox" id="${task.id}" ${task.completed ? 'checked' : ''} class="custom-checkbox">
        <label for="${task.id}">${task.title}</label>
        <img src="bin.svg" class="delete"  data-id = "${task.id}"/>`;

        tasksList.append(li);
    }

    function renderList () {

        tasksList.innerHTML = '';

        for(let i=0; i<tasks.length; i++)
        {
            addTaskToDOM(tasks[i]);
        }

        tasksCounter.innerHTML = tasks.length;
    }

    function toggleTask (taskId) {
        // const newTasks = tasks.map((task)=>{
        //     if(task.id === taskId)
        //     {
        //         task.done = !task.done;
        //     }
        //     return task;
        // });

        // tasks = newTasks;
        // renderList();
        // showNotification("Task toggled successfully");

        const task = tasks.filter((task)=>{ // since .filter method creates a shallow copy(pass by reference) changing the values in currTask
            return task.id === taskId;      // will ultilmately changes the values in tasks.
        })

        if(task.length > 0)
        {
            const currTask = task[0];

            currTask.completed = !currTask.completed;
            renderList();
            showNotification("task toggeled successfully");
            return;
        }

        showNotification("could not toggle the task");
    }

    function deleteTask (taskId) {
        const newTasks = tasks.filter(function(task){
            return task.id !== taskId;
        });

        tasks = newTasks;
        renderList();
        showNotification("Task deleted successfully");
    }

    function addTask (task) {
        
        if(task)
        {
            tasks.push(task);
            renderList();
            showNotification("Task successfully added");
            return;
        }

        showNotification("Task cannot be added");
    }

    function showNotification(text) {
        alert(text);
    }

    function handleInputKeyPress(e){
        if(e.key === 'Enter')
        {
            const text = e.target.value;

            if(!text)
            {
                showNotification("Task text can not be empty");
                return;
            }

            const task ={
                title: text,
                id : Date.now(),
                completed : false
            }

            e.target.value = '';
            addTask(task);
        }
    }

    function handleClickListener(e)
    {
        const target = e.target;

        if(target.className === 'delete'){
            const taskId = Number(target.dataset.id);
            deleteTask(taskId);
            return;
        }
        else if(target.className === 'custom-checkbox'){
            const taskId = Number(target.id);
            toggleTask(taskId);
            return;
        }
    }

    function initializeApp(){
        fetchTodo();
        addTaskInput.addEventListener('keyup', handleInputKeyPress);
        document.addEventListener('click', handleClickListener);
    }

    initializeApp();
})();