async function sendCommand(payload, method="invoke", background=false) {
  const parent = window.parent
  return await parent.sendCommand(payload, method, background)
}