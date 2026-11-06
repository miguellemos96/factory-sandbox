import { spawnSync } from 'node:child_process'
import { mkdtempSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'

// Runs the real CLI in a child process, against a throwaway to-do file.
let dir: string
const cli = (...args: string[]) => {
  const result = spawnSync(process.execPath, ['src/cli.ts', ...args], {
    encoding: 'utf8',
    env: { ...process.env, TODO_FILE: join(dir, 'todos.json') },
  })
  return { status: result.status, stdout: result.stdout.trim(), stderr: result.stderr.trim() }
}

beforeEach(() => {
  dir = mkdtempSync(join(tmpdir(), 'todo-cli-'))
})

afterEach(() => {
  rmSync(dir, { recursive: true, force: true })
})

describe('done', () => {
  it('marks the to-do with the given id as done', () => {
    cli('add', 'a')
    const result = cli('done', '1')
    expect(result.status).toBe(0)
    expect(result.stdout).toBe('[x] 1. a')
  })

  it('says the id must be a whole number when it is not a number', () => {
    cli('add', 'a')
    const result = cli('done', 'abc')
    expect(result.stderr).toBe('Id must be a whole number, got "abc".')
    expect(result.status).toBe(1)
  })
})
