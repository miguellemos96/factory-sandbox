# factory-sandbox

A tiny to-do command-line app. Its real purpose is to prove a personal software factory: scheduled Claude Code sessions work `ready-for-agent` issues into PRs, a separate session verifies each PR, and the human merges. The app is deliberately small, so each issue is cheap.

## Commands

Run from the repo root. Node 24 or later runs the TypeScript directly (no build step).

- Install: `npm ci`
- Typecheck: `npm run typecheck`
- Lint: `npm run lint`
- Unit tests: `npm test`
- Factory script tests: `npm run test:factory`
- All of the above: `npm run check`
- Run the app: `npm start -- add "buy milk"`, `npm start -- done 1`, `npm start -- list`. Set `TODO_FILE=.factory-tmp/todos.json` to keep test data out of the repo.

## Workflow

- Base branch: `main`. Never push to it; open a PR from `factory/<N>-<slug>`.
- One issue per PR. The PR body says `Closes #N` and follows `.github/pull_request_template.md`.
- Bugs: write a failing test first. Features: turn the issue's acceptance scenarios into tests.
- Never weaken or delete an existing test to make a change pass.
- Don't call a behavior change done until you have run the CLI and seen it work. Paste the output into the PR's Evidence section.
- Scratch files go in `.factory-tmp/` (gitignored).

## Conventions

- `src/todo.ts` holds pure logic with no I/O. `src/cli.ts` is the only file that touches the console and the file system.
- Tests sit next to the code, as `*.test.ts`, and use Vitest.
- Factory internals live in `.claude/skills/` (worker, verifier, factory-tick), `.claude/hooks/` and `scripts/factory/`. Change them only through an issue labeled `human`; the factory does not edit its own machinery.
