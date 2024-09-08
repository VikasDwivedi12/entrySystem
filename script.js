function showEntries(){
    //Function to show the enteries present in the local storage.
    const container = document.querySelector('.container');
    let localData = JSON.parse(localStorage.getItem("EntryData")) || [];
    container.innerHTML = '';

    for(let i = 0; i < localData.length; i++){
        const entryElem = document.createElement("div");
        entryElem.className = "entryElem";
        entryElem.innerHTML = `
        <p>${localData[i].date}</p><p>${localData[i].service}</p><p>${localData[i].supplier}</p>${localData[i].qty}<p></p>`;
        container.appendChild(entryElem);
    }
}

function promptInput(promptString){
    //Function to prompt for the input by the user.
    while(1){
        let userInput = prompt(`${promptString} : `);
        if(userInput !== ''){
            return userInput;
        }
        else{
            alert("Input cannot be null.");
        }
    }
}

function checkAttribute(supplier, service){
    //Function to check whether an attribute is in the value or not.
    let localData = JSON.parse(localStorage.getItem("SupplierList")) || [];
    let found = 0;

    for(let i = 0; i < localData.length; i++){
        if((localData[i].sName === supplier) && (localData[i].service === service)){
            found = 1;
            break;
        }
    }

    return found;
}

function promptDate(){
    //Function to prompt for the date.
    while(1){
        let dateInput = prompt("Enter the date input (YYYY-MM-DD)");
        //check if the input matches with dd:mm:yyyy format.
        if(/^\d{4}-\d{2}-\d{2}$/.test(dateInput)){
            //convert the string to the date object
            let dateObject = new Date(dateInput);

            //check if the date is valid
            if(!isNaN(dateObject.getTime())){
                return dateInput;
            }
            else{
                alert("Invalid date! Please enter a valid date.");
            }
        }
        else{
            alert("Invalid format");
        }
    }
}

function promptInt(promptString, errorString){
    //Function to prompt for the integers
    while(true){
        let intInput = prompt(promptString);
        intInput = parseInt(intInput)

        if(!isNaN(intInput)){
            return intInput;
        }
        else{
            alert(errorString);
        }
    }
}

function addEntry(){
    //Function to add the entry to the local storage.
    let localData = JSON.parse(localStorage.getItem("EntryData")) || [];
    console.log("local storage fetched");
    
    let date = promptDate();
    let qty = promptInt("Enter the quantity", "Please enter a valid quantity");
    let service = promptInput("Enter the good/service : ");
    let supplierName = promptInput("Enter the supplier Name : ");

    let found = checkAttribute(supplierName, service);
    let errorElement = document.querySelector('#errorElement');

    if(found === 1){
        let newObj = {date: date, qty: qty, service: service, supplier: supplierName};
        localData.push(newObj);

        localStorage.setItem("EntryData", JSON.stringify(localData));
        errorElement.innerHTML = '';
    }
    else{
        errorElement.innerHTML = `'${service}' not found, please update the supplier list.`;
    }
}

function createEntryList(){
    //Function to create the entry list.
    let localData = JSON.parse(localStorage.getItem("EntryData")) || [];

    let newObj = {date: "02-04-2004", qty: "24", service: "Iron"};
    localData.push(newObj);
    localStorage.setItem("EntryData", JSON.stringify(localData));
}

function deleteEntryfromLocalStorage(){
    //Function to delete the data from local storage.
    let localData = JSON.parse(localStorage.getItem("EntryData")) || [];

    let delDate = promptDate();
    let delService = promptInput("Enter the good/service : ");
    let index = -1;

    for(let i = 0; i < localData.length; i++){
        if((localData[i].date === delDate) && (localData[i].service === delService)){
            index = i;
            localData.splice(index, 1);
            break;
        }
    }

    if(index === -1){
        alert("No such entry found.");
    }
    
    localStorage.setItem("EntryData", JSON.stringify(localData));
}

function clearDataFromLocalStorage(){
    //Function to clear the data from the local storage.
    let localData = JSON.parse(localStorage.getItem("EntryData")) || [];
    localData = [];
    localStorage.setItem("EntryData", JSON.stringify(localData));
}

const addBtn = document.querySelector("#addBtn");
const delBtn = document.querySelector("#delBtn");
const clrBtn = document.querySelector("#clrBtn");

showEntries();

addBtn.addEventListener('click', function(){
    addEntry();
    showEntries();
})

delBtn.addEventListener('click', function(){
    deleteEntryfromLocalStorage();
    showEntries();
})

clrBtn.addEventListener('click', function(){
    clearDataFromLocalStorage();
    showEntries();
})