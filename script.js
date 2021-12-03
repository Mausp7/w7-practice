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

const inputElement = (type, name, label, placeholder="", required="") => {
    if (type === "checkbox") {
        return `
            <div class="${type}">
                <input type="${type}" name="${name}" id="${name}" >
                <label for="${name}"">${label}</label>
            </div>
        `;
    } else {
        return `
            <div class="${type}">
                <label>${label}:</label>
                <input type="${type}" name="${name}" placeholder="${placeholder}" ${required}>
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

const nameData = {
    type: 'text',
    name: 'firstName',
    label: 'Keresztneved'
}

const anotherFormFields = [
    {
        type: 'text',
        name: 'street',
        label: 'Közterület neve'
    },
    {
        type: 'number',
        name: 'houseNumber',
        label: 'Házszám',
    },
    {
        type:"number",
        name: "zipCode",
        label: "Irányítószám"
    },
    {
        type:"text",
        name: "city",
        label: "Település neve"
    },
]

const formFields = [
    {
        type: 'text',
        name: 'firstName',
        label: 'Keresztneved'
    },
    {
        type: 'email',
        name: 'personalEmail',
        label: 'Emailcímed',
        placeholder: "valami@host.hu",
        required: "required"
    },
    {
        type:"checkbox",
        name: "newsLetter",
        label: "Hírlevelet szeretnél kapni!"
    },
    {
        type:"checkbox",
        name: "terms",
        label: "Elfogadom a felhasználási feltételeket!"
    },
    {
        type:"file",
        name: "profilePicture",
        label: "Profilképed"
    }
]

/* const formElement = `
    <form id="form">
        <h3>Jelentkezz ünnepi hírlevelünkre!</h3>
        ${inputElement(nameData.type, nameData.name, nameData.label)}
        ${inputElement("email", "personalEmail", "Emailcímed", "valami@host.hu", "required")}
        ${inputElement("checkbox", "newsLetter", "Hírlevelet szeretnél kapni!")}
        ${inputElement("checkbox", "terms", "Elfogadom a felhasználási feltételeket!")}
        ${inputElement("file", "profilePicture", "Profilképed")}
        
        ${selectElement("select", "where", "Hol hallottál rólunk", ["Interneten", "Ismerőstől", "Egyéb"])}
        <button>Ok</button>
    </form>
`;
 */

const selectFields = {
    type: "select",
    name: "where", 
    label: "Hol hallottál rólunk", 
    options: [
        "Interneten", 
        "Ismerőstől", 
        "Egyéb"
    ]
};

const processCountries = async () => {
    const countryRes = await fetch("https://restcountries.com/v3.1/all");
    const countryArr = await countryRes.json();
    const countryNames = [];

    for (const country of countryArr) {
        countryNames.push(country.name.common);
    };

    return countryNames.sort();
}

const anotherSelectFields = async () => {
    return {
        type: "select",
        name: "countries", 
        label: "Ország", 
        //options: ["Spanyolország", "Ausztria"],
        options: await processCountries(),
    };
};



const formElement = (ffs, id, sel) => {
    let inputs = ``;

    for (const ff of ffs) {
        inputs += inputElement(ff.type, ff.name, ff.label, ff.placeholder, ff.required);
    };

    return `
    <form id="${id}">
        <h3>Jelentkezz ünnepi hírlevelünkre!</h3>
        ${inputs}
        ${selectElement(sel.type, sel.name, sel.label, sel.options)}
        <button>Ok</button>
    `;
};

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

    if (event.target.getAttribute("name") === "profilePicture") {
        console.log(event.target.files[0]);
        const image = URL.createObjectURL(event.target.files[0]);
            // FileReader.readAsDataURL() is jó


        document.getElementById("inputValue").insertAdjacentHTML("beforeend", `
        <img src="${image}">
        `);
    };


    console.log(event.target.closest(`#form`));
}


async function loadEvent() {
    console.log("Loaded");
    
    const rootElement = document.getElementById("root");
    const waitForAnotherSelectFields = await anotherSelectFields();
    rootElement.insertAdjacentHTML("beforeend", formElement(formFields, "form", selectFields));
    rootElement.insertAdjacentHTML("beforeend", formElement(anotherFormFields, "form2", waitForAnotherSelectFields));
    
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