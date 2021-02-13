<template>
  <v-app id="keep">
    <v-app-bar
      app
      clipped-left
      color="cyan darken-4"
    >
      <v-app-bar-nav-icon color="white" @click="drawer = !drawer"></v-app-bar-nav-icon>
          <h3  class="font-weight-bold white--text">
            Admin Dashboard
          </h3>
      <v-spacer></v-spacer>
      <v-btn icon
      color="white"
      href="AdminHome">
        <v-icon>mdi-apps</v-icon>
      </v-btn>

  <template>
  <div class="text-center">
    <v-menu
      v-model="menu"
      :close-on-content-click="false"
      :nudge-width="200"
      offset-x
    >
      <template v-slot:activator="{ on }">
      <v-btn
        icon
        large
        color="teal darken-4" 
        dark v-on="on"
      >
        <v-avatar
          size="32px"
          item
        >
          <v-img
            src="//ssl.gstatic.com/s2/oz/images/sge/grey_silhouette.png"
            alt="Vuetify"
          /></v-avatar>
      </v-btn>
    </template>
    <v-card>
        <v-list>
          <v-list-item>
            <v-list-item-avatar>
              <img src="//ssl.gstatic.com/s2/oz/images/sge/grey_silhouette.png" alt="John">
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title>Admin</v-list-item-title>
            </v-list-item-content>

            <template>
            <v-btn 
            class="mx-2"
            fab dark small color="error"
            @click.stop="dialoglogout = true"
            >
            <v-icon dark>mdi-logout</v-icon>
            </v-btn>
            <v-dialog
              v-model="dialoglogout"
              max-width="310">
      <v-card>
        <v-card-title class="headline">Do You want to Logout?</v-card-title>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            color="green darken-1"
            text
            @click="dialoglogout = false"
          >
            Disagree
          </v-btn>

          <v-btn
            color="green darken-1"
            text
            @click="logout()"
          >
            Agree
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </template>
          </v-list-item>
        </v-list>

        <v-divider></v-divider>

      </v-card>
    </v-menu>
  </div>
  </template>
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      app
      clipped
      color="white"
    >
      <v-list
        dense
        class="cyan darken-4"
      >
        <template v-for="(item, i) in items">
          <v-row
            v-if="item.heading"
            :key="i"
            align="center"
            color="white"
          >
            <v-col cols="6">
              <v-subheader color="white"  v-if="item.heading">
                {{ item.heading }}
              </v-subheader>
            </v-col>
          </v-row>
          <v-divider
            v-else-if="item.divider"
            :key="i"
            dark
            class="my-4"
          ></v-divider>

          <v-list-item
           @click="goToPage(item.name)"
            v-else
            :key="item.text"
            link
          >
            <v-list-item-action>
              <v-icon color="white" >{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title class="white--text">
                {{ item.text }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>
    </v-navigation-drawer>
    <v-divider></v-divider>
    <router-view></router-view>
  </v-app>
</template>

<script>
  import {getCookie, eraseCookie} from '@/helpers/cookie.js';
  export default {
    name : "NavigationAdmin",
    props: {
      source: String,
    },
    data: () => ({
      drawer: null,
      dialoglogout: false,
      items: [
        { icon: 'mdi-home', text: 'Home', name : 'AdminHome' },
        { icon: 'mdi-reminder', text: 'Reminders', name : 'Reminders' },
        { divider: true },
        { icon: 'mdi-ticket-percent', text: 'View Ticket', name: 'TableAdmin' },
                { icon: 'mdi-account-plus', text: 'Add User', name: 'AddUser' },
        { divider: true },
        // { icon: 'mdi-bell', text: 'Notification', name: 'Notification' },
        { icon: 'mdi-delete', text: 'Delete Ticket', name: 'TableAdminView' },
        { divider: true },
        // { icon: 'mdi-cog', text: 'Settings', name: 'Setting' },
        // { icon: 'mdi-calendar', text: 'Calendar', name: 'Calendar' },
        { },
        { },
        { },
        { },
        { },
        { },
      ],
    }),
    methods: {
      logout() {
        eraseCookie("token_admin");
        setTimeout(()=> {
          if(!getCookie("token_admin")) {
            this.$router.push("/logins");
          }
        }, 500);
      },
      goToPage(name){
        this.$router.push({name: name});
      },
    }
  }
</script>
<style>
#keep .v-navigation-drawer__border {
  display: none
}
</style>
