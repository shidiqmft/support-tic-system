<template>
  <v-card>
    <v-card-title>
      View Ticket
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      />
    </v-card-title>
    <v-data-table :headers="headers" :items="NewTable" :search="search" />
  </v-card>
</template>
<script>
import { getTickets } from "@api/user.js";
import utils from "./../../../helpers/utils";
export default {
  name: "AllTable",
  data() {
    return {
      search: "",
      headers: [
        { text: "Number", value: "number" },
        {
          text: "Name",
          align: "left",
          sortable: false,
          value: "name",
        },
        { text: "Description", value: "description" },
        { text: "Priority", value: "priority" },
        { text: "Division", value: "division" },
        { text: "Date", value: "date" },
      ],
      NewTable: [],
    };
  },
  methods: {
    getData() {
      getTickets().then((res) => {
        // console.log(res.data);
        const data = res.data.map((item, index) => {
          item.number = index + 1;
          item.date = utils.formatDate(item.date);
          return item;
        });
        console.log("data", data);
        this.NewTable = data;
      });
    },
  },
  created() {
    this.getData();
  },
  mounted() {
    // alert("1");
  },
};
</script>
