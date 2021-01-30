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
      <rect
        x="55%"
        y="10%"
        width="20%"
        height="80%"
        rx="1%"
        :fill="fillOn"
        cursor="pointer"
        @mouseover="onMouseOver('on')"
        @mouseout="onMouseOut('on')"
        @click="onClickOn()"
      />
      <rect
        x="75%"
        y="10%"
        width="20%"
        height="80%"
        rx="1%"
        :fill="fillOff"
        cursor="pointer"
        @mouseover="onMouseOver('off')"
        @mouseout="onMouseOut('off')"
        @click="onClickOff()"
      />
      <rect
        x="74.8%"
        y="0%"
        width="0.4%"
        height="100%"
        stroke="#dddddd"
        fill="#dddddd"
      />
      <text
        x="65%"
        y="50%"
        dominant-baseline="middle"
        text-anchor="middle"
        font-size="25px"
        font-family="arial"
        fill="white"
        cursor="pointer"
        @mouseover="onMouseOver('on')"
        @mouseout="onMouseOut('on')"
        @click="onClickOn()"
      >
        ON
      </text>
      <text
        x="85%"
        y="50%"
        dominant-baseline="middle"
        text-anchor="middle"
        font-size="25px"
        font-family="arial"
        fill="white"
        cursor="pointer"
        @mouseover="onMouseOver('off')"
        @mouseout="onMouseOut('off')"
        @click="onClickOff()"
      >
        OFF
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
  name: "UiDigitalOutputEditor",
  components: {},
  props: ["index"],
  methods: {
    onResize() {
      this.width = this.$refs.frame.clientWidth;
    },
    onClickOn() {
      console.log("onClickOn");
    },
    onClickOff() {
      console.log("onClickOff");
    },
    onMouseOver(button) {
      //console.log("onMouseOver", button);
      if (button == "on") this.onHover = true;
      if (button == "off") this.offHover = true;
    },
    onMouseOut(button) {
      //console.log("onMouseOut", button);
      if (button == "on") this.onHover = false;
      if (button == "off") this.offHover = false;
    },
  },
  data() {
    return {
      width: 0,
      onHover: false,
      offHover: false,
      on: false,
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
    fillOn() {
      return this.onHover ? "steelblue" : "transparent";
    },
    fillOff() {
      return this.offHover ? "steelblue" : "transparent";
    },
  },
};
</script>
