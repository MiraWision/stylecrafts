// theme-storage-handler.js
import BaseLocalStorageHandler from './handler';

const themeStorageHandler = new BaseLocalStorageHandler<string>({ key: 'theme' });

export default themeStorageHandler;
