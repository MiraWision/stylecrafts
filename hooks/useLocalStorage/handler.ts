import Observer from './observer';

interface IOptions {
  key: string;
}

class BaseLocalStorageHandler<T> extends Observer<T | null> {
  private key: string;
  private value: T | null = null;

  constructor(options: IOptions) {
    super();
    this.key = options.key;

    // This code will only execute in a browser environment
    if (typeof window !== 'undefined') {
      window.addEventListener('storage', (event) => {
        if (event.key !== this.key) return;

        if (event.newValue === null) {
          this.remove();
        } else {
          this.set(this.deserialize(event.newValue));
        }
      }, false);
    }
  }

  get(): T | null {
    if (this.value !== null) return this.value;

    if (typeof window !== 'undefined') {
      const value = window.localStorage.getItem(this.getKey());
      const parsedValue = value !== null ? this.deserialize(value) : null;
      this.value = parsedValue;
    }

    return this.value;
  }

  set(value: T) {
    this.value = value;

    if (typeof window !== 'undefined') {
      try {
        window.localStorage.setItem(this.getKey(), this.serialize(value));
        this.notifyAll(value);
      } catch (e) {
        console.error('LOCAL STORAGE SET ITEM ERROR', e);
      }
    }
  }

  remove() {
    this.value = null;

    if (typeof window !== 'undefined') {
      window.localStorage.removeItem(this.getKey());
      this.notifyAll(null);
    }
  }

  private getKey(): string {
    return this.key;
  }

  protected deserialize(value: string): T {
    try {
      return JSON.parse(value) as T;
    } catch (e) {
      console.error('DESERIALIZE ERROR', e);
      return value as unknown as T;
    }
  }

  protected serialize(value: T): string {
    try {
      return JSON.stringify(value);
    } catch (e) {
      console.error('SERIALIZE ERROR', e);
      return '';
    }
  }
}

export default BaseLocalStorageHandler;

const createLocalStorageInstance = <T>(options: IOptions) => {
  return new BaseLocalStorageHandler<T>(options);
};

export {
  createLocalStorageInstance,
};