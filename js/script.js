  
'use strict';

const isNumber = function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};
let money;

const start = function() {
    do {
        money = prompt('Ваш месячный доход?');
    }
    while (!isNumber(money) );
};
start();

let appData = {
    income: {},
    addIncome: [],
    expenses: {},
    addExpenses: [],
    deposit: false,
    mission: 500000,
    period: 12,
    asking: function() {
        const
        addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
        appData.addExpenses = addExpenses.toLowerCase().split(', ');
        appData.deposit = confirm('Есть ли у вас депозит в банке?');
        
    },
    budget: money,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
    getExpensesMonth: function() {
        let sum = 0;
        let expenses = [] , amount = [];
        for (let i = 0; i < 2; i++ ) {
    
            expenses[i] = prompt('Введите обязательную статью расходов?');
            do {
                amount[i] = +prompt('Во сколько это обойдется?');
            }
            while (!isNumber(amount[i]) );
            sum += amount[i] ;
        }
        return sum;
    },
    getAccumulatedMonth: function() {
        return (money - appData.getExpensesMonth);
    },
    getStatusIncome: function() {
        if (appData.budgetDay >= 1200) {
            return('У вас высокий уровень дохода');
        } else if (appData.budgetDay >= 600) {
            return('У вас средний уровень дохода');
        } else if (appData.budgetDay >= 0) {
            return('К сожалению, у вас уровень дохода ниже среднего');
        } else {
            return('Что то пошло не так');
        }
    },
    getTargetMonth: function () {
        return appData.mission / appData.accumulatedMonth;
    },
};

appData.expensesAmonth = appData.getExpensesMonth(); // расзходы за месяц

console.log ('Расходы за месяц' + appData.expensesAmonth); //выводим расходы за месяц

appData.accumulatedMonth = appData.getAccumulatedMonth(); //бюджет месяца

console.log('бюджет месяца' + appData.accumulatedMonth); // выводим бюджет месяца

if (appData.getTargetMonth > 0) {
    console.log ('Цель будет достигнута через ' + Math.floor(appData.getTargetMonth()) + ' месяцев');
} else {
    console.log ('Цель не будет достигнута');
}

const budgetDay = appData.getAccumulatedMonth() / 30;
console.log('budgetDay ' + budgetDay);

console.log(appData.getStatusIncome());