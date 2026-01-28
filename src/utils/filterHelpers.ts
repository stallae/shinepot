import type { PublicMessage } from '../interfaces';
import type {
  TabFilterType,
  StatusFilterType,
  ModalMessageFilterType,
  ModalTypeFilterType,
  ContentFilterType,
  DateFilterType,
} from '../constants';
import {
  getStartOfDay,
  getEndOfDay,
  getStartOfWeek,
  getEndOfWeek,
  getStartOfMonth,
  getEndOfMonth,
  getStartOfYear,
  getEndOfYear,
} from './dateHelpers';

export interface FilterState {
  activeTabFilter: TabFilterType;
  activeStatusFilter: StatusFilterType | null;
  activeModalMessageFilter: ModalMessageFilterType | null;
  activeModalTypeFilter: ModalTypeFilterType[];
  activeContentFilter: ContentFilterType[];
  activeDateFilter: DateFilterType[];
}

export const filterMessages = (
  messages: PublicMessage[],
  currentUserId: string,
  filters: FilterState,
): PublicMessage[] => {
  let filtered: PublicMessage[] = [];
  const now = new Date();

  const userRelevantMessages = messages.filter(
    (message: PublicMessage) =>
      message.owner_id === currentUserId,
  );

  filtered = userRelevantMessages;

  // Apply tab filter
  switch (filters.activeTabFilter) {
    case 'sent':
      filtered = filtered.filter(
        (message: PublicMessage) => message.owner_id === currentUserId,
      );
      break;
    case 'received':
      // Public messages don't have recipients - skip this filter
      filtered = [];
      break;
    default:
      break;
  }

  if (filters.activeModalMessageFilter) {
    switch (filters.activeModalMessageFilter) {
      case 'sent':
        filtered = filtered.filter(
          (message: PublicMessage) => message.owner_id === currentUserId,
        );
        break;
      case 'received':
        filtered = [];
        break;
      default:
        break;
    }
  }


  // Apply content type filter (multiple selections)
  if (filters.activeContentFilter.length > 0) {
    filtered = filtered.filter((message: PublicMessage) =>
      filters.activeContentFilter.includes(message.format),
    );
  }

  if (filters.activeDateFilter.length > 0) {
    filtered = filtered.filter((message: PublicMessage) => {
      const publishDate = message.publish_date && 'toDate' in message.publish_date ? message.publish_date.toDate() : new Date();
      return filters.activeDateFilter.some(dateFilter => {
        switch (dateFilter) {
          case 'today': {
            const startOfDay = getStartOfDay(now);
            const endOfDay = getEndOfDay(now);
            return publishDate >= startOfDay && publishDate <= endOfDay;
          }
          case 'thisWeek': {
            const startOfWeek = getStartOfWeek(now);
            const endOfWeek = getEndOfWeek(now);
            return publishDate >= startOfWeek && publishDate <= endOfWeek;
          }
          case 'thisMonth': {
            const startOfMonth = getStartOfMonth(now);
            const endOfMonth = getEndOfMonth(now);
            return publishDate >= startOfMonth && publishDate <= endOfMonth;
          }
          case 'thisYear': {
            const startOfYear = getStartOfYear(now);
            const endOfYear = getEndOfYear(now);
            return publishDate >= startOfYear && publishDate <= endOfYear;
          }
          default:
            return false;
        }
      });
    });
  }

  if (filters.activeStatusFilter) {
    filtered = filtered.filter((message: PublicMessage) => {
      const status = message.status;
      if (filters.activeStatusFilter === 'opened') {
        return status === 'released';
      } else {
        return status === 'locked' || status === 'canceled';
      }
    });
  }

  return filtered;
};

