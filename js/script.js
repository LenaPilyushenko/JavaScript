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
const
    addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую'),
    deposit = confirm('Есть ли у вас депозит в банке?'),
    income = 'фриланс', 
    mission = 500000,
    period = 12;

let expenses = [] , amount = [];

const getExpensesMonth = function() {
    let sum = 0;

    for (let i = 0; i < 2; i++ ) {

        expenses[i] = prompt('Введите обязательную статью расходов?');
        do {
            amount[i] = +prompt('Во сколько это обойдется?');
        }
        while (!isNumber(amount[i]) );
        sum += amount[i] ;
    }
    console.log('здесь названия расходов' + expenses);
    console.log('здесь стоимость этих расходов' + amount);
    return sum;
};

const expensesAmonth = getExpensesMonth();

console.log ('Расходы за месяц ' + expensesAmonth);

const getAccumulatedMonth = function() {
    return money - expensesAmonth;
};

const accumulatedMonth = getAccumulatedMonth();

const getTargetMonth = function () {
    return mission / accumulatedMonth;
};

const budgetDay = accumulatedMonth / 30;

const showTypeOf = function(data) {
    console.log(data, typeof(data));  
};

showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);

console.log (addExpenses.toLowerCase().split(', '));

if (getTargetMonth > 0) {
    console.log ('Цель будет достигнута через ' + Math.floor(getTargetMonth()) + ' месяцев');
} else {
    console.log ('Цель не будет достигнута');
}

console.log('budgetDay ' + budgetDay);

let getStatusIncome = function() {
    if (budgetDay >= 1200) {
        return('У вас высокий уровень дохода');
    } else if (budgetDay >= 600) {
        return('У вас средний уровень дохода');
    } else if (budgetDay >= 0) {
        return('К сожалению, у вас уровень дохода ниже среднего');
    } else {
        return('Что то пошло не так');
    }
};