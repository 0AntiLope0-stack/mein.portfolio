var timer = document.getElementById("timer");

var countDownDate = new Date("Apr 22, 2027 00:00:00").getTime();


var x = setInterval(function()  {
    var now = new Date().getTime();
    var distance = countDownDate - now;

  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);
timer.innerHTML = days + "d " + hours + "h " + minutes + "m " + seconds + "s "

if (distance < 0)  {
    clearInterval(x);
    timer.innerHTML = "EXPIRED"
}






}, 1000);

let disco = document.getElementById("disco")

disco.addEventListener("click", function() {

let i = 0;
    let intervalId = setInterval(() => {
        i++;
        if(i > 100) clearInterval(intervalId);
let zahl = Math.floor(Math.random() *100)+1;
     if (zahl >= 75) {
        
        document.body.style.backgroundColor = 'blue';
        document.body.style.color = 'red';
    } else if  (zahl >= 50) {
        
        document.body.style.backgroundColor = 'red';
        document.body.style.color = 'blue';
    } else if (zahl >= 25 ) {
        
        document.body.style.backgroundColor = 'orange';
        document.body.style.background = 'green';
    }
    else   {
        
        document.body.style.backgroundColor = 'green';
        document.body.style.color = 'orange';
    }
   

  },100)});

  let party2 = document.getElementById("party2");
  let party = document.getElementById("party");

  party2.addEventListener("click", function() {
let a = 0;
   let partyinterval = setInterval(() => {
    a++
    if(a > 100) clearInterval(partyinterval);

    let part = Math.floor(Math.random()*100)+1;

    if (part > 100) {
        document.body.style.color = 'yellow';
        party.innerHTML = "PARTYYY";
    }
    else if (part >= 75) {
        document.body.style.color = 'green';
        party.innerHTML = "DISCOOOO";
    }
    else if (part >= 50) {
        document.body.style.color = 'red';
        party.innerHTML = "PARTYYY"
    }
    else {  
        document.body.style.color = 'white';
        party.innerHTML = "DISCOOOO";
    }


   },150)});
