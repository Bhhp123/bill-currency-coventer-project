#! /usr/bin/env node

import inquirer from 'inquirer';

console.log('\n\t\t\x1b[42m--------------------------------------------\x1b[0m');
  console.log('\t\t\x1b[48;2;0;255;255mBilawal Hussain\'s CURRENCY CONVENTER PROJECT\x1b[0m');
  console.log('\t\t\x1b[42m--------------------------------------------\x1b[0m');

interface CurrencyRate {
  [currency: string]: number; // e.g. "USD": 1.0, "EUR": 0.88, ...
}

const currencyRates: CurrencyRate = {
  USD: 1.0,
  EUR: 0.93,
  PKR: 279.09, // Pakistani Rupee
  INR: 83.40, // Indian Rupee
  GBP: 0.80, // British Pound
  // Add more currency rates here...
};

function convertCurrency(amount: number, from: string, to: string): number {
  if (!(from in currencyRates) || !(to in currencyRates)) {
    throw new Error(`Unsupported currency: ${from} or ${to}`);
  }
  const rate = currencyRates[to] / currencyRates[from];
  return amount * rate;
}

async function main() {
  while (true) {
    try {
      const { action, amount, from, to } = await inquirer.prompt([
        {
          type: 'list',
          name: 'action',
          message: `\x1b[36mSelect an action:\x1b[0m`,
          choices: ['Convert currency', 'Exit'],
        },
        {
          type: 'number',
          name: 'amount',
          message: `\x1b[36mEnter the amount to convert:\x1b[0m`,
          when: ({ action }) => action === 'Convert currency',
        },
        {
          type: 'list',
          name: 'from',
          message: `\x1b[33mSelect the currency to convert from:\x1b[0m`,
          choices: Object.keys(currencyRates),
          when: ({ action }) => action === 'Convert currency',
        },
        {
          type: 'list',
          name: 'to',
          message: `\x1b[32mSelect the currency to convert to:\x1b[0m`,
          choices: Object.keys(currencyRates),
          when: ({ action }) => action === 'Convert currency',
        },
      ]);

      if (action === 'Exit') {
        console.log('\x1b[31mExiting...\x1b[0m');
        break;
      }

      const convertedAmount = convertCurrency(amount, from, to);
      console.log(`\x1b[34m${amount} ${from} is equal to ${convertedAmount} ${to}\x1b[0m`);
    } catch (error) {
      console.error(`\x1b[31merror #%d${onmessage}\x1b[0m`);
    }
  }
}

main();