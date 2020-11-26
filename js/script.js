'use strict';

const
    money = +prompt('Ваш месячный доход?'),
    addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую'),
    deposit = confirm('Есть ли у вас депозит в банке?'),
    expenses1 = prompt('Введите обязательную статью расходов?'),
    amount1 = +prompt('Во сколько это обойдется?'),
    expenses2 = prompt('Введите обязательную статью расходов?'),
    amount2 = +prompt('Во сколько это обойдется?'),
    income = 'фриланс', 
    mission = 500000,
    period = 12
;

const getExpensesMonth = function() {
    return amount1 + amount2;
}
const getAccumulatedMonth = function() {
    return money - amount1 - amount2;
}

const accumulatedMonth = getAccumulatedMonth();

const getTargetMonth = function () {
    return mission / accumulatedMonth;
}

const budgetDay = Math.floor(accumulatedMonth / 30);

const showTypeOf = function(data) {
    console.log(data, typeof(data));  
}

showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);

getExpensesMonth();

console.log (addExpenses.toLowerCase().split(', '));

getTargetMonth();

console.log('budgetDay ' +budgetDay);

const getStatusIncome = function() {
    if (budgetDay >= 1200) {
        return('У вас высокий уровень дохода');
    } else if (budgetDay >= 600) {
        return('У вас средний уровень дохода');
    } else if (budgetDay >= 0) {
        return('К сожалению, у вас уровень дохода ниже среднего');
    } else {
        return('Что то пошло не так');
    }
}