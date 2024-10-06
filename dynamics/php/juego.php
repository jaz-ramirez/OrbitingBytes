<?php
/*
** @Archivo:        juego.php
** @Equipo: 	    CoyoAtlón
** @Descripción:    Consultas a la base de datos
*/

    //funcion recursiva que busca el id de una pregunta que no haya sido seleccionado antes
    function compairIds($ids, $idRand, $idsPasadas){
        $boolPass = false;
        foreach($idsPasadas as $id){
            if($id == $idRand){
                $boolPass = true;
            }
        }
        if($boolPass == true){
            $keyIdRand = rand(0,19);
            $idRand = $ids[$keyIdRand];
            return(compairIds($ids,$idRand,$idsPasadas));
        }
        else{
            return $idRand;
        }
    }

    //funcion que busca preguntas en la base de datos
    function buscarPregunta($numMateria, $conexion, $idsPasadas){
        $ids = [];
        $peticion = "SELECT id_pregunta FROM Preguntas WHERE id_materia=".$numMateria.";";
        mysqli_real_escape_string($conexion, $peticion);
        $query = mysqli_query($conexion, $peticion);
        while($row = mysqli_fetch_array($query, MYSQLI_ASSOC))
        {
            array_push($ids, $row["id_pregunta"]);
        }
        $keyIdRand = rand(0,19);
        $idRand = $ids[$keyIdRand];
        $idSeleccionado = compairIds($ids, $idRand, $idsPasadas);
        return($idSeleccionado);
    }

    //incluye el php que establce la conexión
    include("./config.php");
    $conexion = connect();

    //genera un numero random para la peticion de la pregunta
    $preguntaAzar= rand(1, 20);
    $numPregunta = ($preguntaAzar*4)-1;
    
    $pregunta1 = [];
    $pregunta2 = [];
    $pregunta3 = [];
    $pregunta4 = [];

    //Petición de JS FETCH
    $json = trim(file_get_contents("php://input"));
    $decode = json_decode($json, true);
    $numMateria=$decode['id_materia'];
    $preguntasPasadas = $decode["preguntas"];


    //id de la pregunta que se selecciono
    $idSeleccionado = buscarPregunta($numMateria,$conexion,$preguntasPasadas);


    $peticion = "SELECT id_pregunta, pregunta, respuesta, boolCorrect, kilómetro FROM Preguntas 
                NATURAL JOIN Respuestas 
                WHERE Preguntas.id_pregunta=".$idSeleccionado;
    mysqli_real_escape_string($conexion, $peticion);
    $query = mysqli_query($conexion, $peticion);
    // $row_instrucciones = mysqli_fetch_array($query);
    // var_dump($row_instrucciones);
    $arr = [];
    $var=[];
    $i = 0;
    while($row = mysqli_fetch_array($query, MYSQLI_ASSOC))
    {
        // var_dump($row);
        array_push($arr, $row);
    }

    /*Se asigna cada arreglo de pregunta en una variable*/
    $pregunta1 = $arr[0];
    $pregunta2 = $arr[1];
    $pregunta3 = $arr[2];
    $pregunta4 = $arr[3];

    /*Nos sirve en js: Kilometros, pregunta respuesta y boolcorrect */

    print_r($pregunta1['pregunta'].';'. $pregunta1['respuesta'].'#'.$pregunta1['boolCorrect'].'&'. $pregunta2['respuesta'] . '#' . $pregunta2['boolCorrect'].'&'. $pregunta3['respuesta'] . '#' . $pregunta3['boolCorrect'].'&'. $pregunta4['respuesta'] . '#' . $pregunta4['boolCorrect'].'|'.$pregunta1['kilómetro'].'°'.$idSeleccionado);
?>