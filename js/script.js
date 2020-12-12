'use strict';

const  buttonСalculate = document.getElementById('start'), // кнопка рассчитать
    btnCancel =  document.getElementById('cancel'),
    buttonPlusIncome = document.getElementsByTagName('button') [0], // кнопка добавить дополнительный доход
    buttonPlusExpenses = document.getElementsByTagName('button') [1], // кнопка добавить возможный доход
    checkmark = document.querySelector('.deposit-checkmark'), // чекбокс
    depositСheck =  document.getElementById('deposit-check'),
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
    expensesAmount = document.querySelector('.expenses-amount'), 
    depositBank = document.querySelector('.deposit-bank'),
    depositAmount = document.querySelector('.deposit-amount'),
    depositPercent = document.querySelector('.deposit-percent');
 
const isNumber = (n) => !isNaN(parseFloat(n)) && isFinite(n);

let  expensesItems = document.querySelectorAll('.expenses-items'),
     incomeItems = document.querySelectorAll('.income-items'); 

class AppData {
    constructor() {
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

    addExpIncBlock (item) {
        
        const statrStr = item.target.className.split(' ')[1].split('_')[0]; //получаем начало названия
        const cloneItems = document.querySelectorAll(`.${statrStr}-items`); //получаем клонируемый div
        const but = document.querySelector(`.${statrStr}_add`); //получаем кнопку
        const cloneItem = cloneItems[0].cloneNode(true); //создаем клон
        cloneItem.querySelector(`.${statrStr}-title`).value = '';
        cloneItem.querySelector(`.${statrStr}-amount`).value = '';
        cloneItems[0].parentNode.insertBefore(cloneItem, but); //вставляем клон
        if (cloneItems.length === 2) {
            but.style.display = 'none';
        }
    }

    getExpInc() {
        const count = item => {
            const statrStr = item.className.split('-')[0];
            const itemTitle = item.querySelector(`.${statrStr}-title`).value;
            const itemAmount = item.querySelector(`.${statrStr}-amount`).value;
            if ( itemTitle !== '' && itemAmount !== '' ) {
                this[statrStr][itemTitle] = itemAmount;
            }
        };

        incomeItems.forEach(count);
        expensesItems.forEach(count);

         for (const key in this.income) {
            this.incomeMonth += +this.income[key];
        } 
    }

    checkPlaceholder(feilds) {
        feilds.forEach((item) => {
            if (item.placeholder === 'Сумма') {
                item.addEventListener('input', () => {
                    item.value = item.value.replace(/[^\d]/g, '');
                });
            } if (item.placeholder === 'Наименование') {
                item.addEventListener('input', () => {
                    item.value = item.value.replace(/[^а-я -.,]/g, '');
                });
            }
        });
    }

    showResult() {
        inputBudgetMonth.value = this.budgetMonth;
        inputBudgetDay.value = this.budgetDay;
        inputExpensesMonth.value = this.expensesAmonth;
        inputAdditionalExpenses.value = this.addExpenses.join(', ');
        inputAdditionalIncome.value = this.addIncome.join(', ');
        inputIncomePeriod.value = this.calcSavedMoney();
        
        periodSelect.addEventListener('input', () => {
            this.getperiodAmount();
            inputIncomePeriod.value = this.budgetMonth * periodSelect.value;
        });
    }

    getExpensesMonth() {
        for (const amount in this.expenses) {
            this.expensesAmonth += +(this.expenses[amount]);
        }
        return this.expensesAmonth;
    }

    getBudget() {
        const monthDeposit = this.moneyDeposit * (this.persentDeposit / 100);
        this.budgetMonth = this.budget + this.incomeMonth - this.getExpensesMonth() + monthDeposit;
        this.budgetDay = Math.ceil(this.budgetMonth / 30);
    }

    getAddExpInc(){
        const AddIncome =  document.querySelectorAll('.additional_income-item');
        const addExpenses = additionalАexpensesItem.value.split(',');
        const easy = (item) => {
            item.value ? item.value.trim() && this.addIncome.push(item.value) : this.addExpenses.push(item);
        };
        addExpenses.forEach(easy);
        AddIncome.forEach(easy);   
    }

    getStatusIncome() {
        if (this.budgetDay >= 1200) {
            return('У вас высокий уровень дохода');
        } else if (this.budgetDay >= 600) {
            return('У вас средний уровень дохода');
        } else if (this.budgetDay >= 0) {
            return('К сожалению, у вас уровень дохода ниже среднего');
        } else {
            return('Что то пошло не так');
        }
    }    

    getTargetMonth() {
        return (Math.ceil(targetAmount.value / this.budgetMonth));
    }
    

    getInfoDeposit() {
        if (this.deposit) {
            this.persentDeposit = depositPercent.value;
            this.moneyDeposit = depositAmount.value;
        }
    }
 
    calcSavedMoney () {
        return this.budgetMonth * periodSelect.value;
    }
    
    getperiodAmount() {
        periodAmount.innerHTML = periodSelect.value;
    }

    blocking() {
        const expensesTitle = document.querySelectorAll('.expenses-title');
        const expensesAmount = document.querySelectorAll('.expenses-amount');
        const incomeTitle = document.querySelectorAll('.income-title');
        const incomeAmount = document.querySelectorAll('.income-amount');
        salaryAmount.disabled='disabled';
        incomeTitle.forEach((item) => {
            item.disabled='disabled';
        });
        incomeAmount.forEach((item) => {
            item.disabled='disabled';
        });
        buttonPlusIncome.disabled='disabled';
        fieldsExpenses[0].disabled='disabled';
        fieldsExpenses[1].disabled='disabled';
        fieldsExpenses[1].disabled='disabled';
        expensesAmount.forEach((item) => {
            item.disabled='disabled';
        });
        expensesTitle.forEach((item) => {
            item.disabled='disabled';
        });
        buttonPlusExpenses.disabled='disabled';
        additionalАexpensesItem.disabled='disabled';
        periodSelect.disabled='disabled';
        targetAmount.disabled='disabled';
        checkmark.disabled='disabled';
    
        buttonСalculate.style.display = 'none';
        btnCancel.style.display = 'block';
    }

    clearForm() {
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
    
        const arrInput = document.querySelectorAll('input');
        arrInput.forEach((item) => {
            item.value = '';
        });
    
        const expensesTitle = document.querySelectorAll('.expenses-title');
        const expensesAmount = document.querySelectorAll('.expenses-amount');
        const incomeTitle = document.querySelectorAll('.income-title');
        const incomeAmount = document.querySelectorAll('.income-amount');
        salaryAmount.removeAttribute('disabled');
        incomeTitle.forEach((item) => {
            item.removeAttribute('disabled');
        });
        incomeAmount.forEach((item) => {
            item.removeAttribute('disabled');
        });
        buttonPlusIncome.removeAttribute('disabled');
        fieldsExpenses[0].removeAttribute('disabled');
        fieldsExpenses[1].removeAttribute('disabled');
        fieldsExpenses[1].removeAttribute('disabled');
        expensesAmount.forEach((item) => {
            item.removeAttribute('disabled');
        });
        expensesTitle.forEach((item) => { 
            item.removeAttribute('disabled');
        });
        buttonPlusExpenses.removeAttribute('disabled');
        additionalАexpensesItem.removeAttribute('disabled');
        periodSelect.removeAttribute('disabled');
        targetAmount.removeAttribute('disabled');
        checkmark.removeAttribute('disabled');
        
        buttonСalculate.style.display = 'block';
        btnCancel.style.display = 'none';
    
        if(document.querySelectorAll('.income-items')[2])  { document.querySelectorAll('.income-items')[2].remove(); }
    
        if(document.querySelectorAll('.income-items')[1]) { document.querySelectorAll('.income-items')[1].remove(); }
    
        if(document.querySelectorAll('.expenses-items')[2]) {document.querySelectorAll('.expenses-items')[2].remove(); }
        
        if(document.querySelectorAll('.expenses-items')[1]) {document.querySelectorAll('.expenses-items')[1].remove();}
    }

    start() {
       
        if (salaryAmount.value === '') {
            return;
        }
    
        this.budget = +salaryAmount.value;
        this.getExpInc();
        this.getAddExpInc();
        this.getInfoDeposit();    

        this.getBudget();
        this.showResult();
        
        this.blocking();
        
    }
    
    changePersent() {
        const valueSelect = this.value;
        console.log('valueSelect: ', valueSelect);
        if (valueSelect === 'other') {
            depositPercent.style.display = 'inline-block';
            depositPercent.addEventListener('input', () => {
                depositPercent.value = depositPercent.value.replace(/[^\d]/g, '');
                if (depositPercent.value > 100) {
                    depositPercent.value = 100;
                    
                }
              }); 
              this.persentDeposit = depositPercent.value;         
        } else {
            depositPercent.value = valueSelect;
            depositPercent.style.display = 'none';
        }   

    }

    depositHandler() {
        if (depositСheck.checked) {
            depositBank.style.display = 'inline-block';
            depositAmount.style.display = 'inline-block';
            this.deposit = 'true';
            depositBank.addEventListener('change' , this.changePersent);
        } else {
            depositBank.style.display = 'none';
            depositAmount.style.display = 'none';
            depositPercent.style.display = 'none';
            depositBank.value = '';
            depositAmount.value = '';
            depositPercent.value = '';
            this.deposit = 'false';
            depositBank.removeEventListener('change' , this.changePersent);
        }
    }

    eventsListeners() {
        buttonСalculate.addEventListener('click',  this.start.bind(this));
    
        buttonPlusExpenses.addEventListener('click' , this.addExpIncBlock.bind(this));
        
        buttonPlusIncome.addEventListener('click' , this.addExpIncBlock.bind(this));
        
        periodSelect.addEventListener('input', this.getperiodAmount.bind(this));
        
        this.checkPlaceholder(getAllInput);
        
        btnCancel.addEventListener('click', this.clearForm.bind(this));

        depositСheck.addEventListener('change' , this.depositHandler.bind(this));
    }

}

const appData = new AppData();
appData.eventsListeners();






















