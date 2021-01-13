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
      > -->
-->
<!--  <v-row
          justify="center"
          align="center"
        >
          <v-col class="shrink">
            <v-tooltip right>
              <template v-slot:activator="{ on }"> -->

<!--               </template>
              <span>Source</span>
            </v-tooltip
          </v-col> -->
<template>
  <div>
    <v-content>
      <Title></Title>
      <v-container grid-list-xl fluid>
        <v-layout row wrap>
          <v-flex lg3 sm6 v-for="(item, index) in items" :key="index">
            <v-card color="white">
              <v-layout row justify-space-between class="ma-0">
                <v-flex xs2>
                  <v-icon size="120" :color="item.color">{{
                    item.icon
                  }}</v-icon>
                </v-flex>
                <v-flex xs6 class="d-flex justify-center mb-6">
                  <span
                    :style="{
                      color: item.color,
                      fontWeight: 'bold',
                      fontSize: '26px',
                    }"
                  >
                    {{ item.text }}
                  </span>
                </v-flex>
              </v-layout>
            </v-card>
          </v-flex>
        </v-layout>
        <Tablecreate :title="false" :buttons="false"></Tablecreate>
      </v-container>

      <v-layout row wrap>
        <v-flex d-flex lg4 sm6 xs12>
          <Chart></Chart>
        </v-flex>
        <v-flex d-flex lg4 sm6 xs12>
          <DeleteChart></DeleteChart>
        </v-flex>
        <v-flex d-flex lg4 sm6 xs12>
          <Chart3></Chart3>
        </v-flex>
      </v-layout>
      <v-flex class="d-flex justify-center mb-6">
        <circular></circular>
      </v-flex>
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
import Title from "@/views/Admin/Admintools/Title.vue";
import Chart from "@/views/Admin/Admintools/Chart.vue";
import DeleteChart from "@/views/Admin/Admintools/DeleteChart.vue";
import Chart3 from "@/views/Admin/Admintools/Chart3.vue";
import circular from "@/views/Admin/Admintools/circular.vue";
import { getUsers, getTickets } from "@api/user";
import Tablecreate from "@/views/Admin/Admintools/Tablecreate.vue";
export default {
  props: {
    source: String,
  },
  components: { Title, Chart, DeleteChart, Chart3, circular, Tablecreate },
  data: () => ({
    items: [
      {
        id: 1,
        color: "blue",
        icon: "mdi-account",
        text: "loading...",
      },
      {
        id: 2,
        color: "red",
        icon: "mdi-ticket",
        text: "loading...",
      },
      {
        id: 3,
        color: "purple",
        icon: "mdi-account-check",
        text: "loading...",
      },
      {
        id: 4,
        color: "brown",
        icon: "mdi-ticket",
        text: "loading...",
      },
    ],
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
  created() {
    getUsers().then((res) => {
      // console.log(res.data);
      // alert(res.data.length);
      this.$set(this.items, 0, {
        id: 1,
        color: "blue",
        icon: "mdi-account",
        text: res.data.length + " Account Login",
      });
      this.$set(this.items, 2, {
        id: 3,
        color: "purple",
        icon: "mdi-account-check",
        text: res.data.length + " Account Registered",
      });
    });
    getTickets().then((res) => {
      // console.log(res.data);
      // alert(res.data.length);
      this.$set(this.items, 1, {
        id: 2,
        color: "red",
        icon: "mdi-ticket",
        text: res.data.length + " Ticket Created",
      });
    });
    getTickets("", true).then((res) => {
      // console.log(res.data);
      // alert(res.data.length);
      this.$set(this.items, 3, {
        id: 4,
        color: "yellow",
        icon: "mdi-ticket",
        text: res.data.length + " Ticket Deleted",
      });
    });
  },
};
</script>
