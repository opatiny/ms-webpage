import { flushSync } from 'react-dom';
import { createRoot } from 'react-dom/client';

import { SVGMaze } from './components/SVGMaze';

export function render(options) {
  const element = <SVGMaze {...options} />;
  const div = document.createElement('div');
  const root = createRoot(div);
  flushSync(() => {
    root.render(element);
  });
  return div.innerHTML;
}
