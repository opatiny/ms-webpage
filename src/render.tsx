import { flushSync } from 'react-dom';
import { createRoot } from 'react-dom/client';

import { Monitoring } from './components/Monitoring';

export function render(options) {
  const element = <Monitoring {...options} />;
  const div = document.createElement('div');
  const root = createRoot(div);
  flushSync(() => {
    root.render(element);
  });
  return div.innerHTML;
}
