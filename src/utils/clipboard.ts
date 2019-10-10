import { Message } from 'element-ui';
import Clipboard from 'clipboard';

export const handleClipboard = (text: string, event: MouseEvent, callback?: Function) => {
  const clipboard = new Clipboard(event.target as Element, {
    text: () => text
  });

  clipboard.on('success', () => {
    Message.success('Copy successfully');
    callback && callback();
    clipboard.destroy();
  });

  clipboard.on('error', () => {
    Message.error('Copy failed');
    clipboard.destroy();
  });

  (clipboard as any).onClick(event);
};
