<template>
  <v-data-table
    :headers="headers"
    :items="tickets"
    sort-by="date"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat color="grey darken-2">
        <v-toolbar-title class="font-weight-bold white--text" >My Tickets</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="800px">
          <template v-slot:activator="{ on }">
            <v-btn color="teal" dark class="mb-2" v-on="on">New Data</v-btn>
          </template>

          <v-card color="blue-grey darken-1" dark>
            <template v-slot:progress>
              <v-progress-linear
                absolute
                color="green lighten-3"
                height="4"
                indeterminate
              ></v-progress-linear>
            </template>

            <v-img height="200" src="@/views/Image/view.jpg">
              <v-row>
                <v-row class="pa-4" align="center" justify="center">
                  <v-col class="text-center">
                    <h3 class="headline">New Ticket</h3>
                    <span class="grey--text text--lighten-1">
                      Create New Ticket</span
                    >
                  </v-col>
                </v-row>
              </v-row>
            </v-img>

            <v-container>
              <v-form>
                <v-row>
                  <v-col cols="12" md="6">
                    <v-text-field
                      ref="Number"
                      v-model="form.number"
                      :rules="numberRules"
                      filled
                      required
                      color="blue-grey lighten-2"
                      label="Number"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-text-field
                      ref="Name"
                      v-model="form.name"
                      :rules="nameRules"
                      filled
                      required
                      color="blue-grey lighten-2"
                      label="Name"
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12">
                    <v-textarea
                      ref="Description"
                      v-model="form.description"
                      clearable
                      clear-icon="mdi-close-circle"
                      label="Description"
                      required
                      :rules="descriptionRules"
                      filled
                      color="blue-grey lighten-2"
                      auto-grow
                      full-width
                      counter
                      rows="4"
                      row-height="30"
                    ></v-textarea>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-select
                      :items="prioritychoice2"
                      v-model="priority"
                      label="Priority"
                    />
                  </v-col>

                  <v-col cols="12" md="6">
                    <v-select
                      :items="divisionchoice2"
                      v-model="division"
                      label="Division"
                    />
                  </v-col>

                  <v-col cols="12" sm="6" md="4">
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
                          ref="date"
                          v-model="form.date"
                          :rules="dateRules"
                          label="Date"
                          append-icon="mdi-calendar-range"
                          readonly
                          color="teal"
                          required
                          filled
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker v-model="form.date" no-title scrollable>
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
              </v-form>
              <v-checkbox
                v-model="agreement"
                :rules="required"
                color="deep-purple"
              >
                <template v-slot:label>
                  I agree to the&nbsp;
                  <a href="#" @click.stop.prevent="dialog2 = true"
                    >Terms of Service</a
                  >
                  &nbsp;and&nbsp;
                  <a href="#" @click.stop.prevent="dialog2 = true"
                    >Privacy Policy</a
                  >*
                </template>
              </v-checkbox>
              <v-divider></v-divider>
              <v-dialog v-model="dialog2" absolute max-width="400" persistent>
                <v-card>
                  <v-card-title class="headline grey lighten-3">
                    Privacy Policies
                  </v-card-title>
                  <v-card-text>
                    Privacy Policies and Terms and Conditions (T&C) agreements
                    are both, as the names imply, legally binding contracts. The
                    main difference between these two types of agreements is
                    this: A Privacy Policy agreement exists to protect your
                    clients. A T&C agreement exists to protect you, the company.
                  </v-card-text>
                  <v-divider></v-divider>
                  <v-card-actions>
                    <v-btn text @click="(agreement = false), (dialog2 = false)">
                      No
                    </v-btn>
                    <v-spacer></v-spacer>
                    <v-btn
                      class="white--text"
                      color="deep-purple accent-4"
                      @click="(agreement = true), (dialog2 = false)"
                    >
                      Yes
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-container>

            <v-divider></v-divider>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="blue-grey darken-3"
                depressed
                :loading="loading"
                @click="saveNewTicket((save = true))"
              >
                <v-icon left>mdi-update</v-icon>
                Update Now
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    
    <template v-slot:item.action="{ item }">
      <v-icon small class="mr-2" @click="editItem(item)">
        mdi-content-save-edit-outline
      </v-icon>
    </template>

    <v-dialog v-model="dialog" max-width="500px">
      <template v-slot:activator="{ on }" v-if="buttons">
        <v-btn color="error" dark class="mb-2" v-on="on">Add New Ticket</v-btn>
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
                  label="Code"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="12">
                <v-text-field
                  autofocus
                  color="error"
                  v-model="editedItem.name"
                  label="Name"
                  required
                ></v-text-field>
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
                  label="division"
                  required
                ></v-select>
              </v-col>
              <v-col cols="12" sm="12">
                <v-select
                  autofocus
                  color="error"
                  v-model="editedItem.priority"
                  :items="priority"
                  label="priority"
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
                  <v-date-picker v-model="editedItem.date" no-title scrollable>
                    <v-spacer></v-spacer>
                    <v-btn text color="primary" @click="menu = false"
                      >Cancel</v-btn
                    >
                    <v-btn text color="primary" @click="$refs.menu.save(date)"
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
          <v-btn color="error darken-1" text @click="close">Cancel</v-btn>
          <v-btn color="error darken-1" text @click="save">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-data-table>
</template>
<script>
import { getTickets, postTicket, updateTicket } from "@api/user.js";
import utils from "../../.../../../helpers/utils";
export default {
  name: "Tickets",
  data() {
    return {
      loading: false,
      prioritychoice2: ["High", "Low"],
      divisionchoice2: ["Frontend", "Backend"],
      form: {
        number: "",
        name: "",
        description: "",
        date: "",
      },
      dialog: false,
      dialog2: false,
      date: new Date().toISOString().substr(0, 10),
      menu: false,

      numberRules: [(v) => !!v || "Number is required"],
      nameRules: [(v) => !!v || "Name is required"],
      descriptionRules: [
        (v) => !!v || "Description is required",
        (v) => v.length <= 100 || "Max 100 characters",
      ],
      priorityRules: [(v) => !!v || "Priority is required"],
      divisionRules: [(v) => !!v || "Divison is required"],
      dateRules: [(v) => !!v || "Date is required"],
      required: [(v) => !!v || "This field is required"],
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
        { text: "Divison", value: "division" },
        { text: "Date", value: "date" },
        { text: "Actions", value: "action", sortable: false },
      ],
      tickets: [],
      editedIndex: -1,
      editedItem: {
        number: "",
        name: "",
        description: "",
        priority: "",
        division: "",
        date: "",
      },
      defaultItem: {
        number: "",
        name: "",
        description: "",
        priority: "",
        division: "",
        date: "",
      },
      priority: null,
      division: null,
    };
  },

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
  },

  created() {
    this.initialize();
    this.getData();
  },

  methods: {
    saveNewTicket() {
      this.loading = true;
      setTimeout(()=>{
      this.loading = !true
      },2000)
      let request = {
        number: this.form.number,
        name: this.form.name,
        description: this.form.description,
        priority: this.priority,
        division: this.division,
        date: this.form.date,
        email: localStorage.getItem("email"),
      };
      this.loading = false;
      this.dialog = false;
      // console.log(request);
      // return;

      // console.log("masuk");
      if (this.editedIndex > -1) {
        updateTicket(this.form._id, request).then((res) => {
          console.log(res);
          this.getData();
        });
      } else {
        postTicket(request).then((res) => {
          console.log(res);
          this.getData();
        });
      }
      this.close()
    },
    remove(item) {
      const index = this.pilih.indexOf(item.choice);
      if (index >= 0) this.pilih.splice(index, 1);
    },

    getData() {
      getTickets(localStorage.getItem("email"))
        .then((response) => {
          if (response.status == 200) {
            // console.log(response.data);
            const data = response.data.map((item, index) => {
              item.number = index + 1;
              item.date = utils.formatDate(item.date);
              return item;
            });
            console.log("data", data);
            this.tickets = data;
          } else {
            // handle warning, dll
          }
        })
        .catch((e) => {
          // handle error
          console.log(e);
        });
    },

    initialize() {
      // this.tickets = [];
    },

    editItem(item) {
      this.editedIndex = this.tickets.indexOf(item);
      this.form = Object.assign({}, item);
      this.priority = item.priority;
      this.division = item.division;
      console.log(item);
      this.dialog = true;
    },

    // deleteItem(item) {
    //   const index = this.tickets.indexOf(item);
    //   confirm("Are you sure you want to delete this item?") &&
    //     this.tickets.splice(index, 1);
    //   // this.$store.commit("deleteItem", index);
    //   updateTicket(item._id, { is_deleted: true }).then(() => {
    //     this.getData();
    //   });

    //   // Todo: Make this delete item from store
    // },

    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.tickets[this.editedIndex], this.editedItem);
      } else {
        this.tickets.push(this.editedItem);
      }
      this.close();
    },
  },
};
</script>
