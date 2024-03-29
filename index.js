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

const createTextNodeFunction = (text) => {
  return document.createTextNode(text);
};

const getTasks = async () => {
  try {
    const response = await fetch("http://localhost:4000/tasks");

    const tasks = await response.json();
    console.log("Tasks:", tasks);
    return tasks;
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return { error: true };
  }
};

const createTaskInDB = async (taskData) => {
  try {
    const response = await fetch("http://localhost:4000/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(taskData),
    });

    const createdTask = await response.json();
    console.log("Task created:", createdTask);
    return createdTask;
  } catch (error) {
    console.error("Error creating task:", error);
    return { error: true };
  }
};

const updateTaskInDB = async (url, taskData) => {
  try {
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(taskData),
    });

    const taskUpdate = await response.json();
    console.log("Task update: ", taskUpdate);
    return taskUpdate;
  } catch (error) {
    console.log("error: ", error);
    return { error: true };
  }
};

const deleteTaskInDB = async (url) => {
  try {
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const taskDeleted = await response;
    console.log("Task delete: ", taskDeleted);
    const updatedTasks = await getTasks();
    return updatedTasks;
  } catch (error) {
    console.log("error: ", error);
    return { error: true };
  }
};

const clearTaskContainers = () => {
  newTaskContainer.innerHTML = "";
  inprogressTaskContainer.innerHTML = "";
  completedTaskContainer.innerHTML = "";
};

const addTaskToContainer = (arrayActivitys) => {
  arrayActivitys.forEach(({ id, title, description, state }) => {
    let textTarea = createTextNodeFunction(title);
    let textDescription = createTextNodeFunction(description);
    let taskElement = createElementWithClass("p", `task-${id}`);
    const trashIcon = document.createElement("i");
    trashIcon.classList.add(`${id}`, "fa-solid", "fa-trash");

    taskElement.draggable = "true";
    taskElement.innerHTML = title;

    if (state === "state-new") {
      taskElement.appendChild(trashIcon);
      newTaskContainer.appendChild(taskElement);
    } else if (state === "state-inprogress") {
      taskElement.appendChild(trashIcon);
      inprogressTaskContainer.appendChild(taskElement);
    } else {
      taskElement.appendChild(trashIcon);
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

    trashIcon.addEventListener("click", async (e) => {
      e.stopPropagation();
      const classNameTrashIcon = e.target.getAttribute("class").split(" ");
      const idTaskToDelete = parseInt(classNameTrashIcon[0]);
      const tasksUpdates = await deleteTaskInDB(
        `http://localhost:4000/tasks/${idTaskToDelete}`
      );
      clearTaskContainers();
      addTaskToContainer(tasksUpdates);
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

  columnContainer.addEventListener("drop", async (e) => {
    e.preventDefault();
    let stateActivity = e.target;
    let stateAttribute = stateActivity.getAttribute("class");
    let position = stateAttribute.split(" ");
    let state = position[1];

    if (evento) {
      const taskClass = evento.getAttribute("class");
      let position = taskClass.split("-");
      let taskId = position[1];

      //revisar estos cambios porfis
      let arrayActivitys = await getTasks();
      arrayActivitys.map(async (item) => {
        if (taskId == item.id) {
          taskContainer.appendChild(evento);
          item.state = state;
          await updateTaskInDB(`http://localhost:4000/tasks/${item.id}`, item);
        }
      });
    }
  });
}

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

document
  .querySelector(".send-form-button")
  .addEventListener("click", async (e) => {
    e.preventDefault();
    let activity = document.querySelector("[name=task-title]").value;
    let description = document.querySelector("[name=task-description]").value;

    document.querySelector("[name=task-title").value = " ";
    document.querySelector("[name=task-description").value = " ";
    insertTaskForm.classList.remove("show");
    insertTaskForm.classList.add("hide");

    const taskData = {
      title: activity,
      description: description,
      state: "state-new",
    };

    const result = await createTaskInDB(taskData);
    if (result.error) {
      return;
    } else {
      addTaskToContainer([result]);
    }
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

document.addEventListener("DOMContentLoaded", async function () {
  const tasks = await getTasks();

  if (tasks.error) {
    return;
  } else {
    addTaskToContainer(tasks);
  }
});

document.addEventListener("DOMContentLoaded", addNameFunc);
