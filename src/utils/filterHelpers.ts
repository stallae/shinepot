import {Messages} from '../interfaces/messages.ts';
import {
  TabFilterType,
  StatusFilterType,
  ModalMessageFilterType,
  ModalTypeFilterType,
  ContentFilterType,
  DateFilterType,
} from '../constants/filter.ts';
import {
  getStartOfDay,
  getEndOfDay,
  getStartOfWeek,
  getEndOfWeek,
  getStartOfMonth,
  getEndOfMonth,
  getStartOfYear,
  getEndOfYear,
} from './dateHelpers.ts';

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
  currentUserId: number,
  filters: FilterState,
): Messages[] => {
  let filtered: Messages[] = [];
  const now = new Date();

  const userRelevantMessages = messages.filter(
    (message: Messages) =>
      message.user_owner_id === currentUserId ||
      message.message_recipients?.recipient_contact?.user_id === currentUserId,
  );

  filtered = userRelevantMessages;

  // Apply tab filter
  switch (filters.activeTabFilter) {
    case 'sent':
      filtered = filtered.filter(
        (message: Messages) => message.user_owner_id === currentUserId,
      );
      break;
    case 'received':
      filtered = filtered.filter(
        (message: Messages) =>
          message.message_recipients?.recipient_contact?.user_id ===
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
          (message: Messages) => message.user_owner_id === currentUserId,
        );
        break;
      case 'received':
        filtered = filtered.filter(
          (message: Messages) =>
            message.message_recipients?.recipient_contact?.user_id ===
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
        message.message_type as ModalTypeFilterType,
      ),
    );
  }

  // Apply content type filter (multiple selections)
  if (filters.activeContentFilter.length > 0) {
    filtered = filtered.filter((message: Messages) =>
      filters.activeContentFilter.includes(message.message_content_type),
    );
  }

  // Apply date filter (multiple selections)
  if (filters.activeDateFilter.length > 0) {
    filtered = filtered.filter((message: Messages) => {
      const publishDate = new Date(message.publish_date);
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
      const status = message.message_audit_status?.message_status_type;
      if (filters.activeStatusFilter === 'opened') {
        return status === 'published';
      } else {
        return status === 'pending' || status === 'canceled';
      }
    });
  }

  return filtered;
};

