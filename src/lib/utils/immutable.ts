export interface ValueController<T> {
  set(value: T): void;
  update(updater: (value: T) => T): void;
}

export interface MemberController<T> extends ValueController<T> {
  delete(): void;
}

export interface ItemController<T> extends MemberController<T> {
  addBefore(value: T): void;
  addAfter(value: T): void;

  swapWith(index: number): void;
  moveTo(index: number): void;
}

export interface EntryController<K, T> extends MemberController<T> {
  renameSafely(newKey: K): void;
  renameAndOverwrite(newKey: K): void;
}

export interface SetController<T> {
  add(value: T): void;
  delete(value: T): void;
  clear(): void;
}

export interface ListController<T> {
  setValue(index: number, value: T): void;
  updateValue(index: number, updater: (value: T) => T): void;
  delete(index: number): void;
  setSize(size: number): void;

  insertBefore(index: number, value: T): void;
  insertAfter(index: number, value: T): void;

  pop(): void;
  shift(): void;
  push(...values: T[]): void;
  unshift(...values: T[]): void;

  swap(index1: number, index2: number): void;
  moveTo(sourceIndex: number, targetIndex: number): void;
}

export interface MapController<K, T> {
  setValue(key: K, value: T): void;
  updateValue(key: K, updater: (value: T) => T): void;
  delete(key: K): void;
  clear(): void;

  renameSafely(oldKey: K, newKey: K): void;
  renameAndOverwrite(oldKey: K, newKey: K): void;
}

export interface RecordController<T extends object> {
  setValue<K extends keyof T>(key: K, value: T[K]): void;
  updateValue<K extends keyof T>(key: K, updater: (value: T[K]) => T[K]): void;
}
