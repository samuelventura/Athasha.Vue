<template>
  <div>
    <div class="field is-horizontal">
      <div class="field-label is-normal">
        <label class="label">Modbus Channel</label>
      </div>
      <div class="field-body">
        <div class="field">
          <div class="control">
            <div class="select is-fullwidth">
              <select v-model="channel" required>
                <option
                  v-for="option in channelOptions"
                  :value="option.$id"
                  :key="option.$id"
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
        <label class="label">Slave ID</label>
      </div>
      <div class="field-body">
        <div class="field">
          <div class="control">
            <input
              :title="'Zero-based decimal slave id (0 to 255)'"
              class="input"
              type="number"
              min="0"
              max="255"
              v-model.number.lazy="slave"
              required
            />
          </div>
        </div>
      </div>
    </div>
    <div class="field is-horizontal">
      <div class="field-label is-normal">
        <label class="label">Read Code</label>
      </div>
      <div class="field-body">
        <div class="field">
          <div class="control">
            <div class="select is-fullwidth">
              <select v-model="read" required>
                <option
                  v-for="option in readOptions"
                  :value="option.value"
                  :key="option.value"
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
        <label class="label">Write Code</label>
      </div>
      <div class="field-body">
        <div class="field">
          <div class="control">
            <div class="select is-fullwidth">
              <select v-model="write" required>
                <option
                  v-for="option in writeOptions"
                  :value="option.value"
                  :key="option.value"
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
        <label class="label">Start Address</label>
      </div>
      <div class="field-body">
        <div class="field">
          <div class="control">
            <input
              :title="'Zero-based decimal start address (0 to 65535)'"
              class="input"
              type="number"
              min="0"
              max="65535"
              v-model.number.lazy="address"
              required
            />
          </div>
        </div>
      </div>
    </div>
    <div class="field is-horizontal">
      <div class="field-label is-normal">
        <label class="label">Number of Points</label>
      </div>
      <div class="field-body">
        <div class="field">
          <div class="control">
            <input
              :title="'Number of points (up to ' + max + ')'"
              class="input"
              type="number"
              min="1"
              :max="max"
              v-model.number.lazy="count"
              required
            />
          </div>
        </div>
      </div>
    </div>
    <ModbusNameEditor
      v-for="(name, index) in names"
      :key="index"
      :index="index"
      :label="label(index)"
    />
  </div>
</template>

<script>
//[ ] Reorder names by D&D
//[ ] Max change should update count
//Cache can be cleared by a simple page refresh
import modbus from "../store/items/modbus-tools";
import ModbusNameEditor from "./ModbusNameEditor.vue";

export default {
  name: "ModbusGroupEditor",
  components: { ModbusNameEditor },
  props: [],
  methods: {
    setProp(name, value) {
      this.$store.commit("modbusGroup/setProp", {
        group: this.group,
        name,
        value,
      });
    },
    label(index) {
      return `Point ${index + 1} at Address ${index + this.address}`;
    },
  },
  data() {
    return {
      cache: {},
      readOptions: modbus.readOptions,
      writeOptions: modbus.writeOptions,
    };
  },
  computed: {
    channelOptions() {
      return this.$store.getters["view/channelOptions"];
    },
    group() {
      return this.$store.state.view.selected.data;
    },
    max() {
      const rmax = modbus.codeMap[this.read].max;
      const wmax = modbus.codeMap[this.write].max;
      if (!rmax && !wmax) return 0;
      return Math.min(
        rmax || Number.MAX_SAFE_INTEGER,
        wmax || Number.MAX_SAFE_INTEGER
      );
    },
    names() {
      return this.group.names;
    },
    channel: {
      get: function () {
        return this.group.channel;
      },
      set: function (value) {
        this.setProp("channel", value);
      },
    },
    read: {
      get: function () {
        return this.group.read;
      },
      set: function (value) {
        this.setProp("read", value);
      },
    },
    write: {
      get: function () {
        return this.group.write;
      },
      set: function (value) {
        this.setProp("write", value);
      },
    },
    slave: {
      get: function () {
        return this.group.slave;
      },
      set: function (value) {
        value = modbus.fixSlaveID(value);
        this.setProp("slave", value);
      },
    },
    address: {
      get: function () {
        return this.group.address;
      },
      set: function (value) {
        value = modbus.fixAddress(value);
        this.setProp("address", value);
      },
    },
    count: {
      get: function () {
        return this.names.length;
      },
      set: function (value) {
        value = value || 0; //empty string!
        value = Math.max(value, 0);
        value = Math.min(value, this.max);
        const names = [...this.names];
        for (let i = value; i < names.length; i++) {
          let name = this.names[i];
          this.cache[i] = name;
        }
        names.splice(value);
        while (value > names.length) {
          let i = names.length;
          let name = this.cache[i];
          if (name === undefined) {
            name = "";
          }
          names.push(name);
        }
        this.$store.commit("modbusGroup/setNames", {
          group: this.group,
          names,
        });
      },
    },
  },
};
</script>
