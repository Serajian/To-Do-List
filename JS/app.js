window.addEventListener("load", showTask);
let addBtn = document.querySelector("button");
let taskList = document.querySelector("ul");
let input = document.querySelector("input");
let tasks;
if (!localStorage.getItem("todo")) {
  tasks = [];
} else {
  tasks = getTasks();
}

addBtn.addEventListener("click", () => {
  let text = input.value;
  let task = creatTask(text);
  task.innerHTML +=
    '<span class="closeBtn"><i class="fa-solid fa-trash-can"></i></span>';
  taskList.appendChild(task);
  saveTasks(text);
  input.value = "";
});
taskList.addEventListener("click", (e) => {
  if (e.target.nodeName === "I") {
    let target = e.target.parentElement.parentElement;
    target.style = "display : none";
    tasks.splice(tasks.indexOf(target.textContent), 1);
    localStorage.setItem("todo", tasks);
  }
  if (e.target.nodeName === "LI") {
    e.target.classList.toggle("done");
  }
});
function creatTask(text) {
  let li = document.createElement("li");
  li.textContent = text;
  return li;
}
function saveTasks(text) {
  tasks.push(text);
  localStorage.setItem("todo", tasks);
}

function getTasks() {
  return localStorage.getItem("todo").split(",");
}
function showTask() {
  for (let oldTask of getTasks()) {
    let task = creatTask(oldTask);
    task.innerHTML +=
      '<span class="closeBtn"><i class="fa-solid fa-trash-can"></i></span>';
    taskList.appendChild(task);
  }
}
