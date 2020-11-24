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
    period = 12,
    budgetMonth = money - amount1 - amount2,
    target = Math.ceil(mission / budgetMonth),
    budgetDay = Math.floor(budgetMonth / 30)
;

console.log ('money : ' + typeof money + ', income : ' + typeof income + ', deposit : ' + typeof deposit);

console.log ('Длина строки addExpenses : ' + addExpenses.length );

console.log ('Период равен ' + period + ' месяцев');

console.log ('Цель заработать ' + mission + ' рублей');

console.log (addExpenses.toLowerCase().split(', '));

console.log ('budgetDay = ' + budgetDay );

console.log('бюджет на месяц ' + budgetMonth );

console.log('Цель будет достигнута за ' + target + ' месяцев');

console.log('Бюджет на день ' + budgetDay + ' рублей');

if (budgetDay >= 1200) {
    console.log('У вас высокий уровень дохода');
} else if (budgetDay >= 600) {
    console.log('У вас средний уровень дохода');
} else if (budgetDay >= 0) {
    console.log('К сожалению, у вас уровень дохода ниже среднего');
} else {
    console.log('Что то пошло не так');
}
