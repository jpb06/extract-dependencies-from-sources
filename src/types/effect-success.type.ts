/* eslint-disable @typescript-eslint/no-explicit-any */
import { Effect } from 'effect';

export type Success<T extends Effect.Effect<any, any, any>> = [T] extends [
  Effect.Effect<infer _R, infer _E, infer _A>,
]
  ? _A
  : never;

export type FnSuccess<
  T extends (...args: any) => Effect.Effect<unknown, unknown, unknown>,
> = Effect.Effect.Success<ReturnType<T>>;
