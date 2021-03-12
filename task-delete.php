<?php
    include ('db/conexion.php');
    if(isset($_POST['id'])){
        $id = $_POST['id'];
        $query= "DELETE FROM tareas WHERE  id_tarea = $id";
        $result = mysqli_query($conexion,$query);
        if(!$result){
            die('Error al eliminar'.mysqli_error($conexion));
        }
        echo "Exito al eliminar";
    }
?>