// const getFutureYears = (): number[] => Array.from({ length: 11 }, (_, i) => new Date().getFullYear() + i);

export const getFutureYears = (): number[] => {
  const currentYear = new Date().getFullYear();
  const futureYears: number[] = [];

  for (let i = 0; i <= 10; i++) {
    futureYears.push(currentYear + i);
  }

  return futureYears;
};
