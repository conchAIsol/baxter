fetch("/updates.json")
.then(response => response.json())
.then(json => {
    let updatesBox = document.getElementById("updates");
    let i = 0;
    console.log(json.updates[0].date);
    for (i=0; i<json.updates.length; i++){
        let updateEntry = document.createElement("p");
        let date = document.createElement("span");
        date.classList.add("upDate");
        let content = document.createElement("span");
        content.classList.add("upContent");


        date.innerHTML = json.updates[i].date;
        content.innerHTML = json.updates[i].content;
        updateEntry.appendChild(date);
        updateEntry.appendChild(content);
        updatesBox.appendChild(updateEntry);
    }
});