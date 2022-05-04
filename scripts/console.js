async function sendCommand(payload, method="invoke", background=false){
  let key = new window.URLSearchParams(window.location.search).get("k");
  let url = '/mojoplus/api';
  let data = JSON.stringify({ "k": key, "request": method, "payload": payload });

  let response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: data,
  })

  let json = await response.json();
  if (method == 'invoke' && !background) {
    document.getElementById("messageContent").innerText = json.payload;
  document.getElementById("message").style.opacity = 1;
  document.getElementById("message").classList.remove("hide");
  }
  return json
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
