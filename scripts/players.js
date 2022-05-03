function kickUser() {
  const user = document.getElementById('kickInput').value;
  const payload = `/kick ${user}`;

  sendCommand(payload);
}