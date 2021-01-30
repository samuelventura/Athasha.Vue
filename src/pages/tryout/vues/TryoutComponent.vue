<template>
  <div>
    <input type="checkbox" v-model="showButton" />
    Button Visible
    <button v-if="showButton" v-tryout @click="execMixinMethodClicked">
      Execute Mixin Method
    </button>
    <p @dblclick="onDblClick">Double click to log event</p>
    <div>
      <h2>Store Access</h2>
      <button @click="incrementStoreMutationClicked">
        Commit Increment Mutation (+2)
      </button>
      <button @click="incrementStoreActionClicked">
        Dispatch Increment Action (+3)
      </button>
      <div>
        get uses state and set uses commit
        <input type="number" v-model.number="counter1" />
      </div>
      <div>
        get uses getters and set uses action
        <input type="number" v-model.number="counter2" />
      </div>
    </div>
    <div>
      <h2>Module Access</h2>
      <button @click="incrementModuleMutationClicked">
        Commit Increment Mutation (+2)
      </button>
      <button @click="incrementModuleActionClicked">
        Dispatch Increment Action (+3)
      </button>
      <div>
        get uses state and set uses commit
        <input type="number" v-model.number="counter3" />
      </div>
      <div>
        get uses getters and set uses action
        <input type="number" v-model.number="counter4" />
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>

<script>
export default {
  name: "EmptyComponent",
  components: {},
  props: [],
  methods: {
    onDblClick() {
      console.log("onDblClick", this);
    },
    execMixinMethodClicked() {
      console.log("execMixinMethodClicked", this);
      this.$root.mixinMethod();
    },
    incrementStoreMutationClicked() {
      console.log("incrementStoreMutationClicked", this);
      this.$store.commit("increment", 2);
    },
    incrementStoreActionClicked() {
      console.log("incrementStoreActionClicked", this);
      this.$store.dispatch("increment", 3);
    },
    incrementModuleMutationClicked() {
      console.log("incrementModuleMutationClicked", this);
      this.$store.commit("module/increment", 2);
    },
    incrementModuleActionClicked() {
      console.log("incrementModuleActionClicked", this);
      this.$store.dispatch("module/increment", 3);
    },
  },
  data() {
    return {
      showButton: true,
    };
  },
  created() {
    console.log("lifecycle:created");
  },
  mounted() {
    console.log("lifecycle:mounted");
  },
  updated() {
    console.log("lifecycle:updated");
  },
  destroyed() {
    console.log("lifecycle:destroyed");
  },
  computed: {
    counter1: {
      get: function () {
        return this.$store.state.count;
      },
      set: function (value) {
        //received as string unless v-model.number used
        this.$store.commit("counter", value);
      },
    },
    counter2: {
      get: function () {
        return this.$store.getters["counter"];
      },
      set: function (value) {
        //received as string unless v-model.number used
        this.$store.dispatch("counter", value);
      },
    },
    counter3: {
      get: function () {
        return this.$store.state.module.count;
      },
      set: function (value) {
        //received as string unless v-model.number used
        this.$store.commit("module/counter", value);
      },
    },
    counter4: {
      get: function () {
        return this.$store.getters["module/counter"];
      },
      set: function (value) {
        //received as string unless v-model.number used
        this.$store.dispatch("module/counter", value);
      },
    },
  },
};
</script>
