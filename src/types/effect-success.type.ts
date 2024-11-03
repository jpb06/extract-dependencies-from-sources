import type { Effect } from 'effect';

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export type Success<T extends Effect.Effect<any, any, any>> = [T] extends [
  Effect.Effect<infer _R, infer _E, infer _A>,
]
  ? _A
  : never;

export type FnSuccess<
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  T extends (...args: any) => Effect.Effect<unknown, unknown, unknown>,
> = Effect.Effect.Success<ReturnType<T>>;
