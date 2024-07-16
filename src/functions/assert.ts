export function assert(value: unknown): asserts value {
  if (!value) {
    throw new Error('erro com o valor nulo..')
  }
}