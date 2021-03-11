<?php
    $conexion = mysqli_connect(
        'localhost',
        'root',
        'password',
        'db_name'
    );
    if($conexion){
        echo 'Conexion exitosa en la Base de Datos';
    }
    else{
        echo 'Error de conexión';
    }
?>