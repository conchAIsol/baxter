function generateNumber(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled)
}

let vertSpacing = 100;
let spriteMap = [0, 45, 90, 135, 180, 225];
let fullSky = window.screen.availHeight;
let aboveSky = (fullSky / 100)*50;
let background = getComputedStyle(document.body).getPropertyValue("background-image");

function spriteNumberToGenerate(sky) {
    let x = sky / vertSpacing;
    let int = Math.round(x) + 16;
    return(int);
};

function generateClouds(skyType){
    for(i=0; i < spriteNumberToGenerate(skyType); i++){
    let newDiv = document.createElement("div");
    newDiv.classList.add("cloud");
    newDiv.style.background = `url(./images/misc/floatingsprites.png) -${spriteMap[Math.floor(Math.random() * spriteMap.length)]}px 0`
    newDiv.style.top = `${vertSpacing * (i + 1)}px`;
    newDiv.style.visibility = 'visible'
    newDiv.style.zIndex = '-1'
    newDiv.style.scale = '4'
    newDiv.style.animationDelay = `${generateNumber(-500, 1)}s`;
    document.getElementById("cloudHolder").appendChild(newDiv)
    }
};

if (background == "linear-gradient(rgb(107, 97, 255), rgb(102, 161, 255), rgb(142, 205, 230), rgb(240, 239, 244), rgb(211, 227, 7), rgb(158, 93, 61))"){
    generateClouds(aboveSky);
} else {generateClouds(fullSky)};