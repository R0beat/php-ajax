<?php 
    include('db/conexion.php');
    $id = $_POST['id'];
    $query = "SELECT * FROM tareas WHERE id_tarea = $id";
    $result = mysqli_query($conexion,$query);
    if(!$result){
        die('Consulta fallida');
    }
    $json = array();
    while ($row = mysqli_fetch_array($result)){
        $json[] = array( 
            'id' => $row['id_tarea'],
            'nombre' => $row['nombre'],
            'descripcion' => $row['descripcion']
        );
   }

   $json_string = json_encode($json[0]);
   echo $json_string;

?>