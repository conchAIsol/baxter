//MAKES TEXT RAINBOW//
function generateRainbowText(element) {
    var text = element.innerText;
    element.innerHTML = "";
    for (let i = 0; i < text.length; i++) {
        let charElem = document.createElement("span");
        charElem.style.color = "hsl(" + (360 * i / text.length) + ",80%,65%)";
        charElem.innerHTML = text[i];
        element.appendChild(charElem);
    }
}

//APPLY SQUISH ANIMATION ON HOVER TO ALL ELEMENTS WITH THE 'SQUISH' CLASS
function squishOnHover(element){
    element.addEventListener("mouseover", function(){
        element.classList.add("squish");
    });
    element.addEventListener("mouseout", function(){
        element.classList.remove("squish");
    });
} 

//MAKES CLOSE BUTTONS WORK, ELEMENT NEEDS TO BE DEFINED IN PAGE
function closeElement(e, element, removeOnClose) {
    let elementToClose = e.target.closest(element);
    if (removeOnClose === "remove"){
        elementToClose.remove();
    } else {
        elementToClose.style.display = "none"
    }; 
};

//MAKES ELEMENTS WITH 'DRAGGABLE' CLASS DRAGGABLE
var draggables = document.getElementsByClassName("draggable");
function dragElement(elmnt) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    if (document.getElementById(elmnt.id + "header")) {
        document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
    } else {
        elmnt.onmousedown = dragMouseDown;
    }
    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        let draggedElem = e.target.closest(".draggable");
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;
        draggedElem.style.zIndex = draggables.length;
        draggedElem.style.opacity = "1";
        var z = 1;
        for (i = 0; i < draggables.length; i++){
            if (draggables[i].id != draggedElem.id){
                draggables[i].style.zIndex = z++;
                draggables[i].style.opacity = 0.7;
            };
        };
    }
    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
        elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }
    function closeDragElement() {
        document.onmouseup = null;
        document.onmousemove = null;
    }
}

window.addEventListener("load", function() {
    var elements = document.getElementsByClassName("rainbowText");
    for (let i = 0; i < elements.length; i++) {
        generateRainbowText(elements[i]);
    };

    
});
