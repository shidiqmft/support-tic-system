
<template>
  <div>
    <v-content>
      <Notif></Notif>
      </v-content>
</div>
</template>

<script>
  import Notif from '@/views/Admin/Admintools/Notif.vue'
  export default {
    props: {
      source: String,
    },
    components : {Notif},
    data: () => ({
    }),
  }
</script>