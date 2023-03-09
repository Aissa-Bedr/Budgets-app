import { switchTheme, updateTheme } from "./theme";
import { addBudget, checkBudgetsListLength, resetBudgets, setBudget, updateBudgets } from "./budgets";
import { updateBalace, updateExpenses, updateTotalBudget } from "./helpers/script";

const themeSwitchBtn = document.querySelector(".theme_switcher_btn")!;
const checkAmountBtn = document.getElementById("check_amount_btn")!;
const setBudgetBtn = document.getElementById("set_budget_btn")!;
const resetBtn = document.getElementById("reset_btn")!;

window.addEventListener("load", () => {
    updateTheme();
    updateBudgets();
    updateTotalBudget();
    updateExpenses();
    updateBalace();
    checkBudgetsListLength();
});

themeSwitchBtn.addEventListener("click", switchTheme);
checkAmountBtn.addEventListener("click", addBudget);
setBudgetBtn.addEventListener("click", setBudget);
resetBtn.addEventListener("click", resetBudgets);
