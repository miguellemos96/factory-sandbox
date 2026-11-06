# factory-sandbox

A tiny to-do CLI whose real job is to prove a **personal software factory**. Scheduled Claude Code sessions take `ready-for-agent` issues and turn them into PRs, a separate session verifies each PR, and you merge.

```bash
npm ci
npm start -- add "buy milk"
npm start -- done 1
npm start -- list
npm run check        # typecheck, lint, unit tests, factory script tests
```

## How the factory works here

| Piece | Where |
|---|---|
| Rules for every session | `CLAUDE.md` |
| Work one issue → PR, or park | `.claude/skills/worker/` |
| Judge one PR → PASS / FAIL / INCONCLUSIVE | `.claude/skills/verifier/` |
| One scheduled run: pick a step, do it, log it | `.claude/skills/factory-tick/` |
| Decide the next step from GitHub state (no AI) | `scripts/factory/next-step.mjs` |
| Allow/deny list for unattended runs | `.claude/settings.json` |
| Block pushes to `main`, merges, approval labels | `.claude/hooks/guard-bash.mjs` |

The full design and its reasoning are in the separate `personal-factory` folder.

**Known gap:** a Desktop routine runs every session with the same settings. So the worker *could* post the `verifier` status that the verifier is meant to own. This is acceptable while you merge every PR yourself (`autoMerge: false`). Close the gap before you turn on auto-merge, by giving each role its own settings.

## Setup (one time)

1. **GitHub CLI:** install it, then log in with your **personal** account:

   ```powershell
   winget install --id GitHub.cli
   ```

   ```bash
   gh auth login
   ```

2. **Create the repo and push.** Run this from this folder:

   ```bash
   gh repo create factory-sandbox --public --source . --push
   ```

3. **Labels:**

   ```bash
   for l in ready-for-agent needs-info needs-triage human bug feature refactor chore docs tests-change-approved; do gh label create "$l" --force; done
   ```

4. **Branch protection on `main`** (free on public repos): Settings → Rules → Rulesets → New branch ruleset, target `main`. Turn on *Require a pull request before merging* and *Require status checks to pass* (pick `check`). Turn on *Block force pushes*.

5. **Factory log issue:** create an issue titled `Factory log` and pin it. Put its number in `%USERPROFILE%\.factory\config.json` (copy `docs/factory.config.example.json`).

6. **Seed issues:** create the issues in `docs/seed-issues.md`.

7. **Claude account:** in a Claude Code session in this folder, run `/status` and confirm it shows your **personal Pro** account.

8. **First trial, by hand** (build plan milestones M2–M3):
   - `/worker <N>` on the bug issue.
   - In a **new** session, `/verifier <PR url>`.

9. **Schedule:** open Claude Desktop → Code → Routines → New routine → Local.
   - Folder: a separate clone of this repo (for example `..\factory-sandbox-runner`), so the factory never touches your own working copy.
   - Prompt: `/factory-tick`. Run it hourly within your night hours.

## Stop it

Create `%USERPROFILE%\.factory\STOP`, or pause the routine.
