function filtra(c) {
    var x = document.getElementById("todo");
    var y = x.querySelectorAll("div");
    var i,c;
    for (i = 0; i < y.length; i++) {
    if (y[i].className == c || c == "all") {y[i].style.display = "inline-block"}
    else {y[i].style.display = "none"}
    }
}