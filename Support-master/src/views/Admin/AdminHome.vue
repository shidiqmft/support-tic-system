<template>
  <div>
    <v-content>
      <v-container grid-list-xl fluid>
        <v-layout row wrap>
          <v-flex lg3 sm6 v-for="(item, index) in items" :key="index">
            <v-card color="white">
              <v-layout row justify-space-between class="ma-0">
                <v-flex xs2>
                  <v-icon size="95" :color="item.color">{{
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

    </v-content>
  </div>
</template>
<script>
import { getUsers, getTickets } from "@api/user";
import Tablecreate from "@/views/Admin/Admintools/Tablecreate.vue";
export default {
  props: {
    source: String,
  },
  components: { Tablecreate },
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
        color: "amber",
        icon: "mdi-ticket",
        text: "loading...",
      },
      {
        id: 3,
        color: "green",
        icon: "mdi-account-check",
        text: "loading...",
      },
      {
        id: 4,
        color: "red",
        icon: "mdi-delete-circle",
        text: "loading...",
      },
    ],
  }),
  created() {
    getUsers().then((res) => {
      this.$set(this.items, 0, {
        id: 1,
        color: "blue",
        icon: "mdi-account",
        text: res.data.length + " Account Login",
      });
      this.$set(this.items, 2, {
        id: 3,
        color: "green",
        icon: "mdi-account-check",
        text: res.data.length + " Account Registered",
      });
    });
    getTickets().then((res) => {
      this.$set(this.items, 1, {
        id: 2,
        color: "amber",
        icon: "mdi-ticket",
        text: res.data.length + " Ticket Created",
      });
    });
    getTickets("", true).then((res) => {
      this.$set(this.items, 3, {
        id: 4,
        color: "red",
        icon: "mdi-delete-circle",
        text: res.data.length + " Ticket Deleted",
      });
    });
  },
};
</script>
