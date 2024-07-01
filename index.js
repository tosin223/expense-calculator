const transactionsEl = document.querySelector(".transactions");
const balanceNumberEl = document.querySelector(".balance-number");
const numberIncomeEl = document.querySelector(".number-income");
const numberExpenseEl = document.querySelector(".number-expenses");
const inputDescriptionEl = document.querySelector(".input-description");
const inputAmountEl = document.querySelector(".input-amount");
const formEl = document.querySelector(".form");

const clickHandler = (e) => {
  //Remove transaction item visually
  const clickedEl = e.target.parentNode;
  clickedEl.remove();
  console.log(clickedEl);

  //update income or expense
  const amountEl = clickedEl.querySelector(".transaction_amount");
  const amount = +amountEl.textContent;

  if (amount > 0) {
    const currentIncome = +numberIncomeEl.textContent;
    const availableIncome = currentIncome - amount;
    numberIncomeEl.textContent = availableIncome;
  } else {
    const currentExpense = +numberExpenseEl.textContent;
    const availableExpense = currentExpense - amount * -1;
    numberExpenseEl.textContent = availableExpense;
    console.log(availableExpense);
    console.log("This is a negative number");
  }

  //update balance
  const income = +numberIncomeEl.textContent;
  const expense = +numberExpenseEl.textContent;
  balanceNumberEl.textContent = income - expense;

  //make red if negatgive balance

  income - expense < 0
    ? (balanceNumberEl.style.color = "red")
    : (balanceNumberEl.style.color = "green");
};
transactionsEl.addEventListener("click", clickHandler);
//to remove each li, you will use an event object

formEl.addEventListener("submit", (e) => {
  e.preventDefault();

  //get input values
  const description = inputDescriptionEl.value;
  console.log(description);
  const amount = +inputAmountEl.value;
  console.log(amount);

  //create transaction item
  const transactionItemHtml = `
    <li class="transaction transaction-${amount > 0 ? "income" : "expense"}">
            <span class="transaction_text">${description}</span>
            <span class="transaction_amount">${
              amount > 0 ? "+" : ""
            }${amount}</span>
            <button class="transaction_btn">X</button>
     </li>
  `;
  //insert new html
  transactionsEl.insertAdjacentHTML("beforeend", transactionItemHtml);

  //clear form field
  inputAmountEl.value = "";
  inputDescriptionEl.value = "";

  //update income or expens

  if (amount > 0) {
    const currentIncome = +numberIncomeEl.textContent;
    const availableIncome = currentIncome + amount;
    numberIncomeEl.textContent = availableIncome;
  } else {
    const currentExpense = +numberExpenseEl.textContent;
    const availableExpense = currentExpense - amount * -1;
    numberExpenseEl.textContent = availableExpense;
    console.log(availableExpense);
    console.log("This is a negative number");
  }

  //update balance
  const income = +numberIncomeEl.textContent;
  const expense = +numberExpenseEl.textContent;

  const updatedBalance = income - expense;
  balanceNumberEl.textContent = updatedBalance;
});
