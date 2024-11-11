function generateNumber(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled)
}

const bars = document.getElementsByClassName("bar");
Array.from(bars).forEach((element) =>{
    let startEnd = `${generateNumber(30,90)}%`;
    element.animate([
        {height: startEnd},
        {height: `${generateNumber(30,90)}%`},
        {height: `${generateNumber(30,90)}%`},
        {height: `${generateNumber(30,90)}%`},
        {height: startEnd},
    ]
    ,{
        duration: 500,
        iterations: Infinity
    });
});
