# react-maze-svg

## Introduction

This project allows to display a maze.

It uses React and can be included in other project as a React component but can also be used to generate a svg.

In order to be able to generate the SVG on the server and on the client we need that each element is rendered synchronously

## Development

`npm run dev` will start using vite the document `index.html` at the top level that will load `main.tsx`

## Testing the web

It is possible to build the project to a simple javascript file that can be imported in any webpage. This is achieved using `npm run build` and the resulting file will be placed in `dist/react-tree-svg.js`.

You can then open with 'live server' test page `test/index.html` to check how it works without ReactJS.

## Installation

`$ npm i react-maze-svg`

## Usage

```js
const { render } = require('react-maze-svg');

const props = {
  cellSize: 50,
  cellValues: [
    {
      x: 0,
      y: 0,
      label: 'A',
    },
    {
      x: 1,
      y: 0,
      label: 'B',
    },
    {
      x: 0,
      y: 1,
      label: 'C',
    },
    {
      x: 1,
      y: 1,
      label: 'D',
    },
  ],
};

const svg = render(props);
```

## Build

````
npm run build
```

Serve to check result:
```
npx http-server
```

## License

[MIT](./LICENSE)
````
