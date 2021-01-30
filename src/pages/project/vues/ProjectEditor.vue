<template>
  <div class="container">
    <ProjectEditorNav />
    <br />
    <div class="columns is-fullheight">
      <div class="column is-narrow">
        <ProjectEditorItems />
      </div>
      <div class="column">
        <div v-if="itemSelected.$id">
          <h2 class="title">{{ itemSelected.name }}</h2>
          <ModbusChannelEditor v-if="itemSelected.type == 'Modbus Channel'" />
          <ModbusTableEditor v-if="itemSelected.type == 'Modbus Table'" />
          <ModbusGroupEditor v-if="itemSelected.type == 'Modbus Group'" />
          <UserInterfaceEditor v-if="itemSelected.type == 'User Interface'" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>

<script>
import ProjectEditorNav from "./ProjectEditorNav.vue";
import ProjectEditorItems from "./ProjectEditorItems.vue";
import ModbusChannelEditor from "./ModbusChannelEditor.vue";
import ModbusTableEditor from "./ModbusTableEditor.vue";
import ModbusGroupEditor from "./ModbusGroupEditor.vue";
import UserInterfaceEditor from "./UserInterfaceEditor.vue";

// Name Editor Spec
// 1. Enter on double click
// 2. Cursor to end on show
// 3. Submit on enter
// 4. Size to content
// 5. Trim space
// 6. Reject empty name
// 7. Max length 32

// [x] Add filter clear button
// [x] Sort item list by D&D
// [x] Delete by D&D to Trash Can
// [-] Use name editor component
//     AVOID: Messes width detection

export default {
  name: "ProjectEditor",
  components: {
    ProjectEditorNav,
    ProjectEditorItems,
    ModbusChannelEditor,
    ModbusTableEditor,
    ModbusGroupEditor,
    UserInterfaceEditor,
  },
  methods: {},
  data() {
    return {};
  },
  computed: {
    itemSelected() {
      return this.$store.state.view.selected;
    },
  },
};
</script>
