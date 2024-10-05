<?php
/*
** @Archivo:        config.php
** @Equipo: 	    OrbitingTeams
** @Descripción:    Conexión con base de datos.
*/

    //creación de constantes para la conexión
    define("DBUSER","root");
    define("DBHOST","localhost");
    define("PASSWORD","");
    define("DB","game");
    

    //funcion que conecta a la base de datos
    function connect()
    {
        $con=mysqli_connect(DBHOST,DBUSER, PASSWORD, DB);
        
        if(!$con){
            mysqli_connect_error();
            mysqli_connect_errno();
            echo "Unable to connect to database";
        }
        return $con;
    }
?>