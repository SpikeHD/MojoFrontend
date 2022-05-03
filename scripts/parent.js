async function sendCommand(payload) {
  const parent = window.parent
  return await parent.sendCommand(payload)
}