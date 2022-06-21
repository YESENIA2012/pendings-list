//Variables
const modalWork = document.getElementById("modalWork");
const form = document.getElementById("form");
const seeSections = document.getElementById("seeSections");
const taskProgress = document.getElementById("taskProgressSection");
const newTask = document.getElementById("newTask");
const inProgressColumn = document.getElementById("inProgressColumn");
const completedColumnd = document.getElementById("completedColumn");
const form_Welcome = document.getElementById("form_Welcome");
const stateType = document.getElementById("stateType");

//Functions

const saveInformation = (activity, description, state) => {
  let arrayActivitys = [];
  const currentTasks = JSON.parse(localStorage.getItem("responsabilidades"));
  let taskCounter = currentTasks ? currentTasks.length : 0;
  item = {
    title: activity,
    description: description,
    state: state,
    id: taskCounter,
  };
  if (currentTasks === null) {
    localStorage.setItem("responsabilidades", JSON.stringify([item]));
  } else {
    currentTasks.push(item);
    localStorage.setItem("responsabilidades", JSON.stringify(currentTasks));
  }
  addTasktoDom();
};

const addTasktoDom = () => {
  arrayActivitys = JSON.parse(localStorage.getItem("responsabilidades"));
  newTask.innerHTML = " ";

  if (arrayActivitys === null) {
    return;
  }

  arrayActivitys.forEach(({ title, description }, index) => {
    let textTarea = document.createTextNode(title);
    let textTarea2 = document.createTextNode(title);
    let textDescription = document.createTextNode(description);
    taskElement = document.createElement("p");
    const taskClass = document.createAttribute("class");
    taskClass.value = `task-${index}`;
    taskElement.setAttributeNode(taskClass);
    taskElement.draggable = "true";
    taskElement.appendChild(textTarea);
    newTask.appendChild(taskElement);

    const descriptionAndTasContainer = document.createElement("div");
    addDescription(descriptionAndTasContainer, textDescription, textTarea2);

    dragAndDropTask(taskElement, todocolumn);
    dragAndDropTask(taskElement, inProgressColumn);
    dragAndDropTask(taskElement, completedColumnd);

    taskElement.addEventListener("click", () => {
      descriptionAndTasContainer.classList.add("show");
    });

    paintDB(inProgressColumn, completedColumnd, taskElement, index);
    removeIdenticalChildrenInproressColumn(inProgressColumn);
    removeIdenticalChildrenCompletedColumn(completedColumnd);
  });
};

let state = null;
let evento = null;
function dragAndDropTask(task, columnElement) {
  task.addEventListener("dragstart", () => {});
  task.addEventListener("dragend", () => {});
  task.addEventListener("drag", () => {});

  columnElement.addEventListener("dragenter", () => {});
  columnElement.addEventListener("dragleave", () => {});
  columnElement.addEventListener("dragover", (e) => {
    e.preventDefault();
  });

  task.addEventListener("dragstart", (e) => {
    evento = e.target;
  });

  columnElement.addEventListener("drop", (e) => {
    e.preventDefault();
    let stateActivity = e.target;
    let stateAttribute = stateActivity.getAttribute("class");
    let position = stateAttribute.split(" ");
    state = position[1];

    if (evento !== null) {
      const taskClass = evento.getAttribute("class");
      let position = taskClass.split("-");
      let taskId = position[1];

      arrayActivitys = JSON.parse(localStorage.getItem("responsabilidades"));
      arrayActivitys.map((item) => {
        if (taskId == item.id) {
          columnElement.appendChild(evento);
          item.state = state;
          localStorage.setItem(
            "responsabilidades",
            JSON.stringify(arrayActivitys)
          );
        }
      });
    }
  });
}

const paintDB = (inProgressColumn, completedColumnd, taskElement, index) => {
  arrayActivitys = JSON.parse(localStorage.getItem("responsabilidades"));
  arrayActivitys.forEach((item) => {
    if (item.id == index) {
      if (item.state == "state-new") {
        newTask.appendChild(taskElement);
      }
      if (item.state == "state-inprogress") {
        inProgressColumn.appendChild(taskElement);
      }
      if (item.state == "state-completed") {
        completedColumnd.appendChild(taskElement);
      }
    }
  });
};

const removeIdenticalChildrenInproressColumn = (inProgressColumn) => {
  let childrenInprogressColumn = inProgressColumn.children;
  let element = childrenInprogressColumn[1];

  for (
    let counter = 1;
    counter < childrenInprogressColumn.length * 2;
    counter++
  ) {
    let element2 = childrenInprogressColumn[counter + 1];

    if (element2 == undefined || element == undefined) {
      return;
    }

    if (element.className == element2.className) {
      inProgressColumn.removeChild(element);
    }
  }
};

const removeIdenticalChildrenCompletedColumn = (completedColumnd) => {
  let childrenInCompletedColumn = completedColumnd.children;
  let element = childrenInCompletedColumn[1];

  for (
    let counter = 1;
    counter < childrenInCompletedColumn.length * 2;
    counter++
  ) {
    let element2 = childrenInCompletedColumn[counter + 1];

    if (element2 == undefined || element == undefined) {
      return;
    }

    if (element.className == element2.className) {
      console.log("yesenia");
      completedColumnd.removeChild(element);
    }
  }
};

let myName = " ";
const createName = (yourName) => {
  myName = yourName;
};

const saveName = () => {
  localStorage.setItem("name", JSON.stringify(myName));
  addNameFunc();
};

const addNameFunc = () => {
  const myNameDiv = document.getElementById("myName");
  myName = JSON.parse(localStorage.getItem("name"));

  if (myName === null) {
    return;
  }
  myNameDiv.innerHTML = myName;
  form_Welcome.classList.add("remove-form-welcome");
  addName.classList.add("show");
};

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
  saveInformation(activity, description, "state-new");
  document.getElementById("activity").value = " ";
  document.getElementById("description").value = " ";
  form.classList.remove("show");
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
  createName(yourName);
  saveName();
});

closeSeeSections.addEventListener("click", () => {
  seeSections.classList.remove("show3");
});

closeModalWork.addEventListener("click", () => {
  modalWork.classList.remove("show");
});

document.addEventListener("DOMContentLoaded", addTasktoDom);

document.addEventListener("DOMContentLoaded", addNameFunc);
