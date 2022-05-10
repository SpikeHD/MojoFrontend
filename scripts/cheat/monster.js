
var delayedSearch = null;
function genMonster() {
    var panel = document.getElementById("panel");
    panel.innerHTML = `<div class="form">
    <h2>Spwan Monsters/Entities near you</h2>
            <label for="entity-search">Entity Name:</label>
                <div style="display: flex; flex-direction: column;">
                    <div style="display: flex; align-items: center; overflow: hidden;">
                        <input id="entity-search" style="flex: 4" type="text" placeholder="Search Entity Name" />
                        <button id="clear" style="margin-left: 0.25em; transition: all ease-in-out 0.5s; flex: 0; opacity: 0;">Clear</button>
                    </div>
                    <div id="name-list" style="overflow-y: auto; overflow-x: hidden; max-height: 10em;height: 100%; transition: all ease-in-out 0.5s;">
                    </div>
                </div>
            <label for="amount">Amount:</label><input type="number" id="amount" name="amount" value=1 />
            <label for="amount">Level(Monster Only):</label><input type="number" id="level" name="level" value=50 />
            <input type="hidden" id="entity-id" />
            <button disabled id="execute">Send</button>
    </div>`;
    updateEntityList();

    document.getElementById("entity-search").oninput = (e) => {
        if (e.target.value.length > 0) {
            document.getElementById("clear").style.flex = 1;
            document.getElementById("clear").style.opacity = 1;
        } else {
            document.getElementById("clear").style.flex = 0;
            document.getElementById("clear").style.opacity = 0;
        }
        if (delayedSearch) {
            clearTimeout(delayedSearch);
        }
        delayedSearch = setTimeout(() => updateEntityList(), 500);
        document.getElementById("name-list").style.height = "10em";
    };
    document.getElementById("clear").onclick = ()=>{
        document.getElementById("entity-search").value = "";
        updateEntityList();
    }
    document.getElementById("entity-search").onkeydown = (e) => {
        if(e.key == "Escape") {
            document.getElementById("entity-search").value = "";
            updateEntityList();
        }
    }
    document.getElementById("entity-id").setvalue = (v) => {
        document.getElementById("entity-id").value = v;
        if (v) {
            document.getElementById("execute").disabled = false;
        } else {
            document.getElementById("execute").disabled = true;
        }
    }
    document.getElementById("name-list").onclick = (e) => {
        if (e.target.tagName == "INPUT") {
            var list = document.getElementById("name-list");
            list.style.height = "3em";
            var name = e.target.attributes['entity-name'].nodeValue ? e.target.attributes['entity-name'].nodeValue : "UNKNOWN";
            var color = {0:'blue',1: 'orange'}[e.target.attributes['entity-level'].nodeValue];
            var content = `<input name="stack" type="radio" name="entity-id" entity-id="${e.target.attributes['entity-id'].nodeValue}" entity-name="${e.target.attributes['entity-name'].nodeValue}">
                <span class="button quality-${color}">
                ${name} - ${e.target.attributes['entity-id'].nodeValue}
                </span>`;
            list.innerHTML = content;
            document.getElementById("entity-search").value = name;
            document.getElementById("clear").style.flex = 1;
            document.getElementById("clear").style.opacity = 1;
            document.getElementById("entity-id").setvalue(e.target.attributes['entity-id'].nodeValue);
            
        }
    }
    // updateWeaponList();
    // document.getElementById("weapon-filter").onchange = updateWeaponList;
    document.getElementById("execute").onclick = () => {
        var entityId = document.getElementById("entity-id").value;
        var amount = document.getElementById("amount").value;
        var level = document.getElementById("level").value;
        sendCommand(`spawn ${entityId} ${amount} ${level}`);
    }
}

function updateEntityList() {
    var filter = document.getElementById("entity-search").value;
    var list = document.getElementById("name-list");
    list.innerHTML = "";
    list.style.height = "10em";
    monster_data.forEach(element => {
        if (filter == "" || element.name.toLowerCase().indexOf(filter.toLowerCase()) != -1) {
            var o = document.createElement("label");
            o.style.marginLeft = "0.1em";
            var color = {0:'blue',1: 'orange'}[element.type];
            var content = `<input name="stack" type="radio" name="entity-id" entity-id="${element.id}" entity-name="${element.name}" entity-level="${element.type}">
                <span class="button quality-${color}">
                ${element.name ? element.name : "UNKNOWN"}
                </span>`;
            o.innerHTML = content;
            list.appendChild(o);
        }

    });

}
