define(['../../utils/logger'], function(logger) {

    const todoList = document.getElementById('TodoList');

    const addNewTask = (task) => 
    {
        return new Promise((resolve, reject) => 
        {
            setTimeout(() => 
            {
                try
                {               
                    resolve(createNewId());
                }
                catch(e)
                {
                    reject(e);
                }
            }, Math.floor(Math.random() * 2000)); //simulate a call to an API
        });
    };

    const deleteTask = (id) => 
    {
        return new Promise((resolve, reject) => 
        {
            setTimeout(() => 
            {
                try
                {               
                    resolve();
                }
                catch(e)
                {
                    reject(e);
                }
            }, Math.floor(Math.random() * 1000)); //simulate a call to an API
            
        });
    };

    const markTaskDone = (id) =>
    {
        return new Promise((resolve, reject) => 
        {
            resolve();
        });
    };

    const createNewId = () => 
    {
        let newId;

        do
        {
            newId =  Math.floor(Math.random() * 9999999999) + 1;
            const potentialElem = todoList.querySelector(`li[data-id='${newId}']`);

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
