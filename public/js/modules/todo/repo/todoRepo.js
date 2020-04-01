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

    const createNewId = () => {

        let newId;

        while(true)
        {
            newId =  Math.floor(Math.random() * 9999999999) + 1;
            const potentialElem = todoList.querySelector("li[data-id='" + newId + "']");

            if(potentialElem === null) break;
        }

        return newId;
    }

    return { addNewTask };

});