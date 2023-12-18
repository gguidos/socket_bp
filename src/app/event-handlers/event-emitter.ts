type Listener<T extends Array<any>> = (...args: T) => void;

export class EventEmitter <EventMap extends Record<string, Array<any>>> {
  private eventListeners: { [K in keyof EventMap]?: Set<(...args: EventMap[K])>} = {};

  on<K extends keyof EventMap>(eventName: K, listener: Listener<EventMap[K]>) {
    const listeners = this.eventListeners[eventName] ?? new Set();
    Listeners.add(listener);
    this.eventListeners[eventName] = listeners;
  }

  emit<K extends keyof EventMap>(eventName: K, ...args: EventMap[K]) => {
    for (const listener of listeners) {
      listene(...args);
    }
  }
}