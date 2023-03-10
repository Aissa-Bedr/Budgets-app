import { data } from "./data";
import { updateBalace, updateErrorMessage, updateExpenses, updateStorage, updateTotalBudget } from "./helpers/script";
import { Input } from "./types/app";
import { Budgets, ControlsValues } from "./types/main";

const expensesListItems = document.querySelector(".expenses_list_items")!;
const totalAmountInput = document.getElementById("total_amount_input") as Input;
const productTitleInput = document.getElementById("product_title_input") as Input;
const productCostInput = document.getElementById("product_cost_input") as Input;
const resetBtn = document.getElementById("reset_btn")!;

export function updateBudgets(): Budgets[] {
    expensesListItems.textContent = "";

    data.budgetsList.map((budget) => {
        const expensesItem = document.createElement("div");
        const productTitle = document.createElement("p");
        const productCost = document.createElement("p");
        const expensesItemControls = document.createElement("div");
        const editButton = document.createElement("button");
        const editIcon = document.createElement("img");
        const removeButton = document.createElement("button");
        const removeIcon = document.createElement("img");

        productTitle.textContent = budget.productTitle;
        productCost.textContent = `$${budget.productCost}`;
        editIcon.src = "/edit.svg";
        editIcon.alt = "edit_img";
        removeIcon.src = "/trash.svg";
        removeIcon.alt = "remove_img";

        expensesItem.classList.add("expenses_item");
        expensesItemControls.classList.add("expenses_item_controls");

        removeButton.addEventListener("click", () => removeBudget(budget.id));
        editButton.addEventListener("click", () => editBudget(budget.id));

        editButton.appendChild(editIcon);
        removeButton.appendChild(removeIcon);
        expensesItemControls.append(editButton, removeButton);
        expensesItem.append(productTitle, productCost, expensesItemControls);
        expensesListItems.appendChild(expensesItem);
    });

    return data.budgetsList;
}

export function addBudget(): Budgets | false {
    const budget: Budgets = {
        id: Date.now(),
        productTitle: productTitleInput.value,
        productCost: parseFloat(productCostInput.value),
    };

    if (!productTitleInput.value || !productCostInput.value) {
        updateErrorMessage("Product can't be empty !");
        return false;
    }

    if (parseFloat(productCostInput.value) < 0) {
        updateErrorMessage("Product can't be less than zero !");
        return false;
    }

    if (!data.controlsValues.totalBudget) {
        updateErrorMessage("Please add a total budget !");
        return false;
    }

    if (budget.productCost + data.controlsValues.expenses > data.controlsValues.totalBudget) {
        updateErrorMessage("Product and expenses cost can't be bigger than total budget !");
        return false;
    }

    for (const budgets of data.budgetsList) {
        if (budget.productTitle === budgets.productTitle && budget.productCost === budgets.productCost) {
            updateErrorMessage(`Product ${budget.productTitle} all ready exist !`);
            return false;
        }
    }

    data.budgetsList.push(budget);
    updateBudgets();
    data.controlsValues.expenses += budget.productCost;
    updateExpenses();
    data.controlsValues.balance -= budget.productCost;
    updateBalace();
    checkBudgetsListLength();
    updateStorage();
    productTitleInput.value = "";
    productCostInput.value = "";
    return budget;
}

export function editBudget(id: number): void {
    data.budgetsList.map((budget) => {
        if (id === budget.id) {
            removeBudget(id);

            productTitleInput.value = budget.productTitle;
            productCostInput.value = `${budget.productCost}`;
        }
    });
}

export function removeBudget(id: number): void {
    data.budgetsList.map((budget, index) => {
        if (id === budget.id) {
            data.budgetsList.splice(index, 1);
            updateBudgets();
            data.controlsValues.expenses -= budget.productCost;
            updateExpenses();
            data.controlsValues.balance += budget.productCost;
            updateBalace();
            checkBudgetsListLength();
            updateStorage();
        }
    });
}

export function setBudget(): number | false {
    if (!totalAmountInput.value) {
        updateErrorMessage("Amount can't be empty !");
        return false;
    }

    if (parseFloat(totalAmountInput.value) < 0) {
        updateErrorMessage("Amount can't be less than zero !");
        return false;
    }

    if (parseFloat(totalAmountInput.value) < data.controlsValues.expenses) {
        updateErrorMessage("Total amount can't be less than expenses cost !");
        return false;
    }

    data.controlsValues.totalBudget = parseFloat(totalAmountInput.value);
    updateTotalBudget();
    data.controlsValues.balance = parseFloat(totalAmountInput.value) - data.controlsValues.expenses;
    updateBalace();
    checkBudgetsListLength();
    updateStorage();
    totalAmountInput.value = "";
    return data.controlsValues.totalBudget;
}

export function resetBudgets(): ControlsValues {
    data.budgetsList.length = 0;
    updateBudgets();
    data.controlsValues.totalBudget = 0;
    updateTotalBudget();
    data.controlsValues.expenses = 0;
    updateExpenses();
    data.controlsValues.balance = 0;
    updateBalace();
    updateStorage();
    checkBudgetsListLength();

    return data.controlsValues;
}

export function checkBudgetsListLength(): boolean {
    if (data.budgetsList.length < 1) {
        resetBtn.classList.remove("active");
        return false;
    }

    resetBtn.classList.add("active");
    return false;
}
