'use strict';

let  buttonСalculate = document.getElementById('start'), // кнопка рассчитать
    buttonPlusIncome = document.getElementsByTagName('button') [0], // кнопка добавить дополнительный доход
    buttonPlusAdditionalIncome = document.getElementsByTagName('button') [1], // кнопка добавить возможный доход
    checkmark = document.querySelector('.deposit-checkmark'), // чекбокс
    fieldsExpenses = document.querySelectorAll('.additional_income-item'), // возможный доход
    inputBudgetMonth = document.getElementsByClassName('budget_month-value')[0], // Доход за месяц
    inputBudgetDay = document.getElementsByClassName('budget_day-value')[0], // Дневной бюджет
    inputExpensesMonth = document.getElementsByClassName('expenses_month-value')[0], // Расход за месяц
    inputAdditionalIncome = document.getElementsByClassName('additional_income-value')[0], // Возможные доходы
    inputAdditionalExpenses = document.getElementsByClassName('additional_expenses-value')[0], // Возможные расходы
    inputIncomePeriod = document.getElementsByClassName('income_period-value')[0], // Накопления за период
    inputTargetMonth = document.getElementsByClassName('target_month-value')[0], // Срок достижения цели в месяцах
    salaryAmount = document.querySelector('.salary-amount'), // Месячный доход
    incomeTitle = document.querySelector('input.income-title'), // Название дополнительного дохода
    expenseesTitle = document.querySelector('input.expenses-title'), // Название обязательного расхода
    expensesItems = document.querySelectorAll('.expenses-items'), // Сумма обязательного расхода
    incomeAmount = document.querySelector('.income-amount'), // Сумма дополнительного дохода
    additionalАexpensesItem = document.querySelector('.additional_expenses-item'), // Возможные расходы через запятую
    targetAmount = document.querySelector('.target-amount'), // Цель
    periodSelect = document.querySelector('.period-select'),
    incomeItems = document.querySelectorAll('.income-items'),
    periodAmount = document.querySelector('.period-amount'); // Период расчета
   
const isNumber = function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};

const appData = {
    income: {},
    addIncome: [],
    expenses: {},
    addExpenses: [],
    deposit: false,
    persentDeposit: 0,
    moneyDeposit: 0,
    budget: 0,
    incomeMonth: 0,
    budgetDay: 0,
    budgetMonth: 0,
    expensesAmonth: 0,
    start: function() {
  
        appData.budget = +salaryAmount.value;
        appData.getExpenses();
        appData.getAddExpenses();
        appData.getincome();
        appData.getAddIncome();        
        appData.getBudget();

        appData.showResult();
    },
    addExpensesBlock: function() {

        const cloneExpensesItems = expensesItems[0].cloneNode(true);
        expensesItems[0].parentNode.insertBefore(cloneExpensesItems , buttonPlusAdditionalIncome );
        expensesItems = document.querySelectorAll('.expenses-items');
        if (expensesItems.length === 3) {
            buttonPlusAdditionalIncome.style.display = 'none';
        }
    },
    addIncomeBlock: function() {

        const cloneIncomeItems = incomeItems[0].cloneNode(true);
        incomeItems[0].parentNode.insertBefore(cloneIncomeItems , buttonPlusIncome );
        incomeItems = document.querySelectorAll('.income-items');
        if (incomeItems.length === 3) {
            buttonPlusIncome.style.display = 'none';
        }
    },
    getExpenses: function(){
        expensesItems.forEach(function(item){
            const itemExpenses = item.querySelector('.expenses-title').value;
            const cashExpenses = item.querySelector('.expenses-amount').value;
            
            if ( itemExpenses !== '' && cashExpenses !== '' ) {
                appData.expenses[itemExpenses] = cashExpenses;
            }

        });
    },
    getincome: function() {
        incomeItems.forEach(function(item){
            const itemIncome = item.querySelector('.income-title').value;
            const cashIncome = item.querySelector('.income-amount').value;
            
            if ( itemIncome !== '' && cashIncome !== '' ) {
                appData.income[itemIncome] = cashIncome;
            }
            console.log(appData.income);
        });

        for (const key in appData.income) {
            appData.incomeMonth += +appData.income[key];
        }        
    },
    showResult: function() {
        inputBudgetMonth.value = appData.budgetMonth;
        inputBudgetDay.value = appData.budgetDay;
        inputExpensesMonth.value = appData.expensesAmonth;
        inputAdditionalExpenses.value = appData.addExpenses.join(', ');
        inputAdditionalIncome.value = appData.addIncome.join(', ');
        // inputIncomePeriod.value.addEventListener('input', function() {
        //     appData.getperiodAmount();
        //     periodAmount.textContent = appData.calcSavedMoney() * inputIncomePeriod.value;
        // });
    },
    getExpensesMonth: function() {
        for (const amount in appData.expenses) {
            console.log('appData.expenses[amount] ', appData.expenses[amount]);
            appData.expensesAmonth += +(appData.expenses[amount]);
        }
        console.log('appData.expensesAmonth' , appData.expensesAmonth);
        console.log('appData.expensesAmonth' , appData.expensesAmonth);
        return appData.expensesAmonth;
    },
    getBudget: function() {
        appData.budgetMonth = appData.budget + appData.incomeMonth - appData.getExpensesMonth();
        appData.budgetDay = Math.ceil(appData.budgetMonth / 30);
    }, 
    getAddExpenses: function() {
        const addExpenses = additionalАexpensesItem.value.split(',');
        addExpenses.forEach(function(item){
            item = item.trim();
            if (item !== '') {
                appData.addExpenses.push(item);
            }
        });
    },
    getAddIncome: function() {
        fieldsExpenses.forEach(function(item) {
            const itemValue = item.value.trim();
            if (itemValue !== '') {
                appData.addIncome.push(itemValue);
            }
         });
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
        return (Math.ceil(targetAmount.value / appData.budgetMonth));
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
        return appData.budgetMonth * periodSelect.value;
    },
    getperiodAmount: function() {
        periodAmount.innerHTML = periodSelect.value;
    }
};

buttonСalculate.addEventListener('click',  function() {
    if (salaryAmount.value !== '') {
      appData.start();
    }
});

buttonPlusAdditionalIncome.addEventListener('click' , appData.addExpensesBlock);

buttonPlusIncome.addEventListener('click' , appData.addIncomeBlock);

periodSelect.addEventListener('input', appData.getperiodAmount);

salaryAmount.addEventListener('change' , function() {
    buttonСalculate.removeAttribute('disabled');
});

 



// if (appData.getTargetMonth() > 0) {
//     console.log ('Цель будет достигнута через (мес)' + appData.getTargetMonth());
// } else {
//     console.log ('Цель не будет достигнута');
// }


