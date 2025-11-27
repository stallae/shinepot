export type FilterType = 'all' | 'sent' | 'received' | 'opened';

export interface FilterOption {
  value: FilterType;
  label: string;
}

export const FILTER_OPTIONS: FilterOption[] = [
  {value: 'all', label: 'All'},
  {value: 'sent', label: 'Sent'},
  {value: 'received', label: 'Received'},
  {value: 'opened', label: 'Opened'},
];

