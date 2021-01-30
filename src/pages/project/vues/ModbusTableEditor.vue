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
        <label class="label">Number of Points</label>
      </div>
      <div class="field-body">
        <div class="field">
          <div class="control">
            <input
              required
              v-model.number.lazy="count"
              class="input"
              type="number"
              min="0"
              max="1024"
            />
          </div>
        </div>
      </div>
    </div>
    <table class="table is-fullwidth is-striped is-hoverable">
      <thead>
        <tr>
          <th>#</th>
          <th>Slave ID</th>
          <th>Read Code</th>
          <th>Write Code</th>
          <th>Address</th>
          <th>Point Name</th>
        </tr>
      </thead>
      <tbody>
        <ModbusRowEditor
          v-for="(point, index) in points"
          :key="point.$id"
          :index="index"
        />
      </tbody>
    </table>
  </div>
</template>

<script>
//[ ] Reorder rows by D&D
//Cache can be cleared by a simple page refresh
import { newModbusPoint } from "../store/items/modbus-table";
import ModbusRowEditor from "./ModbusRowEditor.vue";
import idgen from "../idgen";

export default {
  name: "ModbusTableEditor",
  components: { ModbusRowEditor },
  props: [],
  methods: {},
  data() {
    return {
      cache: {},
    };
  },
  computed: {
    channelOptions() {
      return this.$store.getters["view/channelOptions"];
    },
    table() {
      return this.$store.state.view.selected.data;
    },
    points() {
      return idgen.addIds(this.table.points);
    },
    channel: {
      get: function () {
        return this.table.channel;
      },
      set: function (value) {
        this.$store.commit("modbusTable/setChannel", {
          table: this.table,
          channel: value,
        });
      },
    },
    count: {
      get: function () {
        return this.points.length;
      },
      set: function (value) {
        value = value || 0; //empty string!
        value = Math.max(value, 0);
        value = Math.min(value, 1024);
        const points = [...this.points];
        for (let i = value; i < points.length; i++) {
          const point = points[i];
          this.cache[i] = point;
        }
        points.splice(value);
        while (value > points.length) {
          let i = points.length;
          let point = this.cache[i];
          if (point === undefined) {
            point = newModbusPoint();
          }
          points.push(point);
        }
        this.$store.commit("modbusTable/setPoints", {
          table: this.table,
          points,
        });
      },
    },
  },
};
</script>
