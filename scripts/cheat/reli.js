var filterMethod = "set";

function genReli() {
    var panel = document.getElementById("panel");
    panel.innerHTML = `<div class="form">
    <h2>Send Reli to you(Still WIP)</h2>
            <label>Reliquary Name:</label>
            <div> Search by: 
                <input id="by-set" type="radio" name="filter_type" checked /> <label for="by-set" class="checkable">Set</label> 
                <input id="by-name" type="radio" name="filter_type" />  <label for="by-name" class="checkable">Name</label> 
            </div>
                <div style="display: flex;" id="search-box" class="search-box">
                    <div style="flex: 2">
                        <select id="reli-set" class="by-set">
                            <option value="0">All</option>
                        </select>
                        <input id="reli-search" type="text" class="hidden by-name" placeholder="Reliquary Name" />
                    </div>
                    <div style="flex: 4; margin-left: 0.5em">
                        <select id="reli-select"  class="by-set">

                        </select>
                        <div class="by-name" id="name-list">
                        </div>
                    </div>
                </div>
                
                <input id="reli-id" type="text" style="display: none;" />

            <label for="level">Level:</label><input type="number" id="level" name="level" value=20 />
            <div>
                <label for="main-prop">Main Props:</label>
                <select id="main-prop"> </select>
                <input type="checkbox" id="main-percent" name="main-percent" /> <label> %</label>
            </div>

            <button id="execute">Send</button>
    </div>`;
    var filter = document.getElementById("reli-set");
    reli_list.forEach(reli => {
        var o = document.createElement("option");
        o.value = reli.id;
        o.innerText = reli.name;
        filter.appendChild(o);
    })
    updateReliList();
    document.getElementById("reli-set").onchange = updateReliList;
    document.getElementById("by-set").onchange = () => {
        Array.prototype.forEach.call(document.getElementsByClassName("by-set"),(e)=> {
            e.classList.remove("hidden");
        });
        Array.prototype.forEach.call(document.getElementsByClassName("by-name"),(e)=> {
            e.classList.add("hidden");
        });
        document.getElementById("search-box").style.height = "3em";
    };
    document.getElementById("by-name").onchange = () => {
        Array.prototype.forEach.call(document.getElementsByClassName("by-name"),(e)=> {
            e.classList.remove("hidden");
        });
        Array.prototype.forEach.call(document.getElementsByClassName("by-set"),(e)=> {
            e.classList.add("hidden");
        });
        document.getElementById("search-box").style.height = "20em";
    };
    document.getElementById("execute").onclick = () => {
        var reliId = document.getElementById("reli-id").value;
        var level = document.getElementById("level").value;
        sendCommand(`giveart ${reliId} ${level+1}`);
    }
}

function updateReliList() {
    if (filterMethod == "set") {
        var filter = document.getElementById("reli-set").value;
        var select = document.getElementById("reli-select");
        select.innerHTML = "";
        reli_list.forEach(element => {
            if (filter == 0 || element.id == filter){
                element.contains.forEach(item => {
                    var o = document.createElement("option");
                    o.innerText = `${item.name} - ${item.id}`; ;
                    o.value = item.id;
                    select.appendChild(o);
                })
            }

        });
    }
}

function updatePropList(mainPropId, appendPropId) {

}
