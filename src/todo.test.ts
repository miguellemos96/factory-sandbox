import { describe, expect, it } from 'vitest'
import { addTodo, completeTodo, formatTodos } from './todo.ts'

describe('addTodo', () => {
  it('gives each new to-do the next id', () => {
    const todos = addTodo(addTodo([], 'buy milk'), 'call mum')
    expect(todos.map((t) => t.id)).toEqual([1, 2])
  })

  it('trims the text and rejects empty text', () => {
    expect(addTodo([], '  read  ')[0].text).toBe('read')
    expect(() => addTodo([], '   ')).toThrow('needs some text')
  })
})

describe('completeTodo', () => {
  it('marks only the given to-do as done', () => {
    const todos = completeTodo(addTodo(addTodo([], 'a'), 'b'), 2)
    expect(todos.map((t) => t.done)).toEqual([false, true])
  })

  it('rejects an unknown id', () => {
    expect(() => completeTodo([], 7)).toThrow('No to-do with id 7')
  })
})

describe('formatTodos', () => {
  it('shows a checkbox, the id and the text', () => {
    expect(formatTodos(completeTodo(addTodo(addTodo([], 'a'), 'b'), 1))).toBe('[x] 1. a\n[ ] 2. b')
  })

  it('says so when the list is empty', () => {
    expect(formatTodos([])).toBe('Nothing to do.')
  })
})
