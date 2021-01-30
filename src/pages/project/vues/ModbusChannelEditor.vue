<template>
  <div>
    <div class="field is-horizontal">
      <div class="field-label is-normal">
        <label class="label">Protocol</label>
      </div>
      <div class="field-body">
        <div class="field">
          <div class="control">
            <div class="select is-fullwidth">
              <select v-model="protocol" required>
                <option
                  v-for="option in protocolOptions"
                  :key="option.value"
                  :value="option.value"
                >
                  {{ option.name }}
                </option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="field is-horizontal">
      <div class="field-label is-normal">
        <label class="label">Transport</label>
      </div>
      <div class="field-body">
        <div class="field">
          <div class="control">
            <label
              class="radio"
              v-for="option in transportOptions"
              :key="option"
            >
              <input
                required
                type="radio"
                name="transport"
                :value="option"
                v-model="transport"
              />
              {{ option }}
            </label>
          </div>
        </div>
      </div>
    </div>
    <br />
    <div v-if="channel.transport === 'Serial'">
      <div class="field is-horizontal">
        <div class="field-label is-normal">
          <label class="label">Port Name</label>
        </div>
        <div class="field-body">
          <div class="field">
            <div class="control">
              <input
                required
                v-model.trim.lazy="portName"
                class="input"
                type="text"
                placeholder="Port Name"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="field is-horizontal">
        <div class="field-label is-normal">
          <label class="label">Baud Rate</label>
        </div>
        <div class="field-body">
          <div class="field">
            <div class="control">
              <input
                required
                v-model.number.lazy="baudRate"
                class="input"
                type="number"
                min="1"
                max="2147483647"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="field is-horizontal">
        <div class="field-label is-normal">
          <label class="label">Data Bits</label>
        </div>
        <div class="field-body">
          <div class="field">
            <div class="control">
              <div class="select is-fullwidth">
                <select v-model.number="dataBits" required>
                  <option v-for="option in dataBitsOptions" :key="option">
                    {{ option }}
                  </option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="field is-horizontal">
        <div class="field-label is-normal">
          <label class="label">Parity</label>
        </div>
        <div class="field-body">
          <div class="field">
            <div class="control">
              <div class="select is-fullwidth">
                <select v-model="parity" required>
                  <option v-for="option in parityOptions" :key="option">
                    {{ option }}
                  </option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="field is-horizontal">
        <div class="field-label is-normal">
          <label class="label">Stop Bits</label>
        </div>
        <div class="field-body">
          <div class="field">
            <div class="control">
              <div class="select is-fullwidth">
                <select v-model="stopBits" required>
                  <option v-for="option in stopBitsOptions" :key="option">
                    {{ option }}
                  </option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="channel.transport === 'TCP'">
      <div class="field is-horizontal">
        <div class="field-label is-normal">
          <label class="label">Host Name</label>
        </div>
        <div class="field-body">
          <div class="field">
            <div class="control">
              <input
                required
                v-model.trim.lazy="hostName"
                class="input"
                type="text"
                placeholder="Host Name"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="field is-horizontal">
        <div class="field-label is-normal">
          <label class="label">Port Number</label>
        </div>
        <div class="field-body">
          <div class="field">
            <div class="control">
              <input
                required
                v-model.number.lazy="portNumber"
                class="input"
                type="number"
                min="1"
                max="65535"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// SPEC - FIXME - TODO
// [ ] Auto complete serial port names
// [ ] Auto complete free editing of baud rate
// [ ] Identify timeouts use cases
// [ ] Support DTR enable (default to true)
// [ ] Support RTS enable (default to false)
// [ ] Support Handshake (default to none)

import serial from "../store/items/channel-serial";
import socket from "../store/items/channel-socket";
import modbus from "../store/items/modbus-tools";

export default {
  name: "ModbusChannelEditor",
  props: [],
  methods: {
    setProp(name, value) {
      this.$store.commit("modbusChannel/setProp", {
        channel: this.channel,
        name,
        value,
      });
    },
  },
  data() {
    return {
      dataBitsOptions: serial.dataBitsOptions,
      parityOptions: serial.parityOptions,
      stopBitsOptions: serial.stopBitsOptions,
      protocolOptions: modbus.protocolOptions,
      transportOptions: modbus.transportOptions,
    };
  },
  computed: {
    channel() {
      return this.$store.state.view.selected.data;
    },
    protocol: {
      get: function () {
        return this.channel.protocol;
      },
      set: function (value) {
        this.setProp("protocol", value);
      },
    },
    transport: {
      get: function () {
        return this.channel.transport;
      },
      set: function (value) {
        this.setProp("transport", value);
      },
    },
    portName: {
      get: function () {
        return this.channel.portName;
      },
      set: function (value) {
        this.setProp("portName", value);
      },
    },
    baudRate: {
      get: function () {
        return this.channel.baudRate;
      },
      set: function (value) {
        value = serial.fixBaudRate(value);
        this.setProp("baudRate", value);
      },
    },
    dataBits: {
      get: function () {
        return this.channel.dataBits;
      },
      set: function (value) {
        this.setProp("dataBits", value);
      },
    },
    parity: {
      get: function () {
        return this.channel.parity;
      },
      set: function (value) {
        this.setProp("parity", value);
      },
    },
    stopBits: {
      get: function () {
        return this.channel.stopBits;
      },
      set: function (value) {
        this.setProp("stopBits", value);
      },
    },
    hostName: {
      get: function () {
        return this.channel.hostName;
      },
      set: function (value) {
        this.setProp("hostName", value);
      },
    },
    portNumber: {
      get: function () {
        return this.channel.portNumber;
      },
      set: function (value) {
        value = socket.fixPortNumber(value);
        this.setProp("portNumber", value);
      },
    },
  },
};
</script>
