export type TabFilterType = 'all' | 'sent' | 'received';
export type StatusFilterType = 'opened' | 'unopened';
export type ModalMessageFilterType = 'all' | 'sent' | 'received';
export type ModalTypeFilterType = 'random' | 'private' | 'public';
export type ContentFilterType = 'video' | 'image' | 'audio' | 'text';
export type DateFilterType = 'today' | 'thisWeek' | 'thisMonth' | 'thisYear';
export type FilterType = TabFilterType | StatusFilterType | ModalMessageFilterType | ModalTypeFilterType | ContentFilterType | DateFilterType;

export interface FilterOption {
  value: FilterType;
  label: string;
  category: 'tab' | 'status' | 'modalMessageType' | 'modalType' | 'contentType' | 'date';
}

export const TAB_FILTER_OPTIONS: FilterOption[] = [
  {value: 'all', label: 'All', category: 'tab'},
  {value: 'sent', label: 'Sent', category: 'tab'},
  {value: 'received', label: 'Received', category: 'tab'},
];

export const MODAL_MESSAGE_FILTER_OPTIONS: FilterOption[] = [
  {value: 'all', label: 'All', category: 'modalMessageType'},
  {value: 'sent', label: 'Sent', category: 'modalMessageType'},
  {value: 'received', label: 'Received', category: 'modalMessageType'},
];

export const MODAL_TYPE_FILTER_OPTIONS: FilterOption[] = [
  {value: 'random', label: 'Random', category: 'modalType'},
  {value: 'private', label: 'Private', category: 'modalType'},
  {value: 'public', label: 'Public', category: 'modalType'},
];

export const CONTENT_FILTER_OPTIONS: FilterOption[] = [
  {value: 'video', label: 'Videos', category: 'contentType'},
  {value: 'image', label: 'Images', category: 'contentType'},
  {value: 'audio', label: 'Audio', category: 'contentType'},
  {value: 'text', label: 'Text', category: 'contentType'},
];

export const DATE_FILTER_OPTIONS: FilterOption[] = [
  {value: 'today', label: 'Today', category: 'date'},
  {value: 'thisWeek', label: 'This Week', category: 'date'},
  {value: 'thisMonth', label: 'This Month', category: 'date'},
  {value: 'thisYear', label: 'This Year', category: 'date'},
];

export const STATUS_FILTER_OPTIONS: FilterOption[] = [
  {value: 'opened', label: 'Opened', category: 'status'},
  {value: 'unopened', label: 'Unopened', category: 'status'},
];

export const FILTER_OPTIONS = TAB_FILTER_OPTIONS;

