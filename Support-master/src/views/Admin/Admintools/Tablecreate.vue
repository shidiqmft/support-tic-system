<template>
  <v-app>
    <v-container>
      <v-col cols="12" v-if="title">
        <v-card color="#385F73" dark>
          <v-card-title class="text-center justify-center py-6">
            <h1 class="font-weight-bold display-3 basil--text">
              List Ticket
            </h1>
          </v-card-title>

          <v-card-subtitle class="text-center justify-center py-6"
            >View User Ticket</v-card-subtitle
          >
        </v-card>
      </v-col>
      <v-data-table :headers="headers" :items="items" :search="search" class="elevation-1">
        <template v-slot:top>
          <v-toolbar flat dark>
            <v-toolbar-title>View Ticket</v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
            <v-spacer></v-spacer>
            <v-dialog v-model="dialog" max-width="500px">
              <template v-slot:activator="{ on }" v-if="buttons">
                <v-btn color="error" dark class="mb-2" v-on="on"
                  >Add New Ticket</v-btn
                >
              </template>
              <v-card>
                <v-card-title>
                  <span class="headline">{{ formTitle }}</span>
                </v-card-title>
                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12" sm="12">
                        <v-text-field
                          autofocus
                          color="error"
                          v-model="editedItem.code"
                          label="Create Ticket"
                          required
                          disabled
                        ></v-text-field>
                      </v-col>

                      <v-col cols="12" sm="12">
                        <v-select
                          autofocus
                          color="error"
                          v-model="editedItem.name"
                          :items="users"
                          label="Name"
                          required
                        />
                        <!-- <v-text-field
                          autofocus
                          color="error"
                          v-model="editedItem.name"
                          label="Name"
                          required
                        ></v-text-field> -->
                      </v-col>
                      <v-col cols="12" sm="12">
                        <v-text-field
                          autofocus
                          color="error"
                          v-model="editedItem.description"
                          label="Description"
                          required
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="12">
                        <v-select
                          autofocus
                          color="error"
                          v-model="editedItem.division"
                          :items="division"
                          label="Division"
                          required
                        ></v-select>
                      </v-col>
                      <v-col cols="12" sm="12">
                        <v-select
                          autofocus
                          color="error"
                          v-model="editedItem.priority"
                          :items="priority"
                          label="Priority"
                          required
                        ></v-select>
                      </v-col>
                      <v-col cols="12" sm="12">
                        <v-menu
                          ref="menu"
                          v-model="menu"
                          :close-on-content-click="false"
                          :return-value.sync="Date"
                          transition="scale-transition"
                          offset-y
                          min-width="290px"
                        >
                          <template v-slot:activator="{ on }">
                            <v-text-field
                              autofocus
                              color="error"
                              ref="date"
                              v-model="editedItem.date"
                              label="Date"
                              append-icon="mdi-calendar-range"
                              readonly
                              required
                              v-on="on"
                            ></v-text-field>
                          </template>
                          <v-date-picker
                            v-model="editedItem.date"
                            no-title
                            scrollable
                          >
                            <v-spacer></v-spacer>
                            <v-btn text color="primary" @click="menu = false"
                              >Cancel</v-btn
                            >
                            <v-btn
                              text
                              color="primary"
                              @click="$refs.menu.save(date)"
                              >OK</v-btn
                            >
                          </v-date-picker>
                        </v-menu>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="error darken-1" text @click="close"
                    >Cancel</v-btn
                  >
                  <v-btn color="error darken-1" text @click="save">Save</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-toolbar>
        </template>
        <template v-slot:item.action="{ item }" v-if="buttons">
          <v-icon small class="mr-2" @click="editItem(item)">
            mdi-content-save-edit-outline
          </v-icon>
          <v-icon small @click="deleteItem(item)">
            mdi-delete
          </v-icon>
        </template>
      </v-data-table>
    </v-container>

    <v-snackbar v-model="snackbar" :timeout="timeout">
      {{ snackbarText }}

      <template v-slot:action="{ attrs }">
        <v-btn color="blue" text v-bind="attrs" @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </v-app>
</template>

<script>
import { getTickets, updateTicket, postTicket, getUsers } from "@api/user.js";
import utils from "./../../../helpers/utils";
export default {
  name: "Tablecreate",
  props: {
    title: {
      default: true,
    },
    buttons: {
      default: true,
    },
  },
  data: () => ({
    search: "",
    snackbarText: "",
    snackbar: false,
    timeout: 2000,
    users: [],
    dialog: false,
    editedIndex: -1,
    editedItem: {
      code: "",
      name: "",
      description: "",
      division: "Frontend",
      priority: "Low",
      date: "",
    },
    defaultItem: {
      code: "",
      name: "",
      description: "",
      division: "",
      priority: "",
      date: "",
    },
    date: new Date().toISOString().substr(0, 10),
    priority: ["Low", "High"],
    division: ["Frontend", "Backend"],
    headers: [
      {
        text: "No",
        align: "left",
        sortable: true,
        value: "code",
      },

      { text: "Name", value: "name" },
      { text: "Description", value: "description" },
      { text: "Division", value: "division" },
      { text: "Priority", value: "priority" },
      { text: "date", value: "date" },
    ],
    items: [
    ],
  }),
  computed: {
    message() {
      return this.$store.getters.getMessage;
    },
    headers() {
      return this.$store.getters.getHeaders;
    },
    items() {
      return this.$store.getters.getItems;
    },
    formTitle() {
      return this.editedIndex === -1 ? "" : "Edit Record";
    },
  },
  watch: {
    dialog(val) {
      val || this.close();
    },
  },
  methods: {
    saveNewTicket() {
      let request = {
        number: this.editedItem.number,
        name: this.editedItem.name,
        description: this.editedItem.description,
        priority: this.priority,
        division: this.division,
        date: this.editedItem.date,
        email: localStorage.getItem("email"),
      };
      // console.log(request);
      // return;

      // console.log("masuk");
      if (this.editedIndex > -1) {
        updateTicket(this.form._id, request).then((res) => {
          console.log(res);
          this.getData();
          this.snackbarText = "Ticket has been updated";
          this.snackbar = true;
        });
      } else {
        postTicket(request).then((res) => {
          console.log(res);
          this.getData();
          this.snackbarText = "Ticket has been created";
          this.snackbar = true;
        });
      }
    },
    editItem(item) {
      this.editedIndex = this.items.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },
    deleteItem(item) {
      const index = this.items.indexOf(item);
      confirm("Are you sure you want to delete this item?") &&
        this.items.splice(index, 1);
      // this.$store.commit("deleteItem", index);
      updateTicket(item._id, { is_deleted: true }).then(() => {
        this.getData();
      });

      // Todo: Make this delete item from store
    },
    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },
    save() {
      if (this.editedIndex > -1) {
        const data = this.editedItem;
        console.log(data);
        this.items = [];
        updateTicket(this.editedItem._id, data).then(() => {
          this.getData();
          this.snackbarText = "Ticket has been updated";
          this.snackbar = true;
        });
        // alert(1);
        // console.log(this.editedItem);
        // Object.assign(this.items[this.editedIndex], this.editedItem);
        // TODO: Edit item in the store.
        // this.$store.commit("updateItem", this.editedItem, this.editedIndex);
      } else {
        // this.$store.commit("newItem", this.editedItem);
        //   let request = {
        //   number: this.editedItem.number,
        //   name: this.editedItem.name,
        //   description: this.editedItem.description,
        //   priority: this.priority,
        //   division: this.division,
        //   date: this.editedItem.date,
        //   email: localStorage.getItem("email"),
        // };
        postTicket({
          ...this.editedItem,
          email: localStorage.getItem("email"),
        }).then((res) => {
          console.log(res);
          this.getData();
          this.snackbarText = "Ticket has been created";
          this.snackbar = true;
        });
      }
      this.close();
    },
    getData() {
      getTickets().then((res) => {
        // console.log(res.data);
        const data = res.data.map((item, index) => {
          item.code = index + 1;
          item.date = utils.formatDate(item.date);
          return item;
        });
        // console.log(data);
        this.items = data;
      });
    },
  },
  created() {
    this.getData();
    if (this.buttons) {
      this.headers.push({ text: "Actions", value: "action", sortable: false });
    }
    getUsers()
      .then((response) => {
        // console.log(response.data);
        this.users = response.data.map((user) => user.name);
      })
      .catch((error) => {
        console.log(error);
      });
  },
  mutations: {
    newItem(state, payload) {
      state.items.push(payload);
    },
    deleteItem(state, payload) {
      state.items.splice(payload, 1);
    },
    updateItem(state, payload, index) {
      state.items[index] = payload;
    },
  },
  actions: {},
  getters: {
    getMessage(state) {
      return state.msg;
    },
    getHeaders(state) {
      return state.headers;
    },
    getItems(state) {
      return state.items;
    },
  },
};
</script>
