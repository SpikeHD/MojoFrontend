
var delayedSearch = null;
function genItem() {
    var panel = document.getElementById("panel");
    panel.innerHTML = `<div class="form">
    <h2>发送道具</h2>
            <label for="method">发送方式:</label>
            <select id="method">
                <option value="give"/> 直接给予 </option>
                <option value="drop"/> 周围掉落 </option>
            </select>
            <label for="item-search">道具名称:</label>
                <div style="display: flex; flex-direction: column;">
                    <div style="display: flex; align-items: center; overflow: hidden;">
                        <input id="item-search" style="flex: 4" type="text" placeholder="搜索道具名称" />
                        <button id="clear" style="margin-left: 0.25em; transition: all ease-in-out 0.5s; flex: 0; opacity: 0;">清除</button>
                    </div>
                    <div id="name-list" style="overflow-y: auto; overflow-x: hidden; max-height: 10em;height: 100%; transition: all ease-in-out 0.5s;">
                    </div>
                </div>
            <label for="amount">数量:</label><input type="number" id="amount" name="amount" value=100 />
            <input type="hidden" id="item-id" />
            <button disabled id="execute">发送</button>
    </div>`;
    updateItemList();

    document.getElementById("item-search").oninput = (e) => {
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
        delayedSearch = setTimeout(() => updateItemList(), 500);
        document.getElementById("name-list").style.height = "10em";
    };
    document.getElementById("clear").onclick = ()=>{
        document.getElementById("item-search").value = "";
        updateItemList();
    }
    document.getElementById("item-search").onkeydown = (e) => {
        if(e.key == "Escape") {
            document.getElementById("item-search").value = "";
            updateItemList();
        }
    }
    document.getElementById("item-id").setvalue = (v) => {
        document.getElementById("item-id").value = v;
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
            var name = e.target.attributes['item-name'].nodeValue ? e.target.attributes['item-name'].nodeValue : "UNKNOWN";
            var color = {0:'gray',1: 'white', 2: 'green', 3: 'blue', 4:'purple', 5: 'orange'}[e.target.attributes['item-level'].nodeValue];
            var content = `<input name="stack" type="radio" name="item-id" item-id="${e.target.attributes['item-id'].nodeValue}" item-name="${e.target.attributes['item-name'].nodeValue}">
                <span class="button quality-${color}">
                ${name} - ${e.target.attributes['item-id'].nodeValue}
                </span>`;
            list.innerHTML = content;
            document.getElementById("item-search").value = name;
            document.getElementById("clear").style.flex = 1;
            document.getElementById("clear").style.opacity = 1;
            document.getElementById("item-id").setvalue(e.target.attributes['item-id'].nodeValue);
            
        }
    }
    // updateWeaponList();
    // document.getElementById("weapon-filter").onchange = updateWeaponList;
    document.getElementById("execute").onclick = () => {
        var method = document.getElementById("method").value;
        var itemId = document.getElementById("item-id").value;
        var amount = document.getElementById("amount").value;
        sendCommand(`${method} ${itemId} ${amount}`);
    }
}

function updateItemList() {
    var filter = document.getElementById("item-search").value;
    var list = document.getElementById("name-list");
    list.innerHTML = "";
    list.style.height = "10em";
    item_data.forEach(element => {
        if (filter == "" || element.name.toLowerCase().indexOf(filter.toLowerCase()) != -1) {
            var o = document.createElement("label");
            o.style.marginLeft = "0.1em";
            var color = {0:'gray',1: 'white', 2: 'green', 3: 'blue', 4:'purple', 5: 'orange'}[element.level];
            var content = `<input name="stack" type="radio" name="item-id" item-id="${element.id}" item-name="${element.name}" item-level="${element.level}">
                <span class="button quality-${color}">
                ${element.name ? element.name : "UNKNOWN"}
                </span>`;
            o.innerHTML = content;
            list.appendChild(o);
        }

    });

}
