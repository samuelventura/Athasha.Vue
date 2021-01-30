<template>
  <div ref="frame" v-resize="onResize" :style="{ height: height }">
    <svg viewBox="0 0 400 100" xmlns="http://www.w3.org/2000/svg">
      <rect
        x="0%"
        y="0%"
        width="100%"
        height="100%"
        rx="1%"
        stroke="#dddddd"
        fill="#dddddd"
      />
      <text
        x="5%"
        y="50%"
        dominant-baseline="middle"
        text-anchor="start"
        font-size="25px"
        font-family="arial"
        fill="dimgray"
      >
        {{ item.name }}
      </text>
      <rect x="55%" y="10%" width="40%" height="80%" rx="1%" :fill="color" />
      <text
        x="75%"
        y="50%"
        dominant-baseline="middle"
        text-anchor="middle"
        font-size="25px"
        font-family="arial"
        fill="white"
      >
        {{ text }}
      </text>
    </svg>
  </div>
</template>

<style scoped>
</style>

<script>
//[x] Auto scale based on width
//[x] Make svg style local
export default {
  name: "UiDigitalInputEditor",
  components: {},
  props: ["index"],
  methods: {
    onResize() {
      this.width = this.$refs.frame.clientWidth;
    },
  },
  data() {
    return {
      width: 0,
      on: true,
    };
  },
  computed: {
    ui() {
      return this.$store.state.view.selected.data;
    },
    item() {
      return this.ui.items[this.index];
    },
    height() {
      return this.width / 4 + "px";
    },
    color() {
      return this.on ? "limegreen" : "slategray";
    },
    text() {
      return this.on ? "ON" : "OFF";
    },
  },
};
</script>
