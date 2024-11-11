let calendar = document.getElementById("calendar");

let date = new Date();
let year = date.getFullYear();
let month = date.getMonth();


function printMonth(month, year) {
    let formattedDate = date.toLocaleString("en-GB", {
        month: "short",
        year: "numeric",
    });
    let dateDiv = document.getElementById("printedDate");
    let monthText = document.createTextNode(`${formattedDate}`);
    dateDiv.appendChild(monthText);
    
    var elements = document.getElementsByClassName("rainbowText");
    for (let i = 0; i < elements.length; i++) {
        generateRainbowText(elements[i]);
    };
}
function clearMonth() {
    let dateDiv = document.getElementById("printedDate");
    dateDiv.innerHTML = "";
}

// function seasonalStyling() {
//     if (month === 11 || month === 0 || month === 1){
//         document.documentElement.style.setProperty("--checker1", "#ace8ff");
//         document.documentElement.style.setProperty("--checker2", "#60c8e7");
//         document.documentElement.style.setProperty("--darker", "#3e98ff");
//     }
//     else if (month === 2 || month === 3 || month === 4){
//         document.documentElement.style.setProperty("--checker1", "#e6ffa0");
//         document.documentElement.style.setProperty("--checker2", "#aeff7b");
//         document.documentElement.style.setProperty("--darker", "#38b83e");
//     }
//     else if (month === 5|| month === 6){
//         document.documentElement.style.setProperty("--checker1", "#60aaff");
//         document.documentElement.style.setProperty("--checker2", "#388bff");
//         document.documentElement.style.setProperty("--darker", "#2c5aff");
//     }
//     else if (month === 7|| month === 8){
//         document.documentElement.style.setProperty("--checker1", "#fdc8c6");
//         document.documentElement.style.setProperty("--checker2", "#f5aa9d");
//         document.documentElement.style.setProperty("--darker", "#ad1905");
//     }
//     else if (month === 9|| month === 10){
//         document.documentElement.style.setProperty("--checker1", "#ffc560");
//         document.documentElement.style.setProperty("--checker2", "#ffa046");
//         document.documentElement.style.setProperty("--darker", "#fb7d1d");
//     }
// }

function clearCalendar() {
    let rows = document.querySelectorAll(".newRow");
    rows.forEach(element => {
        element.remove();
    });
}
function generateCalendar(month, year) {
    let firstDay = new Date(year, month, 1);
    let firstDayIndex = firstDay.getDay();
    let lastDay = new Date(year, month + 1, 0);
    let numberOfDays = lastDay.getDate();

    clearCalendar();

    let date = 1;
    for(let i = 0; i < 6; i++){
        let newRow = document.createElement("tr");
        newRow.classList.add("newRow");
        for(let j = 0; j < 7; j++){
            let newCell = document.createElement("td");
            let newDiv = document.createElement("div");
            let cellText = document.createTextNode(date);
            if (i === 0 && j < firstDayIndex || date > numberOfDays){
                newCell.style.backgroundColor = "var(--overlay)";
                newCell.appendChild(newDiv);
                newRow.appendChild(newCell);
            }
            else {
                newCell.style.backgroundColor = "var(--overlay1)";
                newDiv.appendChild(cellText);
                newCell.appendChild(newDiv);
                newRow.appendChild(newCell);
                date++
            }
        }
        document.getElementById("calendar").appendChild(newRow);
    }
    printMonth(month, year);
    // seasonalStyling();
}

function prevMonth() {
    if (month === 0) {
        month = 11;
        year = year - 1;
    } else {
        month = month - 1;   
    }

    date.setMonth(month);
    date.setYear(year);

    clearMonth();
    generateCalendar(month, year);
}
function nextMonth() {
    if (month === 11) {
        month = 0;
        year = year + 1;
    } else {
        month = month + 1;   
    }

    date.setMonth(month);
    date.setYear(year);

    clearMonth();
    generateCalendar(month, year);
}

let previous = document.getElementById("previous");
let next = document.getElementById("next");

generateCalendar(month, year);
previous.addEventListener("click", prevMonth);
next.addEventListener("click", nextMonth);