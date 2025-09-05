import { copyText } from '@mirawision/copily';

const copyToClipboard = (content: string, callbacks?: { onSuccess?: () => void, onFail?: () => void }) => {
  copyText(content)
    .then(() => callbacks?.onSuccess?.())
    .catch(() => callbacks?.onFail?.());
};

export { copyToClipboard };