define(['../../utils/logger'], function(logger) {

    const todoList = document.getElementById('TodoList');

    const addNewTask = (task) => {

        return new Promise((resolve, reject) => 
        {
            try
            {
                const newId = createNewId();

                const newItem = document.createElement('li');
                newItem.classList.add('list-group-item');
                newItem.dataset['id'] = newId;
                newItem.innerHTML = task;

                const subText = document.createElement('span');
                subText.innerHTML = '<br/>Added: ' + moment().format('DD/MM/YYYY hh:mm:ss a');
                subText.classList.add('text-muted');

                const btnContainer = document.createElement('div');
                btnContainer.classList.add('btn-container');
                btnContainer.classList.add('pull-right');

                btnContainer.appendChild(createCompleteButton(newId));
                btnContainer.appendChild(createDeleteButton(newId));

                newItem.appendChild(btnContainer);
                newItem.appendChild(subText);
                todoList.appendChild(newItem);
                
                resolve(newId);
            }
            catch(e)
            {
                reject(e);
            }
        });
    };

    const deleteTask = (id) => 
    {
        return new Promise((resolve, reject) => 
        {
            const task = todoList.querySelector("li[data-id='" + id + "']");

            if(task === null)
            {
                reject();
                return;
            }

            task.remove();
            resolve();
        });
    };

    const markTaskDone = (id) =>
    {
        return new Promise((resolve, reject) => 
        {
            const task = todoList.querySelector("li[data-id='" + id + "']");

            if(task === null)
            {
                reject();
                return;
            }

            task.style.backgroundColor = '#dff0d8';
            task.style.opacity = 0.5;

            task.querySelector('.btn-container').remove();
            resolve();
        });
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

    const createNewId = () => 
    {
        let newId;

        do
        {
            newId =  Math.floor(Math.random() * 9999999999) + 1;
            const potentialElem = todoList.querySelector("li[data-id='" + newId + "']");

            if(potentialElem === null) break;
        }
        while(true)
       
        return newId;
    }

    return { 
        addNewTask,
        deleteTask,
        markTaskDone
    };

});