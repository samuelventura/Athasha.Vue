<template>
  <div class="field has-addons">
    <p class="control">
      <a class="button is-static">{{ label }}</a>
    </p>
    <div class="control is-expanded">
      <input
        required
        v-model.trim.lazy="name"
        class="input"
        type="text"
        placeholder="Point Name"
        title="Case sensitive trimmed point name"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "ModbusNameEditor",
  props: ["index", "label"],
  methods: {},
  data() {
    return {};
  },
  computed: {
    group() {
      return this.$store.state.view.selected.data;
    },
    name: {
      get: function () {
        return this.group.names[this.index];
      },
      set: function (value) {
        this.$store.commit("modbusGroup/setName", {
          group: this.group,
          index: this.index,
          value,
        });
      },
    },
  },
};
</script>
