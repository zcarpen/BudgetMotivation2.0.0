import {createExpensesObj, getRemainingAmount, addTransaction, calcPercentagesOfExpenses, calcTotalExpenses, addCategory} from "./helpers";
import {expect, describe, it, assert} from 'vitest';

const data =
{
  userID: 'kljh23kj23lkj23',
  username: 'zcarpen',
  visibleExpenses: ['other', 'coffee', 'grocery', 'gas', 'eat-out', 'movie', 'music', 'house', 'gifts', 'snack', 'games', 'self-care'],
  monthlyIncome: 5500,
  monthlyBudget: 3800,
}
const allTransactions = [
    { id: 1, expenseType: 'other', cost: 10, time: 1 },
    { id: 2, expenseType: 'coffee', cost: 100, time: 1 },
    { id: 3, expenseType: 'grocery', cost: 300, time: 1 },
    { id: 4, expenseType: 'gas', cost: 100, time: 1 },
    { id: 5, expenseType: 'eatOut', cost: 100, time: 1 },
    { id: 6, expenseType: 'movie', cost: 50, time: 1 },
    { id: 7, expenseType: 'music', cost: 50, time: 1 },
    { id: 8, expenseType: 'house', cost: 150, time: 1 },
    { id: 9, expenseType: 'gifts', cost: 30, time: 1 },
    { id: 10, expenseType: 'snack', cost: 30, time: 1 },
    { id: 11, expenseType: 'games', cost: 50, time: 1 },
    { id: 12, expenseType: 'selfCare', cost: 150, time: 1 },
    { id: 13, expenseType: 'movie', cost: 50, time: 1 },
    { id: 14, expenseType: 'coffee', cost: 100, time: 1 },
  ]

// describe('calcPercentagesOfExpenses', () => {

//     it('should return percentages that total to be 1', () => {
//         const percentages = calcPercentagesOfExpenses(allTransactions);
//         const total = Object.values(percentages).reduce((acc: number, percent: number) => acc + percent , 0)
//         expect(total).toBe(1);
//     })
// })

describe("addCategory", () => {
    it('should increase the length of visibleExpenses by 1', () => {
        let oldExpenses = ['other', 'coffee', 'grocery', 'gas', 'eat-out'];
        let newExpenses = addCategory(['other', 'coffee', 'grocery', 'gas', 'eat-out'], 'music');
        expect(oldExpenses.length + 1).toBe(newExpenses.length)
    })

    it('should not add category if visibleExpenses === 12', () => {
        const categories = data.visibleExpenses;
        let newExpenses = addCategory(categories, 'books');
        expect(newExpenses.length).toBe(categories.length)
    })
})

describe("calcTotalExpenses", () => {
    it('should sum all expenses together and return the total spent', () => {
        const totalSpent = calcTotalExpenses(allTransactions);
        expect(totalSpent).toBe(1270.00)
    })
    
    it('should return 0 if there are no transactions', () => {
        const totalSpent = calcTotalExpenses([]);
        expect(totalSpent).toBe(0)
        // to be completed
    })
})


describe("addTransaction", () => {
    it('should store a transaction at the end of all transactions', () => {
        const newTransaction = {id: 14, expenseType: 'coffee', cost: 5.42, time: 1}
        const functionTransactions = addTransaction(allTransactions, {id: 14, expenseType: 'coffee', cost: 5.42, time: 1})
        expect(JSON.stringify(functionTransactions.pop())).to.equal(JSON.stringify(newTransaction))
    })

    it('should increase the length of all transactions by 1', () => {
        const functionTransactions = addTransaction(allTransactions, {id: 14, expenseType: 'coffee', cost: 5.42, time: 1})
        expect(functionTransactions.length).toBe(allTransactions.length + 1)
    })

    it('should increase the total expenses by the amount of the expense item', () => {
        // to be completed
    })
})

describe("createExpenseObj", () => {
    it('should return correctly totaled expenses', () => {
        // const totalVisibleExpenses = data.visibleExpenses.length;
        const result = createExpensesObj(allTransactions);
        expect(result.coffee).toBe(200)
        expect(result.movie).toBe(100)
    })

    it('should return an object thats total is the same as the allTransactions total', () => {
        const result = createExpensesObj(allTransactions);
        const total = allTransactions.reduce((acc, t) => {
            return acc + t.cost
        }, 0);

        const resultTotal = Object.values(result).reduce((a, c) => a + c, 0)
        expect(resultTotal).toBe(total)
    })
})

describe("getRemainingAmount", () => {
    it('should return difference between the amount spent and the budget' ,() => {
        let totalRemaining = data.monthlyBudget;
        for (let i = 0; i < allTransactions.length; i++) {
            totalRemaining -= allTransactions[i].cost
        }
        expect(getRemainingAmount(allTransactions, data.monthlyBudget)).toBe(totalRemaining)
    })
    
    it('should return monthly budget if there are no transactions' ,() => {
        let totalRemaining = data.monthlyBudget;
        for (let i = 0; i < [].length; i++) {
            totalRemaining -= allTransactions[i].cost
        }
        expect(getRemainingAmount([], data.monthlyBudget)).toBe(totalRemaining)
    })

})