type ClassValue = string | number | null | undefined | false | ClassValue[];

function flatten(values: ClassValue[]): string[] {
  return values.flatMap((value) => {
    if (!value) return [];
    if (Array.isArray(value)) return flatten(value);
    return [String(value)];
  });
}

/** Joins truthy class names together, filtering out falsy values. */
export function cn(...values: ClassValue[]): string {
  return flatten(values).join(" ");
}
