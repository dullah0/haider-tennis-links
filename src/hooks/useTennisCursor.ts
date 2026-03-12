import { useEffect } from 'react';

export function useTennisCursor() {
  useEffect(() => {
    const cursor = document.createElement('div');
    cursor.className = 'cursor';
    document.body.appendChild(cursor);

    const moveCursor = (e: MouseEvent) => {
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;
    };

    const onDown = () => cursor.classList.add('cursor--clicking');
    const onUp = () => cursor.classList.remove('cursor--clicking');

    document.addEventListener('mousemove', moveCursor);
    document.addEventListener('mousedown', onDown);
    document.addEventListener('mouseup', onUp);

    return () => {
      document.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('mouseup', onUp);
      cursor.remove();
    };
  }, []);
}
