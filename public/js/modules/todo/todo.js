requirejs.config({
    baseUrl: 'js/modules/todo'
});

requirejs(['../utils/logger', 'repo/todoRepo', '../utils/dialog'], function(logger, repo, dialog) 
{
    logger.debug('Loaded todo module');

    const input = document.getElementById('EnterTask');

    const OnAddBtnClicked = () => 
    {
        const newTask = input.value;
        if (!newTask) {
            dialog.warn("Please enter a value!");
            return;
        }
        repo.addNewTask(newTask)
            .then(id => {
                logger.debug('Added new task: ' + id);
                dialog.success('Task Added!');
                input.value = '';
            })
            .catch(e => {
                logger.error('Error creating task!', e);
                dialog.error('Could not create task!');
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
                .then(() => {
                    dialog.success('Task Completed!');
                });
        }
        else  if(clickedBtn.name === 'DeleteTask')
        {
            repo.deleteTask(taskId)
                .then(() => {
                    dialog.success('Task Removed');
                });
        }
    
    };

    document.getElementById('BtnAdd').addEventListener('click', OnAddBtnClicked);
    input.addEventListener('keydown', (e) => e.keyCode === 13 ? OnAddBtnClicked() : () => {})
    document.getElementById('TodoList').addEventListener('click', OnTaskClicked);
    
});