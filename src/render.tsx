import { renderToStaticMarkup } from 'react-dom/server';

import { SVGMaze } from './components/SVGMaze';

export function render(options) {
  const result = renderToStaticMarkup(<SVGMaze {...options} />);
  return result;
}
