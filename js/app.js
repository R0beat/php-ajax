$(document).ready(function(){
    //Search
    taskList();
    $('#task-result').hide();
    $('#search').keyup(function(e){
        if($('#search').val()){
            let search = $('#search').val();
            $.ajax({
                url: 'task-search.php', 
                type: 'POST',
                data: { search },
                success: function(response){
                    let tasks = JSON.parse(response);
                    let template = '';
                    tasks.forEach(task => {
                        template += `<li>${task.nombre}</li>`
                    });
                    $('#container').html(template);
                    $('#task-result').show();
                }

            });
        }
    });
    //Add Task
    $('#task-form').submit(function(e){
        const postData ={
            nombre: $('#nombre').val(),
            descripcion:$('#descripcion').val()
        };
        $.post('task-add.php', postData, function (response) {
            taskList();
            $('#task-form').trigger('reset');
        });
        //Evitamos que la pagina se recargue cada vez que enviamos datos
        e.preventDefault();
    });
    //Task list
    function taskList(){
        $.ajax({
            url : 'task-list.php',
            type : 'GET',
            success : function (response){
                let tasks = JSON.parse(response);
                let template = '';
                tasks.forEach(task =>{
                    template += `
                        <tr taskId="${task.id}">
                            <td>${task.id}</td>
                            <td>
                                <a href="#" class="task-item">${task.nombre}</a>
                            </td>
                            <td>${task.descripcion}</td>
                            <td><button class="task-delete btn btn-danger">Eliminar</button></td>
                        </tr>
                    `
                });
                $('#tasks').html(template);
            }
        });
    }

    //Delete task
    $(document).on('click','.task-delete',function (){
        if(confirm('Estas seguro de querer eliminar??')){
            let element = $(this)[0].parentElement.parentElement;
            let id = $(element).attr('taskId');
            $.post('task-delete.php', {id}, function (response){
                taskList();
            });
        }
    });

    $(document).on('click','.task-item',function(){
        let element = $(this)[0].parentElement.parentElement;
        let id = $(element).attr('taskId');
        console.log('editando');
    });
   

});