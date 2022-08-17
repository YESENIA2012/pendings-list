const modalWork = document.querySelector(".container-homework");
const form = document.querySelector(".container-form");
const seeSections = document.querySelector(".modalSections");
const taskProgress = document.querySelector(".task-section");
const newTask = document.querySelector(".newTask");
const inProgressColumn = document.querySelector(".state-inprogress");
const completedColumnd = document.querySelector(".state-completed");
const form_Welcome = document.querySelector(".welcom-form");

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

    drawTaskOnPage(inProgressColumn, completedColumnd, taskElement, index);
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

const drawTaskOnPage = (
  inProgressColumn,
  completedColumnd,
  taskElement,
  index
) => {
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
  const myNameDiv = document.querySelector(".name");
  myName = JSON.parse(localStorage.getItem("name"));

  if (myName === null) {
    return;
  }
  myNameDiv.innerHTML = myName;
  form_Welcome.classList.add("remove-form-welcome");
  document.querySelector(".addName-to-sectionWelcome").classList.remove("hide");
  document.querySelector(".addName-to-sectionWelcome").classList.add("show");
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

document.querySelector(".plusIcon").addEventListener("click", () => {
  modalWork.classList.add("show");
  modalWork.classList.remove("hide");
});

document.querySelector(".homework-modal").addEventListener("click", () => {
  form.classList.remove("hide");
  form.classList.add("show");
  modalWork.classList.add("hide");
  modalWork.classList.remove("show");
});

document.querySelector(".close-containerForm").addEventListener("click", () => {
  form.classList.remove("show");
  form.classList.add("hide");
});

document.querySelector(".send-form-button").addEventListener("click", (e) => {
  e.preventDefault();
  let activity = document.querySelector("[name=task-title").value;
  let description = document.querySelector("[name=task-description").value;
  saveInformation(activity, description, "state-new");
  document.querySelector("[name=task-title").value = " ";
  document.querySelector("[name=task-description").value = " ";
  form.classList.remove("show");
  form.classList.add("hide");
});

document.querySelector(".barsIcon").addEventListener("click", (e) => {
  seeSections.classList.add("show");
  seeSections.classList.remove("hide");
});

document.querySelector(".itemWelcome").addEventListener("click", () => {
  taskProgress.classList.remove("show");
  taskProgress.classList.add("hide");
  seeSections.classList.remove("show");
  seeSections.classList.add("hide");
});

document.querySelector(".itemTaskProgress").addEventListener("click", () => {
  seeSections.classList.remove("show");
  seeSections.classList.add("hide");
  taskProgress.classList.add("show");
  taskProgress.classList.remove("hide");
});

form_Welcome.addEventListener("submit", (e) => {
  e.preventDefault();
  let yourName = document.getElementById("name").value;
  createName(yourName);
  saveName();
});

document.querySelector(".close-sections").addEventListener("click", () => {
  seeSections.classList.remove("show");
  seeSections.classList.add("hide");
});

document
  .querySelector(".close-container-homework")
  .addEventListener("click", () => {
    modalWork.classList.remove("show");
    modalWork.classList.add("hide");
  });

document.addEventListener("DOMContentLoaded", addTasktoDom);

document.addEventListener("DOMContentLoaded", addNameFunc);
