<template>
  <div>
    <v-content>
      <Header2></Header2>
      <Tickets></Tickets>
    </v-content>
    <contact></contact>
    <!-- <v-footer 
    color="grey lighten-1"
    padless
    >
    <v-col
      class="text-center"
      cols="12"
    >
      {{ new Date().getFullYear() }} — <strong>Support Ticketing Sistem</strong>
    </v-col>
  </v-footer>
  </v-app> -->
  </div>
</template>

<script>
// import Contact from '@/components/home/Contact.vue'
import Header2 from "@/views/Usertools/Header2.vue";
import Tickets from "@/views/Ticket/Tickettools/Tickets.vue";
export default {
  props: {
    source: String,
  },
  components: { Tickets, Header2 },
  data: () => ({
    // dialoglogout: false,
    // drawer: null,
    // fav: true,
    // menu: false,
    // message: false,
    // hints: true,
    // items: [
    //   { icon: 'mdi-home-circle', text: 'Home', name: 'home'},
    //   { icon: 'mdi-account-circle', text: 'Profile', name: 'Profile' },
    //   { icon: 'mdi-book-information-variant', text: 'Article' },
    //   {
    //     icon: 'mdi-chevron-up',
    //     'icon-alt': 'mdi-chevron-down',
    //     text: 'Tickets',
    //     model: false,
    //     children: [
    //       { icon: 'mdi-ticket-account', text: 'My Ticket', name: 'MyTicket' },
    //       { icon: 'mdi-ticket-percent', text: 'New Ticket', name: 'NewTicket' },
    //       { icon: 'mdi-ticket-confirmation', text: 'All Ticket', name: 'AllTicket' },
    //     ],
    //   },
    //   {
    //     icon: 'mdi-chevron-up',
    //     'icon-alt': 'mdi-chevron-down',
    //     text: 'More',
    //     model: false,
    //     children: [
    //       { text: 'Import' },
    //       { text: 'Export' },
    //       { text: 'Print' },
    //       { text: 'Undo changes' },
    //       { text: 'Other contacts' },
    //     ],
    //   },
    //   { icon: 'mdi-history', text: 'History' },
    //   { icon: 'mdi-message', text: 'Send feedback' },
    //   { icon: 'mdi-settings', text: 'Settings' },
    //   { icon: 'mdi-cellphone-link', text: 'Download' },
    //   { icon: 'mdi-keyboard', text: 'Go to the old version' },
    // ],
  }),
  // methods: {
  //   goToPage(name){
  //     this.$router.push({name: name});
  //   }
  // }
};
</script>
