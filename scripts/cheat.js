qucick_command = [
    {name: "Heal All Characters", command: "heal", args: []},
    {name: "Give 1000000 Mora", command: "give 202 1000000", args: []},
    {name: "Give 100000 Proigem", command: "give 201 100000", args: []},
    {name: "God mode", command: "godmode", args: []},
    {name: "Clear all items", command: "clear all", args: []},
    {name: "Clear all items", command: "clear all", args: []},
    {name: "Clear all items", command: "clear all", args: []},
    {name: "Clear all items", command: "clear all", args: []},
    {name: "Clear all items", command: "clear all", args: []},
    {name: "Clear all items", command: "clear all", args: []},
    {name: "Clear all items", command: "clear all", args: []},
    {name: "Clear all items", command: "clear all", args: []},
    {name: "Clear all items", command: "clear all", args: []},
    {name: "Clear all items111", command: "clear all", args: []},
]

document.addEventListener("DOMContentLoaded", ()=> {
    var panel = document.getElementById("panel");
    var i = 0;
    for (i=0; i< qucick_command.length; i++) {
        var command = qucick_command[i];
        console.log(i);
        var div = document.createElement("div");
        var label = document.createElement("span");
        var button = document.createElement("button");
        var hr = document.createElement("hr");
        hr.classList.add("solid");
        div.classList.add('commandGroup');
        label.innerText = command.name;
        button.innerText = "Go!";
        button.command_id = i;
        div.appendChild(label);
        div.appendChild(button);
        panel.appendChild(div);
        button.onclick = (e) => {
            var cmd = qucick_command[e.target.command_id];
            var payload = cmd.command;
            sendCommand(payload);
        }
        panel.appendChild(hr);
    }
});