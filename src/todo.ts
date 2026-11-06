// Pure to-do list logic. No file or console I/O here: that lives in cli.ts.

export interface Todo {
  id: number
  text: string
  done: boolean
}

export const addTodo = (todos: readonly Todo[], text: string): Todo[] => {
  const trimmed = text.trim()
  if (!trimmed) throw new Error('A to-do needs some text.')
  const id = todos.reduce((max, t) => Math.max(max, t.id), 0) + 1
  return [...todos, { id, text: trimmed, done: false }]
}

export const parseId = (text: string): number => {
  if (!/^\d+$/.test(text)) throw new Error(`Id must be a whole number, got "${text}".`)
  return Number(text)
}

export const completeTodo =(todos: readonly Todo[], id: number): Todo[] => {
  if (!todos.some((t) => t.id === id)) throw new Error(`No to-do with id ${id}.`)
  return todos.map((t) => (t.id === id ? { ...t, done: true } : t))
}

export const formatTodos = (todos: readonly Todo[]): string =>
  todos.length === 0 ? 'Nothing to do.' : todos.map((t) => `${t.done ? '[x]' : '[ ]'} ${t.id}. ${t.text}`).join('\n')
