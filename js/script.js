'use strict';

const  buttonСalculate = document.getElementById('start'), // кнопка рассчитать
    btnCancel =  document.getElementById('cancel'),
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
    incomeAmount = document.querySelector('.income-amount'), // Сумма дополнительного дохода
    additionalАexpensesItem = document.querySelector('.additional_expenses-item'), // Возможные расходы через запятую
    targetAmount = document.querySelector('.target-amount'), // Цель
    periodSelect = document.querySelector('.period-select'),
    periodAmount = document.querySelector('.period-amount'), // Период расчета
    getAllInput = document.querySelectorAll('input[placeholder]'),
    expensesAmount = document.querySelector('.expenses-amount');

const isNumber = function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};

let  expensesItems = document.querySelectorAll('.expenses-items'),
    incomeItems = document.querySelectorAll('.income-items'); 

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
       
        if (salaryAmount.value === '') {
            return;
        }

        this.budget = +salaryAmount.value;
        this.getExpenses();
        this.getAddExpenses();
        this.getincome();
        this.getAddIncome();        
        this.getBudget();
        this.showResult();
        
        this.blocking();
        
    },
    addExpensesBlock: function() {
        
        const cloneExpensesItems = expensesItems[0].cloneNode(true);

        cloneExpensesItems.querySelector('.expenses-title').value = '';
        cloneExpensesItems.querySelector('.expenses-amount').value = '';
        
        expensesItems[0].parentNode.insertBefore(cloneExpensesItems , buttonPlusAdditionalIncome );
        expensesItems = document.querySelectorAll('.expenses-items');

        const expensesItemsNewTitle = document.querySelectorAll('input[placeholder="Наименование"]');
        const  expensesItemsNewAmount = document.querySelectorAll('input[placeholder="Сумма"]');
        this.checkPlaceholder(expensesItemsNewTitle);
        this.checkPlaceholder(expensesItemsNewAmount);

        if (expensesItems.length === 3) {
            buttonPlusAdditionalIncome.style.display = 'none';
        }
        
    },
    addIncomeBlock: function() {
        const cloneIncomeItems = incomeItems[0].cloneNode(true);

        cloneIncomeItems.querySelector('.income-title').value = '';
        cloneIncomeItems.querySelector('.income-amount').value = '';
       
        incomeItems[0].parentNode.insertBefore(cloneIncomeItems , buttonPlusIncome );
        incomeItems = document.querySelectorAll('.income-items');

        const incomeItemsNewTitle = document.querySelectorAll('input[placeholder="Наименование"]');
        const incomeItemsNewAmount = document.querySelectorAll('input[placeholder="Сумма"]');
        this.checkPlaceholder(incomeItemsNewTitle);
        this.checkPlaceholder(incomeItemsNewAmount);

       if (incomeItems.length === 3) {
            buttonPlusIncome.style.display = 'none';
        }
    },
    getExpenses: function(){
        const _this = this;
        expensesItems.forEach(function(item){
            const itemExpenses = item.querySelector('.expenses-title').value;
            const cashExpenses = item.querySelector('.expenses-amount').value;
            
            if ( itemExpenses !== '' && cashExpenses !== '' ) {
                _this.expenses[itemExpenses] = cashExpenses;
            }

        });
    },
    getincome: function() {
        const _this = this;
        incomeItems.forEach(function(item){
            const itemIncome = item.querySelector('.income-title').value;
            const cashIncome = item.querySelector('.income-amount').value;
            
            if ( itemIncome !== '' && cashIncome !== '' ) {
                _this.income[itemIncome] = cashIncome;
            }
        });

        for (const key in this.income) {
            this.incomeMonth += +this.income[key];
        }        
    },
    checkPlaceholder: function(feilds) {
        feilds.forEach(function(item){
            if (item.placeholder === 'Сумма') {
                item.addEventListener('input', function(){
                    item.value = item.value.replace(/[^\d]/g, '');
                });
            } if (item.placeholder === 'Наименование') {
                item.addEventListener('input', function(){
                    item.value = item.value.replace(/[^а-я -.,]/g, '');
                });
            }
        });
    },
    showResult: function() {
        
        inputBudgetMonth.value = this.budgetMonth;
        inputBudgetDay.value = this.budgetDay;
        inputExpensesMonth.value = this.expensesAmonth;
        inputAdditionalExpenses.value = this.addExpenses.join(', ');
        inputAdditionalIncome.value = this.addIncome.join(', ');
        inputIncomePeriod.value = this.calcSavedMoney();
        
        periodSelect.addEventListener('input', function() {
            this.getperiodAmount();
            inputIncomePeriod.value = this.budgetMonth * periodSelect.value;
        });
    },
    getExpensesMonth: function() {
       
        for (const amount in this.expenses) {
            this.expensesAmonth += +(this.expenses[amount]);
        }
        return this.expensesAmonth;
    },
    getBudget: function() {
        
        this.budgetMonth = this.budget + this.incomeMonth - this.getExpensesMonth();
        this.budgetDay = Math.ceil(this.budgetMonth / 30);
    }, 
    getAddExpenses: function() {
        const addExpenses = additionalАexpensesItem.value.split(',');
        const _this = this;
        addExpenses.forEach(function(item){
            item = item.trim();
            if (item !== '') {
                _this.addExpenses.push(item);
            }
        });
    },
    getAddIncome: function() {
        const _this = this;
        fieldsExpenses.forEach(function(item) {
            const itemValue = item.value.trim();
            if (itemValue !== '') {
                _this.addIncome.push(itemValue);
            }
         });
    },
    getStatusIncome: function() {
        if (this.budgetDay >= 1200) {
            return('У вас высокий уровень дохода');
        } else if (this.budgetDay >= 600) {
            return('У вас средний уровень дохода');
        } else if (this.budgetDay >= 0) {
            return('К сожалению, у вас уровень дохода ниже среднего');
        } else {
            return('Что то пошло не так');
        }
    },
    getTargetMonth: function () {
        return (Math.ceil(targetAmount.value / this.budgetMonth));
    },
    getInfoDeposit: function() {
        
        if (this.deposit) {
            do {
                this.persentDeposit = prompt('Какой годовой процент' , '10');
            }
            while (!isNumber(this.persentDeposit));
            do {
                this.moneyDeposit = prompt('Какая сумма заложена', 10000);
            }
            while (!isNumber(this.moneyDeposit));
        }
    },
    calcSavedMoney: function() {
        return this.budgetMonth * periodSelect.value;
    },
    getperiodAmount: function() {
        periodAmount.innerHTML = periodSelect.value;
    },
    blocking: function() {
        const expensesTitle = document.querySelectorAll('.expenses-title');
        const expensesAmount = document.querySelectorAll('.expenses-amount');
        const incomeTitle = document.querySelectorAll('.income-title');
        const incomeAmount = document.querySelectorAll('.income-amount');
        salaryAmount.disabled='disabled';
        incomeTitle.forEach(function(item){
            item.disabled='disabled';
        });
        incomeAmount.forEach(function(item){
            item.disabled='disabled';
        });
        buttonPlusIncome.disabled='disabled';
        fieldsExpenses[0].disabled='disabled';
        fieldsExpenses[1].disabled='disabled';
        fieldsExpenses[1].disabled='disabled';
        expensesAmount.forEach(function(item){
            item.disabled='disabled';
        });
        expensesTitle.forEach(function(item){
            item.disabled='disabled';
        });
        buttonPlusAdditionalIncome.disabled='disabled';
        additionalАexpensesItem.disabled='disabled';
        periodSelect.disabled='disabled';
        targetAmount.disabled='disabled';
        checkmark.disabled='disabled';

        buttonСalculate.style.display = 'none';
        btnCancel.style.display = 'block';
    },
    clearForm: function() {
        this.income = {};
        this.addIncome = [];
        this.expenses = {};
        this.addExpenses = [];
        this.deposit = false;
        this.persentDeposit = 0;
        this.moneyDeposit = 0;
        this.budget = 0;
        this.incomeMonth = 0;
        this.budgetDay = 0;
        this.budgetMonth = 0;
        this.expensesAmonth = 0;
    }    
};

buttonСalculate.addEventListener('click',  appData.start.bind(appData));

buttonPlusAdditionalIncome.addEventListener('click' , appData.addExpensesBlock.bind(appData));

buttonPlusIncome.addEventListener('click' , appData.addIncomeBlock.bind(appData));

periodSelect.addEventListener('input', appData.getperiodAmount.bind(appData));

appData.checkPlaceholder(getAllInput);

btnCancel.addEventListener('click', appData.clearForm.bind(appData));