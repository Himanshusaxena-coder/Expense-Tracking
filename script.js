

let expenses = [];


// =========================
// ADD EXPENSE
// =========================

function addExpense() {

    let name = document.getElementById("expenseInput").value.trim();

    let amount = Number(
        document.getElementById("amount").value
    );

    let date = document.getElementById("date").value;


    // Check input
    if (name === "") {
        alert("Please enter what you spent on.");
        return;
    }

    if (amount <= 0) {
        alert("Please enter a valid amount.");
        return;
    }


    // Add expense
    expenses.push({
        name: name,
        amount: amount,
        date: date
    });


    // Clear input
    document.getElementById("expenseInput").value = "";
    document.getElementById("amount").value = "";
    document.getElementById("date").value = "";


    // Save
    localStorage.setItem(
        "expenses",
        JSON.stringify(expenses)
    );


    // Show expenses
    displayExpenses();
}


// =========================
// DISPLAY EXPENSES
// =========================

function displayExpenses() {

    document.getElementById("list").innerHTML = "";


    expenses.forEach((expense, index) => {

        let dateText = expense.date
            ? expense.date.split("-").reverse().join("/")
            : "No Date";


        document.getElementById("list").innerHTML += `
            <li>
                ${expense.name} - ₹${expense.amount} - ${dateText}
                <button
                    class="delete-btn"
                    onclick="deleteExpense(${index})">
                    Delete
                </button>
            </li>
        `;
    });


    // Calculate total
    let total = 0;

    for (let expense of expenses) {
        total += expense.amount;
    }


    document.getElementById("Total").innerText = total;
}


// =========================
// DELETE EXPENSE
// =========================

function deleteExpense(index) {

    expenses.splice(index, 1);


    localStorage.setItem(
        "expenses",
        JSON.stringify(expenses)
    );


    displayExpenses();
}


// =========================
// CLEAR ALL EXPENSES
// =========================

function clearExpenses() {

    expenses = [];


    document.getElementById("list").innerHTML = "";

    document.getElementById("Total").innerText = "0";

    document.getElementById("Result").innerText = "";


    localStorage.removeItem("expenses");
}


// =========================
// RANGE TOTAL
// =========================

function findtotal() {

    let start = Number(
        document.getElementById("s").value
    );

    let end = Number(
        document.getElementById("r").value
    );


    // Check numbers
    if (start <= 0 || end <= 0) {
        alert("Please enter valid row numbers.");
        return;
    }


    if (start > end) {
        alert("Start row should be smaller than end row.");
        return;
    }


    let total = 0;


    // Row number starts from 1
    for (let i = start - 1; i < end; i++) {

        if (expenses[i]) {
            total += expenses[i].amount;
        }
    }


    document.getElementById("Result").innerText =
        "Range Total: ₹" + total;
}


// =========================
// LOAD SAVED EXPENSES
// =========================

let savedExpenses = localStorage.getItem("expenses");


if (savedExpenses) {

    expenses = JSON.parse(savedExpenses);

    displayExpenses();
}
document.getElementById("date").value = "";











