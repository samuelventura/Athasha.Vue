import tools from "@/common/tools"

export const fixAddress = function (value) {
  value = value || 0; //empty string!
  value = Math.max(value, 0);
  value = Math.min(value, 255);
  return value;
}

export const checkAddress = function (value) {
  tools.assert(value >= 0 && value <= 255,
    `Invalid address value ${value}`);
}

export const fixSlaveID = function (value) {
  value = value || 0; //empty string!
  value = Math.max(value, 0);
  value = Math.min(value, 65535);
  return value;
}

export const checkSlaveID = function (value) {
  tools.assert(value >= 0 && value <= 255,
    `Invalid slave id ${value}`);
}

export const checkFunctionCode = function (value) {
  tools.assert(codeOptions.find(c => c.value == value),
    `Invalid function code ${value}`);
}

export const checkProtocol = function (value) {
  tools.assert(protocolOptions.find(c => c.value == value),
    `Invalid protocol ${value}`);
}

export const checkTransport = function (value) {
  tools.assert(transportOptions.indexOf(value) >= 0,
    `Invalid transport ${value}`);
}

//use same for single and multi point commands in table editor
//table executor should just restrict it to one point
export const codeOptions = [
  { value: 0, type: "io", max: 0, name: "00 None" },
  { value: 1, type: "di", max: 255 * 8, name: "01 Read Coil Status" },
  { value: 2, type: "di", max: 255 * 8, name: "02 Read Input Status" },
  { value: 3, type: "wi", max: Math.floor(255 / 16), name: "03 Read Holding Registers" },
  { value: 4, type: "wi", max: Math.floor(255 / 16), name: "04 Read Input Registers" },
  { value: 5, type: "do", max: 1, name: "05 Force Single Coil" },
  { value: 6, type: "wo", max: 1, name: "06 Preset Single Register" },
  { value: 15, type: "do", max: 255 * 8, name: "15 Force Multiple Coils" },
  { value: 16, type: "wo", max: Math.floor(255 / 16), name: "16 Preset Multiple Registers" },
];
export const protocolOptions = [{ value: "RTU", name: "Modbus RTU" }, { value: "TCP", name: "Modbus TCP" }];
export const transportOptions = ["Serial", "TCP"];

export const codeMap = codeOptions.reduce(function (map, code) {
  map[code.value] = code;
  return map;
}, {});

export const readOptions = codeOptions.filter((i) => {
  return i.type.indexOf("i") >= 0;
});

export const writeOptions = codeOptions.filter((i) => {
  return i.type.indexOf("o") >= 0;
});

export default {
  fixAddress,
  checkAddress,
  fixSlaveID,
  checkSlaveID,
  checkFunctionCode,
  checkProtocol,
  checkTransport,
  codeMap,
  codeOptions,
  readOptions,
  writeOptions,
  protocolOptions,
  transportOptions
}
