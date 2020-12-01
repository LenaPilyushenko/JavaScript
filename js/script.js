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
            addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 'Кредит, сад');
        }
        while (!isNaN(addExpenses));
       
        appData.addExpenses = addExpenses.toLowerCase().split(', ');
                
        let key = 0,
            amount, 
            sum = 0 ;
        for (let i = 0; i < 2; i++ ) {
            do {
                key = prompt('Введите обязательную статью расходов?' , 'Кредит');
            }
            while (!isNaN(key));
            
            do {
                amount = +prompt('Во сколько это обойдется?', '5000');
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

console.log ('Расходы за месяц ' + appData.expensesAmonth); 

appData.accumulatedMonth = appData.getBudget(); 

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
    return (str[0].toUpperCase() + str.slice(1));
});
console.log(arr.toString());

const buttonСalculate = document.getElementById('start'); // кнопка рассчитать

console.log('buttonСalculate ', buttonСalculate);

const buttonPlusIncome = document.getElementsByTagName('button') [0]; // кнопка добавить дополнительный доход

console.log('buttonPlusIncome ', buttonPlusIncome);

const buttonPlusAdditionalIncome = document.getElementsByTagName('button') [1]; // кнопка добавить возможный доход

console.log('buttonPlusAdditionalIncome ', buttonPlusAdditionalIncome);

const checkmark = document.querySelector('.deposit-checkmark'); // чекбокс

console.log('checkmark ', checkmark);

const fieldsExpenses = document.querySelectorAll('.additional_income-item'); // возможный доход

console.log('fieldsExpenses ', fieldsExpenses);

const inputBudgetMonth = document.getElementsByClassName('budget_month-value')[0]; // Доход за месяц

console.log('inputBudgetMonth ', inputBudgetMonth);

const inputBudgetDay = document.getElementsByClassName('budget_day-value')[0]; // Дневной бюджет

console.log('inputBudgetDay ', inputBudgetDay);

const inputExpensesMonth = document.getElementsByClassName('expenses_month-value')[0]; // Расход за месяц

console.log('inputExpensesMonth ', inputExpensesMonth);

const inputAdditionalIncome = document.getElementsByClassName('additional_income-value')[0]; // Возможные доходы

console.log('inputAdditionalIncome ', inputAdditionalIncome);

const inputAdditionalExpenses = document.getElementsByClassName('additional_expenses-value')[0]; // Возможные расходы

console.log('inputAdditionalExpenses ', inputAdditionalExpenses);

const inputIncomePeriod = document.getElementsByClassName('income_period-value')[0]; // Накопления за период

console.log('inputIncomePeriod ', inputIncomePeriod);

const inputTargetMonth = document.getElementsByClassName('target_month-value')[0]; // Срок достижения цели в месяцах

console.log('inputTargetMonth ', inputTargetMonth);


const SalaryAmount = document.querySelector('.salary-amount'); // Месячный доход

console.log('SalaryAmount ', SalaryAmount);

const incomeTitle = document.querySelector('.income-title'); // Название дополнительного дохода

console.log('incomeTitle ', incomeTitle);

const incomeAmount = document.querySelector('.income-amount'); // Сумма дополнительного дохода

console.log('incomeAmount ', incomeAmount);

const additionalАexpensesШtem = document.querySelector('.additional_expenses-item'); // Возможные расходы через запятую

console.log('additionalАexpensesШtem ', additionalАexpensesШtem);

const targetAmount = document.querySelector('.target-amount'); // Цель

console.log('targetAmount ', targetAmount);

const periodSelect = document.querySelector('.period-select'); // Период расчета

console.log('periodSelect ', periodSelect);
