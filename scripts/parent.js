async function sendCommand(payload, method="invoke", background=false, persistent="auto") {
  const parent = window.parent
  return await parent.sendCommand(payload, method, background, persistent)
}