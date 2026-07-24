/**
 * Tiny classnames combinator so we don't need an extra dependency.
 * Usage: cn('base', condition && 'extra', ['array', 'of', 'classes'])
 */
export function cn(...args) {
  return args
    .flat(Infinity)
    .filter(Boolean)
    .join(' ')
}
