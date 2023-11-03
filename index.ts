#!/bin/env bun

import it from 'markdown-it';
import anchor from 'markdown-it-anchor';

// @ts-ignore
import katex from 'markdown-it-katex';

const md = it({
  linkify: true,
  typographer: true,
})
  .use(anchor)
  .use(katex);

const file = await Bun.file(Bun.argv[2]).text();

// @ts-ignore
import _css from './gfm.css';
const css = (await Bun.file(_css).text())
  .replaceAll(/\s+/g, ' ')
  .replaceAll(/\/\*.*?\*\//g, '');

const rendered = md
  .render(file)
  .replaceAll('.md"', '.html"')
  .replaceAll('.md#', '.html#');

//     <link
//       rel="stylesheet"
//       href="https://cdn.jsdelivr.net/gh/Microsoft/vscode/extensions/markdown-language-features/media/markdown.css" />
//
//     <link
//       rel="stylesheet"
//       href="https://cdn.jsdelivr.net/gh/Microsoft/vscode/extensions/markdown-language-features/media/highlight.css" />
//     <link
//       rel="stylesheet"
//       href="https://cdn.jsdelivr.net/github-markdown-css/2.2.1/github-markdown.css" />

const html = `
<!DOCTYPE html>
<html>
  <head>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.5.1/katex.min.css" />
    <style>${css}</style>
  </head>
  <body class="vscode-light vscode-body">
    <div class="markdown-body">
      <div class="markdown-content">
        ${rendered}
      </div>
    </div>
  </body>
</html>
`;

await Bun.write(Bun.file(Bun.argv[3]), html);
