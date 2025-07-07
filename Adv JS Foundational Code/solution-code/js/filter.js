

//es6
document.querySelector("#search").addEventListener("keyup", () => {
  const filter = document.getElementById("search").value.toUpperCase();
  const tr = document.getElementById("infoTable").getElementsByTagName("tr");
  
Array.from(tr).forEach(row => {
  const tds = row.getElementsByTagName("td");
  row.style.display = 
    tds.length && row.innerHTML.toUpperCase().indexOf(filter) > -1 
      ? "" 
      : "none";
});

//alternative with name field only
/* 
  Array.from(tr).forEach(row => {
    const tds = row.getElementsByTagName("td");
    row.style.display = 
      tds.length && tds[0].innerHTML.toUpperCase().indexOf(filter) > -1 
        ? "" 
        : "none";
  });

*/

//older way:
/*
for (let i = 0; i < tr.length; i++) {
  const td = tr[i].getElementsByTagName("td");
  //searches all fields
  tr[i].style.display = (td.length && tr[i].innerHTML.toUpperCase().indexOf(filter) > -1) ? "" : "none";
  //0 for name field only
  //tr[i].style.display = (td.length && td[0].innerHTML.toUpperCase().indexOf(filter) > -1) ? "" : "none"; 
}
*/

});
//es5
/*
document.querySelector("#search").addEventListener("keyup", function() {
  var filter = document.getElementById("search").value.toUpperCase();
  var tr = document.getElementById("infoTable").getElementsByTagName("tr");

  for (var i = 0; i < tr.length; i++) {
    var td = tr[i].getElementsByTagName("td");
    //searches all fields
    tr[i].style.display = (td.length && tr[i].innerHTML.toUpperCase().indexOf(filter) > -1) ? "" : "none";
    //0 for name field only
    //tr[i].style.display = (td.length && td[0].innerHTML.toUpperCase().indexOf(filter) > -1) ? "" : "none"; 
  }
});
*/