import sandpackDependencies from "@/config/sandpackDependencies.json";

const dependencyCache = {};

export const getDependencies = (preset) => {
  if (dependencyCache[preset]) {
    return dependencyCache[preset];
  }

  const presetConfig = sandpackDependencies.presets[preset];

  if (!presetConfig) {
    console.warn(`⚠️ Preset "${preset}" non trouvé dans la configuration`);
    return {};
  }

  const result = presetConfig.dependencies || {};

  dependencyCache[preset] = result;

  return result;
};

export const getDevDependencies = (preset) => {
  const cacheKey = `${preset}_dev`;

  if (dependencyCache[cacheKey]) {
    return dependencyCache[cacheKey];
  }

  const presetConfig = sandpackDependencies.presets[preset];

  if (!presetConfig) {
    console.warn(`⚠️ Preset "${preset}" non trouvé dans la configuration`);
    return {};
  }

  const result = presetConfig.devDependencies || {};

  dependencyCache[cacheKey] = result;

  return result;
};

export const getAvailablePresets = () => {
  return Object.keys(sandpackDependencies.presets);
};

export const getConfigMetadata = () => {
  return sandpackDependencies.metadata;
};

export const addDependency = (preset, packageName, version) => {
  if (!sandpackDependencies.presets[preset]) {
    console.warn(`⚠️ Preset "${preset}" non trouvé`);
    return;
  }

  sandpackDependencies.presets[preset].dependencies[packageName] = version;
  delete dependencyCache[preset];

};

const testResults = {};
getAvailablePresets().forEach(preset => {
  testResults[preset] = Object.keys(getDependencies(preset)).length;
});

console.log("✅ Dependencies count per preset:", testResults);