//pillar los miembros de la lista cogress 113

let members = data.results[0].members;


//variables para decir donde van a imprimir las tablas

let tbodyStats = document.getElementById("miTablaStats");
let tbodyBottom = document.getElementById("miTablaBottom");
let tbodyTop = document.getElementById("miTablaTop");


//Objeto JSON

let stats = {
 rep: 0,
 dem: 0,
 ind: 0,
}


let repPct = [];
let demPct = [];
let indPct = [];

// Funcion para añadir valor al JSON 

printStats();

function printStats() {

 for (i = 0; i < members.length; i++) {   //for bucle (i=0 que cuente desde 0; i es la posicion del miembro < a los miembros de la lista que son 105 ++ que pase al siguiente  )


   if (members[i].party == "R") {    //if significa si pasa esto.. (cada uno de los miembros "R" ) 
     stats.rep++;    // ir añadiendo al valor del republicano (como contar cuantos hay)
     repPct.push(members[i].votes_with_party_pct)   // a las variables let repPct = [esta vacia] le añades en este caso los porcentajes sacados del congres house
   }
   if (members[i].party == "D") {   //igual 
     stats.dem++;
     demPct.push(members[i].votes_with_party_pct)

   }
   if (members[i].party == "I") { // igual
     stats.ind++;
     indPct.push(members[i].votes_with_party_pct)

   }

 }
}

let sumaRep = repPct.reduce(function (a, b) { return a + b }); // variable que suma todos los valores de una lista "array" en este caso repPct
let sumaDem = demPct.reduce(function (a, b) { return a + b });
let sumaInd = indPct.reduce(function (a, b) { return a + b });








//Funcion para sacar la tabla en html


printTableStats();   //nombre de la funcion

function printTableStats() {
 let template = "";  // para escribir html dentro de javascript 

//template con +=` es todo lo que vas a añadir los valores al html 
//${stats.dem} nos muestra en esa celda el numero que hemos encontrado antes con los if dentro del for
//${(sumaRep / repPct.length).toFixed(2) el numero de la suma de repPtc y lo divide entre el tamaño de la array repPtc). dejarlo con dos decimales.
 template += `       
 <tr>
     <td>Democrats</td>
     <td>${stats.dem}</td>  
     <td>${(sumaDem / demPct.length).toFixed(2)}</td>
   </tr>
   <tr>
     <td>Republicans</td>
     <td>${stats.rep}</td>
     <td>${(sumaRep / repPct.length).toFixed(2)}</td>

   </tr>
   <tr>
     <td>Independents</td>
     <td>${stats.ind}</td>
     <td>${(sumaInd / indPct.length).toFixed(2)}</td>

   </tr>
   <tr>
     <td>Total</td>
     <td>${stats.dem + stats.rep + stats.ind}</td>
     <td>${(((sumaInd / indPct.length) + (sumaDem / demPct.length) + (sumaRep / repPct.length)) / 3).toFixed(2)}</td>
   </tr>`;

 tbodyStats.innerHTML = template;   //tbodyStats es el cuerpo de la tabla y le metes el innerHTML es meter el codigo html desde javascript con el template que son todos los valores de la tabla que has calculado 
}

members.sort(function (a, b) {    //funcion para ordenar, te ordena los miembros con el sort teniendo en cuenta el campo missed votes (el a, b) para ordenar ascendentemente
 return (b.missed_votes - a.missed_votes) 
})

printBottomAttendance()  

function printBottomAttendance() {
 let template = "";

 for (i = 0; i < (data.results[0].num_results * 0.1); i++) {   //en esta tabla se mete un for para no meterle un numero fijo de filas.
// El numero de filas dependera de la lista donde piller los valores en este caso de congress house 
// (data.results[0].num_results * 0.1) es igual al 10 % del numero de miembros del congreso

   template += `
   <tr>
     <td><a href="${members[i].url}">${members[i].first_name} ${members[i].middle_name || ""} ${members[i].last_name}</a></td>
     <td>${members[i].missed_votes}</td>
     <td>${members[i].missed_votes_pct}</td>
   </tr>`
 };
 tbodyBottom.innerHTML = template;
}

//Ordenar array segun uno de sus campos (orden descendente)
members.sort(function (a, b) {
 return (a.missed_votes - b.missed_votes)
})

printTopAttendance()

function printTopAttendance() {
 let template = "";

 for (i = 0; i < (data.results[0].num_results * 0.1); i++) {

   template += `
   <tr>
     <td><a href="${members[i].url}">${members[i].first_name} ${members[i].middle_name || ""} ${members[i].last_name}</a></td>
     <td>${members[i].missed_votes}</td>
     <td>${members[i].missed_votes_pct}</td>
   </tr>`
 };
 tbodyTop.innerHTML = template;
}