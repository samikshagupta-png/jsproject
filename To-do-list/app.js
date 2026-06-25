let btn = document.querySelector(".btn");
let mode = document.querySelector("#mode");
const form = document.querySelector(".worklist");
let task=document.querySelector("#task");
let text =document.querySelector(".Text");
const recentTaskList = document.querySelector(".recenttask ul");


// Check if user is logged in
const username = localStorage.getItem("username");

if (username) {
  // Show welcome message
  document.getElementById("welcome").textContent = "Welcome " + username + "!";

  // Change button to logout
  btn.textContent = "Logout";

  btn.addEventListener("click", function() {
    localStorage.removeItem("username"); // clear saved name
    window.location.href = "login.html"; // back to login
  });
} else {
  // If no user, keep button as login
  btn.textContent = "Login";
  btn.addEventListener("click", function() {
    window.location.href = "login.html";
  });
}

// Theme switcher
mode.addEventListener("change", function() {
  const selectedmode = this.value;

  if (selectedmode === "light") {
    document.body.style.backgroundColor = "#9dd1f1";
    document.body.style.color = "black";
  } else if (selectedmode === "dark") {
    document.body.style.backgroundColor = "#272626";
    document.body.style.color = "white";
  }
});





// Get current username from localStorage


// Build a unique key for this user's tasks
const taskKey = username ? `tasks_${username}` : "tasks_guest";

// Save tasks for this user
function saveTasks() {
  const tasks = [];
  recentTaskList.querySelectorAll(".Text").forEach(textDiv => {
    tasks.push(textDiv.textContent);
  });
  localStorage.setItem(taskKey, JSON.stringify(tasks));
}

// Load tasks for this user
function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem(taskKey)) || [];
  tasks.forEach(taskValue => {
    addTask(taskValue);
  });
}

// Add a new task element
function addTask(taskValue) {
  const li = document.createElement("li");

  const taskDiv = document.createElement("div");
  taskDiv.classList.add("onetask");

  const textDiv = document.createElement("div");
  textDiv.classList.add("Text");
  textDiv.textContent = taskValue;

  const doneBtn = document.createElement("button");
  doneBtn.textContent = "Complete";
  doneBtn.classList.add("done");

  // remove task when complete
  doneBtn.addEventListener("click", function() {
    li.remove();
    saveTasks(); // update storage after removal
  });

  taskDiv.appendChild(textDiv);
  taskDiv.appendChild(doneBtn);
  li.appendChild(taskDiv);
  recentTaskList.appendChild(li);
}

// Handle form submit
form.addEventListener("submit", function(event) {
  event.preventDefault();
  const taskValue = task.value.trim();

  if (taskValue) {
    addTask(taskValue);
    saveTasks(); // save after adding
    task.value = "";
  }
});

// Load tasks on page load
loadTasks();
// Listen for clicks on "done" buttons
document.addEventListener("click", function(e) {
  if (e.target.classList.contains("done")) {
    // Trigger confetti celebration
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.6 }
    });

    // Optional: add a success message
    const msg = document.createElement("div");
    msg.textContent = "🎉 Task Completed!";
    msg.style.position = "fixed";
    msg.style.top = "20px";
    msg.style.left = "50%";
    msg.style.transform = "translateX(-50%)";
    msg.style.background = "#4CAF50";
    msg.style.color = "white";
    msg.style.padding = "10px 20px";
    msg.style.borderRadius = "8px";
    msg.style.boxShadow = "0 4px 6px rgba(0,0,0,0.2)";
    document.body.appendChild(msg);

    setTimeout(() => msg.remove(), 2000);
  }
});
