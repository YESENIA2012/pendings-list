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

//Functions

const createActivity = (activity) => {
  let item = {
    activity: activity,
    estado: false,
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
      tareas.appendChild(textTarea);
      newTask.appendChild(tareas);
      const icon = document.createElement("span");
      const iconClass = document.createAttribute("class");
      iconClass.value = "icon2 material-symbols-outlined";
      icon.setAttributeNode(iconClass);
      const iconTest = document.createTextNode("more_vert");
      icon.appendChild(iconTest);
      tareas.appendChild(icon);
    });
  }
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

openSection.addEventListener("click", () => {
  sectionHomework.classList.add("show3");
});

item_2.addEventListener("click", () => {
  sectionHomework.classList.remove("show3");
  taskProgress.classList.add("show5");
});

document.addEventListener("DOMContentLoaded", addTask);
