const db = firebase.firestore();

const taskForm = document.getElementById("task-form");
const tasksContainer = document.getElementById("tasks-container");
//const projectContainer = document.getElementById("projects-container");
let editStatus = false;
let id = "";

/**
 *
 * @param {string} title
 * @param {string} description
 * @param {string} category
 * @param {string} direction
 * @param {string} descriptionModal
 */



/*if(fileurl){
  fileurl = await uploadImage(file);
}*/
//let fileurl = null;

async function uploadImage(file) {
  const ref = firebase.storage().ref();
  const name = new Date() + "-" + file.name;
  const metadata = { contentType: file.type };
  const snapshot = await ref.child(name).put(file, metadata);
  const url = await snapshot.ref.getDownloadURL();
  console.log(url);
  return url;
}


const saveTask = (title, description, category,fileurl,fileurl1,fileurl2,fileurl3,fileurl4, direction, descriptionModal) =>
  db.collection("proyectos").doc().set({
    title,
    description,
    category,
    fileurl,fileurl1,fileurl2,fileurl3,fileurl4,
    direction,
    descriptionModal
  });

const getTasks = () => db.collection("proyectos").get();

const onGetTasks = (callback) => db.collection("proyectos").onSnapshot(callback);

const deleteTask = (id) => db.collection("proyectos").doc(id).delete();

const getTask = (id) => db.collection("proyectos").doc(id).get();

const updateTask = (id, updatedTask) =>
  db.collection("proyectos").doc(id).update(updatedTask);




window.addEventListener("DOMContentLoaded", async (e) => {
  onGetTasks((querySnapshot) => {
    tasksContainer.innerHTML = "";

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
        tasksContainer.innerHTML +=`<div class="card card-body mt-2 border-primary">
        <img class="img-fluid" src="${task.fileurl}"/>
        <h3 class="h5 text-uppercase font-weight-bold">${task.title}</h3>
            <p>${task.description}</p>
            <p class="text-secondary font-italic">${task.category}</p>
            <div>
              <button class="btn btn-danger btn-delete" data-id="${doc.id}">
                Delete
              </button>
              <button class="btn btn-secondary btn-edit" data-id="${doc.id}">
                Edit
              </button>
            </div>
          </div>`;
    });



    const btnsDelete = tasksContainer.querySelectorAll(".btn-delete");
    btnsDelete.forEach((btn) =>
      btn.addEventListener("click", async (e) => {
        console.log(e.target.dataset.id);
        try {
          await deleteTask(e.target.dataset.id);
        } catch (error) {
          console.log(error);
        }
      })
    );

    const btnsEdit = tasksContainer.querySelectorAll(".btn-edit");
    btnsEdit.forEach((btn) => {
      btn.addEventListener("click", async (e) => {
        try {
          const doc = await getTask(e.target.dataset.id);
          const task = doc.data();
          //task.id = doc.id;
          editStatus = true;
          id = doc.id;

          taskForm["task-title"].value = task.title;
          taskForm["task-description"].value = task.description;
          //taskForm["task-image"].files[0] = task.fileurl;
          taskForm["task-category"].value = task.category;
          taskForm["task-direction"].value = task.direction;
          taskForm["task-descriptionModal"].value = task.descriptionModal;

          
          taskForm["btn-task-form"].innerText = "Update";
        } catch (error) {
          console.log(error);
        }
      });
    });
  });
});

taskForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const title = taskForm["task-title"];
  const description = taskForm["task-description"];
  const category = taskForm["task-category"];
  const direction = taskForm["task-direction"];
  const descriptionModal= taskForm["task-descriptionModal"];
  //const file = taskForm["task-image"].file[0];
  const file = taskForm["task-image"].files[0];
  const file1 = taskForm["task-image1"].files[0];
  const file2 = taskForm["task-image2"].files[0];
  const file3 = taskForm["task-image3"].files[0];
  const file4 = taskForm["task-image4"].files[0];
  

  let fileurl = null;
  let fileurl1 = null;
  let fileurl2 = null;
  let fileurl3 = null;
  let fileurl4 = null;
  
  if(file){
    fileurl = await uploadImage(file);
  }
  if(file1){
    fileurl1 = await uploadImage(file1);
  }

  if(file2){
    fileurl2 = await uploadImage(file2);
  }
  if(file3){
    fileurl3 = await uploadImage(file3);
  }
  if(file4){
    fileurl4 = await uploadImage(file4);
  }




  try {
    if (!editStatus) {
      await saveTask(title.value, description.value, category.value, fileurl,fileurl1,fileurl2,fileurl3,fileurl4,direction.value, descriptionModal.value);
    } else {
      if(file){
        await updateTask(id, {
          title: title.value,
          description: description.value,
          category: category.value,
          fileurl,
          fileurl1,
          fileurl2,
          fileurl3,
          fileurl4,
          direction: direction.value,
          descriptionModal: descriptionModal.value
        });
      }else{
        await updateTask(id, {title: title.value,
          description: description.value,
          category: category.value,
          direction: direction.value,
          fileurl1,
          fileurl2,
          fileurl3,
          fileurl4,
          descriptionModal: descriptionModal.value
        });
      }

      editStatus = false;
      id = "";
      taskForm["btn-task-form"].innerText = "Save";
    }

    getTasks();
    taskForm.reset();
    title.focus();
  } catch (error) {
    console.log(error);
  }
});

/*service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read, write: if request.auth == null;
    }
  }
}*/