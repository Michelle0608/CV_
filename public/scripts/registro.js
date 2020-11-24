const db = firebase.auth();

/* const btnsRegistro = document.getElementById("btn-registro");
btnsRegistro.forEach((btn) =>
  btn.addEventListener("click", async (e) => {
    console.log(e.target.dataset.id);

    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    console.log(email);
    console.log(password);
    db.createUserWithEmailAndPassword(email, password).catch(function (error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log("errorCode");
      console.log("errorMessage");
      // ...
    });
  })
); */
function registro() {
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;
  console.log(email);
  console.log(password);
  db.createUserWithEmailAndPassword(email, password).catch(function (error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorCode);
    console.log(errorMessage);
  });
}
