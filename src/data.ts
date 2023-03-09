import { Data } from "./types/main";

export const data: Data = JSON.parse(`${localStorage.getItem("data")}`) || {
    theme: "light",
    budgetsList: [],
    controlsValues: {
        totalBudget: 0,
        expenses: 0,
        balance: 0,
    },
};
