<template>
  <tr>
    <td>{{ index + 1 }}</td>
    <td>
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
    </td>
    <td>
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
    </td>
    <td>
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
    </td>
    <td>
      <div class="control">
        <input
          :title="'Zero-based decimal address (0 to 65535)'"
          class="input"
          type="number"
          min="0"
          max="65535"
          v-model.number.lazy="address"
          required
        />
      </div>
    </td>
    <td>
      <div class="control">
        <input
          required
          v-model.trim.lazy="name"
          class="input"
          type="text"
          maxlength="16"
          placeholder="Point Name"
          title="Case sensitive trimmed point name"
        />
      </div>
    </td>
  </tr>
</template>

<script>
import modbus from "../store/items/modbus-tools";

export default {
  name: "ModbusRowEditor",
  components: {},
  props: ["index"],
  methods: {
    setProp(name, value) {
      this.$store.commit("modbusTable/setPointProp", {
        table: this.table,
        index: this.index,
        name,
        value,
      });
    },
  },
  data() {
    return {
      readOptions: modbus.readOptions,
      writeOptions: modbus.writeOptions,
    };
  },
  computed: {
    table() {
      return this.$store.state.view.selected.data;
    },
    point() {
      return this.table.points[this.index];
    },
    read: {
      get: function () {
        return this.point.read;
      },
      set: function (value) {
        this.setProp("read", value);
      },
    },
    write: {
      get: function () {
        return this.point.write;
      },
      set: function (value) {
        this.setProp("write", value);
      },
    },
    slave: {
      get: function () {
        return this.point.slave;
      },
      set: function (value) {
        value = modbus.fixSlaveID(value);
        this.setProp("slave", value);
      },
    },
    address: {
      get: function () {
        return this.point.address;
      },
      set: function (value) {
        value = modbus.fixAddress(value);
        this.setProp("address", value);
      },
    },
    name: {
      get: function () {
        return this.point.name;
      },
      set: function (value) {
        this.setProp("name", value);
      },
    },
  },
};
</script>
