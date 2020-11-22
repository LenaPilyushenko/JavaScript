let money = 40000;
const income = 'фриланс';
let  addExpenses = 'Коммуналка, интернет, бензин, кредит, ипотека';
let deposit = true;
let mission = 500000;
const  period = 12;

console.log ('money : ' + typeof money );

console.log ('money : ' + typeof income );

console.log ('deposit : ' + typeof deposit );

console.log ('Длина строки addExpenses : ' + addExpenses.length );

console.log ('Период равен ' + period + ' месяцев');

console.log ('Цель заработать ' + mission + ' рублей');

let newAddExpenses = addExpenses.toLowerCase();

console.log (newAddExpenses.split(', '));

let budgetDay = money/30;

console.log ('budgetDay = ' + budgetDay );