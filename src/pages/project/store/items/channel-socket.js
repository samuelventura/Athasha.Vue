import tools from "@/common/tools"

export const fixPortNumber = function (value) {
  value = value || 0; //empty string!
  value = Math.max(value, 0);
  value = Math.min(value, 65535);
  return value;
}

export const checkPortNumber = function (value) {
  tools.assert(value >= 0 && value <= 65535,
    `Invalid port number ${value}`);
}

export default {
  fixPortNumber,
  checkPortNumber,
}
