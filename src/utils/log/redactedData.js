import { SensitiveKeys } from "./sensitiveKeys.js";

const sensitiveKeysList = Object.values(SensitiveKeys)

const redactLogData = (data) => {

  if (typeof data === 'object' && data !== null) {
    if (Array.isArray(data)) {
      return data.map(item => redactLogData(item));
    }

    const redactedData = {};

    for (const key in data) {
      if (sensitiveKeysList.includes(key)) {
        redactedData[key] = '*****'; // replace password with *
      } else {
        // Recursively redact sensitive keys within nested objects
        redactedData[key] = redactLogData(data[key]);
      }
    }

    return redactedData;
  } else {
    return data;
  }
};

export default redactLogData;