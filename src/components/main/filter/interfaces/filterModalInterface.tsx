import {
  StatusFilterType,
  ModalMessageFilterType,
  ModalTypeFilterType,
  ContentFilterType,
  DateFilterType,
} from '../../../../constants/filter.ts';

export interface FilterButtonProps {
  label: string;
  isActive: boolean;
  onPress: () => void;
}

import {TabFilterType} from '../../../../constants/filter.ts';

export interface FilterModalProps {
  visible: boolean;
  onClose: () => void;
  activeStatusFilter: StatusFilterType | null;
  activeModalMessageFilter: ModalMessageFilterType | null;
  activeModalTypeFilter: ModalTypeFilterType[];
  activeContentFilter: ContentFilterType[];
  activeDateFilter: DateFilterType[];
  onStatusFilterChange: (filter: StatusFilterType | null) => void;
  onModalMessageFilterChange: (filter: ModalMessageFilterType | null) => void;
  onModalTypeFilterChange: (filter: ModalTypeFilterType) => void;
  onContentFilterChange: (filter: ContentFilterType) => void;
  onDateFilterChange: (filter: DateFilterType) => void;
  onClearFilters: () => void;
  onTabFilterChange: (filter: TabFilterType) => void;
}

