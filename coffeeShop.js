import inquirer from 'inquirer';
let drinkPrice1 = 0;
let drinkPrice2 = 0;
let drinkPrice3 = 0;

const questions = [
    {
        type: "input",
        name: "name",
        message: "What is your name?",
        validate: (answer) => {
            if (answer === ""){
                return "Please enter a valid name"
            }
            return true
        }
    },
    {
        type: "input",
        name: "totalCash",
        message: "How much money do you have to spend?",
        validate: (answer) => {
            if (isNaN(answer)){
                return "Please enter a valid number"
            }
            return true
        }
    },
    {
        type: 'list',
        name: 'shop',
        message: 'What shop would you like to order from?',
        choices: ['Costa', 'CaffeNero', 'Starbucks']
    },
    {
        type: 'checkbox',
        name: 'CostaMenu',
        message: 'What would you like to order?',
        choices: ["Latte", "Cappuccino", "Mocha"],
        when: function( answers ) {
            return answers.shop === "Costa";
          },
          validate(answer) {
            if (answer.length < 1) {
              return 'You must choose at least one drink.';
            }
    
            return true;
          },
    },
    {
        type: 'checkbox',
        name: 'CaffeNeroMenu',
        message: 'What would you like to order?',
        choices: ["Cortado", "Espresso", "Flat white"],
        when: function( answers ) {
            return answers.shop === "CaffeNero";
          },
          validate(answer) {
            if (answer.length < 1) {
              return 'You must choose at least one drink.';
            }
    
            return true;
          },
    },
    {
        type: 'checkbox',
        name: 'StarbucksMenu',
        message: 'What would you like to order?',
        choices: ["Ice coffee", "Tea", "Americano"],
        when: function( answers ) {
            return answers.shop === "Starbucks";
          },
          validate(answer) {
            if (answer.length < 1) {
              return 'You must choose at least one drink.';
            }
    
            return true;
          },
    }
]

class CoffeeShopTill {
    constructor(menu) {
        this.drinksMenu = menu;
    }

    drinksOrdered(drink1, drink2, drink3) {

        for (let i = 0; i < this.drinksMenu.length; i ++) {
            if (drink1 === this.drinksMenu[i]) {
                drinkPrice1 = this.drinksMenu[i + 1];  
            }
            if (drink2 === this.drinksMenu[i]) {
                drinkPrice2 = this.drinksMenu[i + 1];  
            }
            if (drink3 === this.drinksMenu[i]) {
                drinkPrice3 = this.drinksMenu[i + 1];
            }
        };
        let drinkTotal = drinkPrice1 + drinkPrice2 + drinkPrice3;
        return drinkTotal;
    }
}

const Starbucks = new CoffeeShopTill(["Ice coffee", 3.94, "Tea", 2.55, "Americano", 3.15]);
const Costa = new CoffeeShopTill(["Latte", 1.75, "Cappuccino", 3.33, "Mocha", 3.89]);
const CaffeNero = new CoffeeShopTill(["Cortado", 2.68, "Espresso", 2.99, "Flat white", 4.25]);


///////////////Stretch/////////////////////


class Customer{
    constructor(name, totalCash){
        this.name = name;
        this.totalCash = totalCash;
    }

    drinksWanted(shop, drink1, drink2, drink3){
        // console.log(shop, drink1, drink2, drink3)
        let drinksWantedTotal = shop.drinksOrdered(drink1, drink2, drink3);
        let changeDue = this.totalCash - drinksWantedTotal;
        if (drinksWantedTotal <= this.totalCash){
            if (drink2 == undefined) {
                return `Thank you ${this.name}, \nYou have ordered a ${drink1}. your total is £${drinksWantedTotal}.\nYou have £${changeDue} remaining.`;
            }else if (drink3 == undefined) {
                return `Thank you ${this.name}, \nYou have ordered a ${drink1} for ${drinkPrice2} and a ${drink2} for ${drinkPrice2}. your total is £${drinksWantedTotal}.\nYou have £${changeDue} remaining.`;
            } else {
                return `Thank you ${this.name}, \nYou have ordered a ${drink1} for ${drinkPrice1}, a ${drink2} for ${drinkPrice2} and a ${drink3} for ${drinkPrice3}. your total is £${drinksWantedTotal}.\nYou have £${changeDue} remaining.`;
            }
        } else {
            return `I am sorry ${this.name}, you can not afford the drinks that you have ordered.`;
        }
    }
}

inquirer
.prompt(questions).then((answers) => {
    let custName = answers.name;
    let walletTotal = answers.totalCash;
    let chosenShop = null;
    if (answers.shop == "Starbucks"){
        chosenShop = Starbucks;
    }else if (answers.shop == "Costa"){
        chosenShop = Costa;
    } else {
        chosenShop = CaffeNero;
    }

    let caffeNeroAnswers = answers.CaffeNeroMenu
    let costaAnswers = answers.CostaMenu
    let starbucksAnswers = answers.StarbucksMenu
    let chosenDrinks = [];
    if (caffeNeroAnswers !== undefined){
        chosenDrinks = caffeNeroAnswers;
    } else if (costaAnswers !== undefined){
        chosenDrinks = costaAnswers;
    } else {
        chosenDrinks = starbucksAnswers;
    }

    const inputCust = new Customer(custName, walletTotal);
    console.log(inputCust.drinksWanted(chosenShop, chosenDrinks[0], chosenDrinks[1], chosenDrinks[2]));
  });


