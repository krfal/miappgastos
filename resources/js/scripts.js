const formulario = document.getElementById("transactionForm")
formulario.addEventListener("submit", function (event) {
    event.preventDefault();
    let transactionFormData = new FormData(formulario)
    let transactionObj = convertFormDataToObject(transactionFormData)
    saveTransactionObject(transactionObj)
    insertRowInTransactionFormData(transactionObj)
    formulario.reset()
})

document.addEventListener('DOMContentLoaded', function (event) {//dom: document object model
    drawCategory();
    let myTransactionArray = JSON.parse(localStorage.getItem('transactionData')) || [];
    myTransactionArray.forEach(elemento => insertRowInTransactionFormData(elemento))
})

function drawCategory() {
    let categoryName = [
        "Comida", "Nafta", "Joda", "Sueldo"
    ]
    for (let i = 0; i < categoryName.length; i++) {
        insertCategory(categoryName[i])
    }
}

function insertCategory(categoryName) {
    const category = document.getElementById('transactionCategory')
    let htmlToInsert = `<option>${categoryName}</option>`
    category.insertAdjacentHTML("beforeend", htmlToInsert);
}


function getTransactionId() {
    let lastTransactionId = localStorage.getItem('transactionId') || 1;
    let newTransactionId = JSON.parse(lastTransactionId) + 1
    localStorage.setItem('transactionId', JSON.stringify(newTransactionId))
    return newTransactionId
}


function convertFormDataToObject(transactionFormData) {
    let transactionType = transactionFormData.get('transactionType')
    let transactionDescription = transactionFormData.get('transactionDescription')
    let transactionMonto = transactionFormData.get('transactionMonto')
    let transactionCategory = transactionFormData.get('transactionCategory')
    let transationId = getTransactionId()
    let myObj = {
        'transactionId': transationId,
        'transactionType': transactionType,
        'transactionDescription': transactionDescription,
        'transactionMonto': transactionMonto,
        'transactionCategory': transactionCategory,
    }
    return myObj
}

function saveTransactionObject(transactionObj) {
    let myTransacionArray = JSON.parse(localStorage.getItem('transactionData')) || [];
    myTransacionArray.push(transactionObj)
    //Convierto mi array de transacciones a json
    let transactionArrayJSON = JSON.stringify(myTransacionArray);
    //Guardo mi array de transacciones en json en el local storage
    localStorage.setItem("transactionData", transactionArrayJSON);
}

function deleteTransactionObject(transactionId) {
    //cargo todas las transacciones en un arreglo get item lo trae en string json y parse lo parsea a array
    let myTransacionArray = JSON.parse(localStorage.getItem('transactionData')) || [];
    //obtengo el indice a borrar desde el transId
    let transactionIndexToDelete = myTransacionArray.findIndex(Element => Element['transactionId'] == transactionId)
    //saco del arreglo completo el elemento con ese indice
    myTransacionArray.splice(transactionIndexToDelete, 1)
    //convierto nuevamente de array a formato json
    let transactionArrayJSON = JSON.stringify(myTransacionArray)
    //guardo mi string json en el localstorage
    localStorage.setItem('transactionData', transactionArrayJSON)
    alert('borrado')
}

function insertRowInTransactionFormData(transactionObj) {
    let transactionTableRef = document.getElementById('transactionTable')
    let newTransactionRowRef = transactionTableRef.insertRow(-1)
    transactionTableRef.setAttribute('data-transaction-id', transactionObj['transactionId'])
    newTypeCellRef = newTransactionRowRef.insertCell(0)
    newTypeCellRef.textContent = transactionObj['transactionType']
    newDescriptionCellRef = newTransactionRowRef.insertCell(1)
    newDescriptionCellRef.textContent = transactionObj['transactionDescription']
    newMontoCellRef = newTransactionRowRef.insertCell(2)
    newMontoCellRef.textContent = transactionObj['transactionMonto']
    newCategoryCellRef = newTransactionRowRef.insertCell(3)
    newCategoryCellRef.textContent = transactionObj['transactionCategory']

    let newDeleteCellRef = newTransactionRowRef.insertCell(4)
    let deleteButton = document.createElement('Button')
    deleteButton.textContent = 'Borrar'
    newDeleteCellRef.appendChild(deleteButton)

    deleteButton.addEventListener('click', (event) => {
        console.log(event.target.parentNode.parentNode.remove())
        deleteTransactionObject(transactionObj['transactionId'])
    })
}