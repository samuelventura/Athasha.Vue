import serial from "./channel-serial"
import socket from "./channel-socket"
import modbus from "./modbus-tools"
import tools from "@/common/tools"

export const newModbusChannel = function () {
  return {
    transport: "Serial",
    protocol: "RTU",
    portName: "COM1",
    baudRate: 9600,
    dataBits: 8,
    parity: "None",
    stopBits: "1",
    hostName: "127.0.0.1",
    portNumber: 8000,
  }
}

const state = {};

const mutations = {
  setProp(state, { channel, name, value }) {
    tools.assert(Object.prototype.hasOwnProperty.call(channel, name),
      `channel has no property ${name}`);
    switch (name) {
      case "protocol": modbus.checkProtocol(value); break;
      case "transport": modbus.checkTransport(value); break;
      case "portNumber": socket.checkPortNumber(value); break;
      case "baudRate": serial.checkBaudRate(value); break;
      case "dataBits": serial.checkDataBits(value); break;
      case "parity": serial.checkParity(value); break;
      case "stopBits": serial.checkStopBits(value); break;
    }
    channel[name] = value;
  },
};

const actions = {};

const getters = {};

export default {
  namespaced: true,
  mutations,
  actions,
  getters,
  state,
}
