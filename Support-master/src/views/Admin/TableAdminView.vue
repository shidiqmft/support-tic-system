
<template>
  <div>
    <v-content>
      <Tableview></Tableview>
    </v-content>
  </div>
</template>

<script>
import Tableview from "@/views/Admin/Admintools/Tableview.vue";
export default {
  props: {
    source: String,
  },
  components: { Tableview },
  data: () => ({
  }),
};
</script>
