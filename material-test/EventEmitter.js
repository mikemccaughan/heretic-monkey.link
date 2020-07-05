export const ErrorMonitorSymbol = Symbol("ErrorMonitor");
export class EventEmitter {
  constructor() {
    this.listeners = new Map();
    this.defaultMaxListeners = 30;
    this.maxListeners = this.defaultMaxListeners;
  }
  get [ErrorMonitorSymbol]() {
    const listeners = this.listeners.get("error");
    return listeners && listeners.length ? listeners[0] : null;
  }
  set [ErrorMonitorSymbol](value) {
    const listeners = this.listeners.get("error");
    listeners.unshift(value);
  }
  addEventListener(eventName, listener, options) {
    const listeners = this.listeners.get(eventName) || [];
    if (listeners.length > this.maxListeners - 1) {
      throw new Error(
        `The number of max listeners (${this.maxListeners}) has been reached.`
      );
    }
    if (options && options.once) {
      listener.once = true;
    }
    listeners.push(listener);
    this.listeners.set(eventName, listeners);
  }
  emit(eventName, ...args) {
    const listeners = this.listeners.get(eventName) || [];
    for (const listener of listeners) {
      listener.apply(this, args);
    }
    const newListeners = listeners.filter((listener) => !listener.once);
    this.listeners.set(eventName, newListeners);
    return listeners.length > 0;
  }
  eventNames() {
    return this.listeners.keys();
  }
  listenerCount(eventName) {
    const listeners = this.listeners.get(eventName) || [];
    // @ts-ignore
    return listeners?.length || 0;
  }
  listeners(eventName) {
    const listeners = this.listeners.get(eventName) || [];
    return listeners;
  }
  off(eventName, listener) {
    const listeners = this.listeners.get(eventName) || [];
    listeners.splice(listeners.indexOf(listener), 1);
    this.listeners.set(eventName, listeners);
    return this;
  }
  on(eventName, listener) {
    const listeners = this.listeners.get(eventName) || [];
    listeners.push(listener);
    this.listeners.set(eventName, listeners);
    return this;
  }
  prependListener(eventName, listener) {
    const listeners = this.listeners.get(eventName) || [];
    listeners.unshift(listener);
    this.listeners.set(eventName, listeners);
    return this;
  }
  prependOnceListener(eventName, listener) {
    const listeners = this.listeners.get(eventName) || [];
    listener.once = true;
    listeners.unshift(listener);
    this.listeners.set(eventName, listeners);
    return this;
  }
  removeAllListeners(eventName) {
    if (eventName && eventName.length) {
      this.listeners.delete(eventName);
    } else {
      this.listeners.clear();
    }
    return this;
  }
  removeListener(eventName, listener) {
    const listeners = this.listeners.get(eventName) || [];
    listeners.splice(listeners.indexOf(listener), 1);
    this.listeners.set(eventName, listeners);
    return this;
  }
  setMaxListeners(n) {
    this.maxListeners = n === 0 ? Infinity : n;
  }
  rawListeners(eventName) {
      return this.listeners(eventName);
  }
  once(eventName, listener) {
    const listeners = this.listeners.get(eventName) || [];
    listener.once = true;
    listeners.push(listener);
    this.listeners.set(eventName, listeners);
    return this;
  }
}
/*
export function once(emitter, eventName) {
    return new Promise((resolve, reject) => {
        emitter.on('error', reject);
        emitter.once(eventName, resolve);
    });
}

export function* on(emitter, eventName) {
    const listeners = emitter.listeners(eventName);
    for (const listener of listeners) {
        yield once(emitter, eventName);
    }
}
*/