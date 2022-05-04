document.addEventListener('DOMContentLoaded', () => {
  displayUserList();
})

function kickUser(username) {
  const payload = `/kick ${username}`;

  sendCommand(payload);
}

async function displayUserList() {
  const resp = await sendCommand('/list', 'invoke', true);

  // Do some funky string stuff
  const dataArr = resp.payload.split('\n').map(x => x.trim()).filter(x => x.length > 0);

  // Number of users online
  const amountOnline = parseInt(dataArr[0].split('are ')[1].split('p')[0]);
  
  // Player name list
  const players = dataArr.slice(1, dataArr.length);

  let zebra = true;

  for (const player of players) {
    const playerList = document.getElementById('playerList');
    const playerSection = document.createElement('div')
    playerSection.className = zebra ? 'playerSection' : 'playerSection zebra';
    playerSection.innerHTML = `<span class="playerName">${player}</span>`;

    // Kick and ban buttons
    const buttons = document.createElement('div');
    buttons.className = 'buttons';
    buttons.innerHTML = `<button class="kickButton" onclick="kickUser('${player}')">Kick</button>`;
    buttons.innerHTML += `<button class="banButton" onclick="banUser('${player}')">Ban</button>`;

    playerSection.appendChild(buttons);

    playerList.appendChild(playerSection);

    zebra = !zebra;
  }
}