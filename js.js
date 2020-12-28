var turn_machine = true;

var files= $("tr");


var no_repeat= [];


for ( i= files.length - 1;i >= 1; i--) {
    var columns = files[i].children.length;
   for(q=0; q < columns; q++) {
    
        if (turn_machine) {
         
            turn_machine = false;
      
            
            paint(i, randomize(), "machine");
        } else {
      

            turn_machine = true;

            paint(i, randomize(), "human");
            
        }

    }
   no_repeat= [];
}

check_victory();

function randomize () {
    var random = Math.round( Math.random() * (3 - 0));
    if(no_repeat.length == 0){
        no_repeat.push(random);
    }else{
       do{
            random = Math.round( Math.random() * (3 - 0));
       } while(no_repeat.includes(random))
       no_repeat.push(random);
    }
    return random;
}

function paint(file, column, turn) {
    var cell = document.querySelector("[data-x='"+file+"'][data-y='"+column+"']");
    $(cell).addClass(turn);
}

function check_victory() {
    var coincidencias = 0;
    var x;
    for ( i = 3; i >= 0; i--) {
        x = 3;
        y = i;
        var cell = document.querySelector("[data-x='"+(files.length-1)+"'][data-y='"+i+"']");
            if($(cell).hasClass('machine')){
            do {
                x--;
                coincidencias++;
                var next_cell = document.querySelector("[data-x='"+x+"'][data-y='"+y+"']");
            } while($(next_cell).hasClass('machine'))
        }

       if (coincidencias == 3) {
            var winner_cell = document.querySelector("[data-x='"+x+"'][data-y='"+y+"']");
            $(winner_cell).addClass("winner");
            $("#ganador").append("<p class='alert alert-success'>La posición o posiciones que sale/n sombreada/s es en la maquina saldrá vencedora. Fila "+ x +" Columna "+ y +"</p>")
        }
       coincidencias = 0;
    }
}