var networkIssuesInformed = false;

function checkStatus(){
  var status = document.getElementById("status");
  sendCommand("", "ping").then(res => {
    if (res.code == 200) {
      status.classList.add("ready");
      status.classList.remove("error");
      document.getElementById("statusText").innerText = "正常";
      networkIssuesInformed = false;
    } else {
      throw new Error("");
    }
  }).catch(err => {
    status.classList.add("error");
    status.classList.remove("ready");
    document.getElementById("statusText").innerText = "已断开";
    if (!networkIssuesInformed) {
      message("监测到网络或授权问题，请尝试在游戏内重新获取链接。", "fail");
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
    var height1 = height - content.getBoundingClientRect().y - 30;
    content.style.height = height1 + "px";
    var area = document.getElementById("right");
    area.style.height = height - area.getBoundingClientRect().y + "px";
    message("欢迎使用MojoConsolePlus!");
  },10); // delay height modification to avoid issues
  })
