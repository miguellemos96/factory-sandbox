// Command-line entry: node src/cli.ts <add "text" | done <id> | list>
// Stores the list in todos.json in the current folder (override with TODO_FILE).
import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import { addTodo, completeTodo, formatTodos, parseId, type Todo } from './todo.ts'

const file = process.env.TODO_FILE ?? 'todos.json'
const load = (): Todo[] => (existsSync(file) ? (JSON.parse(readFileSync(file, 'utf8')) as Todo[]) : [])
const save = (todos: Todo[]) => writeFileSync(file, `${JSON.stringify(todos, null, 2)}\n`)

const [command, ...args] = process.argv.slice(2)

try {
  if (command === 'add') save(addTodo(load(), args.join(' ')))
  else if (command === 'done') save(completeTodo(load(), parseId(args[0] ?? '')))
  else if (command !== 'list' && command !== undefined) throw new Error(`Unknown command "${command}". Use add, done or list.`)
  console.log(formatTodos(load()))
} catch (error) {
  console.error((error as Error).message)
  process.exit(1)
}
