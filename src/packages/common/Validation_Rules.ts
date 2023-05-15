const regexLat = /^(-?[1-8]?\d(?:\.\d{1,18})?|90(?:\.0{1,18})?)$/;
const regexLon = /^(-?(?:1[0-7]|[1-9])?\d(?:\.\d{1,18})?|180(?:\.0{1,18})?)$/;
const regexNumber =
  /^(?:-(?:[1-9](?:\d{0,2}(?:,\d{3})+|\d*))|(?:0|(?:[1-9](?:\d{0,2}(?:,\d{3})+|\d*))))(?:.\d+|)$/;
const phoneNumberPattern = /[a-zA-Z0-9]/;

// I need to exclude special characters
const excludeSpecialCharacters = /^[a-zA-Z0-9]+$/;

export const phoneType = {
  type: "pattern",
  pattern: phoneNumberPattern,
};

export const requiredType = {
  type: "required",
};

export const regexLatType = {
  type: "pattern",
  pattern: regexLat,
};

export const numberType = {
  type: "pattern",
  pattern: regexNumber,
};

export const regexLonType = {
  type: "pattern",
  pattern: regexLon,
};

export const ExcludeSpecialCharactersType = {
  type: "pattern",
  pattern: excludeSpecialCharacters,
};
