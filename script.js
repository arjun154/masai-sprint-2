var btn = document.getElementById("billGenerate")
var table = document.getElementById("table")
var bnt = document.getElementById("bnt")
var choosenItem
var choosenQuant
var tip = 0
var values = []
var cnt = 0
var sum = 0
var table1

// menu with price list
var menu ={
    Dosa : 80,
    Samosa : 20,
    Daal : 70,
    Cheela : 40,
    Chole : 80,
    Malai_Kofta : 30,
    Palak_Paneer : 100
}

// table headings
var heads = ["Sl. No.", "Item", "Unit Price", "Qty", "Net Amount", "Tax Rate %", "Tax Amount", "Tip", "discount", "Total Amount"]

// store the value of selected options
function storeValue(){
    cnt = cnt + 1
    choosenItem = document.getElementById("item").value
    choosenQuant = document.getElementById("quant").value
    tip = document.getElementById("tip").value
    document.getElementById("container").style.display = "none";
    document.getElementById("billButton").style.display = "none"; 
    calculateBill(choosenItem, choosenQuant, tip)         
}

// function to calculate the bill
function calculateBill(item, quant, tip){
    var unitprice, netamount, taxrate = 5, taxamount, totalPrice, discount = 0
    var date = new Date()
    var today = date.getDay()
    for(key in menu){
        if (key === item){
            unitprice = menu[key]
            break  
        }
    }
    netamount = unitprice * quant
    taxamount = netamount * 0.05 
    if(today === 3  && netamount > 150){
        discount = 70
    }    
    totalPrice = netamount + taxamount - discount + Number(tip)
    values.push(cnt, item, unitprice, quant, netamount, taxrate, taxamount, Number(tip), discount, totalPrice)
    if(cnt===1){
        createTable()
    }
    addItemIntoTable()
}

// create table heads
function createTable(){    
    table1 = document.createElement('table')
    table1.setAttribute("id", "table1")
    var head = document.createElement("thead")
    var row = document.createElement('tr')
    for(var i=0; i<heads.length; i++){
        var cell = document.createElement("td")
        cell.textContent = heads[i]
        cell.style.padding = "8px"
        row.appendChild(cell)
    }
    head.appendChild(row)
    table1.appendChild(head)
    div.appendChild(table1)
    table1.setAttribute("border", "2")
    div.style.marginLeft = "17%"
}

// Add items into the table and display bill
function addItemIntoTable(){
    var row = document.createElement("tr")
    for(var i=0; i<values.length; i++){
        var cell = document.createElement("td")
        cell.textContent = values[i]
        cell.style.padding = "5px"
        row.appendChild(cell)
    }
    table1.appendChild(row)
    div.appendChild(table1)
    sum = sum + values[values.length-1]
    values = []
    addLastRow()
}

// Add last row with total amount
function addLastRow(){
    if(cnt>1){
        deleterow("table1")
    }else if(cnt>0){
        AddMoreItem() 
    }
    var row = document.createElement("tr")
    row.setAttribute("id", "totalRow")
    var cell = document.createElement("td")
    cell.textContent = "ToTal"
    row.appendChild(cell)
    var cell = document.createElement("td")
    cell.setAttribute("colspan", "8")
    row.appendChild(cell)
    var cell = document.createElement("td")
    cell.textContent = Math.floor(sum)
    row.appendChild(cell)
    table1.appendChild(row)
    div.appendChild(table1)
    table1.style.borderCollapse = "collapse"       
}

// Delete last row from the table
function deleterow(tableID) {
    var table = document.getElementById(tableID);
    var rowCount = table.rows.length;
    table.deleteRow(rowCount-2);
}

// show the button of addMoreItem 
function AddMoreItem(){
    var button = document.createElement("button")
    button.textContent = "Add More Item"
    bnt.append(button)
    button.style.padding= "10px"
    button.style.fontFamily = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif"
    button.style.backgroundColor = "Brown"
    button.style.borderRadius = "10px"
    button.addEventListener("click",showAddItem)
}

// Show item list    
function showAddItem(){
    document.getElementById("container").style.display = "block";
    document.getElementById("billButton").style.display = "block";
}

btn.addEventListener("click", storeValue)
