export const validateValueInRange = (value: number, lower: number, upper: number, label: string): number => {
  if (value < lower || value > upper) {
    throw new Error(`Invalid ${label} value. ${label.charAt(0).toUpperCase() + label.slice(1)} must be between ${lower} and ${upper}.`);
  }
  return value;
}

export const validateHue = (value: number): number => {
  return validateValueInRange(value, 0, 360, 'hue');
}

export const validateColorTemp = (value: number): number => {
  return validateValueInRange(value, 2500, 6500, 'color temperature');
}

export const validateSaturation = (value: number): number => {
  return validateValueInRange(value, 0, 100, 'saturation');
}

export const validateBrightness = (value: number): number => {
  return validateValueInRange(value, 0, 100, 'brightness');
}

export const valid = (key: string, value: any) => {
  switch (key) {
    case "brightness":
      return validateBrightness(value);
    case "hue":
      return validateHue(value);
    case "saturation":
      return validateSaturation(value);
    case "color_temp":
      return validateColorTemp(value);
    default:
      return false;
  }
};
