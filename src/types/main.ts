import { Theme } from "./app";

export interface Budgets {
    id: number;
    productTitle: string;
    productCost: number;
}

export interface ControlsValues {
    totalBudget: number;
    expenses: number;
    balance: number;
}

export interface Data {
    theme: Theme;
    budgetsList: Budgets[];
    controlsValues: ControlsValues;
}
