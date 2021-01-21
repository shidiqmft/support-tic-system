<template>
  <div>
    <v-content>
      <Header></Header>
      <AllTable></AllTable>
    </v-content>
    <contact></contact>
  </div>
</template>

<script>
import AllTable from "@/views/Ticket/Tickettools/AllTable.vue";
import Header from "@/views/Usertools/Header.vue";
export default {
  props: {
    source: String,
  },
  components: { AllTable, Header },
  data: () => ({
   
  }),
};
</script>
