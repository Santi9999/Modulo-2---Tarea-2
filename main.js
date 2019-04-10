// for (let i = 0; i < members.length; i++) {
//   //Creo una puta fila en el puto limbo
//   let row = document.createElement("tr");

//   let fullName =
//     members[i].first_name +
//     " " +
//     (members[i].middle_name || "") +
//     ", " +
//     members[i].last_name;

//   row.insertCell().innerHTML = fullName;
//   row.insertCell().innerHTML = members[i].party;
//   row.insertCell().innerHTML = members[i].state;

//   //Cuelga la puta row en la puta table
//   miTabla.append(row);
// }


// for (let i = 0; i < members.length; i++) {
//   let member = members[i];
//   template += `
//   <tr>
//     <td><a href="${member.url}">${member.first_name}, ${member.middle_name ||
//     ""} ${member.last_name}</a></td>
//     <td>${member.party}</td>
//     <td>${member.state}</td>
//     <td>${member.seniority}</td>
//     <td>${member.votes_with_party_pct}</td>
//   </tr>`;
// }
// miTabla.innerHTML = template;
// }



//Members
let members = data.results[0].members;

//Table from HTML
let tbody = document.getElementById("miTabla");

//Listeners

document.getElementById("rep").addEventListener("change", sayHello);
document.getElementById("dem").addEventListener("change", sayHello);
document.getElementById("ind").addEventListener("change", sayHello);
document.getElementById("Filtro").addEventListener("change", sayHello);



//We need to execute this function to see the first table
printTable();

// Function to print the table
function printTable() {
  let template = "";

  members.forEach(function(member) {
    template += `
  <tr>
      <td><a href="${member.url}">${member.first_name}, ${member.middle_name ||
            ""} ${member.last_name}</a></td>
      <td>${member.party}</td>
      <td>${member.state}</td>
      <td>${member.seniority}</td>
      <td>${member.votes_with_party_pct}</td>
    </tr>`;
  });

  tbody.innerHTML = template;
}

//Function executed when the cb are clicked
function sayHello() {
  let repCb = document.getElementById("rep");
  let demCb = document.getElementById("dem");
  let indCb = document.getElementById("ind");
  let checkeados = [];

  if (repCb.checked) {
    checkeados.push("R");
  }

  if (demCb.checked) {
    checkeados.push("D");
  }

  if (indCb.checked) {
    checkeados.push("I");
  }

  if (!repCb.checked && !demCb.checked && !indCb.checked) {
    checkeados.push("R");
    checkeados.push("D");
    checkeados.push("I");
  }

  let membersToPrint = [];


  //funcion para que el boton de lo estados se vincule con la tabla 
  members.forEach(function(member) {   
    if (checkeados.includes(member.party) &&  //y otra condicion
     (member.state == document.getElementById("Filtro").value || 
     document.getElementById("Filtro").value == "All") ) {
      membersToPrint.push(member);
    }
  });

  console.log(membersToPrint);

  printNewTable(membersToPrint);
}

//Function that prints the new members
function printNewTable(miembrosAImprimir) {
  let template = "";

  miembrosAImprimir.forEach(function(member) {
    template += `
  <tr>
      <td><a href="${member.url}">${member.first_name}, ${member.middle_name ||
        ""} ${member.last_name}</a></td>
      <td>${member.party}</td>
      <td>${member.state}</td>
      <td>${member.seniority}</td>
      <td>${member.votes_with_party_pct}</td>
    </tr>`;
  });

  tbody.innerHTML = template;
}



// Funcion para meter valores del array politicos en el dropdown
filtradoStates();
function filtradoStates() {
    //coger el valor actual de la option para tener el value
    let Filtro = document.getElementById("Filtro")
    let members = data.results[0].members;
    // cuando la longitud de la i es mas pequeña que toda la longitud del state

Array.from(new Set(members.map(member => member.state).sort()))

.forEach(state=>{
let option = document.createElement("option")
option.innerHTML = state
Filtro.appendChild(option)
})
}




