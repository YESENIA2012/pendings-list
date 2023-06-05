const modalWork = document.querySelector(".container-homework");
const insertTaskForm = document.querySelector(".container-form");
const seeSections = document.querySelector(".modalSections");
const taskProgress = document.querySelector(".task-section");

// column containers
const newTaskContainer = document.querySelector(".new-task-container");
const inprogressTaskContainer = document.querySelector(
  ".in-progress-container"
);
const completedTaskContainer = document.querySelector(".completed-container");
const todoColumnElement = document.querySelector(".state-new");
const inProgressColumnElement = document.querySelector(".state-inprogress");
const completedColumnElement = document.querySelector(".state-completed");

const inProgressColumn = document.querySelector(".state-inprogress");
const completeColumn = document.querySelector(".state-completed");
const form_Welcome = document.querySelector(".welcom-form");

//Functions
const createElementWithClass = (tagName, className) => {
  const element = document.createElement(tagName);
  element.classList.add(className);
  return element;
};

// Utilidad: Crear nodo de texto
const createTextNodeFunction = (text) => {
  return document.createTextNode(text);
};

const saveInformation = (activity, description, state) => {
  const currentTasks = JSON.parse(localStorage.getItem("responsibilities"));
  let taskCounter = currentTasks ? currentTasks.length : 0;
  item = {
    title: activity,
    description: description,
    state: state,
    id: taskCounter,
  };

  addTasktoContainer([item]);

  if (!currentTasks) {
    localStorage.setItem("responsibilities", JSON.stringify([item]));
  } else {
    currentTasks.push(item);
    localStorage.setItem("responsibilities", JSON.stringify(currentTasks));
  }
};

const addTasktoContainer = (arrayActivitys) => {
  arrayActivitys.forEach(({ title, description, state }, index) => {
    let textTarea = createTextNodeFunction(title);
    let textDescription = createTextNodeFunction(description);
    let taskElement = createElementWithClass("p", `task-${index}`);

    taskElement.draggable = "true";
    taskElement.innerHTML = title;

    if (state === "state-new") {
      newTaskContainer.appendChild(taskElement);
    } else if (state === "state-inprogress") {
      inprogressTaskContainer.appendChild(taskElement);
    } else {
      completedTaskContainer.appendChild(taskElement);
    }

    const descriptionAndTasContainer = document.createElement("div");
    addDescription(descriptionAndTasContainer, textDescription, textTarea);

    dragAndDropTask(taskElement, todoColumnElement, newTaskContainer);

    dragAndDropTask(
      taskElement,
      inProgressColumnElement,
      inprogressTaskContainer
    );

    dragAndDropTask(
      taskElement,
      completedColumnElement,
      completedTaskContainer
    );

    taskElement.addEventListener("click", () => {
      descriptionAndTasContainer.classList.add("show");
    });
  });
};

function dragAndDropTask(task, columnContainer, taskContainer) {
  let evento = null;
  task.addEventListener("dragstart", () => {});
  task.addEventListener("dragend", () => {});
  task.addEventListener("drag", () => {});

  columnContainer.addEventListener("dragenter", () => {});
  columnContainer.addEventListener("dragleave", () => {});
  columnContainer.addEventListener("dragover", (e) => {
    e.preventDefault();
  });

  task.addEventListener("dragstart", (e) => {
    evento = e.target;
  });

  columnContainer.addEventListener("drop", (e) => {
    e.preventDefault();
    let stateActivity = e.target;
    let stateAttribute = stateActivity.getAttribute("class");
    let position = stateAttribute.split(" ");
    let state = position[1];

    if (evento) {
      const taskClass = evento.getAttribute("class");
      let position = taskClass.split("-");
      let taskId = position[1];

      arrayActivitys = JSON.parse(localStorage.getItem("responsibilities"));
      arrayActivitys.map((item) => {
        if (taskId == item.id) {
          taskContainer.appendChild(evento);
          item.state = state;
          localStorage.setItem(
            "responsibilities",
            JSON.stringify(arrayActivitys)
          );
        }
      });
    }
  });
}

const drawTaskOnPage = (
  inProgressColumn,
  completeColumn,
  taskElement,
  index
) => {
  arrayActivitys = JSON.parse(localStorage.getItem("responsibilities"));
  arrayActivitys.forEach((item) => {
    if (item.id == index) {
      if (item.state == "state-new") {
        newTask.appendChild(taskElement);
      }
      if (item.state == "state-inprogress") {
        inProgressColumn.appendChild(taskElement);
      }
      if (item.state == "state-completed") {
        completeColumn.appendChild(taskElement);
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

const removeIdenticalChildrenCompletedColumn = (completeColumn) => {
  let childrenInCompletedColumn = completeColumn.children;
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
      completeColumn.removeChild(element);
    }
  }
};

const addNameFunc = () => {
  const myNameDiv = document.querySelector(".name");
  let myName = JSON.parse(localStorage.getItem("name"));

  if (!myName) {
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
  const closeModal = createElementWithClass("a", "close-modal-class");

  const textModal = createTextNodeFunction("x");
  closeModal.appendChild(textModal);
  descriptionAndTasContainer.appendChild(closeModal);

  closeModal.addEventListener("click", () => {
    descriptionAndTasContainer.classList.remove("show");
  });
}

function addDescription(
  descriptionAndTasContainer,
  textDescription,
  textTarea
) {
  createModalDescAndTask(descriptionAndTasContainer);
  const titleTask = createElementWithClass("div", "title-class");
  titleTask.appendChild(textTarea);
  descriptionAndTasContainer.appendChild(titleTask);

  const descriptionContainer = createElementWithClass(
    "div",
    "description-class"
  );

  descriptionContainer.appendChild(textDescription);
  descriptionAndTasContainer.appendChild(descriptionContainer);
  newTaskContainer.appendChild(descriptionAndTasContainer);
}

//EventListener

document.querySelector(".plusIcon").addEventListener("click", () => {
  modalWork.classList.add("show");
  modalWork.classList.remove("hide");
});

document.querySelector(".homework-modal").addEventListener("click", () => {
  insertTaskForm.classList.remove("hide");
  insertTaskForm.classList.add("show");
  modalWork.classList.add("hide");
  modalWork.classList.remove("show");
});

document.querySelector(".close-containerForm").addEventListener("click", () => {
  insertTaskForm.classList.remove("show");
  insertTaskForm.classList.add("hide");
});

document.querySelector(".send-form-button").addEventListener("click", (e) => {
  e.preventDefault();
  let activity = document.querySelector("[name=task-title]").value;
  let description = document.querySelector("[name=task-description]").value;
  saveInformation(activity, description, "state-new");
  document.querySelector("[name=task-title").value = " ";
  document.querySelector("[name=task-description").value = " ";
  insertTaskForm.classList.remove("show");
  insertTaskForm.classList.add("hide");
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
  localStorage.setItem("name", JSON.stringify(yourName));
  addNameFunc();
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

document.addEventListener("DOMContentLoaded", function () {
  arrayActivitys = JSON.parse(localStorage.getItem("responsibilities"));
  if (!arrayActivitys) {
    return;
  }
  addTasktoContainer(arrayActivitys);
});

document.addEventListener("DOMContentLoaded", addNameFunc);
