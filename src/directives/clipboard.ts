import Clipboard from 'clipboard';
import { DirectiveOptions, DirectiveBinding } from 'vue/types/options';

if (!Clipboard) {
  throw Error('you should npm install `clipboard` --save at first');
}

let onSuccess: Function | null;
let onError: Function | null;
let clipboardInterface: Clipboard | null;

const bindUpdate = (el: HTMLElement, binding: DirectiveBinding, isBind?: boolean) => {
  if (binding.arg === 'success') {
    onSuccess = binding.value;
    return;
  }

  if (binding.arg === 'error') {
    onError = binding.value;
    return;
  }

  clipboardInterface = new Clipboard(el, {
    text: () => binding.value,
    action: () => (binding.arg === 'cut' ? 'cut' : 'copy'),
  });

  if (!isBind) {
    return;
  }

  clipboardInterface.on('success', (event) => {
    const callback = onSuccess;
    callback && callback(event);
  });

  clipboardInterface.on('error', (event) => {
    const callback = onError;
    callback && callback(event);
  });
};

export const clipboard: DirectiveOptions = {
  bind(el, binding) {
    bindUpdate(el, binding, true);
  },

  update(el, binding) {
    bindUpdate(el, binding);
  },

  unbind(_, binding) {
    if (binding.arg === 'success') {
      onSuccess = null;
    } else if (binding.arg === 'error') {
      onError = null;
    } else {
      clipboardInterface && clipboardInterface.destroy();
      clipboardInterface = null;
    }
  },
};
