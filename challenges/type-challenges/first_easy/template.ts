// type First<T extends unknown[]> = T extends [infer First, ...unknown[]] ? First : never
// type First<T extends unknown[]> = T extends [] ? never : T[0]
// type First<T extends unknown[]> = T["length"] extends 0 ? never : T[0]
type First<T extends unknown[]> = T[0] extends T[number] ? T[0] : never
