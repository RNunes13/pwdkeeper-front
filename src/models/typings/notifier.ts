
import { SvgIconProps } from "@material-ui/core/SvgIcon/SvgIcon";

export type OptionsType = {
  message: string;
  variant?: 'success' | 'warning' | 'error' | 'info';
  delay?: number;
}

export type VariantIconType = {
  [key: string]: React.ComponentType<SvgIconProps>;
};

export type VariantColorType = {
  [key: string]: string;
};

export type QueueType = {
  message: string;
  variant: 'success' | 'warning' | 'error' | 'info' | 'default';
  delay: number;
  key: number;
};
