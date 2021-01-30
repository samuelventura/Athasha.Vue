import tools from "@/common/tools"

export const fixBaudRate = function (value) {
  value = value || 0; //empty string!
  value = Math.max(value, 0);
  value = Math.min(value, 2147483647);
  return value;
}

export const checkBaudRate = function (value) {
  tools.assert(value >= 0 && value <= 2147483647,
    `Invalid baud rate ${value}`);
}

export const checkDataBits = function (value) {
  tools.assert(dataBitsOptions.indexOf(value) >= 0,
    `Invalid data bits ${value}`);
}

export const checkParity = function (value) {
  tools.assert(parityOptions.indexOf(value) >= 0,
    `Invalid parity ${value}`);
}

export const checkStopBits = function (value) {
  tools.assert(stopBitsOptions.indexOf(value) >= 0,
    `Invalid stop bits ${value}`);
}

export const dataBitsOptions = [5, 6, 7, 8];
export const parityOptions = ["None", "Odd", "Even", "Mark", "Space"];
export const stopBitsOptions = ["0", "1", "1.5", "2"];

export default {
  fixBaudRate,
  checkBaudRate,
  checkDataBits,
  checkParity,
  checkStopBits,
  dataBitsOptions,
  parityOptions,
  stopBitsOptions,
}
