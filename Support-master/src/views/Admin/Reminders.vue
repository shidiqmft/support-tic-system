
<template>
  <div>

    <v-content>
         <v-col cols="12">
          <v-card
            color="#01c5c4"
            dark
          >
            <v-card-title class="headline">
              Admin Reminders
            </v-card-title>

            <v-card-subtitle>Reminders help admin user to understand how to operate system</v-card-subtitle>
          </v-card>
        </v-col>
        
        <reminderscontent></reminderscontent>
      </v-content>

</div>
</template>

<script>
  import Reminderscontent from '@/views/Admin/Admintools/Reminderscontent.vue'
  export default {
    props: {
      source: String,
    },
    components : { Reminderscontent },
    data: () => ({
    }),
  }
</script>