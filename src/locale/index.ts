import { pantConfig } from '../';
import { locale } from './en-US';

export type PantLocale = typeof locale;

export function i18n(): PantLocale {
  return pantConfig('locale') || locale;
}
