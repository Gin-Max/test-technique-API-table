const tableau = document.querySelector("#tableau");
const promise01 = fetch("https://dotmap-candidat.cleverapps.io/");
var data = [];
const sortEnum = {
  ASC: {
    css:"asc",
    previousCss:"both"
  }, 
  DESC: {
    css:"desc",
    previousCss:"asc"
  }, 
  NONE: {
    css:"both",
    previousCss:"desc"
  }
}
//Fonction For pour le tableau
function drawTable(data) {
  tableau.innerHTML = "";
  for(let i = 0; i < data.length;i++) {
    createLine(data[i],tableau);
  };
}
//Fonction créer ligne pour chaque type de donnée
function createLine (user,tableau) {
  let tr = document.createElement("tr");
  createCell(user.id,tr);
  createCell(user.name,tr);
  createCell(user.team,tr);
  createCell(user.date,tr);
  createCell(user.score,tr);
  tableau.appendChild(tr);
}
//Fonction créer colonne
function createCell (value,tr) {
  let td = document.createElement("td");
  let texte = document.createTextNode(value);
  td.appendChild(texte);
  tr.appendChild(td);
}
//Fonction clique
function clickSort (el,attr) {
  let sort = getSort(el);
  handleIcon(el, sort);
  if (sortEnum.NONE != sort) {
    sortItems(data,attr,sort);
    drawTable(data);
  }
}
//Fonction tri des données (bubble sort)
function sortItems(array,attr,sort) { 
  for (let i = 0; i < array.length; i++) {
      for (let j = 0; j < array.length - 1; j++) {
        if (compareValue(array[j][attr],array[j + 1][attr],sort)) {
              let temp = array[j];
              array[j] = array[j + 1];
              array[j + 1] = temp;
          }
      }
  }
  return array;
}
//Fonction comparer les données
function compareValue(value1,value2,sort) {
  if (sort == sortEnum.ASC) {
    return value1 > value2;
  }
  else {
    return value1 < value2;
  }
}
//Fonction pour changer le css de l'icône tri
function handleIcon (el, sort) {
  el.classList.remove(sort.previousCss);
  el.classList.add(sort.css);
}
//Renvoyer la valeur de l'Enum dépendant de la classe CSS
function getSort (el) {
  for (let key in sortEnum) {
    if (hasClass(el, sortEnum[key].previousCss)) {
      return sortEnum[key];
    }
  }
  return sortEnum.NONE;
}
//Retourne true si l'élément HTML contient la classe
function hasClass (el,className) {
  return el.classList.contains (className);
}
//Promise pour recup les données de l'API
promise01
.then((response) => {
  console.log(response);

  const usersData = response.json();

  console.log(usersData);

  usersData.then((users) => {
    data = users;
    drawTable(data);
  });
})
.catch((err) => console.log(err));

