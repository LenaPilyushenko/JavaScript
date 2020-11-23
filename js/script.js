const money = 40000, income = 'фриланс', addExpenses = 'Коммуналка, интернет, бензин, кредит, ипотека', 
deposit = true, mission = 500000, period = 12, budgetDay = money/30;

console.log ('money : ' + typeof money + ', income : ' + typeof income + ', deposit : ' + typeof deposit);

console.log ('Длина строки addExpenses : ' + addExpenses.length );

console.log ('Период равен ' + period + ' месяцев');

console.log ('Цель заработать ' + mission + ' рублей');

console.log (addExpenses.toLowerCase().split(', '));

console.log ('budgetDay = ' + budgetDay );