# mdp

Converts Markdown files to printable HTML with Github/VSCode styles.

## Run

### With Bun

```bash
bun run ./index.ts INPUT.md OUTPUT.html
```

### Compile to Binary

```bash
bun build --compile ./index.ts --outfile mdp
./mdp INPUT.md OUTPUT.html
```
