<!-- <template>
  <v-app id="keep">
    <v-app-bar
      app
      clipped-left
      color="amber"
    >
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <span class="title ml-3 mr-5">Admin&nbsp;<span class="font-weight-light">Dashboard</span></span>
      <v-text-field
        solo-inverted
        flat
        hide-details
        label="Search"
        prepend-inner-icon="mdi-account-search"
      ></v-text-field>

      <v-spacer></v-spacer>
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      app
      clipped
      color="grey lighten-4"
    >
      <v-list
        dense
        class="grey lighten-4"
      >
        <template v-for="(item, i) in items">
          <v-row
            v-if="item.heading"
            :key="i"
            align="center"
          >
            <v-col cols="6">
              <v-subheader v-if="item.heading">
                {{ item.heading }}
              </v-subheader>
            </v-col>
            <v-col
              cols="6"
              class="text-right"
            >
              <v-btn
                small
                text
              >edit</v-btn>
            </v-col>
          </v-row>
          <v-divider
            v-else-if="item.divider"
            :key="i"
            dark
            class="my-4"
          ></v-divider>
          <v-list-item
            v-else
            :key="i"
            link
          >
            <v-list-item-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title class="grey--text">
                {{ item.text }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <v-container
        fluid
        class="grey lighten-4 fill-height"
      > --> -->
       <!--  <v-row
          justify="center"
          align="center"
        >
          <v-col class="shrink">
            <v-tooltip right>
              <template v-slot:activator="{ on }"> -->

<!--               </template>
              <span>Source</span>
            </v-tooltip>
          </v-col> -->
<template>
  <div>
    <v-content>
      <Calendar></Calendar>
      </v-content>
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
       <!--  </v-row>
      </v-container>
    </v-main>
  </v-app>
</template> -->

<script>
  import Calendar from '@/views/Admin/Admintools/Calendar.vue'
  export default {
    props: {
      source: String,
    },
    components : {Calendar},
    data: () => ({
  //     drawer: null,
  //     items: [
  //       { icon: 'mdi-lightbulb-outline', text: 'Notes' },
  //       { icon: 'mdi-reminder', text: 'Reminders' },
  //       { divider: true },
  //       { heading: 'ticket' },
  //       { icon: 'mdi-ticket-percent', text: 'Create new Ticket' },
  //       { icon: 'mdi-ticket-percent-outline', text: 'View new Ticket' },
  //       { divider: true },
  //       { icon: 'mdi-archive', text: 'Archive' },
  //       { icon: 'mdi-delete', text: 'Delete Ticket' },
  //       { icon: 'mdi-calendar', text: 'Calendar' },
  //       { divider: true },
  //       { icon: 'mdi-cog', text: 'Settings' },
  //       { icon: 'mdi-comment-outline', text: 'Comment' },
  //       { icon: 'mdi-calendar', text: 'Calendar' },
  //       { icon: 'mdi-help', text: 'Help' },
  //       { icon: 'mdi-phonelink', text: 'App downloads' },
  //     ],
    }),
  }
</script>