/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var imgObj = null;
/* Inicializa el calibrador en cero*/
function init() {
    imgObj = document.getElementById('RMovil');
    imgObj.style.position = 'absolute';
    imgObj.style.top = '0px';
    imgObj.style.left = '143px';
    //document.getElementById("Measure").innerHTML = 0.00;
}

window.onload = init;
            
    
    //--------------------------------------------------------------------------
     /* Realiza una medida aleatoria*/               
function Measure() {
    init();
    var MeasureVal = 0.0;
    MeasureVal = Math.floor(Math.random() * 192)*5;
    imgObj.style.left = parseInt(imgObj.style.left) + ~~MeasureVal;
    +5*'px';
    var Answer = MeasureVal * (1.0/640.0);
    var Int_part = Math.trunc(Answer);
    var Frac_part = Answer - Int_part;
    var Nfrac = 128*Frac_part;
    
    var ndiv = 0;
    var Countv = Nfrac;
    while (Countv%2 == 0) {
        Countv = Countv/2  
        ndiv++;
    }
    
    var Nume = Nfrac/Math.pow(2, ndiv);
    var Denom = 128/Math.pow(2, ndiv);
    
    //
    //
    //
    //alert (ndiv + ', ' + Int_part + ', ' + Nume + ', ' + Denom);
    //alert(Answer);
    //document.getElementById("respos3").innerHTML = Answer;
    return [Int_part, Nume, Denom];
}
    //--------------------------------------------------------------------------

//-----------------Control de tiempo-------------------------------------------//
var c = 0;
var t;
var timer_is_on = 0;

function timedCount() {
  var l = document.getElementById("Tiempo");
  l.innerHTML = c;
  c = c + 1;
  t = setTimeout(timedCount, 1000);
}

function startCount() {
  if (!timer_is_on) {
    timer_is_on = 1;
    timedCount();
  }
}

function stopCount() {
  clearTimeout(t);
  timer_is_on = 0;
}

//function resettimer() {
//    clearInterval(t);
//    document.getElementById("Tiempo").innerHTML = 0;
//}

//------------------------------------------------------------------------------

function Inicio_Prog() {
    startCount();
    resp = Measure();
    document.getElementById("Tiempo").value = c;
    //Desabilita el botón "INICIAR" despues del primer click.
    document.getElementById("button1").disabled = true;
}


//     var Rboton = document.getElementById('right');
//     var Wboton = document.getElementById('wrong');
//     Rboton.style.transform = "scale(1.5, 1.5)";
//     Wboton.style.transform = "scale(1.5, 1.5)";


//Evalua la respuesta ingresada
cr = 0;
cw = 0;
function Enviar_Dat() {
    var Rboton = document.getElementById('right');
    var Wboton = document.getElementById('wrong');
    
    //var maxtime = 60;
    //var timefact =1.2;
    
    var resp_int = document.getElementById("input1").value;
    var resp_num = document.getElementById("input2").value;
    var resp_deno = document.getElementById("input3").value;
    if ((resp_int!=resp[0])||(resp_num!=resp[1])||(resp_deno!=resp[2])){
        cw++;
        document.getElementById("respos2").innerHTML = cw;
        resp = Measure();
        //resettimer();
        //ti = timer();
        Rboton.style.transform = "initial";
        Wboton.style.transform = "scale(1.5, 1.5)";    
    }else {
        //resettimer();
        //ti = timer();
        resp = Measure();
        Wboton.style.transform = "initial";
        Rboton.style.transform = "scale(1.5, 1.5)"; 
        cr++;
        document.getElementById("respos1").innerHTML = cr;
    }

}


function Finalizar() {
    stopCount();
    var puntaje = cr/(c-1);
    
    if (puntaje >= 1.0/60.0){
        var cal = 5.0;}
        else {
            var val_full =300*puntaje; 
            var cal = val_full.toFixed(1); 
        } 
      
    document.getElementById("respos3").innerHTML = cal;
    alert("JUEGO FINALIZADO");
}
