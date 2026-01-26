import {Messages} from '../interfaces/messages';
import {
  TabFilterType,
  StatusFilterType,
  ModalMessageFilterType,
  ModalTypeFilterType,
  ContentFilterType,
  DateFilterType,
} from '../constants/filter';
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
  messages: Messages[],
  currentUserId: string,
  filters: FilterState,
): Messages[] => {
  let filtered: Messages[] = [];
  const now = new Date();

  const userRelevantMessages = messages.filter(
    (message: Messages) =>
      message.ownerId === currentUserId ||
      message.memoryRecipients?.[0]?.recipient_contact?.id === currentUserId,
  );

  filtered = userRelevantMessages;

  // Apply tab filter
  switch (filters.activeTabFilter) {
    case 'sent':
      filtered = filtered.filter(
        (message: Messages) => message.ownerId === currentUserId,
      );
      break;
    case 'received':
      filtered = filtered.filter(
        (message: Messages) =>
          message.memoryRecipients?.[0]?.recipient_contact?.id ===
          currentUserId,
      );
      break;
    default:
      break;
  }

  // Apply modal message filter
  if (filters.activeModalMessageFilter) {
    switch (filters.activeModalMessageFilter) {
      case 'sent':
        filtered = filtered.filter(
          (message: Messages) => message.ownerId === currentUserId,
        );
        break;
      case 'received':
        filtered = filtered.filter(
          (message: Messages) =>
            message.memoryRecipients?.[0]?.recipient_contact?.id ===
            currentUserId,
        );
        break;
      default:
        break;
    }
  }

  // Apply modal type filter (multiple selections)
  if (filters.activeModalTypeFilter.length > 0) {
    filtered = filtered.filter((message: Messages) =>
      filters.activeModalTypeFilter.includes(
        message.visibility as ModalTypeFilterType,
      ),
    );
  }

  // Apply content type filter (multiple selections)
  if (filters.activeContentFilter.length > 0) {
    filtered = filtered.filter((message: Messages) =>
      filters.activeContentFilter.includes(message.type),
    );
  }

  // Apply date filter (multiple selections)
  if (filters.activeDateFilter.length > 0) {
    filtered = filtered.filter((message: Messages) => {
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
    filtered = filtered.filter((message: Messages) => {
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

