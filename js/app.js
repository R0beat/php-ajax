$(document).ready(function(){
    let editar = false;
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
                    editar = true;
                }

            });
        }
    });
    //Add Task
    $('#task-form').submit(function(e){
        const postData ={
            nombre: $('#nombre').val(),
            descripcion:$('#descripcion').val(),
            id: $('#taskId').val()
        };
        //editando
        let url = editar === false ? 'task-add.php' : 'task-edit.php';
        $.post(url, postData, function (response) {
            taskList();
            $('#task-form').trigger('reset');
            $.alert(response);
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
                        <tr id="idtask" idtask="${task.id}">
                            <td>${task.id}</td>
                            <td>
                                <a href="#" class="task-item">${task.nombre}</a>
                            </td>
                            <td>${task.descripcion}</td>
                            <td><button class="task-delete btn btn-block text-center btn-danger"><i class="fad fa-eraser fa-7x"></i></button></td>
                        </tr>
                    `
                });
                $('#tasks').html(template);
            }
        });
    }

    //Delete task
    $(document).on('click','.task-delete',function (){
        $.confirm({
            title: 'ELIMINAR',
            content: '¿DESEA ELIMINAR LA TAREA?',
            buttons: {
                confirmar: function () {
                    let element = document.getElementById('idtask');
                    let id = $(element).attr('idtask');
                    $.post('task-delete.php', {id}, function (response){
                        taskList();
                        $.alert(response);
                    })
                },
                cancelar: function () {
                    $.alert('OPERACIÓN CANCELADA');
                },
            }
        });
    });

    $(document).on('click','.task-item',function(e){
        e.preventDefault();
        let element = $(this)[0].parentElement.parentElement;
        let id = $(element).attr('idtask');
        $.post('task-single.php', {id}, function(response){
            const task = JSON.parse(response); 
            $('#taskId').val(task.id);
            $('#nombre').val(task.nombre);
            $('#descripcion').val(task.descripcion);
            editar = true;
        });
    });
    $(document).on('click','#vaciar',function(){
        $.confirm({
            title: 'VACIAR',
            content: '¿DESEA VACIAR LA LISTA DE TAREAS?',
            buttons: {
                confirmar: function () {
                    $.post('task-drop.php', function(response){
                        taskList();
                        $.alert(response);
                    })
                },
                cancelar: function () {
                    $.alert('OPERACIÓN CANCELADA');
                },
            }
        });
        
    });
   

});
