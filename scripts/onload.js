var networkIssuesInformed = false;

function checkStatus(){
  var status = document.getElementById("status");
  sendCommand("", "ping").then(res => {
    if (res.code == 200) {
      status.classList.add("ready");
      status.classList.remove("error");
      document.getElementById("statusText").innerText = "Ready";
      networkIssuesInformed = false;
    } else {
      throw new Error("");
    }
  }).catch(err => {
    status.classList.add("error");
    status.classList.remove("ready");
    document.getElementById("statusText").innerText = "Error";
    if (!networkIssuesInformed) {
      message("Network issue detected, you may request a new MojoConsole link in game.", "fail");
      networkIssuesInformed = true;
    }
  })
}

document.addEventListener("DOMContentLoaded", () => {
  const sidebarItems = document.querySelector("#sidebar").children;

  for (const item of sidebarItems) {
    item.onclick = (e) => switchPage(e.target.dataset.value)
  }
  checkStatus();
  setInterval(() => { // check console status
    checkStatus();
  }, 30 * 1000 );
  // adjust frame height
  setTimeout(() => {
    var height = window.innerHeight
    || document.documentElement.clientHeight
    || document.body.clientHeight;
    var content = document.getElementById("content");
    height = height - content.getBoundingClientRect().y - 30;
    content.style.height = height + "px";

    message("Welcome to MojoConsolePlus!");
  },10); // delay height modification to avoid issues
  })
