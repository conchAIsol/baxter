var windowId = 0;
let desktop = document.getElementById("desktop");
const fragment = document.createDocumentFragment();
function loadFolders(iconLabel, location) {
  fetch("/resources.json")
    .then((response) => response.json())
    .then((json) => {
      let iconLocation = json[iconLabel];
      let folders = Object.keys(iconLocation);

      for (i = 0; i < folders.length; i++) {
        let folderLabel = folders[i];
        let newDiv = document.createElement("div");
        newDiv.classList.add("folder");
        let src = "/images/misc/folder3d.png";
        newDiv.innerHTML = `<img class=\"folder\" src=${src}> ${folderLabel}`;
        newDiv.addEventListener("click", function () {
          let items = json[iconLabel][folderLabel];
          createWindow("folder", items, `${iconLabel}>${folderLabel}`);
        });
        location.appendChild(newDiv);
      }
    });
}
function loadItems(items, location) {
  let itemIcon = items[0]["type"];
  console.log(itemIcon);
  for (i = 1; i < items.length; i++) {
    let item = document.createElement("div");
    item.classList.add("folderItem");
    item.innerHTML = `<div><img src="/images/icons/${itemIcon}.png"><a href ="${items[i]["link"]}">${items[i]["name"]}</a></div><span>${items[i]["description"]}</span>`;
    location.appendChild(item);
  }
}
function createWindow(clickedElement, JSONmap, headerText) {
  let newWindow = document.createElement("div");
  newWindow.classList.add("window", "draggable", "popup");
  newWindow.setAttribute("id", windowId);
  newWindow.style.zIndex = draggables.length;

  let header = document.createElement("div");
  header.classList.add("windowHeader");
  let headerTextContainer = document.createElement("div");
  headerTextContainer.innerText = headerText;

  let close = document.createElement("span");
  close.classList.add("close", "closeButton", "material-icons-round", "md-36");
  close.innerText = "close";

  let windowContent = document.createElement("div");
  windowContent.classList.add(clickedElement + "WindowContent");

  header.appendChild(headerTextContainer);
  header.appendChild(close);
  newWindow.appendChild(header);
  newWindow.appendChild(windowContent);
  if (clickedElement == "icon") {
    loadFolders(JSONmap, windowContent);
  } else if (clickedElement == "folder") {
    loadItems(JSONmap, windowContent);
  }
  fragment.appendChild(newWindow);
  windowId++;
}
function openWindow() {
  desktop.appendChild(fragment);
}

document.addEventListener("click", function (e) {
  var el = e.target;
  if (el.matches(".closeButton")) {

    e.target.closest(".window").classList.replace("popup", "falldown");
    setTimeout(() => {
      closeElement(e, ".window", "remove");  
    }, 300);
    

  } else if (el.matches(".icon")) {
    let iconLabel = el.parentElement.innerText;
    createWindow("icon", iconLabel, `desktop>${iconLabel}`);
    openWindow();
    for (var i = 0; i < draggables.length; i++) {
      dragElement(draggables[i]);
    }
  } else if (el.matches(".folder")) {
    openWindow();
    for (var i = 0; i < draggables.length; i++) {
      dragElement(draggables[i]);
    }
  }
});
