function setSupplierList(){
    //Function to initially set the data to local storage.
    let localDataObj = [
        {
            sNo: 1,
            sName: "Ransom",
            service: "CO2"
        },
        {
            sNo: 2,
            sName: "Shivom",
            service: "O2"
        },
        {
            sNo: 3,
            sName: "JBM",
            service: "Plastic"
        },
        {
            sNo: 4,
            sName: "Apex",
            service: "Iron"
        },
    ]

    localStorage.setItem("SupplierList", JSON.stringify(localDataObj));
}

function showList(){
    //Function to show the supplier list.
    const listContainer = document.querySelector(".list-container");
    listContainer.innerHTML = '';

    let localData = JSON.parse(localStorage.getItem("SupplierList")) || [];

    for(let i = 0; i < localData.length; i++){
        const entryElem = document.createElement('div');
        entryElem.className = 'entryElem';

        entryElem.innerHTML = `
        <p>${localData[i].sNo}</p>
        <p>${localData[i].sName}</p>
        <p>${localData[i].service}</p>
        `;

        listContainer.appendChild(entryElem);
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

function addDataToLocalStorage(){
    //Function to add the data to the local storage.
    let localData = JSON.parse(localStorage.getItem("SupplierList")) || [];

    let newObject = {
        sNo: (localData.length + 1),
        sName: promptInput("Enter the supplier name"),
        service: promptInput("Enter the goods/service")
    }

    localData.push(newObject);
    localStorage.setItem("SupplierList", JSON.stringify(localData));
}

function deleteDataFromLocalStorage(){
    //Function to delete the data from the local storage.
    let localData = JSON.parse(localStorage.getItem("SupplierList")) || [];
    let targetSupplier = promptInput("Enter the supplier name : ");
    let targetProduct = promptInput("Enter the good/service : ");

    let index;
    for(let i = 0; i < localData.length; i++){
        if((localData[i].sName === targetSupplier) && (localData[i].service === targetProduct)){
            index = i;
            break;
        }
    }

    if(index !== -1){
        localData.splice(index, 1);
    }

    localStorage.setItem("SupplierList", JSON.stringify(localData));
}

function clearLocalStorage(){
    //Function to clear the local storage.
    let localData = JSON.parse(localStorage.getItem("SupplierList")) || [];
    localData = [];
    localStorage.setItem("SupplierList", JSON.stringify(localData));
}

function setSequence(){
    //Function to set the sequence of the data.
    let localData = JSON.parse(localStorage.getItem("SupplierList")) || [];
    for(let i = 0; i < localData.length; i++){
        localData[i].sNo = i+1;
    }
    localStorage.setItem("SupplierList", JSON.stringify(localData));
}

setSequence();
showList();

const addBtn = document.querySelector("#addBtn");
const delBtn = document.querySelector("#delBtn");
const edtBtn = document.querySelector("#edtBtn");

//Adding functionalities to all the buttons
addBtn.addEventListener('click', function(){
    addDataToLocalStorage();
    setSequence();
    showList();
})

delBtn.addEventListener('click', function(){
    deleteDataFromLocalStorage();
    setSequence();
    showList();
})

edtBtn.addEventListener('click', function(){
    clearLocalStorage();
    setSequence();
    showList();
})