import type { Effect } from 'effect';

// biome-ignore lint/suspicious/noExplicitAny: effect
export type Success<T extends Effect.Effect<any, any, any>> = [T] extends [
  Effect.Effect<infer _R, infer _E, infer _A>,
]
  ? _A
  : never;

export type FnSuccess<
  // biome-ignore lint/suspicious/noExplicitAny: effect
  T extends (...args: any) => Effect.Effect<unknown, unknown, unknown>,
> = Effect.Effect.Success<ReturnType<T>>;
