import {generateNumber, generateBorder, generateTransform, wobble, float} from './wobbleAnimation.js';
const navLinks = ['about', 'journal', 'fun', 'contact', 'links'];

let navbar = document.getElementById("navbar");
const fragment = document.createDocumentFragment();
function updateNavigation() {
    let i = 0;
    for (i=0; i<navLinks.length; i++){          
        const li = document.createElement("li");
        li.classList.add("cloudBubble");
        const newDiv = document.createElement("div");
        newDiv.classList.add("navBubble");
        const a = document.createElement("a");
        a.setAttribute('href',`/${navLinks[i]}.html`);
        a.textContent = `${navLinks[i]}`;
        li.appendChild(newDiv);
        li.appendChild(a);
        fragment.appendChild(li);
    }
}

updateNavigation();
navbar.appendChild(fragment);

function highlightImageHover(hoverElement, imageId) {
    hoverElement.addEventListener("mouseover", function(){
        document.getElementById(imageId).classList.add("itemHover");
    });
    hoverElement.addEventListener("mouseout", function(){
        document.getElementById(imageId).classList.remove("itemHover");
    });
}
function squishOnHover(element, hoverElement){
    hoverElement.addEventListener("mouseover", function(){
        element.classList.add("squish");
        hoverElement.classList.add("squish");
    });
    hoverElement.addEventListener("mouseout", function(){
        element.classList.remove("squish");
        hoverElement.classList.remove("squish");
    });
}
function styleNavigation() {
    const navBubbles = document.getElementsByClassName("navBubble");
    Array.from(navBubbles).forEach((element => {
        wobble(element, 60, 100, 8000);
        let hoverElement = element.parentNode.childNodes[1];
        let link = hoverElement.textContent;
        squishOnHover(element, hoverElement);
        if (window.location.href.includes("/home.html")){
            highlightImageHover(hoverElement, link);
        };
    }))
}
styleNavigation();