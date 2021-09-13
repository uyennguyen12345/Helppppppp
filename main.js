"use strict";
/**
 * edit function
 * Runs when the edit button of an item is clicked.
 * Sends the user to the edit page after storing the information necessary
 * @param {number} category category index in inventory
 * @param {number} item item index in inventory
 */ 

// Function
function edit(category,item)
{
    // store data in LS
    localStorage.setItem(CATEGORY_KEY,category);
    localStorage.setItem(ITEM_KEY,item);
    // redirect to edit page
    window.location = "edit.html";
}
/**
 * addClothingCategory function
 * Runs when 'Add Category' is clicked on the header nav bar.
 * Creates a new category, saves it in LS and updates the display
 */
function addClothingCategory()
{
    // Get category name
    let newCategory = prompt("Name of new category?");
    // if user clicks cancel
    if(newCategory == null)
    {
        return;
    }
    // Try again if empty input
    while (newCategory == "")
    {
        alert("That input is invalid");
        newCategory = prompt("Name of new category?");
    }
    // Confirm add category
    if(confirm(`Confirm to add ${newCategory} as a category?`))
    {
        // add to inventory
        inventory.addCategory(newCategory);
        // update LS
        updateLSData(WAREHOUSE_KEY, inventory);
        // update display
        displayInventory(inventory);
    }
}
/**
 * cancelAddClothingItem function
 * Runs when the cancel button is clicked inside the dialog polyfill.
 * Closes the dialog box.
 */
function cancelAddClothingItem()
{
    // close dialog box
    dialog.close();
}

function addClothingItem()
{
    // TODO: Task 2
    
    // Reset the dialog box
    document.getElementById("newItemName").innerHTML = "";
    document.getElementById("newItemStock").innerHTML = "";
    document.getElementById("newItemPrice").innerHTML = "";
    // Get the value from the HTML file 
    let nameRef = document.getElementById("newItemName");
    let stockRef = document.getElementById("newItemStock");
    let priceRef = document.getElementById("newItemPrice");
    let categoryRef = document.getElementById("newItemCategory");
    let newItemName = nameRef.value;
    let newItemStock = stockRef.value;
    let newItemPrice = priceRef.value;
    let categoryIndex = categoryRef.value;
    let item = new ClothingItem(newItemName,newItemStock,newItemPrice);
    // Add item to the inventory
    Inventory.prototype.addItem(item,categoryIndex)
    // Dialog open
    dialog.showModal()
    
}

function displayInventory(inventory)
{
    // TODO: Task 3
    let itemOutput = "";
    let stockOutput;
    let priceOutput;
    inventory = confirmAddClothingItem();
    for (let i =1; i < inventory.length; i++) 
    {
        let item = inventory[i];
        if (typeof item == "object")
        itemOutput += `${inventory[i]._name}\n`; 
        stockOutput += `${inventory[i]._stock}\n`;
        priceOutput += `${inventory[i]._price}\n`;
    }
    document.getElementById("newItemName").innerHTML = itemOutput;
    document.getElementById("newItemStock").innerHTML = stockOutput;
    document.getElementById("newItemPrice").innerHTML = pirceOutput;
}

function confirmAddClothingItem()
{    
    // TODO: Task 4
    addClothingItem();
    if (newItemName == "")
    {
        alert("Name has to be specified");
      return;
    }
    if (newItemPrice == null)
    {
        alert("Item price must be entered");
         return;
    }
    if (newItemStock == null)
    {
        alert("Item stock must be entered");
      return;
    }
    if (categoryIndex == 0)
    {
        alert("Category is not specified");
      return;
    }
    // Add item to the inventory
    Inventory.prototype.addItem(item,categoryIndex)
    dialog.close();
    displayInventory(inventory)
}

// Global code
// Registers the dialog box polyfill
let dialog = document.getElementById("addDialog");
if (!dialog.showModal) 
{
    dialogPolyfill.registerDialog(dialog);
}
// Displays the warehouse inventory when the page loads
displayInventory(inventory);