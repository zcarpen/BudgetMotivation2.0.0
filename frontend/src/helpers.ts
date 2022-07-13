// function creates all totals for each category of expense for the user based on the returned "transactions" from the db.

import { Transaction } from "./types/Transaction";

type ExpenseObject = {
    [key: string] : number
}

export function createExpensesObj(arrayOfExpenses: Transaction[]): ExpenseObject {
    let expensesObject: ExpenseObject = {};

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
    const percentages = {}
    let totalPercentage = 0; // this variable is used to ensure we have all 100% accounted for
    const total = calcTotalExpenses(allTransactions);
    const expenses = createExpensesObj(allTransactions)
    Object.entries(expenses).forEach(([category, val]) => {
        let percent = Number((val / total).toFixed(2))
        percentages[category] = percent;
        totalPercentage += percent
    })
    if (totalPercentage < 1) {
        percentages["other"] = Number((percentages["other"] + 1 - totalPercentage).toFixed(2))
    }

    return percentages;
}



// function that toggels a transaction on the expenses object
// function used to calculate the transactions that aren't toggled off
// function that deletes an icon from the list of expenses
// function that updates a transaction
// function that removes a transaction



// export const getMonthlyCompoundInterest = (initialInvestment, interestRate = .1, time = 1, monthlyInvestments = 0) => {
//     if (initialInvestment <= 0) return 0;
//     return Number((initialInvestment * (Math.pow((1 + interestRate / 12), (12 * time))) + (monthlyInvestments * (((Math.pow(1 + (interestRate / 12), 12 * time)) - 1) / (interestRate / 12)))).toFixed(2));
// }
  
// export const getMonthlyCompoundInterest7 = (initialInvestment, time = 7, monthlyInvestments = 0) => {
//     const investmentByYear = [];
//     investmentByYear.push(initialInvestment);
//     while (time > 0) {
//         investmentByYear.push(getMonthlyCompoundInterest(investmentByYear[investmentByYear.length - 1], .1, 1, monthlyInvestments));
//         time--;
//     }
//     return investmentByYear;
// }