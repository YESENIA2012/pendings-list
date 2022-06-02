//Variables
const modalWork = document.getElementById("modalWork");
const form = document.getElementById("form");
const seeSections = document.getElementById("seeSections");
const taskProgress = document.getElementById("taskProgressSection");
const newTask = document.getElementById("newTask");
let arrayActivitys = [];
const stateNew = document.getElementById("stateNew");
const inProgress = document.getElementById("stateInProgress");
const completed = document.getElementById("stateOnHold");
const onHold = document.getElementById("stateCompleted");
const form_Welcome = document.getElementById("form_Welcome");
const addName = document.getElementById("addName");
let myName = " ";

//Functions

const createActivity = (activity, description) => {
  let item = {
    activity: activity,
    description: description,
  };
  arrayActivitys.push(item);
  return item;
};

const saveInformation = (activity) => {
  localStorage.setItem("responsabilidades", JSON.stringify(arrayActivitys));
  addTask();
};

const addTask = () => {
  newTask.innerHTML = " ";
  arrayActivitys = JSON.parse(localStorage.getItem("responsabilidades"));

  if (arrayActivitys === null) {
    arrayActivitys = [];
    return;
  }
  arrayActivitys.forEach((element) => {
    let textTarea = document.createTextNode(element.activity);
    let textTarea2 = document.createTextNode(element.activity);
    let textDescription = document.createTextNode(element.description);
    const tareas = document.createElement("p");
    const descriptionAndTasContainer = document.createElement("div");
    addTaskToDiv(tareas, textTarea);
    addDescription(descriptionAndTasContainer, textDescription, textTarea2);
    dragEvent(tareas);
    dragToElement(stateNew, tareas);
    dragToElement(inProgress, tareas);
    dragToElement(completed, tareas);
    dragToElement(onHold, tareas);
    addresponsability(tareas, inProgress);
    addresponsability(tareas, completed);
    addresponsability(tareas, onHold);
    tareas.addEventListener("click", () => {
      descriptionAndTasContainer.classList.add("show");
    });
  });
};

function dragEvent(tareas) {
  tareas.addEventListener("dragstart", () => {});

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
  atributeDiv.value = "name";
  divWelcome.setAttributeNode(atributeDiv);
  let textDiv = document.createTextNode(myName);
  divWelcome.appendChild(textDiv);
  addName.appendChild(divWelcome);
};

function addTaskToDiv(tareas, textTarea) {
  const taskClass = document.createAttribute("class");
  taskClass.value = "task-class";
  tareas.setAttributeNode(taskClass);
  tareas.draggable = "true";
  tareas.appendChild(textTarea);
  newTask.appendChild(tareas);
}

function createModalDescAndTask(descriptionAndTasContainer) {
  const descriptionAndTaskClass = document.createAttribute("class");
  descriptionAndTaskClass.value = "description-and-task";
  descriptionAndTasContainer.setAttributeNode(descriptionAndTaskClass);
  createButtonCloseModal(descriptionAndTasContainer);
}

function createButtonCloseModal(descriptionAndTasContainer) {
  const closeModal = document.createElement("a");
  const closeModalClass = document.createAttribute("class");
  closeModalClass.value = "close-modal-class";
  closeModal.setAttributeNode(closeModalClass);
  const textModal = document.createTextNode("x");
  closeModal.appendChild(textModal);
  descriptionAndTasContainer.appendChild(closeModal);
  closeModal.addEventListener("click", () => {
    descriptionAndTasContainer.classList.add("remove-modal");
  });
}

function addDescription(
  descriptionAndTasContainer,
  textDescription,
  textTarea
) {
  createModalDescAndTask(descriptionAndTasContainer);
  const titleTask = document.createElement("div");
  const titleTaskClass = document.createAttribute("class");
  titleTaskClass.value = "title-class";
  titleTask.setAttributeNode(titleTaskClass);
  titleTask.appendChild(textTarea);
  descriptionAndTasContainer.appendChild(titleTask);

  const descriptionContainer = document.createElement("div");
  const descriptionClass = document.createAttribute("class");
  descriptionClass.value = "description-class";
  descriptionContainer.setAttributeNode(descriptionClass);
  descriptionContainer.appendChild(textDescription);
  descriptionAndTasContainer.appendChild(descriptionContainer);
  newTask.appendChild(descriptionAndTasContainer);
}

//EventListener

plusModal.addEventListener("click", () => {
  modalWork.classList.add("show");
});

openModalCreateTask.addEventListener("click", () => {
  form.classList.add("show");
  modalWork.classList.remove("show");
});

closeForm.addEventListener("click", () => {
  form.classList.remove("show");
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let activity = document.getElementById("activity").value;
  let description = document.getElementById("description").value;
  createActivity(activity, description);
  saveInformation();
  document.getElementById("activity").value = "Enter the name of the new task";
  document.getElementById("description").value = "Enter your task description";
});

openModalSections.addEventListener("click", (e) => {
  seeSections.classList.add("show3");
});

item.addEventListener("click", () => {
  taskProgress.classList.remove("show");
  seeSections.classList.remove("show3");
});

item_2.addEventListener("click", () => {
  seeSections.classList.remove("show3");
  taskProgress.classList.add("show");
});

form_Welcome.addEventListener("submit", (e) => {
  e.preventDefault();
  let yourName = document.getElementById("name").value;
  saveName(yourName);
  form_Welcome.classList.add("remove-form-welcome");
  addNameFunc();
  addName.classList.add("show");
});

closeSeeSections.addEventListener("click", () => {
  seeSections.classList.remove("show3");
});

closeModalWork.addEventListener("click", () => {
  modalWork.classList.remove("show");
});

document.addEventListener("DOMContentLoaded", addTask);
