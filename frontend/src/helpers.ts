// function creates all totals for each category of expense for the user based on the returned "transactions" from the db.

import { Transaction } from "./types/Transaction";

type NumbersObject = {
    [key: string] : number
}

export function createExpensesObj(arrayOfExpenses: Transaction[]): NumbersObject {
    let expensesObject: NumbersObject = {};

    arrayOfExpenses.forEach(e => {
        expensesObject[e.expenseType] = expensesObject[e.expenseType] === undefined ? e.cost : expensesObject[e.expenseType] + e.cost
    })

    return expensesObject;
}


// function that returns the difference between the total amount spent and the budget
export function getRemainingAmount(transactions: Transaction[], budget: number) {
    return budget - (transactions.reduce((a: any, t) => a + t.cost, 0)) 
}

// function that adds a transaction

export function addTransaction(transactions: Transaction[], newExpense: Transaction) {
    const newTransactions = [...transactions, newExpense]
    return newTransactions;
}

// function that calculates total expenses
export function calcTotalExpenses(transactions: Transaction[]) {
    return transactions.reduce((a: any, t) => a + t.cost, 0)
}

// function that adds an icon to the list of expenses
export function addCategory(visibleExpenses: string[], newCategory: string): string[] {
    if (visibleExpenses.length < 12 && newCategory.length > 0) {
        return [...visibleExpenses, newCategory]
    }

    return visibleExpenses
}

// function that calculates percentage of expenses (used for pie chart)
export function calcPercentagesOfExpenses(allTransactions: Transaction[]) {
    const percentages: NumbersObject = {}
    let totalPercentage = 0; // this variable is used to ensure we have all 100% accounted for
    const total = calcTotalExpenses(allTransactions);
    const expenses = createExpensesObj(allTransactions)
    Object.entries(expenses).forEach(([category, val]: [string, number]) => {
        let percent = Number((val / total).toFixed(2))
        percentages[category] = percent;
        totalPercentage += percent
    })
    if (totalPercentage < 1) {
        percentages["other"] = Number((percentages["other"] + 1 - totalPercentage).toFixed(2))
    }

    return percentages;
}



// function that toggels a category from an array of active categories... Filter will be used with all transactions
// and this "activeCatagories" array to find the current total

export function toggleActiveCategories(category: string, activeCatagories: string[]): string[] {
    let categoryIdx: number = activeCatagories.indexOf(category);

    if (categoryIdx === -1) {
        return [...activeCatagories, category]
    } else {
        return activeCatagories.slice(0, categoryIdx).concat(activeCatagories.slice(categoryIdx + 1))
    }
}
// function used to calculate the transactions that aren't toggled off
export function totalToggledTransactions(activeCatagories: string[], allTransactions: Transaction[]) {
    return allTransactions.reduce((acc:number , t:Transaction) => {
        if (activeCatagories.includes(t.expenseType)) {
            return acc + t.cost;
        }
        return acc;
    }, 0)
}


// function that gets the monthly compounded interest for a given year
export const getMonthlyCompoundInterest = (
    initialInvestment: number, 
    interestRate: number = .1, 
    time: number = 1, 
    monthlyInvestments: number = 0
) => {
    if (initialInvestment <= 0) return 0;
    return Number(
        (initialInvestment * 
            (Math.pow((1 + interestRate / 12), (12 * time))) + 
            (monthlyInvestments * (((Math.pow(1 + (interestRate / 12), 12 * time)) - 1) / (interestRate / 12)))
        ).toFixed(2)
    );
}

// function that gets the monthly compounded over a variable number of years (returning an array of years)
export const getMonthlyCompoundInterest7 = (
    initialInvestment: number, 
    time: number = 7, 
    monthlyInvestments: number = 0
) => {
    const investmentByYear = [];
    investmentByYear.push(initialInvestment);
    while (time > 0) {
        investmentByYear.push(getMonthlyCompoundInterest(investmentByYear[investmentByYear.length - 1], .1, 1, monthlyInvestments));
        time--;
    }
    return investmentByYear;
}