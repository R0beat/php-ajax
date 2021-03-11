# PETICIÓN BÁSCIA 

## Este metédoo que nos permite enviar datos
XMLHttpRequest();
```javascript
/* 
application/x-www-form-urlencoded: Los valores son codificados en tuplas llave-valor separadas por '&', con un '='  entre la llave y el valor.
*/
//instanciamos XMLHttpRequest para enviar y recibir peticiones
        let username = 'Roberto';
		let peticion = new XMLHttpRequest();
		//hacemos una peticion get al archivo 'backend'
		peticion.open('POST','backend.php',true);
		//Establecemos las opciones de peticiones
		peticion.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
		//Este método se encargar de ver  lo que estamos recibiendo desde el servidor
		peticion.onreadystatechange = function () {
            //Cambiamos el valor del elemento
			document.getElementById('title').innerHTML = peticion.responseText;
		}
		//Ejecutamos la peticion
		peticion.send(username);
```
_y en el archivo 'backend.php'_
```php
<?php 
	if(isset($_POST)){
		echo $_POST['username'];
	}
 ?>

```