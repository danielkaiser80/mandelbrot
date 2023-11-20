export const groupedMap = <T extends Record<keyof T, unknown>>(
  initialArray: T[],
  key: keyof T,
) => {
  return initialArray.reduce(
    (entryMap: Map<string, T[]>, e: T) =>
      entryMap.set(String(e[key]), [
        ...(entryMap.get(String(e[key])) ?? []),
        e,
      ]),
    new Map(),
  );
};
