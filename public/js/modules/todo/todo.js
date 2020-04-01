requirejs.config({
    baseUrl: 'js/modules/todo'
});

requirejs(['../utils/logger', 'repo/todoRepo', '../utils/dialog'], function(logger, repo, dialog) 
{
    logger.debug('Loaded todo module');

    document.getElementById('BtnAdd').addEventListener('click', function(e) {

        const input = document.getElementById('EnterTask');
        const newTask = input.value;

        if(!newTask)
        {
            dialog.warn("Please enter a value!");
            return;
        }

        repo.addNewTask(newTask)
            .then(id => 
            {
                logger.debug('Added new task: ' + id);
                dialog.success('Task Added!');
                input.value = '';
            })
            .catch(e => 
            {
                logger.error('Error creating task!', e);
                dialog.error('Could not create task!');
            });
    });
});