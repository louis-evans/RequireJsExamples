requirejs.config({
    baseUrl: 'js/modules/todo'
});

requirejs(['../utils/logger', 'repo/todoRepo', '../utils/dialog'], function(logger, repo, dialog) 
{
    const input = document.getElementById('EnterTask');
    const btnAdd = document.getElementById('BtnAdd');
    const todoList = document.getElementById('TodoList');

    const OnAddBtnClicked = () => 
    {
        const newTask = input.value;

        if (!newTask) 
        {
            dialog.warn("Please enter a value!");
            return;
        }

        input.disabled = true;
        btnAdd.disabled = true;

        repo.addNewTask(newTask)
            .then(newId => 
            {
                addTaskListItem(newTask, newId);

                logger.debug('Added new task: ' + newId);
                dialog.success('Task Added!');
                input.value = '';                
            })
            .catch(e => 
            {
                logger.error('Error creating task!', e);
                dialog.error('Could not create task!');
            })
            .finally(() => 
            {
                input.disabled = false;
                btnAdd.disabled = false;
            });
    };

    const OnTaskClicked = (e) => 
    {
        const clickedBtn = e.target;
        
        if(!['DoneTask', 'DeleteTask'].includes(clickedBtn.name)) return;

        const taskId = clickedBtn.dataset['for'];

        if(clickedBtn.name === 'DoneTask')
        {
            repo.markTaskDone(taskId)
                .then(() => 
                {
                    const task = findTaskById(taskId);

                    task.style.backgroundColor = '#dff0d8';
                    task.style.opacity = 0.5;

                    task.querySelector('.btn-container').remove();

                    dialog.success('Task Completed!');
                });
        }
        else if(clickedBtn.name === 'DeleteTask')
        {
            repo.deleteTask(taskId)
                .then(() => 
                {
                    const task = findTaskById(taskId);;
                    task.remove();

                    dialog.success('Task Removed');
                });
        }
    };

    const addTaskListItem = (task, id) => 
    {
        const newItem = document.createElement('li');
        newItem.classList.add('list-group-item');
        newItem.dataset['id'] = id;
        newItem.innerHTML = task;

        const subText = document.createElement('span');
        subText.innerHTML = '<br/>Added: ' + moment().format('DD/MM/YYYY hh:mm:ss a');
        subText.classList.add('text-muted');

        const btnContainer = document.createElement('div');
        btnContainer.classList.add('btn-container');
        btnContainer.classList.add('pull-right');

        btnContainer.appendChild(createCompleteButton(id));
        btnContainer.appendChild(createDeleteButton(id));

        newItem.appendChild(btnContainer);
        newItem.appendChild(subText);
        todoList.appendChild(newItem);
    };

    const createCompleteButton = (id) => 
    {
        const completeBtn = document.createElement('i');
        completeBtn.dataset['for'] = id;
        completeBtn.name = 'DoneTask';
        completeBtn.classList.add('fa');
        completeBtn.classList.add('fa-check');
        completeBtn.classList.add('fa-2x');
        completeBtn.classList.add('text-success');
        return completeBtn;
    };

    const createDeleteButton = (id) => 
    {
        const deleteBtn = document.createElement('i');
        deleteBtn.dataset['for'] = id;
        deleteBtn.name = 'DeleteTask';
        deleteBtn.classList.add('fa');
        deleteBtn.classList.add('fa-times');
        deleteBtn.classList.add('fa-2x');
        deleteBtn.classList.add('text-danger');
        return deleteBtn;
    };

    const findTaskById = (taskId) => todoList.querySelector("li[data-id='" + taskId + "']");

    btnAdd.addEventListener('click', OnAddBtnClicked);
    input.addEventListener('keydown', (e) => e.keyCode === 13 ? OnAddBtnClicked() : () => {})
    todoList.addEventListener('click', OnTaskClicked);
    
});