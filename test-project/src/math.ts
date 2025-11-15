
import chalk from 'chalk';


// Only using chalk, others are unused
export function add(a: number, b: number): number {
  console.log(chalk.green('Adding numbers'));
  return a + b;
}

export function subtract(a: number, b: number): number {
  return a - b;
}