import {
  StatusFilterType,
  ModalMessageFilterType,
  ModalTypeFilterType,
  ContentFilterType,
  DateFilterType,
} from '../../../../constants/filter.ts';

export interface FilterChipsProps {
  activeStatusFilter: StatusFilterType | null;
  activeModalMessageFilter: ModalMessageFilterType | null;
  activeModalTypeFilter: ModalTypeFilterType[];
  activeContentFilter: ContentFilterType[];
  activeDateFilter: DateFilterType[];
  onRemoveStatusFilter: () => void;
  onRemoveModalMessageFilter: () => void;
  onRemoveModalTypeFilter: (filter: ModalTypeFilterType) => void;
  onRemoveContentFilter: (filter: ContentFilterType) => void;
  onRemoveDateFilter: (filter: DateFilterType) => void;
}

