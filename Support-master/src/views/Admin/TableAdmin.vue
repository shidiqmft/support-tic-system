<template>
  <div>
    <v-content>
      <Tablecreate></Tablecreate>
    </v-content>
  </div>
</template>
<script>
import Tablecreate from "@/views/Admin/Admintools/Tablecreate.vue";
export default {
  props: {
    source: String,
  },
  components: { Tablecreate },
  data: () => ({
  }),
};
</script>
