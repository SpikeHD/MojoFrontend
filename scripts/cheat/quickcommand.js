qucick_command = [
    {name: "Heal All Characters", command: "heal", args: []},
    {name: "Get current position", command: "position", args: []},
    {name: "Give Mora", command: "give 202", args: [
        {type: "number", default: 100000, width: 145}
    ]},
    {name: "Give Proigem", command: "give 201", args: [
        {type: "number", default: 10000, width: 120}
    ]},
    {name: "Give Intertwined Fate", command: "give 223", args: [
        {type: "number", default: 10000, width: 100}
    ]},
    {name: "Give Acquaint Fate", command: "give 224", args: [
        {type: "number", default: 10000, width: 100}
    ]},
    {name: "Toggle Godmode", command: "godmode", args: []},
    {name: "Set world level(relog required)", command: "setworldlevel", args: [
        {type: "number", default: 8, width: 60}
    ]}, 
    {name: "Give all items", command: "giveall", args: []},
    {name: "Clear all items", command: "clear all", args: []},
    {name: "Set talent E", command: "talent e", args: [
        {type: "number", default: 10, width: 60}
    ]},
    {name: "Set talent Q", command: "talent q", args: [
        {type: "number", default: 10, width: 60}

    ]},
    {name: "Set talent N", command: "talent n", args: [
        {type: "number", default: 10, width: 60}
    ]},
]

function genQuickCommand() {
    var i = 0;
    var arg = 0;
    for (i=0; i< qucick_command.length; i++) {
        var command = qucick_command[i];
        var div = document.createElement("div");
        var label = document.createElement("span");
        var div2 = document.createElement("div");
        var button = document.createElement("button");
        var hr = document.createElement("hr");
        var hiddenCommand = document.createElement("input");

        hr.classList.add("solid");
        div.classList.add('commandGroup');
        label.innerText = command.name;
        button.innerText = "Go!";
        div.appendChild(label);
        div.appendChild(div2);

        hiddenCommand.value = command.command;
        hiddenCommand.classList.add('hidden');
        div2.appendChild(hiddenCommand);
        for (arg = 0; arg < command.args.length; arg++){
            var arg_item = command.args[arg];
            switch (arg_item.type) {
                case "number": 
                    var input = document.createElement('input');
                    input.type = arg_item.type;
                    input.value = arg_item.default;
                    if (arg_item.width) {
                        input.style.width = arg_item.width + 'px';
                    }
                    div2.appendChild(input);
            }
        }


        div2.appendChild(button);
        panel.appendChild(div);
        button.onclick = (e) => {
            var parent = e.target.parentNode;
            var payload = "";
            var first = true;
            for(var child=parent.firstChild; child!==null; child=child.nextSibling) {
                if (child.tagName != "INPUT") continue;
                if (!first) {
                    payload += " ";
                }
                first = false;
                payload += child.value;
            }
            sendCommand(payload);
        }
        panel.appendChild(hr);
    }
}