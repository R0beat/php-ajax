<?php
    include ('db/conexion.php');
    $id = $_POST['id'];
    $nombre = $_POST['nombre'];
    $descripcion = $_POST['descripcion'];
    $query= "UPDATE tareas SET nombre = '$nombre', descripcion = '$descripcion' WHERE id_tarea = '$id'";
    $result = mysqli_query($conexion,$query);

    if(!$result){
        die('Error al Actualizar'.mysqli_error($conexion));
    }
    echo "Exito al Actualizar";
    
?>