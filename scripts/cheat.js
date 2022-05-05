
document.addEventListener("DOMContentLoaded", ()=> {
    var toolset = document.getElementsByClassName("toolset")[0];
    var panel = document.getElementById("panel");
    toolset.onclick = (e)=> {
        if (e.target != toolset && e.target.tagName == "LABEL") {
            panel.innerHTML = ""; // clear the panel
        }
        console.log(e.target);
    }
   genQuickCommand();
   document.getElementById("tab-1").onclick = genQuickCommand;
});