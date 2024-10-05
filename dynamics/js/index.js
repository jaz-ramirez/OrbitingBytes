/**  
** @Archivo:        index.js
** @Equipo: 	    CoyoAtlón
** @Descripción:    Funcionamiento de inicio del juego, selección de jugadores y tablero.
*/
window.addEventListener("load", ()=>{
    document
    //Declaracion de las variables globales
    let botonJugar = document.getElementById("idBotonJugar");
    let botonInstrucciones = document.getElementById("idBotonInstrucciones");
    //let botonCredito = document.getElementById("idBotonCreditos");
    let fondoDegradado = document.getElementById("id_capaOscura");
    let divCaractJuego = document.getElementById("id_caractJuego");
    let botonForm = document.getElementById("boton");
    let cerrarVentana = document.getElementById("cerrarVentana");
    let p1R1 = document.getElementById("1Jugadores");
    let p1R2 = document.getElementById("2Jugadores");
    let p1R3 = document.getElementById("3Jugadores");
    let p1R4 = document.getElementById("4Jugadores");
    let p2R1 = document.getElementById("tablero21");
    let p2R2 = document.getElementById("tablero42");
    let color1 = document.getElementById("colorj1");
    let color2 = document.getElementById("colorj2");
    let color3 = document.getElementById("colorj3");
    let color4 = document.getElementById("colorj4");
    let colores=[];
    let players=document.getElementById("players");
    let newPla=document.getElementById("new");

    //Eventos de los botónes del menú (Jugar, Instrucciones y )
    botonJugar.addEventListener("click", ()=>{
        fondoDegradado.style.visibility="visible";
        divCaractJuego.style.visibility="visible";
    });

     botonInstrucciones.addEventListener("click", ()=>{ 
        window.location.assign("./templates/instrucciones.html");
    });

    //Eventos de selección de jugador y color
    players.addEventListener("click", ()=>{
        if(p1R1.checked){
            color1 = document.getElementById("colorj1");
            numplayer(1);
            
        }
        else if(p1R2.checked){
            numplayer(2);
            color1 = document.getElementById("colorj1");
            color2 = document.getElementById("colorj2");
            
        }
        else if(p1R3.checked){
            numplayer(3);
            color1 = document.getElementById("colorj1");
            color2 = document.getElementById("colorj2");
            color3 = document.getElementById("colorj3");
        }
        else if(p1R4.checked){
            numplayer(4);
            color1 = document.getElementById("colorj1");
            color2 = document.getElementById("colorj2");
            color3 = document.getElementById("colorj3");
            color4 = document.getElementById("colorj4");
        }
       
    });

    //Eventos del Modal con Cuestionario
    botonForm.addEventListener("click", ()=>{
        //Genera las coockies respecto a las respuestas y los colores
        if(p1R1.checked){
            document.cookie = "jugadores=1";
            colores.push(color1.value);
            colores.push("#FE1357");
            colores.push("#F5C500");
            colores.push("#01BC0D");
   

        }else if(p1R2.checked){       
            document.cookie = "jugadores=2";
            colores.push(color1.value);
            colores.push(color2.value);
            colores.push("#F5C500");
            colores.push("#01BC0D");

        }else if(p1R3.checked){
            document.cookie = "jugadores=3";
            colores.push(color1.value);
            colores.push(color2.value);
            colores.push(color3.value);
            colores.push("#01BC0D");
        }else if(p1R4.checked){
            document.cookie = "jugadores=4";
            colores.push(color1.value);
            colores.push(color2.value);
            colores.push(color3.value);
            colores.push(color4.value);
           
        }
        if(p2R1.checked){
            document.cookie = "tablero=21";
        }else if(p2R2.checked){
            document.cookie = "tablero=42";
        }

        for (let i = 0; i < 4 ;i++) {
            document.cookie = "color"+(i+1)+"="+colores[i];
        }
           
        
        window.location.assign("./templates/juego.html");

    });

    cerrarVentana.addEventListener("click", ()=>{
        fondoDegradado.style.visibility="hidden";
        divCaractJuego.style.visibility="hidden";
    });

    
    //Cambiar num jugadores  y que aparezca paleta de colores

    function numplayer (numero){
        if(numero==1){   
            newPla.innerHTML="<input type=\"color\" id=\"colorj1\" class=\"colorextra\" value=\"#0432DB\">";
        }
        else if(numero==2){
            
            newPla.innerHTML="<input type=\"color\" id=\"colorj1\" class=\"colorextra\" value=\"#0432DB\"><input type=\"color\" id=\"colorj2\" class=\"colorextra\" value=\"#FE1357\">";
        
        }
        else if(numero==3){
            newPla.innerHTML="<input type=\"color\" id=\"colorj1\" class=\"colorextra\" value=\"#0432DB\"><input type=\"color\" id=\"colorj2\" class=\"colorextra\" value=\"#FE1357\"><input type=\"color\" id=\"colorj3\" class=\"colorextra\" value=\"#F5C500\">";
        
        }
        else if(numero==4){
        
            newPla.innerHTML="<input type=\"color\" id=\"colorj1\" class=\"colorextra\" value=\"#0432DB\"><input type=\"color\" id=\"colorj2\" class=\"colorextra\" value=\"#FE1357\"><input type=\"color\" id=\"colorj3\" class=\"colorextra\" value=\"#F5C500\"><input type=\"color\" id=\"colorj4\" class=\"colorextra\" value=\"#01BC0D\">";
        }
    
    }
});

