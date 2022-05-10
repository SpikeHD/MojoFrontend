
function genAvatar() {
    var panel = document.getElementById("panel");
    panel.innerHTML = `<div class="form">
    <h2>Send Character to you</h2>
            <label for="character-id">Character Name:</label>
                <div style="display: flex;">
                    <select id="character-filter" style="flex: 2">
                        <option value="0"> Filter:All </option>
                        <option value="Electric"> Filter:Electric </option>
                        <option value="Ice"> Filter:Ice </option>
                        <option value="Wind"> Filter:Wind </option>
                        <option value="Water"> Filter:Water </option>
                        <option value="Fire"> Filter:Fire </option>
                        <option value="Rock"> Filter:Rock </option>
                        <option value="Grass"> Filter:Grass </option>
                    </select>
                    <select id="character-id" style="flex: 4; margin-left: 0.5em"> </select>
                </div>
            <label for="level">Level:</label><input type="number" id="level" name="level" value=1 />
            <label for="amount">Constellation(Will be sent as Stella Fortuna):</label><input type="number" id="amount" name="amount" value=0 />
            <button id="execute">Send</button>
    </div>`;

    updateCharacterList();
    document.getElementById("character-filter").onchange = updateCharacterList;
    document.getElementById("execute").onclick = () => {
        var characterId = document.getElementById("character-id").value;
        var amount = document.getElementById("amount").value;
        var level = document.getElementById("level").value;
        if (characterId){
            sendCommand(`givechar ${characterId} ${level}`);
            if (amount > 0) {
                sendCommand(`give ${characterId % 1000 + 1100} ${amount}`);
            }
        }
    }
}


function updateCharacterList() {
    var filter = document.getElementById("character-filter").value;
    var select = document.getElementById("character-id");
    select.innerHTML = "";
    console.log(filter);
    avatar_list.forEach(element => {
        if (filter == 0 || element.element == filter){
            var o = document.createElement("option");
            o.innerText = `${element.name} - ${element.id}`; ;
            o.value = element.id;
            select.appendChild(o);
        }

    });

}
