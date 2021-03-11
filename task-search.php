<?php
    //Incluimos la conexion
    include('db/conexion.php');
    //Recibimos la varaibale search
    $search = $_POST['search'];
    //Vwerificamos que la ariable no eeste vacia
    if(!empty($search)){
        //Geernamos la consulta
        $query = "SELECT * FROM tareas WHERE nombre LIKE '$search%'";
        //ejecutamos la consulta 
        $result = mysqli_query($conexion,$query);
        //Si la consulta es vacia mandara un error
        if(!$result){
            die('Error de Consulta'.mysqli_error($conexion));
        }
        $json = array();
        while($row = mysqli_fetch_array($result)){
            $json[]  = array (
                'id' => $row['id_tarea'],
                'descripcion' => $row['descripcion'],
                'nombre'=>$row['nombre']
            );
        }
        $jsonstring = json_encode($json);
        echo $jsonstring;
    }
?>