<?php
    include ('db/conexion.php');
    $query = "TRUNCATE TABLE tareas";
    $result = mysqli_query($conexion,$query);
    if(!$result){
        die('Error al eliminar'.mysqli_error($conexion));
    }
    echo "TAREAS VACIAS";
?>