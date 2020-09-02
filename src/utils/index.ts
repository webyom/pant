import { pantConfig } from '../';

export function isDef(val: any): boolean {
  return val !== undefined && val !== null;
}

export function isObject(val: unknown): val is Record<any, any> {
  return val !== null && typeof val === 'object';
}

export function isNumeric(val: string): boolean {
  return /^\d+(\.\d+)?$/.test(val);
}

export function isNaN(val: number): val is typeof NaN {
  if (Number.isNaN) {
    return Number.isNaN(val);
  }
  return val !== val;
}

export function addUnit(value?: number | string): string | undefined {
  if (!isDef(value)) {
    return undefined;
  }
  const viewportWidth = pantConfig('viewportWidth');
  value = value + '';
  if (isNumeric(value)) {
    if (viewportWidth > 0) {
      return (+value * 100) / viewportWidth + 'vw';
    } else {
      return value + 'px';
    }
  } else {
    return value;
  }
}

export function omit(obj: Record<string, any>, keys: string[]): Record<string, any> {
  const res: Record<string, any> = {};
  Object.keys(obj)
    .filter(function(key: string): boolean {
      return !keys.includes(key);
    })
    .forEach(function(key): void {
      res[key] = obj[key];
    });
  return res;
}

export const inBrowser = typeof window !== 'undefined';

function convertVw(value: string): number {
  value = value.replace(/vw/g, '');
  return (+value * window.innerWidth) / 100;
}

export function unitToPx(value: string | number): number {
  if (typeof value === 'number') {
    return value;
  }

  if (inBrowser) {
    if (value.indexOf('vw') !== -1) {
      return convertVw(value);
    }
  }

  return parseFloat(value);
}
