//Variables
const modalWork = document.getElementById("modalWork");
const form = document.getElementById("form");
const seeSections = document.getElementById("seeSections");
const taskProgress = document.getElementById("taskProgressSection");
const newTask = document.getElementById("newTask");
const inProgressColumn = document.getElementById("inProgressColumn");
const completedColumn = document.getElementById("completedColumn");
const form_Welcome = document.getElementById("form_Welcome");
const stateType = document.getElementById("stateType");

//Functions

const createElementWithClass = (tagName, className) => {
  const element = document.createElement(tagName);
  element.classList.add(className);
  return element;
};

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

  addTasktoDom();

  if (!currentTasks) {
    localStorage.setItem("responsibilities", JSON.stringify([item]));
  } else {
    currentTasks.push(item);
    localStorage.setItem("responsibilities", JSON.stringify(currentTasks));
  }
};

const addTasktoDom = () => {
  arrayActivitys = JSON.parse(localStorage.getItem("responsibilities"));

  if (!arrayActivitys) {
    return;
  }

  arrayActivitys.forEach(({ title, description }, index) => {
    let textTarea = createTextNodeFunction(title);
    let textDescription = createTextNodeFunction(description);
    taskElement = createElementWithClass("p", `task-${index}`);

    taskElement.draggable = "true";
    taskElement.innerHTML = title;

    taskElement.appendChild(textTarea);
    newTask.appendChild(taskElement);

    const descriptionAndTasContainer = document.createElement("div");
    addDescription(descriptionAndTasContainer, textDescription, textTarea);

    dragAndDropTask(taskElement, todocolumn);
    dragAndDropTask(taskElement, inProgressColumn);
    dragAndDropTask(taskElement, completedColumn);

    taskElement.addEventListener("click", () => {
      descriptionAndTasContainer.classList.add("show");
    });

    paintDB(inProgressColumn, completedColumn, taskElement, index);
    removeIdenticalChildrenInproressColumn(inProgressColumn);
    removeIdenticalChildrenCompletedColumn(completedColumn);
  });
};

function dragAndDropTask(task, columnElement) {
  let event = null;
  task.addEventListener("dragstart", () => {});
  task.addEventListener("dragend", () => {});
  task.addEventListener("drag", () => {});

  columnElement.addEventListener("dragenter", () => {});
  columnElement.addEventListener("dragleave", () => {});
  columnElement.addEventListener("dragover", (e) => {
    e.preventDefault();
  });

  task.addEventListener("dragstart", (e) => {
    event = e.target;
  });

  columnElement.addEventListener("drop", (e) => {
    e.preventDefault();
    let stateActivity = e.target;
    let stateAttribute = stateActivity.getAttribute("class");
    let position = stateAttribute.split(" ");
    let state = position[1];

    if (event) {
      const taskClass = event.getAttribute("class");
      let position = taskClass.split("-");
      let taskId = position[1];

      arrayActivitys = JSON.parse(localStorage.getItem("responsibilities"));
      arrayActivitys.map((item) => {
        if (taskId == item.id) {
          columnElement.appendChild(event);
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

const paintDB = (inProgressColumn, completedColumn, taskElement, index) => {
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
        completedColumn.appendChild(taskElement);
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

const removeIdenticalChildrenCompletedColumn = (completedColumn) => {
  let childrenInCompletedColumn = completedColumn.children;
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
      completedColumn.removeChild(element);
    }
  }
};

const addNameFunc = () => {
  const myNameDiv = document.getElementById("myName");
  let myName = JSON.parse(localStorage.getItem("name"));

  if (!myName) {
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
  localStorage.setItem("name", JSON.stringify(yourName));
  addNameFunc();
});

closeSeeSections.addEventListener("click", () => {
  seeSections.classList.remove("show3");
});

closeModalWork.addEventListener("click", () => {
  modalWork.classList.remove("show");
});

document.addEventListener("DOMContentLoaded", addTasktoDom);

document.addEventListener("DOMContentLoaded", addNameFunc);
