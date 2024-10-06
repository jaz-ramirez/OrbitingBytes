/**  
** @Archivo:        juego.js
** @Equipo: 	    CoyoAtlón
** @Descripción:    Funcionamiento del juego y animaciones
*/
window.onload = function() {
    //constantes
    const imgTablero = new Image(1000, 1000); //almacena la imagen del tablero


    //variables globales
    let canvas = document.getElementById("juego");
    let ctx = canvas.getContext("2d");
    let rand=0;
    let jugadores; // Variable de 
    let tablero;   // las cookies
    let fichas = [];
    let colores=[];
    
        
    let aciertosJug1=0, fallidosJug1=0, kmRecorridosJug1=0; //Variables para el recuento de la tarjetas por jugador 
    let aciertosJug2=0, fallidosJug2=0, kmRecorridosJug2=0; //Variables para el recuento de la tarjetas por jugador
    let aciertosJug3=0, fallidosJug3=0, kmRecorridosJug3=0; //Variables para el recuento de la tarjetas por jugador
    let aciertosJug4=0, fallidosJug4=0, kmRecorridosJug4=0; //Variables para el recuento de la tarjetas por jugador

    let dadoButton = document.getElementById("botonDado");
    let bloqueBoton = document.getElementById("bloqueBoton");
    let tarjeta1 = document.getElementById("jug1");
    let tarjeta2 = document.getElementById("jug2");
    let tarjeta3 = document.getElementById("jug3");
    let tarjeta4 = document.getElementById("jug4");
    let divTurnoJugadorNormal = document.getElementById("turnoJugadorCasilla");
    //      Elementos de la tarjeta de pregunta
    let fondoPreguntaTarjeta = document.getElementById("fondoTarjetas");
    let tarjetaPreguntaTarjeta = document.getElementById("tarjetaPregunta");
    let numKilometroTarjeta=document.getElementById("numKilometros");
    let materiaTarjeta = document.getElementById("divMateria");
    let preguntaTarjeta = document.getElementById("divPregunta");
    let respuesta1Tarjeta = document.getElementById("idRespuesta1");
    let respuesta2Tarjeta = document.getElementById("idRespuesta2");
    let respuesta3Tarjeta = document.getElementById("idRespuesta3");
    let respuesta4Tarjeta = document.getElementById("idRespuesta4");
    let bloqueoRespuestas = document.getElementById("bloqueRes1");
    let infoAcierto = document.getElementById("divAcierto");
    let infoFallo = document.getElementById("divFallo");
    let divTurnoJugadorTarjeta = document.getElementById("turnoJugadorPregunta");
    //              FIN DE ELEMENTOS DE LA TARJETA DE PREGUNTA 

    //variables de control para el juego
    let numJugadores=0; 
    let orden = [];
    let valorPrimerTiro=[];
    let varcontrol = 0;
    let materia=4 , preguntas_pasadas = [];
    let stringPetición;
    let fetchPregunta, fetchRes1, fetchRes2, fetchRes3, fetchRes4, fetchKilometro, fetchResCorrect, fetchRespuestas, fetchIDPregunta;
    
    let boolPregunta=false;
    let turnoPregunta = false;
    let contadorJugadores = 0;
    let contadorTurnosJuego = 0;
    let turnoJugadorePregunta = 0;
    let turnosPasadosPregunta = 0;
    let contador;

    let turnoJuego;

    //variables para impedir repeticion y ciclos infinitos
    let idPreguntaMate = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
    let idPreguntaFisica = [21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40];
    let idPreguntaQuimica = [41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60];
    let idPreguntaPsico = [61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80];
    let idPreguntaLite = [81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100];
    let idPreguntaCom = [101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120];

    let contadorMate = 0, contadorFisica = 0, contadorQuimica=0, contadorPsico =0, contadorLite=0, contadorCom=0;     


    //clase en comun para las fichas
    class Ficha{
        lado = 15;
        //pide la posicion y el color de la fichas
        constructor(x,y,color){
            this.x = x;
            this.y = y;
            this.color = color;
            this.casilla = 0;
        }        

        //dibuja la ficha en el tablero
        dibujar(){
            ctx.beginPath();
            ctx.fillStyle = this.color;
            ctx.fill();
            ctx.fillRect(this.x,this.y,this.lado,this.lado);
            ctx.stroke();
            ctx.closePath();
           
        }

        //permite a la ficha avanzar en el tablero
        avanzar(km){
            for(let i = 0; i < km; i++){
                this.casilla++;
                if(tablero==21){
                    if(this.casilla == 1){
                        this.x += 150;
                    }
                    else if(this.casilla<5){
                        this.x += 110;
                    }
                    else if(this.casilla<7){
                        this.y -= 70;
                    }
                    else if(this.casilla<11){
                        this.x -= 110;
                    }
                    else if(this.casilla<13){
                        this.y -= 70;
                    }
                    else if(this.casilla<17){
                        this.x += 110;
                    }
                    else if(this.casilla<19){
                        this.y -= 70;
                    }
                    else if(this.casilla<23){
                        this.x -= 110;
                    }
                }else{
                    if(this.casilla == 7){
                        this.x -= 17;
                    }
                    if(this.casilla == 13){
                        this.y -= 25;
                    }
                    if(this.casilla == 19){
                        this.x += 35;
                    }
                    if(this.casilla == 24){
                        this.y += 26;
                    }
                    if(this.casilla == 29){
                        this.x -= 25;
                    }
                    if(this.casilla == 33){
                        this.y -= 29;
                    }
                    if(this.casilla == 37){
                        this.x += 13;
                        this.y -= 5;
                    }
                    if(this.casilla == 40){
                        this.y += 21;
                    }
                    if(this.casilla < 7){
                        this.x -= 100;
                    }
                    else if(this.casilla < 13){
                        this.y -= 80;
                    }
                    else if(this.casilla < 19){
                        this.x += 95;
                    }
                    else if(this.casilla < 24){
                        this.y += 80;
                    }else if(this.casilla < 29){
                        this.x -= 95;
                    }else if(this.casilla<33){
                        this.y -= 80;
                    }else if(this.casilla<37){
                        this.x += 100;
                    }else if(this.casilla<40){
                        this.y += 80;
                    }else if(this.casilla<43){
                        this.x -= 100;
                    }else if(this.casilla==43){
                        this.y -= 100;
                    }
                }
            }
        }
        
    }

    //funcion que impide ciclos infinitos
    function repetirIds(){
        if(contadorMate == 20){
            idPreguntaMate.forEach(id =>{
                let index = preguntasPasadas.indexOf(id);
                preguntas_pasadas.splice(index,1);
            });
            contadorMate = 0;
        }
        if(contadorFisica == 20){
            idPreguntaFisica.forEach(id =>{
                let index = preguntasPasadas.indexOf(id);
                preguntas_pasadas.splice(index,1);
            });
            contadorFisica = 0;
        }
        if(contadorQuimica == 20){
            idPreguntaQuimica.forEach(id =>{
                let index = preguntasPasadas.indexOf(id);
                preguntas_pasadas.splice(index,1);
                });
            contadorQuimica = 0;
        }
        if(contadorPsico == 20){
            idPreguntaPsico.forEach(id =>{
                let index = preguntasPasadas.indexOf(id);
                preguntas_pasadas.splice(index,1);
            });
            contadorPsico = 0;
        }
        if(contadorLite == 20){
            idPreguntaLite.forEach(id =>{
                let index = preguntasPasadas.indexOf(id);
                preguntas_pasadas.splice(index,1);
            });
            contadorLite = 0;
        }
        if(contadorCom == 20){
            idPreguntaCom.forEach(id =>{
                let index = preguntasPasadas.indexOf(id);
                preguntas_pasadas.splice(index,1);
            });
            contadorCom = 0;
        }
    }


    //funcion que verifica si hubo un ganador
    function checarGanador(){
        let contadorGanador = 1;
        fichas.forEach(ficha => {
            if((ficha.casilla >= 43 && tablero==42) || (ficha.casilla >= 22 && tablero==21))
            {
                document.cookie = "ganador="+contadorGanador;
                if(contadorGanador == fichas.length){
                    window.location.assign("./perder.html");
                }
                else{
                    window.location.assign("./ganar.html");
                }
                
            }
            contadorGanador++;
        });
    }

    //funcion que dibuja las tarjetas de las preguntas
    function drawPregunta(){
        //funcion que checa las respuestas
        function funcRespuesta(res){
            turnoPregunta=true;
            bloqueoRespuestas.style.display='block';
            new Promise((resolve, reject) => {
                if(res ==1){
                    infoAcierto.style.display='block';
                }else{
                    infoFallo.style.display='block';
                }
                resolve();
                
            }).then(()=>{
                return new Promise((resolve)=>{
                    setTimeout(()=>{
                        fondoPreguntaTarjeta.style.display = 'none';
                        tarjetaPreguntaTarjeta.style.display = 'none';
                        infoFallo.style.display='none';
                        infoAcierto.style.display='none';
                        bloqueoRespuestas.style.display='none';
                        divTurnoJugadorTarjeta.style.display = 'none';
                        turnoPregunta=false;
                        if(res == 1){
                            fichas[orden[contador]-1].avanzar(fetchKilometro);
                            if(orden[contador]==1){
                                aciertosJug1++;
                                kmRecorridosJug1 = fichas[0].casilla;
                            }
                            else if(orden[contador]==2){
                                aciertosJug2++;
                                kmRecorridosJug2 = fichas[1].casilla;
                            }
                            else if(orden[contador]==3){
                                aciertosJug3++;
                                kmRecorridosJug3 = fichas[2].casilla;
                            }
                            else if(orden[contador]==4){
                                aciertosJug4++;
                                kmRecorridosJug4 = fichas[3].casilla;
                            }
                            
                            if(contadorTurnosJuego<jugadores-1){
                                contadorTurnosJuego++;
                                turnoJuego = orden[contadorTurnosJuego];
                            }else{
                                contadorTurnosJuego = 0;
                                turnoJuego=orden[0];
                            }
                            divTurnoJugadorTarjeta.style.display = 'none';
                            divTurnoJugadorNormal.innerHTML='Turno: Jugador '+turnoJuego;
                            new Promise((resolve,reject) =>{
                                dibujarTablero();
                                resolve();
                            }).then(()=>{
                                return new Promise((resolve)=>{
                                    setTimeout(()=>{
                                        fichas.forEach(ficha => {
                                            ficha.dibujar();
                                        });
                                        infoTarjetas(); 
                                        resolve();  
                                    }, 100);
                                })
                            })
                            checarGanador();
                            repetirIds();
                        }
                        else{
                            if(turnosPasadosPregunta<jugadores-1){
                                //recursividad
                                drawPregunta(); 
                                if(orden[contador]==1){
                                    fallidosJug1++;
                                }
                                else if(orden[contador]==2){
                                    fallidosJug2++;
                                }
                                else if(orden[contador]==3){
                                    fallidosJug3++;
                                }
                                else if(orden[contador]==4){
                                    fallidosJug4++;
                                }
                                if(contador < jugadores-1){
                                    contador++;
                                    turnoJugadorePregunta = orden[contador];
                                }
                                else if(contador == jugadores-1){
                                    contador = 0;
                                    turnoJugadorePregunta = orden[contador];
                                }
                                turnosPasadosPregunta++;
                            }
                            else if(turnosPasadosPregunta >= jugadores-1){
                                if(orden[contador]==1){
                                    fallidosJug1++;
                                }
                                else if(orden[contador]==2){
                                    fallidosJug2++;
                                }
                                else if(orden[contador]==3){
                                    fallidosJug3++;
                                }
                                else if(orden[contador]==4){
                                    fallidosJug4++;
                                }
                                if(contadorTurnosJuego<jugadores-1){
                                    contadorTurnosJuego++;
                                    turnoJuego = orden[contadorTurnosJuego];
                                }else{
                                    contadorTurnosJuego = 0;
                                    turnoJuego=orden[0];
                                }
                                fichas[jugadores].avanzar(1);
                                new Promise((resolve,reject) =>{
                                    dibujarTablero();
                                    
                                    resolve();
                                }).then(()=>{
                                    return new Promise((resolve)=>{
                                        setTimeout(()=>{
                                            fichas.forEach(ficha => {
                                                ficha.dibujar();
                                            });
                                            infoTarjetas();
                                            resolve();                
                                        }, 100);
                                    })
                                });
                            }             
                           
                            divTurnoJugadorNormal.innerHTML='Turno: Jugador '+turnoJuego; 
                            divTurnoJugadorTarjeta.innerHTML = 'Turno del jugador: '+turnoJugadorePregunta;
                            checarGanador();
                            repetirIds();
                        }
                        resolve();
                    }, 2000)
                })
            })
        }
        fondoPreguntaTarjeta.style.display = 'block';
        tarjetaPreguntaTarjeta.style.display = 'block';
        divTurnoJugadorTarjeta.style.display = 'block';
        divTurnoJugadorTarjeta.innerHTML= 'Turno del jugador: '+turnoJuego;
        numKilometroTarjeta.innerHTML= 'Km: '+fetchKilometro;
        if(rand==1){
            materiaTarjeta.innerHTML= 'Aerosols';
            contadorMate++;
        }else if(rand==2){
            materiaTarjeta.innerHTML= 'Air Temperature';
            contadorFisica++;
        }else if(rand==3){
            materiaTarjeta.innerHTML= 'Barometric Pressure';
            contadorQuimica++;
        }else if(rand==4){
            materiaTarjeta.innerHTML= 'Clouds';
            contadorPsico++;
        }else if(rand==5){
            materiaTarjeta.innerHTML= 'Precipitation';
            contadorLite++;
        }else if(rand==6){
            materiaTarjeta.innerHTML= 'Relative Humidity & Surface Temperature';
            contadorCom++;
        }
        preguntaTarjeta.innerHTML= fetchPregunta[0];
        respuesta1Tarjeta.innerHTML= fetchRes1[0];
        respuesta2Tarjeta.innerHTML=fetchRes2[0];
        respuesta3Tarjeta.innerHTML=fetchRes3[0];
        respuesta4Tarjeta.innerHTML=fetchRes4[0];          
        
        
        respuesta1Tarjeta.addEventListener('click', ()=>{       
            if(turnoPregunta==false) 
                funcRespuesta(fetchRes1[1]);
        });
        respuesta2Tarjeta.addEventListener('click', ()=>{
            if(turnoPregunta==false) 
                funcRespuesta(fetchRes2[1]);
        });
        respuesta3Tarjeta.addEventListener('click', ()=>{
            if(turnoPregunta==false) {
                funcRespuesta(fetchRes3[1]);
            }
                
        });
        respuesta4Tarjeta.addEventListener('click', ()=>{
            if(turnoPregunta==false) 
                funcRespuesta(fetchRes4[1]);
        });        
        turnoJugadorePregunta = turnoJuego;
       
       
    }

    //funcion que comunica este archivo con php
    function peticion(){
        var datos = { id_materia: rand, preguntas: preguntas_pasadas}
        fetch("../dynamics/php/juego.php", {method: "POST", body: JSON.stringify(datos)}).then(function(response){
            return response.text();
        }).then(function (text){
            stringPetición = text;
            console.log(stringPetición);
            //metodo split que nos separa el string de la petición y los almacena en sus respectivas varibles en forma de arrelgos donde cada una contiene la respuesta y el boolCorrect
            fetchIDPregunta = stringPetición.split('^');
            fetchPregunta = fetchIDPregunta[0].split(";");
            fetchIDPregunta=fetchIDPregunta[1];
            preguntas_pasadas.push(fetchIDPregunta);
            fetchRespuestas = fetchPregunta[1].split('&');
            

            fetchRes1= fetchRespuestas[0].split('#');
           
            fetchRes2= fetchRespuestas[1].split('#');
            
            fetchRes3= fetchRespuestas[2].split('#');
            

            fetchKilometro=fetchRespuestas[3].split('|')[1]       
            

            fetchRes4=(fetchRespuestas[3].split('|')[0]).split("#");
            
            fetchRes4=(fetchRespuestas[3].split('|')[0]).split("#");
            dadoButton.style.visibility = 'visible';
            
        });
    }

    //arreglo que dicta el orden de los jugaodres
    function arregloOrdenPlay(){ 
        //Cada condicional determinaa las combinaciones posibles para determinar el orden
        //en el que irán los jugadores
    

        if(numJugadores==1)
        {
            
            orden.push(1);
            
        }
        else if(numJugadores==2)
        {
            
            if(valorPrimerTiro[0]>=valorPrimerTiro[1])
            {
                orden.push(1);
                orden.push(2);
            }
            else if(valorPrimerTiro[1]>=valorPrimerTiro[0]){
                orden.push(2);
                orden.push(1);
            }

        }else if(numJugadores==3)
        {
            
            let jug1 = valorPrimerTiro[0];
            let jug2 = valorPrimerTiro[1];
            let jug3 = valorPrimerTiro[2]
            let pass1 = false;
            let pass2 = false;
            let pass3 = false;
            
                  
            valorPrimerTiro = valorPrimerTiro.sort().reverse();
            
            
            valorPrimerTiro.forEach(Element=>{
              if(jug1 == Element && pass1 == false){
                orden.push(1);
                pass1 = true;
              }
              else if(jug2 == Element && pass2 == false){
                orden.push(2);
                pass2 = true;
              }
              else if(jug3 == Element && pass3 == false){
                orden.push(3);
                pass3 = true;
              }
            })
            
           

        }else if(numJugadores==4)
        {
            let jug1 = valorPrimerTiro[0];
            let jug2 = valorPrimerTiro[1];
            let jug3 = valorPrimerTiro[2];
            let jug4 = valorPrimerTiro[3];
            let pass1 = false;
            let pass2 = false;
            let pass3 = false;
            let pass4 = false;
            
            
            
            valorPrimerTiro = valorPrimerTiro.sort().reverse();
            
            
            valorPrimerTiro.forEach(Element=>{
              if(jug1 == Element && pass1 == false){
                orden.push(1);
                pass1 = true;
              }
              else if(jug2 == Element && pass2 == false){
                orden.push(2);
                pass2 = true;
              }
              else if(jug3 == Element && pass3 == false){
                orden.push(3);
                pass3 = true;
              }
              else if(jug4 == Element && pass4 == false){
                orden.push(4);
                pass4 = true;
              }
            })
                        
        }
        
    }

    //funcion de la animacion del dado
    function dado() {
        countAnimacion = 0;
        let canvas = document.getElementById('juego');
        let ctx = canvas.getContext("2d");
        let img = new Image();
        img.src = "../static/img/dadodef.png"
        let pos = [0,0];
        let numDado=5;
        rand = Math.floor(Math.random() * (7 - 1)) + 1;
    

        
        //TODO optimizar funcion printrand
        
        //Imprime número aleatorio de juego
        function printrand(){
            
            if(rand==1){
                ctx.drawImage(img,175*3,175*4,135,135,100,50,100,100);
            }
            if(rand==2){
                ctx.drawImage(img,175*3,175*1,135,135,100,50,100,100);
            }
            if(rand==3){
                ctx.drawImage(img,175*3,0,135,135,100,50,100,100);
            }
            if(rand==4){
                ctx.drawImage(img,175*3,175*7,135,135,100,50,100,100);
            }
            if(rand==5){
                ctx.drawImage(img,175*3,175*6,135,135,100,50,100,100);
            }
            if(rand==6){
                ctx.drawImage(img,175*3,175*3,135,135,100,50,100,100);
            }
            //almacena primeros valores de dado
            if(valorPrimerTiro.length<numJugadores){
                valorPrimerTiro.push(rand);
               
            }
        
            
           
        }
       
        function drawsprite(ctx,img,x,y){
            ctx.drawImage(img,175*x,175*y,135,135,100,50,100,100);
        }
    
        function step(){
            countAnimacion++;
            if(countAnimacion % 2 === 0){
                ctx.clearRect(100,50,100,100);
                drawsprite(ctx,img,pos[0], pos[1]);
                if(pos[0]<15){
                    pos[0]++;
                }
                else
                {
                    pos[0]=0;
                    pos[1]++;
                }
            }
            if(pos[1]<9){
                requestAnimationFrame(step);
            }else{
                countAnimacion = 0;
                pos = [0,0];
            }
        }
        
        //funcion que muestra el orden en pantall
        function ordenanza(){
            if(valorPrimerTiro.length<numJugadores)
            {
                Swal.fire("Siguiente jugador, es tu turno de tirar el dado");
                dadoButton.style.visibility = 'visible';
            }
            else if(valorPrimerTiro.length==numJugadores&&varcontrol===0)
            {                
                arregloOrdenPlay();
    
                varcontrol++;
                if(numJugadores==1){
                    Swal.fire('Eres el único jugador, ¡Mucha suerte, que la ignorancia no gane!');
                }
                else if(numJugadores==2){
                    Swal.fire("El orden de jugadores es :\nJugador "+orden[0]+"\nJugador "+orden[1]+
                        "\n¡Mucha suerte, que la ignorancia no gane!");
                }
                else if(numJugadores==3){
                     Swal.fire("El orden de jugadores es :\nJugador "+orden[0]+"\nJugador "+orden[1]
                    +"\nJugador "+orden[2]+"\n¡Mucha suerte, que la ignorancia no gane!");
                    
                }else if(numJugadores==4){
                    Swal.fire("El orden de jugadores es :\nJugador "+orden[0]+"\nJugador "+orden[1]
                    +"\nJugador "+orden[2]+"\nJugador "+orden[3]+"\n¡Mucha suerte, que la ignorancia no gane!");
                }
                
                dadoButton.style.visibility = 'visible';
                boolPregunta=true;
                turnoJuego = orden[0];
                divTurnoJugadorNormal.style.display = 'block';
                divTurnoJugadorNormal.innerHTML='Turno: Jugador '+turnoJuego;
            }                  
        }

        ///funcion que se encarga de todo el apartado grafico del juego
        function animacion(){
            new Promise((resolve,reject) => {
                dadoButton.style.visibility = 'hidden';
                requestAnimationFrame(step);
                resolve();
            }).then(()=>{
               return new Promise((resolve)=>{
                   setTimeout(()=>{
                        printrand();
                        resolve();        
                   }, 5000)
            }).then(()=>{
                return new Promise((resolve)=>{
                    setTimeout(()=>{
                        
                        if(boolPregunta==false){
                            ordenanza();
                        }
                        else{
                            new Promise(function(resolve, reject){
                                peticion();
                                contador = contadorTurnosJuego;
                                turnosPasadosPregunta=0;
                                resolve();
                            }).then(()=>{
                                return new Promise((resolve)=>{
                                    setTimeout(()=>{
                                        drawPregunta();
                                        resolve();                
                                    }, 700);
                                })
                            });
                        }
                        resolve();
                    }, 1500)
                })
                
               })
            })
       
          
        }
        animacion();      
    }

    //Función que separa las cookies de acuerdo al tablero, colores y jugadores
    function cookies(){
        
        let cookies = document.cookie;
        let cookiesArray = cookies.split("; ");
        cookiesArray.forEach(element => {
           
            let cookie = element.split("=");
            
            if(cookie[0] == "jugadores"){
                jugadores=cookie[1];
                numJugadores=cookie[1];
            }else if(cookie[0] == "tablero"){
                tablero=cookie[1];
            }else if(cookie[0] == "color1"){
                colores[0]=cookie[1];
            }else if(cookie[0] == "color2"){
                colores[1]=cookie[1];
            }else if(cookie[0] == "color3"){
                colores[2]=cookie[1];
            }else if(cookie[0] == "color4"){
                colores[3]=cookie[1];
            }
        });
    }

    //Función que Dibuja el tablero que se va a ocupar
    function dibujarTablero(){
        
        if(tablero==42){
            
            imgTablero.src = '../static/img/Tableros42.png';
            imgTablero.addEventListener('load', ()=>{
                ctx.drawImage(imgTablero, 230, 50, 800, 600);
            });
        }else{
            
            imgTablero.src = '../static/img/Tableros21.png';
            imgTablero.addEventListener('load', ()=>{
                ctx.drawImage(imgTablero, 250, 50, 700, 700);
            })
        }
        //Condicionales para aparecer tarjetas de jugador según su número.
        if(jugadores==1){
            tarjeta1.style.display='block';
            tarjeta1.style.backgroundColor=colores[0];  
        }else if(jugadores==2){
            tarjeta1.style.display='block';
            tarjeta1.style.backgroundColor=colores[0];  
            tarjeta2.style.display='block';
            tarjeta2.style.backgroundColor=colores[1];  
        }else if(jugadores==3){
            tarjeta1.style.display='block';
            tarjeta1.style.backgroundColor=colores[0];  
            tarjeta2.style.display='block';
            tarjeta2.style.backgroundColor=colores[1];  
            tarjeta3.style.display='block';
            tarjeta3.style.backgroundColor=colores[2];   
        }else if(jugadores==4){
            tarjeta1.style.display='block';
            tarjeta1.style.backgroundColor=colores[0];  
            tarjeta2.style.display='block';
            tarjeta2.style.backgroundColor=colores[1];  
            tarjeta3.style.display='block';
            tarjeta3.style.backgroundColor=colores[2];  
            tarjeta4.style.display='block';
            tarjeta4.style.backgroundColor=colores[3];  
        }      
    }

    function infoTarjetas(){
        let txtTarj1 = document.getElementById("jug1");
        let txtTarj2 = document.getElementById("jug2");
        let txtTarj3 = document.getElementById("jug3");
        let txtTarj4 = document.getElementById("jug4");

        if(jugadores==1){
            txtTarj1.innerHTML='Jugador 1 <br>KM recorridos:'+kmRecorridosJug1+'<br>Aciertos:'+aciertosJug1+'<br>Fallidos:'+fallidosJug1;
        }else if(jugadores==2){
            txtTarj1.innerHTML='Jugador 1 <br>KM recorridos:'+kmRecorridosJug1+'<br>Aciertos:'+aciertosJug1+'<br>Fallidos:'+fallidosJug1;
            txtTarj2.innerHTML='Jugador 2 <br>KM recorridos:'+kmRecorridosJug2+'<br>Aciertos:'+aciertosJug2+'<br>Fallidos:'+fallidosJug2;    
        }else if(jugadores==3){
            txtTarj1.innerHTML='Jugador 1 <br>KM recorridos:'+kmRecorridosJug1+'<br>Aciertos:'+aciertosJug1+'<br>Fallidos:'+fallidosJug1;
            txtTarj2.innerHTML='Jugador 2 <br>KM recorridos:'+kmRecorridosJug2+'<br>Aciertos:'+aciertosJug2+'<br>Fallidos:'+fallidosJug2; 
            txtTarj3.innerHTML='Jugador 3 <br>KM recorridos:'+kmRecorridosJug3+'<br>Aciertos:'+aciertosJug3+'<br>Fallidos:'+fallidosJug3;
        }else if(jugadores==4){
            txtTarj1.innerHTML='Jugador 1 <br>KM recorridos:'+kmRecorridosJug1+'<br>Aciertos:'+aciertosJug1+'<br>Fallidos:'+fallidosJug1;
            txtTarj2.innerHTML='Jugador 2 <br>KM recorridos:'+kmRecorridosJug2+'<br>Aciertos:'+aciertosJug2+'<br>Fallidos:'+fallidosJug2; 
            txtTarj3.innerHTML='Jugador 3 <br>KM recorridos:'+kmRecorridosJug3+'<br>Aciertos:'+aciertosJug3+'<br>Fallidos:'+fallidosJug3;
            txtTarj4.innerHTML='Jugador 4 <br>KM recorridos:'+kmRecorridosJug4+'<br>Aciertos:'+aciertosJug4+'<br>Fallidos:'+fallidosJug4;
        }
    }

    //funcion que crea los objetos de los jugadores
    function inicializarFichas(){
        for(let i=0; i<jugadores; i++){
            if(tablero == 21){
                if(i==0){
                    fichas.push(new Ficha(340,530,colores[i]));
                }else if(i==1){
                    fichas.push(new Ficha(340,560,colores[i]));
                }else if(i==2){
                    fichas.push(new Ficha(380,530,colores[i]));
                }else if(i==3){
                    fichas.push(new Ficha(380,560,colores[i]));
                }
            }else{
                if(i==0){
                    fichas.push(new Ficha(945,592,colores[i]));
                }else if(i==1){
                    fichas.push(new Ficha(945,622,colores[i]));
                }else if(i==2){
                    fichas.push(new Ficha(975,592,colores[i]));
                }else if(i==3){
                    fichas.push(new Ficha(975,622,colores[i]));
                }
            }
        }
        if(tablero == 21){
            fichas.push(new Ficha(360,545,"#000000"));
        }
        if(tablero == 42){
            fichas.push(new Ficha(960,605,"#000000"));
        }        
    }    

    //funcion que inicializa el juego
    function dibujar(){
        cookies();
        infoTarjetas();
        inicializarFichas();
        new Promise(function(resolve, reject){
            dibujarTablero();
            Swal.fire('Gira el dado para iniciar el juego');
            resolve();
        }).then(()=>{
            return new Promise((resolve)=>{
                setTimeout(()=>{
                    fichas.forEach(ficha => {
                        ficha.dibujar();
                    }); 
                    
                    resolve();                
                }, 200);
            })
        });
    }
    
    dibujar(); 
    dadoButton.addEventListener('click', e => {
        bloqueBoton.style.display='block';
        dado();
        contadorJugadores++;
    });
    
}