<?php
    //Incluimos la conexion
    include('db/conexion.php');

    if(isset($_POST['nombre'])){
        $nombre = $_POST['nombre'];
        $descipcion = $_POST['descripcion'];
        $query = "INSERT INTO tareas (nombre,descripcion) VALUES ('$nombre','$descipcion')";
        $result = mysqli_query($conexion,$query);
        if(!$result){
            die('Error al insertar');
        }
        echo "datos guardados exitosamente";
    }

?>