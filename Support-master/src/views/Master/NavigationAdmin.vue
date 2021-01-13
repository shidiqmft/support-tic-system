<template>
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
      <v-btn icon
      color="grey"
      href="AdminHome">
        <v-icon>mdi-apps</v-icon>
      </v-btn>


      <v-badge
        v-model="show"
        color="cyan"
        left
      >
      <template v-slot:badge>
          <span>6</span>
      </template>
      <v-btn 
      icon
      color="grey">
        <v-icon
        @mouseover="show = true"
        @mouseout="show = false"
        >mdi-bell</v-icon>
      </v-btn>
    </v-badge>

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
        color="primary" 
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
              <v-list-item-title>User</v-list-item-title>
              <!-- <v-list-item-subtitle>Mahasiwa</v-list-item-subtitle> -->
            </v-list-item-content>

            <v-list-item-action>
              <v-btn
                :class="fav ? 'red--text' : ''"
                icon
                @click="fav = !fav"
              >
                <v-icon>mdi-heart</v-icon>
              </v-btn>
            </v-list-item-action>

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

<!--         <v-list>
          <v-list-item>
            <v-list-item-action>
              <v-switch v-model="message" color="purple"></v-switch>
            </v-list-item-action>
            <v-list-item-title>Enable messages</v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-action>
              <v-switch v-model="hints" color="purple"></v-switch>
            </v-list-item-action>
            <v-list-item-title>Enable hints</v-list-item-title>
          </v-list-item>
        </v-list> -->

        <!-- <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn text @click="menu = false">Cancel</v-btn>
          <v-btn color="primary" text @click="menu = false">Save</v-btn>
        </v-card-actions> -->
      </v-card>
    </v-menu>
  </div>
  </template>
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
<!--             <v-col
              cols="6"
              class="text-right"
            >
              <v-btn
                small
                text
              >edit</v-btn>
            </v-col> -->
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
    <v-divider></v-divider>
    <router-view></router-view>
    <!-- <v-main> -->
<!--       <v-container
        fluid
        class="grey lighten-4 fill-height"
      >
        <v-row
          justify="center"
          align="center"
        >
          <v-col class="shrink">
            <v-tooltip right>
              <template v-slot:activator="{ on }">
                <v-btn
                  :href="source"
                  icon
                  large
                  target="_blank"
                  v-on="on"
                >
                  <v-icon large>mdi-code-tags</v-icon>
                </v-btn>
              </template>
              <span>Source</span>
            </v-tooltip>
          </v-col>
        </v-row>
      </v-container> -->
<!--     </v-main> -->
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
        { heading: 'ticket' },
        { icon: 'mdi-ticket-percent', text: 'View Ticket', name: 'TableAdmin' },
        { divider: true },
        { icon: 'mdi-bell', text: 'Notification', name: 'Notification' },
        { icon: 'mdi-delete', text: 'Delete Ticket', name: 'TableAdminView' },
        { divider: true },
        { icon: 'mdi-cog', text: 'Settings', name: 'Setting' },
        // { icon: 'mdi-comment-outline', text: 'Comment' },
        { icon: 'mdi-calendar', text: 'Calendar', name: 'Calendar' },
        { icon: 'mdi-help', text: 'Help' },
        { icon: 'mdi-phonelink', text: 'App downloads' },
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
