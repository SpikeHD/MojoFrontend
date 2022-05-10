var DEBUG = true;
async function sendCommand(payload, method="invoke", background=false, persistent="auto") {
  let key = new window.URLSearchParams(window.location.search).get("k");
  let url = '/mojoplus/api';
  let data = JSON.stringify({ "k": key, "request": method, "payload": payload });
  if (DEBUG) console.log(payload);
  let response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: data,
  })
  try {
    let json = await response.json();
    try{
      if (method == 'invoke' && !background) {
        if (json.code != 200) throw Error('');
        var m = json.payload.trim().replace(/\r/g, "").replace(/\n\n/g, "\n");
        if(persistent == "auto") {
          var m2 = m.replace(/\n/g, "");
          persistent = (m.length - m2.length) > 3; // true more than 3 lines
        }
        message(`${m}`, null, persistent);
      }
      return json
    } catch (e) {
      var messages = `请求失败.`
      if (json.code) {
        messages += ` 错误信息: ${json.message}`
      }
      message(messages, "fail", false);
    }

  } catch (err) {
    message("连接失败或服务器内部错误。", "fail", false);
  }
}

function dismissMessage(){
  document.getElementById("message").style.opacity = 1;
  setTimeout(() => {
    document.getElementById("message").classList.add("hide");
  }, 500);
  document.getElementById("message").style.opacity = 0;
}

function switchPage(page) {
  const iframe = document.getElementById("content");
  iframe.src = `pages/${page}.html`;
}

function message(message, className, persistent=false) {
  var m = document.createElement("div");
  m.classList.add("messageBox");
  m.classList.add("initial");
  if (className) m.classList.add(className);
  var mc = document.createElement("div");
  var dismissButton = document.createElement("button");
  mc.classList.add("messageContent");
  mc.innerText = message;
  dismissButton.innerText = "好";
  m.appendChild(mc);
  m.appendChild(dismissButton);
  document.getElementById("message").appendChild(m);
  dismissButton.onclick = (e) => {
    dismissMessageInternal(e.target.parentNode);
  }
  // m.classList.remove("initial");
  setTimeout(function() {
    m.classList.remove("initial");
  }, 100);
  if (!persistent) setTimeout(() => dismissMessageInternal(m), 4000);
}

function dismissMessageInternal(target) {
  if (target){
      target.classList.add("finish");
      setTimeout(()=>{target.remove();}, 400);
  }
}