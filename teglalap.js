let a = 1;
let f = [];
let y = {};
let g; 
let h;
$("#span1").text("");

function nyero (f) {
  if (y[code(f)] != undefined) return y[code(f)];
  y[code(f)] = true;
  for (let k = 1; k <= g; k++) {
    for (let m = 1; m <= h; m++)
      if (canstep(f, k, m) && nyero(dostep(f, k, m))) {
        y[code(f)] = false;
      }
  }
  return y[code(f)];
}
function canstep(y, i, j) {
  if (y[i-1] < j) {
    return true;
  }
  else {
    return false;
  }  
}

function dostep(y, k, j) {
  let x = [];
  for (let i = 0; i < y.length; i++) {
    if (y[i]>=j || i >= k){
      x[i]=y[i];
    }
    else {
      x[i]=j;
    }
  }
  return x;
}

function code(f) {
  let tmp = "" + f[0];
  for (let i = 1; i < f.length; i++) {
    tmp = tmp + "," + f[i];
  }
  return tmp;
}
function gep () {
  console.log(f + " " + nyero(f));
  if (nyero(f) == false){
    for (let k = 1; k <= g; k++) {
      for (let m = 1; m <= h; m++)
        if (canstep(f, k, m) && nyero(dostep(f, k, m))){
          f = dostep(f, k, m);
          $("#span3").text("A gép ezt lépte: "+ k+"," + m);
        }
    }
  }
  else {
    let o = Math.floor(Math.random()*(h-1)+1);
    let p = Math.floor(Math.random()*(g-1)+1);
    if (canstep(f, p, o)) {
      f=dostep(f, p,o);
      $("#span3").text("A gép ezt lépte: "+ p + "," + o);
    }
    else {
      for (let q = 0; q<=g-1; q++){
        if (f[q] != h){
          p = q + 1;
          o = h;
          break;
        }
      }
      f=dostep(f, p,o);
      $("#span3").text("A gép ezt lépte: "+ p +","+ o);
    }
  }
  torol();
  jatekos();
}
function jatekos (){
  if($("#td"+1+h).hasClass("remove")){
    if(a%2==0){
      $("#span1").text("A játékos nyert");
      $("#b").show();
    }
    else {
      $("#span1").text("A gép nyert");
      $("#b").show();
    }
  }
  else {
    if (a%2==0){
      $("#span1").text("A játékos következik");
      a++;
    }
    else {
      $("#span1").text("A gép következik");
      a++;
      setTimeout(function(){gep()}, 1000);
    }
  }
}
function tablazat() {
  let b = parseInt($("#input1").val());
  let c = parseInt($("#input2").val());
  $("#table1").html("");
  for(let i = 1; i <= b; i++){
    $("#table1").append("<tr>");
    for(let j = 1; j<=c; j++){
      $("#table1").append("<td id = 'td"+i+j+"'></td>");
    }
    $("#table1").append("</tr>");
    g = b;
    h = c;
    for (let v = 0; v <= g-1; v++){
      f[v] = 0;
    }
    a = 1;
    $("#span1").text("A játékos következik");
    $("#span3").text(" ");
    y = {};
    let s = [];
    for (let i = 0; i <= f.length-1; i++){
      s[i] = h;
    }
    y[code(s)] = false;
  }
  console.log(f);

  $("#table1 td").click(function(){
    if($(this).hasClass("remove")){
      return;
    }
    $(this).addClass("remove");

    let sor = parseInt(this.id[2]);
    let oszlop = parseInt(this.id[3]);

    f=dostep(f, g-sor+1, oszlop);

    jatekos();

    for (let i = sor; i<=b; i++){
      for (let j = 1; j<=oszlop; j++){
        $("#td"+i+j).addClass("remove");
      }
    }
  });
}
function torol() {
  for (let w = g; w >= 1; w--){
    for (let t = 1; t<=f[g-w]; t++){
      $("#td"+w+t).addClass("remove");
    }
  }
}


function ut (n, k){
  g = n;
  h = k;
  y = [];
  let d = [];
  for (let i = 0; i < n; i++){
    d[i] = k;
  }
y[code(d)] = false;
f=[];
for (let i = 0; i < n; i++){
    f[i] = 0;
  }
  nyero(f);
  console.log(y);
  for (let helyzet in y) {
    if (y[helyzet]) console.log(helyzet);
  }
}