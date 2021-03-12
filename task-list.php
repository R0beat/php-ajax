<?php
    //Incluimos la conexion
    include('db/conexion.php');
    $query = "SELECT * FROM tareas";
    $result = mysqli_query($conexion,$query);
    if(!$result){
        die('Error al consultar'.mysqli_error($conexion));
    }
    $json = array ();
    while ($row = mysqli_fetch_array($result)){
         $json[] = array( 
             'id' => $row['id_tarea'],
             'nombre' => $row['nombre'],
             'descripcion' => $row['descripcion']
         );
    }

    $json_string = json_encode($json);
    echo $json_string;
?>