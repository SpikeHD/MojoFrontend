document.addEventListener("DOMContentLoaded", () => {
  const sidebarItems = document.querySelector("#sidebar").children;

  for (const item of sidebarItems) {
    item.onclick = (e) => switchPage(e.target.dataset.value)
  }
})