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

export const getDateParts = (date?: Date | string | null): { day: string; month: string; year: string } => {
  if (!date) {
    return { day: '', month: '', year: '' };
  }
  
  if (typeof date === 'string') {
    const parts = date.split('-');
    if (parts.length === 3) {
      return {
        day: parts[2],
        month: parts[1],
        year: parts[0],
      };
    }
  }
  
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  if (isNaN(dateObj.getTime())) {
    return { day: '', month: '', year: '' };
  }
  
  return {
    day: dateObj.getDate().toString().padStart(2, '0'),
    month: (dateObj.getMonth() + 1).toString().padStart(2, '0'),
    year: dateObj.getFullYear().toString(),
  };
};

export const formatDateToYYYYMMDD = (day: string, month: string, year: string): string | null => {
  if (!day || !month || !year) {
    return null;
  }
  
  const dayNum = parseInt(day, 10);
  const monthNum = parseInt(month, 10);
  const yearNum = parseInt(year, 10);
  
  if (isNaN(dayNum) || isNaN(monthNum) || isNaN(yearNum)) {
    return null;
  }
  
  if (dayNum < 1 || dayNum > 31 || monthNum < 1 || monthNum > 12 || yearNum < 1900) {
    return null;
  }
  
  const paddedDay = day.padStart(2, '0');
  const paddedMonth = month.padStart(2, '0');
  
  return `${yearNum}-${paddedMonth}-${paddedDay}`;
};

