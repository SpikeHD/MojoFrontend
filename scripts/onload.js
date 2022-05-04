function checkStatus(){
  var status = document.getElementById("status");
  sendCommand("", "ping").then(res => {
    if (res.code == 200) {
      status.classList.add("ready");
      status.classList.remove("error");
      document.getElementById("statusText").innerText = "Ready";
    } else {
      throw new Error("");
    }
  }).catch(err => {
    status.classList.add("error");
    status.classList.remove("ready");
    document.getElementById("statusText").innerText = "Error";
  })
}

document.addEventListener("DOMContentLoaded", () => {
  const sidebarItems = document.querySelector("#sidebar").children;

  for (const item of sidebarItems) {
    item.onclick = (e) => switchPage(e.target.dataset.value)
  }
  checkStatus();
  setInterval(() => {
    checkStatus();
  }, 30 * 1000 );
  document.getElementById("messageBox").onclick = (e) => {
    e.stopImmediatePropagation();
  }
  window.
  document.getElementById("content").style.height = "400px";
})
