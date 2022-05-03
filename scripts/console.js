function sendCommand(payload){
  let client = new XMLHttpRequest();
  let key = new window.URLSearchParams(window.location.search).get("k");
  let url = '/mojoplus/api';

  client.open("POST", url, true);
  client.setRequestHeader("Content-Type", "application/json");

  client.onreadystatechange = () => {
    if (client.readyState === 4 && client.status === 200) {
      let result = document.getElementById("c2");

      // Print received data from server
      result.innerHTML = JSON.parse(this.responseText).payload.replace(/\n/g, "<p/>");
    }
  };

  // Converting JSON data to string
  var data = JSON.stringify({ "k": key, "request": "invoke", "payload": payload });
  
  // Sending data with the request
  client.send(data);
}

function switchPage(page) {
  const iframe = document.getElementById("content");
  iframe.src = `pages/${page}.html`;
}