export type StateSetter<T> = (valueOrHandler: T | ((prevValue: T) => T)) => void;
export type ControlParams<T> = [T, StateSetter<T>];
