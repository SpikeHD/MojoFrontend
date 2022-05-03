async function sendCommand(payload){
  let key = new window.URLSearchParams(window.location.search).get("k");
  let url = '/mojoplus/api';
  let data = JSON.stringify({ "k": key, "request": "invoke", "payload": payload });

  let response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: data,
  })

  let json = await response.json();
  
  return json
}

function switchPage(page) {
  const iframe = document.getElementById("content");
  iframe.src = `pages/${page}.html`;
}