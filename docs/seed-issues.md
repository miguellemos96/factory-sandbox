# Seed issues

Five small issues to prove the factory. Each is cheap: one function, a few tests. Create them on GitHub (see the README's setup) with the labels shown. Add `ready-for-agent` to one at a time during the first trials.

---

## 1. `remove` command deletes a to-do

Labels: `feature`, `ready-for-agent`

Add `npm start -- remove <id>`, which deletes a to-do.

### Acceptance scenarios

- **Given** to-dos 1 "a" and 2 "b", **when** I run `remove 1`, **then** `list` shows only `[ ] 2. b`.
- **Given** no to-do with id 9, **when** I run `remove 9`, **then** it prints `No to-do with id 9.` and exits with code 1.
- **Given** I removed to-do 2 of 1–2, **when** I add a new to-do, **then** it gets id 2 (ids continue from the highest remaining one; this matches today's `addTodo`).

---

## 2. `done` with a non-number id says so clearly

Labels: `bug`, `ready-for-agent`

**Steps:** `npm start -- add a`, then `npm start -- done abc`.
**Expected:** `Id must be a whole number, got "abc".` and exit code 1.
**Actual:** `No to-do with id NaN.`

---

## 3. `list --open` shows only unfinished to-dos

Labels: `feature`, `ready-for-agent`

### Acceptance scenarios

- **Given** to-dos 1 "a" (done) and 2 "b" (open), **when** I run `list --open`, **then** only `[ ] 2. b` is printed.
- **Given** all to-dos are done, **when** I run `list --open`, **then** it prints `Nothing to do.`
- Plain `list` is unchanged.

---

## 4. `done` on an already-done to-do warns

Labels: `feature`, `ready-for-agent`

### Acceptance scenarios

- **Given** to-do 1 is already done, **when** I run `done 1`, **then** it prints `To-do 1 is already done.` to stderr, leaves the list unchanged, and exits with code 0.

---

## 5. Deliberately vague: "make the list nicer"

Labels: `feature`, `ready-for-agent`

Make the list output nicer.

> This one is meant to be **parked**. "Done" is not checkable, so the worker should add `needs-info` and ask what "nicer" means. If it guesses instead, tighten the worker skill.
