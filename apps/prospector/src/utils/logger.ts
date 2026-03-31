import chalk from 'chalk'

export const log = {
  info: (msg: string) => console.log(chalk.blue('ℹ'), msg),
  success: (msg: string) => console.log(chalk.green('✓'), msg),
  warn: (msg: string) => console.log(chalk.yellow('⚠'), msg),
  error: (msg: string) => console.log(chalk.red('✗'), msg),
  dim: (msg: string) => console.log(chalk.dim('  ' + msg)),
  prospect: (name: string, score: number, status: string) => {
    const color = status === 'Chaud' ? chalk.red : status === 'Tiède' ? chalk.yellow : chalk.blue
    console.log(`  ${color('●')} ${name} — score ${score}/100 ${color(`[${status}]`)}`)
  },
}
