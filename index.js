//Variables
const openModal = document.getElementById("iconOpenModal");
const modal = document.getElementById("modalContainer");
const body = document.getElementsByTagName("body");
const openHomework = document.getElementById("openHomework");
const formulario = document.getElementById("formulario");
const closeButton = document.getElementById("closeButton");
const openSection = document.getElementById("openSectionHomework");
const sectionHomework = document.getElementById("sectioHomework");
const item_1 = document.getElementById("item_1");
const homeworkList = document.getElementById("homeworkList");
const item_2 = document.getElementById("item_2");
const taskProgress = document.getElementById("taskProgress");
const taskList = document.getElementById("taskList");
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
  taskList.innerHTML = " ";
  arrayActivitys = JSON.parse(localStorage.getItem("responsabilidades"));

  if (arrayActivitys === null) {
    arrayActivitys = [];
  } else {
    arrayActivitys.forEach((element) => {
      const tareas = document.createElement("p");
      let attrOfP = document.createAttribute("class");
      attrOfP.value = "listTask_sec1";
      tareas.setAttributeNode(attrOfP);
      const textTarea = document.createTextNode(element.activity);
      tareas.appendChild(textTarea);
      taskList.appendChild(tareas);
      newTask.appendChild(tareas);
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

item_1.addEventListener("click", () => {
  sectionHomework.classList.remove("show3");
  homeworkList.classList.add("show4");
});

item_2.addEventListener("click", () => {
  sectionHomework.classList.remove("show3");
  taskProgress.classList.add("show5");
});

document.addEventListener("DOMContentLoaded", addTask);

/* let getData = function () {
  const nameHomeWork = document.getElementById("activity").value;
  localStorage.setItem("namehomework", nameHomeWork);

  const almacen = localStorage.getItem("namehomework");
  const tareas = document.createElement("p");
  let attrOfP = document.createAttribute("class");
  attrOfP.value = "listTask_sec1";
  tareas.setAttributeNode(attrOfP);
  const textTarea = document.createTextNode(almacen);
  tareas.appendChild(textTarea);
  taskList.appendChild(tareas);

  document.getElementById("listHomework_c").value =
    "Enter the name of the new task";
}; */
