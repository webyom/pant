type PantConfig = {
  viewportWidth?: number;
};

const config: PantConfig = {};

export function pantConfig<K extends keyof PantConfig>(key: K, val?: PantConfig[K]): PantConfig[K] {
  if (undefined !== val) {
    config[key] = val;
  }
  return config[key];
}
