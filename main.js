//inicializacionde variables
let tarjetasdestapadas = 0

let tarjeta1 = null;
let tarjeta2 = null;
let primerResultado = null;
let segundoResultado = null;
let movimientos = 0;
let aciertos = 0;

let temporizador = false;
let timer = 60;
let tiemporegresivo = null;

let timeerInicial = timer;



//mostrar las cartas voltedas

let conteocartasvolteadas = document.getElementById('movimientos')

let mostaraciertos = document.getElementById('aciertos')

let conteodetiempo = document.getElementById('t-restantante')

//generacion de numeros aleatorios
let numeros = [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,];


numeros = numeros.sort(()=>{return Math.random()-0.5})
console.log(numeros);


//funciones de tiempo
function contartiempo(){
    tiemporegresivo = setInterval(()=>{

        timer--;
        conteodetiempo.innerHTML = `Tiempo: ${timer} segundos`
        if(timer == 0){
            clearInterval(tiemporegresivo);

            //bloquear tajertas al llegar a 0
            bloquearTarjetas();
        
        }

    },600)
}

function bloquearTarjetas(){
    for(let i = 0; i <= 15; i++){
        let tarjetabloqueada = document.getElementById(i)
        tarjetabloqueada.innerHTML = numeros[i]
        tarjetabloqueada.disabled = true;
    }
}

//funtion principal

function destapar(id){
    
    if(temporizador == false){
        contartiempo();
        temporizador = true;
    }

    tarjetasdestapadas++;
    console.log(tarjetasdestapadas);

    if(tarjetasdestapadas == 1){
        //mostrar el primero numero

        tarjeta1 = document.getElementById(id);
        primerResultado = numeros[id]
        tarjeta1.innerHTML = primerResultado;

        //desabhilitar primer boton
        tarjeta1.disabled = true;
        

    }else if(tarjetasdestapadas == 2){
        //mostar segundo numero
        tarjeta2 = document.getElementById(id)
        segundoResultado = numeros[id];
        tarjeta2.innerHTML = segundoResultado;

        //desabilitar la tajerta 2
        tarjeta2.disabled = true;

        //mostrar volteo de cartas conteo
        movimientos++;

        conteocartasvolteadas.innerHTML = `Cartas volteadas: ${movimientos}`;

        if(primerResultado == segundoResultado){
            //encerrar
            tarjetasdestapadas = 0;

            // y si su valor es 0 aumentar los aciertos
            aciertos++;
            mostaraciertos.innerHTML = `Aciertos: ${aciertos}`;

            if(aciertos == 8){
                clearInterval(tiemporegresivo)
                mostaraciertos.innerHTML = `Acertastes todos los numero: ${aciertos}🦖🦖🦖`;
                conteocartasvolteadas.innerHTML = `numero de cartas volteadas: ${movimientos}     ¿Felicidades😕? `;
                conteodetiempo.innerHTML= `Fantastico solo te demoraste ${timeerInicial - timer} segundos`
            }

        }else{
            //mostrar momentaniamente valores y volver a tapar
            setTimeout(()=>{
                tarjeta1.innerHTML = ``;
                tarjeta2.innerHTML = ``;
                tarjeta1.disabled = false;
                tarjeta2.disabled = false;
                
                tarjetasdestapadas = 0;
            },800)
        }
    }



}

