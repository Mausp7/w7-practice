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

const inputElement = (type, name, label, placeholder="") => {
    if (type === "checkbox") {
        return `
            <div>
                <input type="${type}" name="${name}" id="${name}">
                <label for="${name}"">${label}</label>
            </div>
        `;
    } else {
        return `
            <div>
                <label>${label}:</label>
                <input type="${type}" name="${name}" placeholder="${placeholder}">
            </div>
        `;        
    };    
};

const selectElement = (type, name, label, options) => {
    let optionsToSelect = ``
    for (const o of options) {
        optionsToSelect += `<option>${o}</option>`
    }
    return `
        <div>
            <label>${label}:</label>
            <${type} name="${name}">
                ${optionsToSelect}
            <${type}>
        </div>
    `;
};

const formElement = `
    <form id="form">
        <h3>Jelentkezz ünnepi hírlevelünkre!</h3>
        ${inputElement("text", "firstName", "Keresztneved")}
        ${inputElement("email", "personalEmail", "Emailcímed", "valami@host.hu")}
        ${selectElement("select", "where", "Hol hallottál rólunk", ["Interneten", "Ismerőstől", "Egyéb"])}
        ${inputElement("checkbox", "newsLetter", "Hírlevelet szeretnél kapni!")}
        ${inputElement("checkbox", "terms", "Elfogadom a felhasználási feltételeket!")}
        
        ${inputElement("file", "profilePicture", "Profilképed")}
        <button>Ok</button>
    </form>
`;

const formSubmit = (event) => {
    event.preventDefault();
    const et = event.target;
    console.log(et);
    et.classList.add("submitted");

    let selectValue = et.querySelector(`select[name="where"]`).value; 
    console.log(selectValue);
}

const inputUpdate = (event) => {
    const inputValue = document.getElementById("inputValue");
    
    if (event.target.getAttribute("name") === "firstName") {
        inputValue.innerHTML = `Üdv ${event.target.value}!`;
    };

    console.log(event.target.closest(`#form`));
}


function loadEvent() {
    console.log("Loaded");
    
    const rootElement = document.getElementById("root");
    rootElement.insertAdjacentHTML("beforeend", formElement);
    
    rootElement.querySelector("h3").insertAdjacentHTML("beforebegin", `
        <h2 id="inputValue">Üdv!</h2>
    `);

    const form = document.getElementById("form");
    form.addEventListener("submit", formSubmit);

    const inputList =form.querySelectorAll("input");
    for (const input of inputList) {
        input.addEventListener("input", inputUpdate);
    };

}

window.addEventListener("load", loadEvent);