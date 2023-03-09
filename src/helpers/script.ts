import { data } from "../data";
import { Data } from "../types/main";

const totalBudget = document.getElementById("total_budget")!;
const expenses = document.getElementById("expenses")!;
const balance = document.getElementById("balance")!;

export function updateStorage(): Data {
    localStorage.setItem("data", JSON.stringify(data));
    return data;
}

export function updateTotalBudget(): number {
    totalBudget.textContent = `$${data.controlsValues.totalBudget}`;
    return data.controlsValues.totalBudget;
}

export function updateExpenses(): number {
    expenses.textContent = `$${data.controlsValues.expenses}`;
    return data.controlsValues.expenses;
}

export function updateBalace(): number {
    balance.textContent = `$${data.controlsValues.balance}`;
    return data.controlsValues.balance;
}
