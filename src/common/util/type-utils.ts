export type ValueOf<T extends Record<any, any>> = T[keyof T];
