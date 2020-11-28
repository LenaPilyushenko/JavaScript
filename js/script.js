'use strict';

let money;

const isNumber = function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};

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
    mission: 50000,
    period: 12,
    asking: function() {
        const addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
        appData.addExpenses = addExpenses.toLowerCase().split(', ');
        appData.deposit = confirm('Есть ли у вас депозит в банке?');
        let key = 0,
            amount, 
            sum = 0 ;
        for (let i = 0; i < 2; i++ ) {
    
            key = prompt('Введите обязательную статью расходов?');
             do {
                amount = +prompt('Во сколько это обойдется?');
            }
            while (!isNumber(amount) );
            appData.expenses[key]  = +amount;
            sum += amount ;
        }
    },
    budget: money,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
    getExpensesMonth: function() {
        let sum = 0 ;
        for (let amount in appData.expenses) {
            
            sum += appData.expenses[amount];
        }
        //console.log ('сумма расходов в getExpensesMonth,   ' , sum);
        return sum;
    },
    getBudget: function() {
        appData.budgetMonth = appData.budget - appData.getExpensesMonth();
        appData.budgetDay = Math.ceil(appData.budgetMonth / 30);
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
        return (Math.ceil(appData.mission / appData.budgetMonth));
    },
};

appData.asking();

appData.expensesAmonth = appData.getExpensesMonth(); // расзходы за месяц

console.log ('Расходы за месяц ' + appData.expensesAmonth); //выводим расходы за месяц

appData.accumulatedMonth = appData.getBudget(); //бюджет месяца

if (appData.getTargetMonth() > 0) {
    console.log ('Цель будет достигнута через (мес)' + appData.getTargetMonth());
} else {
    console.log ('Цель не будет достигнута');
}

console.log(appData.getStatusIncome());

console.log('Наша программа включает в себя данные: ');

for (let key in appData) {
    // этот код будет вызван для каждого свойства объекта
    // ..и выведет имя свойства и его значение
  
    console.log(key + " : " + appData[key] );
}