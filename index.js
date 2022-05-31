//Variables
const openModal = document.getElementById("iconOpenModal");
const modal = document.getElementById("modalContainer");
const body = document.getElementsByTagName("body");
const openHomework = document.getElementById("openHomework");
const formulario = document.getElementById("formulario");
const closeButton = document.getElementById("closeButton");
const openSection = document.getElementById("openSectionHomework");
const sectionHomework = document.getElementById("sectioHomework");
const homeworkList = document.getElementById("homeworkList");
const item_2 = document.getElementById("item_2");
const taskProgress = document.getElementById("taskProgress");
const newTask = document.getElementById("newTask");
let arrayActivitys = [];
const nuevaTarea = document.getElementById("state1");
const inProgress = document.getElementById("state2");
const completed = document.getElementById("state3");
const onHold = document.getElementById("state4");
const welcomeSection = document.getElementById("welcomeSection");
const form_Welcome = document.getElementById("form_Welcome");
const addName = document.getElementById("addName");
let myName = " ";
let item = document.getElementById("item");
const closeButton2 = document.getElementById("closeButton2");

//Functions

const createActivity = (activity) => {
  let item = {
    activity: activity,
  };
  arrayActivitys.push(item);
  return item;
};

const saveTask = (activity) => {
  localStorage.setItem("responsabilidades", JSON.stringify(arrayActivitys));
  addTask();
};

const addTask = () => {
  newTask.innerHTML = " ";
  arrayActivitys = JSON.parse(localStorage.getItem("responsabilidades"));

  if (arrayActivitys === null) {
    arrayActivitys = [];
  } else {
    arrayActivitys.forEach((element) => {
      const tareas = document.createElement("p");
      const textTarea = document.createTextNode(element.activity);
      tareas.draggable = "true";
      tareas.appendChild(textTarea);
      newTask.appendChild(tareas);
      dragEvent(tareas);
      dragToElement(nuevaTarea, tareas);
      dragToElement(inProgress, tareas);
      dragToElement(completed, tareas);
      dragToElement(onHold, tareas);
      addresponsability(tareas, inProgress);
      addresponsability(tareas, completed);
      addresponsability(tareas, onHold);
    });
  }
};

function dragEvent(tareas) {
  tareas.addEventListener("dragstart", (e) => {
    /* console.log(e.target.innerHTML); */
  });

  tareas.addEventListener("dragend", () => {});

  tareas.addEventListener("drag", () => {});
}

function dragToElement(inProgress, tareas) {
  inProgress.addEventListener("dragenter", (e) => {});

  inProgress.addEventListener("dragleave", (e) => {});
  inProgress.addEventListener("dragover", (e) => {
    e.preventDefault();
  });
}

let evento = null;
function addresponsability(tareas, inProgress) {
  tareas.addEventListener("dragstart", function (e) {
    evento = e.target;
  });

  inProgress.addEventListener("drop", () => {
    inProgress.appendChild(evento);
  });
}

const saveName = (yourName) => {
  localStorage.setItem("nombre", JSON.stringify(yourName));
};

const addNameFunc = () => {
  myName = JSON.parse(localStorage.getItem("nombre"));

  let divWelcome = document.createElement("div");
  const atributeDiv = document.createAttribute("class");
  atributeDiv.value = "nameWlcomeC";
  divWelcome.setAttributeNode(atributeDiv);
  let textDiv = document.createTextNode(myName);
  divWelcome.appendChild(textDiv);
  addName.appendChild(divWelcome);
};

//EventListener

openModal.addEventListener("click", () => {
  modalContainer.classList.add("show");
});

openHomework.addEventListener("click", () => {
  formulario.classList.add("show2");
  modalContainer.classList.remove("show");
});

closeButton.addEventListener("click", () => {
  formulario.classList.remove("show2");
});

formulario.addEventListener("submit", (e) => {
  e.preventDefault();
  let activity = document.getElementById("activity").value;
  createActivity(activity);
  saveTask();
  document.getElementById("activity").value = "Enter the name of the new task";
});

openSection.addEventListener("click", (e) => {
  sectionHomework.classList.add("show3");
});

item_2.addEventListener("click", () => {
  sectionHomework.classList.remove("show3");
  taskProgress.classList.add("show5");
});

form_Welcome.addEventListener("submit", (e) => {
  e.preventDefault();
  let yourName = document.getElementById("name").value;
  saveName(yourName);
  form_Welcome.classList.add("show6");
  addNameFunc();
  addName.classList.add("show7");
});

item.addEventListener("click", () => {
  taskProgress.classList.remove("show5");
  sectionHomework.classList.remove("show3");
});

closeButton2.addEventListener("click", () => {
  sectionHomework.classList.remove("show3");
});

closeButton3.addEventListener("click", () => {
  modalContainer.classList.remove("show");
});

document.addEventListener("DOMContentLoaded", addTask);
