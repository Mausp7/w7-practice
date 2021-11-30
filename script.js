/*
function functionName(param) {
    param === "Argument";
};
functionName("Argument");

const argument = "Argument saved in a variable."
const functionName = function (param) {
    param = "Argument saved in a variable."
};
functionName(argument);


const functionName = (param1, param2) => {param1 === 1; param2 === 2;};
functionName(1. 2);

 */

const inputElement = (type, name, label) => {
    return `
        <div>
            <label>${label}:</label>
            <input type="${type}" name="${name}">
        </div>
    `;
};

const formElement = `
    <form id="form">
        ${inputElement("text", "firstName", "Keresztneved")}
        ${inputElement("file", "profilePicture", "Profilképed")}
        ${inputElement("email", "personalEmail", "Emailcímed")}
        ${inputElement("radio", "newsLetter", "Hírlevelet szeretnél kapni")}
        ${inputElement("checkbox", "terms", "Elfogadom a felhasználási feltételeket")}
        <button>Ok</button>
    </form>
`;

const formSubmit = (event) => {
    event.preventDefault();
    console.log(event.target);
    event.target.classList.add("submitted");
}

const inputUpdate = (event) => {
    const inputValue = document.getElementById("inputValue");
    
    if (inputValue.type === event.target.type) {
        inputValue.innerHTML = event.target.value;
        
    } else if (inputValue.type === undefined) {
        inputValue.type = event.target.type;
        inputValue.innerHTML = event.target.value;
    };
}


function loadEvent() {
    console.log("Loaded");
    
    const rootElement = document.getElementById("root");
    rootElement.insertAdjacentHTML("beforeend", formElement);
    
    rootElement.insertAdjacentHTML("afterbegin", `
        <div id="inputValue"></div>
    `);

    
    const form = document.getElementById("form");
    form.addEventListener("submit", formSubmit);

    const inputList =form.querySelectorAll("input");
    for (const input of inputList) {
        input.addEventListener("input", inputUpdate);
    };

}

window.addEventListener("load", loadEvent);