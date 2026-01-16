export const getLocalDate = (input: any = new Date()) => {
  const d = new Date(input);
  // PREVENT ROLLBACK: Set hour to NOON (12:00) to avoid timezone shifts
  d.setHours(12, 0, 0, 0);

  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export const toISODate = (input: any) => getLocalDate(input);

export const isFuture = (dateStr: string) => {
  return dateStr > getLocalDate(new Date());
};

export const isBeforeStart = (dateStr: string, startDate?: string) => {
  if (!startDate) return false;
  return dateStr < startDate;
};
