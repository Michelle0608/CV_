const db = firebase.firestore();

const projectContainer = document.getElementById("projects-container");
//const projectContainer = document.getElementById("projects-container");


/*
 
 @param {string} title
 * @param {string} description
 * @param {string} category
 */


const getTasks = () => db.collection("proyectos").get();

const onGetTasks = (callback) => db.collection("proyectos").onSnapshot(callback);



const getTask = (id) => db.collection("proyectos").doc(id).get();

const updateTask = (id, updatedTask) =>
  db.collection("proyectos").doc(id).update(updatedTask);




window.addEventListener("DOMContentLoaded", async (e) => {
  onGetTasks((querySnapshot) => {
    projectContainer.innerHTML = "";

    querySnapshot.forEach((doc) => {
      const task = doc.data();
      
      task.id = doc.id;
      if(!task.fileurl){
        task.fileurl = "https://firebasestorage.googleapis.com/v0/b/michelle-marquez-cv.appspot.com/o/Not_image.png?alt=media&token=e5abecda-6e57-4d65-b1cf-149e0b9d8092";
      }
     if(!task.fileurl1){
        task.fileurl1 = "https://firebasestorage.googleapis.com/v0/b/michelle-marquez-cv.appspot.com/o/Not_image.png?alt=media&token=e5abecda-6e57-4d65-b1cf-149e0b9d8092";
      }

      if(!task.fileurl2){
        task.fileurl2 = "https://firebasestorage.googleapis.com/v0/b/michelle-marquez-cv.appspot.com/o/Not_image.png?alt=media&token=e5abecda-6e57-4d65-b1cf-149e0b9d8092";
      }

      if(!task.fileurl3){
        task.fileurl3 = "https://firebasestorage.googleapis.com/v0/b/michelle-marquez-cv.appspot.com/o/Not_image.png?alt=media&token=e5abecda-6e57-4d65-b1cf-149e0b9d8092";
      }

      if(!task.fileurl4){
        task.fileurl4 = "https://firebasestorage.googleapis.com/v0/b/michelle-marquez-cv.appspot.com/o/Not_image.png?alt=media&token=e5abecda-6e57-4d65-b1cf-149e0b9d8092";
      } 

      projectContainer.innerHTML += `
      
        <div class="col-md-4 col-xs-12 mt-3 product-item" category="${task.category}"> 
            <div class="card p-1">
                <img class="card-img-top" src="${task.fileurl}" alt="Card image cap">
                <div class="card-body">
                    <h3 class="card-title">${task.title}</h3>
                    <p class="card-text">${task.description}</p>
                    <footer class="blockquote-footer"><small>${task.category}<cite title="Source Title"></cite></small></footer>
                </div>

                <button type="button" class="btn btn-success " data-toggle="modal" data-target="#${task.direction}">
                VER
                </button>

            
                <!--MODAL-->
                <div class="modal fade" id="${task.direction}" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <button type="button" class="close m-0 p-0" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                                <h4 class="modal-title" id="myModalLabel">${task.title}</h4>
                            </div>
                            <div class="modal-body">
                            <!--CARRUCEL-->
                                    <div id="carouselExampleControls" class="carousel slide" data-ride="carousel">
                                    <div class="carousel-inner"  data-ride="true">
                                        <div class="carousel-item active" data-interval="2000">
                                        <img class="d-block w-100" src="${task.fileurl1}" alt="First slide">
                                        </div>
                                        <div class="carousel-item" data-interval="2000">
                                        <img class="d-block w-100" src="${task.fileurl2}" alt="Second slide">
                                        </div>
                                        <div class="carousel-item" data-interval="2000">
                                        <img class="d-block w-100" src="${task.fileurl3}" alt="Third slide">
                                        </div>
                                        <div class="carousel-item" data-interval="2000">
                                        <img class="d-block w-100" src="${task.fileurl4}" alt="Forth slide">
                                        </div>
                                    </div>
                                <!-- <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
                                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                        <span class="sr-only">Previous</span>
                                    </a>
                                    <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
                                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                        <span class="sr-only">Next</span>
                                    </a>-->
                                    </div>
                                    
                            <!---FIN CARRUCEL-->
                                ${task.descriptionModal}
                            </div>
                        </div>
                    </div>
                </div>

                

                <!-- FIN MODAL-->
            </div>
        </div>
   
    `;
    });
  });
});




//FILTRO
 $(document).ready(function(){
    //AGREGANDO CLASE ACTIVE
    $('.category_list .category_item[category="all"]').addClass('ct_item-active');

    $('.category_item').click(function(){
        var catProduct = $(this).attr('category');
        console.log(catProduct);
         //AGREGANDO CLASE ACTIVE SELECCIONADO
         $('.category_item').removeClass('ct_item-active');
         $(this).addClass('ct_item-active');


         //OCULTAR PRODUCTOS

         $('.product-item').hide();

         //MOSTRANDO PRODUCTOS

         $('.product-item[category="'+catProduct+'"]').show();
    });

    $('.category_item[category="all"]').click(function(){
        $('.product-item').show();

    });

 });


//FIN FILTRO

var ctx = document.getElementById('myChart').getContext('2d');
var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});
/* const Animacion = db
.collection("proyectos")
.where("category", "==", "Animación")
.get();

Animacion
    .then(function(querySnapshot){
        querySnapshot.forEach(function(doc){
            console.log(doc.id,"=>",doc.data());

        });
    })
    .catch(function(error){
        console.log("error",error);
    }) */