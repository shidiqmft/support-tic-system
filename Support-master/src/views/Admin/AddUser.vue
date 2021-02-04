<template>
  <div>
    <v-content>
      <Register></Register>
    </v-content>
  </div>
</template>
<script>
import Register from "@/views/Admin/Admintools/Register.vue";
export default {
  props: {
    source: String,
  },
  components: { Register },
  data: () => ({
  }),
};
</script>