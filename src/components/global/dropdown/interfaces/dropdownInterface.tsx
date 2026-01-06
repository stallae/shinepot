import {ReactNode} from 'react';

export interface DropdownOption {
    value: string | number;
    text: string;
    icon?: ReactNode;
  }
  
  export interface DropdownProps {
    options: DropdownOption[];
    value?: string | number;
    onChange: (value: string | number) => void;
    placeholder?: string;
    maxHeight?: number;
  }