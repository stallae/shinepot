export const getStartOfDay = (date: Date): Date => {
  const start = new Date(date);
  start.setHours(0, 0, 0, 0);
  return start;
};

export const getEndOfDay = (date: Date): Date => {
  const end = new Date(date);
  end.setHours(23, 59, 59, 999);
  return end;
};

export const getStartOfWeek = (date: Date): Date => {
  const start = new Date(date);
  const day = start.getDay();
  const diff = start.getDate() - day; // Get Monday
  start.setDate(diff);
  start.setHours(0, 0, 0, 0);
  return start;
};

export const getEndOfWeek = (date: Date): Date => {
  const end = new Date(date);
  const day = end.getDay();
  const diff = end.getDate() + (6 - day);
  end.setDate(diff);
  end.setHours(23, 59, 59, 999);
  return end;
};

export const getStartOfMonth = (date: Date): Date => {
  const start = new Date(date.getFullYear(), date.getMonth(), 1);
  start.setHours(0, 0, 0, 0);
  return start;
};

export const getEndOfMonth = (date: Date): Date => {
  const end = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  end.setHours(23, 59, 59, 999);
  return end;
};

export const getStartOfYear = (date: Date): Date => {
  const start = new Date(date.getFullYear(), 0, 1);
  start.setHours(0, 0, 0, 0);
  return start;
};

export const getEndOfYear = (date: Date): Date => {
  const end = new Date(date.getFullYear(), 11, 31);
  end.setHours(23, 59, 59, 999);
  return end;
};

