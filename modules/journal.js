fetch("/journal.json")
.then(response => response.json())
.then(json => {
    let entriesWrapper = document.getElementById("entriesWrapper");
    let jumpTo = document.getElementById("journalJumpTo").lastElementChild;
    let i = 0;
    for (i=0; i<json.items.length; i++){
        let date = new Date(json.items[i].date_published);
        let dateString = date.toLocaleString("en-GB", {
             weekday: "long",
             day: "numeric",
             month: "short",
             year: "numeric",
        })
        let dateShort = date.toLocaleString("en-GB", {
            day: "numeric",
            month: "numeric",
            year: "2-digit",
        })

        let entry = document.createElement("div");
        entry.classList.add("entry", json.items[i].tags);
        entry.setAttribute("id", json.items[i].id);
        document.getElementsByTagName;

        let kaoani = document.createElement("img");
        kaoani.classList.add("kaoani");
        kaoani.src = `images/icons/kaoani/snuppo/${json.items[i].mood}.gif`;

        let spanTitle = document.createElement("span");
        spanTitle.classList.add("entryTitle");
        spanTitle.innerHTML = json.items[i].title;
        let spanDate = document.createElement("span");
        spanDate.classList.add("entryDate");
        spanDate.innerHTML = dateString;

        let titleDate = document.createElement("div");
        titleDate.classList.add("entryContent");
        titleDate.style.width = "fit-content";
        titleDate.style.padding = "5px 20px";
        titleDate.appendChild(spanTitle);
        titleDate.appendChild(spanDate);

        let content = document.createElement("div");
        content.classList.add("entryContent");
        content.innerHTML = json.items[i].content_html;

        entry.appendChild(kaoani);
        entry.appendChild(titleDate);
        entry.appendChild(content);
        entriesWrapper.appendChild(entry);

        let jumpLink = document.createElement("a");
        jumpLink.href = `#${json.items[i].id}`;
        let jumpEntry = document.createElement("li");
        jumpEntry.classList.add("jumpEntry");
        jumpEntry.appendChild(kaoani.cloneNode(true));
        let jumpText = document.createElement("span");
        jumpText.innerHTML = `${json.items[i].title}<br>${dateShort}`;
        jumpEntry.appendChild(jumpText);
        jumpLink.appendChild(jumpEntry);
        jumpTo.appendChild(jumpLink);
    }
});