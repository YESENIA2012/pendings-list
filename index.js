const openModal = document.getElementById("iconOpenModal");
const modal = document.getElementById("modalContainer");

openModal.addEventListener("click", () => {
  modalContainer.classList.add("show");
});

const openHomework = document.getElementById("openHomework");
const containerHomework = document.getElementById("createHomework");
const body = document.querySelector("body");

openHomework.addEventListener("click", () => {
  createHomework.classList.add("show2");
  modalContainer.classList.remove("show");
  body.style.backgroundColor = "transparent";
});

const closeButton = document.getElementById("closeButton");

closeButton.addEventListener("click", () => {
  createHomework.classList.remove("show2");
});
