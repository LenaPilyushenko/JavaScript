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
    persentDeposit: 0,
    moneyDeposit: 0,
    mission: 50000,
    period: 12,
    budget: money,
    budgetDay: 0,
    budgetMonth: 0,
    expensesAmonth: 0,
    asking: function() {
        let cashIncome,
            itemIncome;
        if (confirm('Есть ли у вас испточник дополнительного заработка?')) {

            do {
                itemIncome = prompt('Какой у вас дополнительный заработок?' , 'Таксую');
            }
            while (!isNaN(itemIncome));

            do {
                cashIncome = prompt('Сколько вы на этом зарабатываете в месяц?', 10000);
            }
            while (!isNumber(cashIncome));

            appData.income[itemIncome] = cashIncome;
        }
        appData.deposit = confirm('Есть ли у вас депозит в банке?');

        let addExpenses;
        do {
            addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
        }
        while (!isNaN(addExpenses));
       
        appData.addExpenses = addExpenses.toLowerCase().split(', ');
                
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
    getExpensesMonth: function() {
        for (let amount in appData.expenses) {
            
            appData.expensesAmonth += appData.expenses[amount];
        }
        //console.log ('сумма расходов в getExpensesMonth,   ' , sum);
        return appData.expensesAmonth;
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
    getInfoDeposit: function() {
        if (appData.deposit) {
            do {
                appData.persentDeposit = prompt('Какой годовой процент' , '10');
            }
            while (!isNumber(appData.persentDeposit));
            do {
               appData.moneyDeposit = prompt('Какая сумма заложена', 10000);
            }
            while (!isNumber(appData.moneyDeposit));
        }
    },
    calcSavedMoney: function() {
        return appData.budgetMonth * appData.period;
    }
};

appData.asking();

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
    console.log(key + " : " + appData[key] );
}

for (let value of appData.addExpenses) {
    let myData =(value.charAt(0).toUpperCase()) + value.substr(1).toString();
    console.log(myData);
}

const arr = appData.addExpenses.map(function(elem) {
    const str = elem.trim(); 
    console.log(str);
    return (str[0].toUpperCase() + str.slice(1));
});
console.log(arr.toString());