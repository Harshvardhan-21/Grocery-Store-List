
let items = JSON.parse(localStorage.getItem("grocery")) || [];

let tempItems = [];


function displayItems() {

    let list = document.getElementById("itemList");

    if(tempItems.length === 0){
        list.innerHTML = "";
        return;
    }

    list.innerHTML = "";

    tempItems.forEach((item, index) => {

        list.innerHTML += `
        <li class="list-group-item d-flex justify-content-between align-items-center">

            <div>
                <strong>${item.name}</strong><br>
                📅 ${item.date} | 🔢 Qty: ${item.quantity}
            </div>

            <div>
                <button class="btn btn-warning btn-sm"
                onclick="editItem(${index})">Edit</button>

                <button class="btn btn-danger btn-sm"
                onclick="deleteItem(${index})">Delete</button>
            </div>

        </li>`;
    });
}


// ================= ADD =================
function addItem(){

    let name = document.getElementById("itemInput").value.trim();
    let date = document.getElementById("itemDate").value;
    let quantity = document.getElementById("itemQuantity").value;

    if(name==="" || date==="" || quantity===""){
        alert("Fill all fields");
        return;
    }

    let newItem = { name, date, quantity };

    // NEW ITEM TOP PE
    tempItems.unshift(newItem);

    displayItems();

    // clear inputs
    document.getElementById("itemInput").value="";
    document.getElementById("itemDate").value="";
    document.getElementById("itemQuantity").value="";
}



function deleteItem(index){
    tempItems.splice(index,1);
    displayItems();
}

function editItem(index){

    let item = tempItems[index];

    let newName = prompt("Edit Name", item.name);
    let newDate = prompt("Edit Date", item.date);
    let newQty = prompt("Edit Quantity", item.quantity);

    if(newName && newDate && newQty){

        tempItems.splice(index,1);

        // edited item top
        tempItems.unshift({
            name:newName,
            date:newDate,
            quantity:newQty
        });

        displayItems();
    }
}


function saveList(){

    localStorage.setItem("grocery", JSON.stringify(tempItems));

    alert("Saved Successfully.....");
}