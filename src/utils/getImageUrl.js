// src/utils/getImageUrl.js
const getImageUrl = (model, frameIndex, config) => {
  if (!config || !config.modelsInferenceFramesPath) {
    console.error('Configuration is missing or incomplete.');
    return '#';
  }

  // Remove '.json' from the model name to get the base model name
  const modelName = model.name.replace('.json', '');

  // Ensure frameIndex has leading zeros (e.g., frame_0001.png)
  const paddedFrameIndex = String(frameIndex).padStart(4, '0');

  // Construct the image URL based on the configuration
  return `${config.modelsInferenceFramesPath}${modelName}/frame_${paddedFrameIndex}.png`;
};

export default getImageUrl;
