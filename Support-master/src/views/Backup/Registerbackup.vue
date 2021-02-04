<template>
  <v-app>
    <v-container>
      <v-col cols="12" v-if="title">
        <v-card color="#385F73" dark>
          <v-card-title class="text-center justify-center py-6">
            <h1 class="font-weight-bold display-3 basil--text">
              List User
            </h1>
          </v-card-title>

          <v-card-subtitle class="text-center justify-center py-6"
            >View User Account</v-card-subtitle
          >
        </v-card>
      </v-col>
      <v-data-table :headers="headers" :items="items" :search="search" class="elevation-1">
        <template v-slot:top>
          <v-toolbar flat dark>
            <v-toolbar-title>All user</v-toolbar-title>
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
                  >Add User</v-btn
                >
              </template>

    <v-card width="400" class="mx-auto mt-5" color="amber lighten-1">
      <v-card-title>
        <!-- <v-col cols="12" sm="3">
            <v-btn text icon color="black" to="login">
              <v-icon to="login">mdi-arrow-left</v-icon>
            </v-btn>
          </v-col> -->
        <h2 class="display" width="200px" >Add User </h2>
      </v-card-title>
      <v-card-text>
      <v-form
      ref="form"
      v-model="valid"
      >
        <v-text-field
          autofocus
          color="error"
          v-model="form.code"
          label="Code"
          required
          disabled
          ></v-text-field>
        <v-text-field
          v-model="form.name"
          :counter="15"
          :rules="nameRules"
          prepend-icon="mdi-account-cicle"
          hint="At least 5 characters"
          label="Name"
          required
          filled
          />
          <v-text-field
          v-model="form.email"
          :rules="emailRules"
          prepend-icon="mdi-account-cicle"
          label="Email"
          required
          filled
          />
          <v-text-field
          v-model="form.phonenumber"
          :counter="12"
          :rules="phoneRules"
          prepend-icon="mdi-account-cicle"
          label="Phone Number"
          required
          filled
          />
          <!-- <v-select
          v-model="form"
          :items="gender"
          :rules="[v => !!v || 'Pilih Jenis Kelamin']"
          prepend-icon="mdi-account-cicle"
          label="Gender"
          filled
          required
          ></v-select> -->
          <v-text-field
            v-model="form.password"
            :append-icon="passwordd ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[rules.required, rules.emailMatch, rules.min]"
            :type="passwordd ? 'text' : 'password'"
            prepend-icon="mdi-lock"
            name="input-10-2"
            label="Password"
            value="Pa"
            filled
            hint="At least 8 characters"
            @click:append="passwordd = !passwordd"
            />
<!--           <v-checkbox
          v-model="checkbox"
          :rules="[v => !!v || 'You must agree to continue!']"
          label="Do you agree?"
          required
          ></v-checkbox> -->
    </v-form>
    </v-card-text>
    <v-card-actions class="text-center justify-center py-6">
      <v-btn 
      color="success"
      @click="register(snackbar = true)"
      >Done 
    </v-btn>

      <!-- <v-snackbar
      color="success"
      v-model="snackbar"
    >
      {{ text }}
      <v-btn
        success
        color="dark"
        text
        @click="snackbar = false"
      >
        Close
    </v-btn>
    </v-snackbar> -->
    <v-btn
      color="error"
      class="mr-4"
      @click="reset"
    >
      Reset
    </v-btn>
    </v-card-actions>
    </v-card>

            </v-dialog>
          </v-toolbar>
        </template>
        <template v-slot:item.action="{ item }" v-if="buttons">
          <!-- <v-icon small class="mr-2" @click="editItem(item)">
            mdi-content-save-edit-outline
          </v-icon> -->
          <v-icon small @click="deleteItem(item)">
            mdi-delete
          </v-icon>
        </template>
      </v-data-table>
    </v-container>
  </v-app>
</template>

<script>
import { getUser, updateUser, postAsUser } from "@api/admin.js";
export default {
name: 'Register',
props: {
    title: {
      default: true,
    },
    buttons: {
      default: true,
    },
  },
components: {
  },
  data: () => ({
    search: "",
    dialog: false,
    editedIndex: -1,
    form: {
    code: '',
    name: '',
    email: '',
    phonenumber: '',
    password: '',
    },
    defaultform: {
    code: '',
    name: '',
    email: '',
    phonenumber: '',
    password: '',
    },
    passwordd: false,
    select: null,
    headers: [
      {
        text: "Code",
        align: "left",
        sortable: true,
        value: "code",
      },

      { text: "Name", value: "name" },
      { text: "E-mail", value: "email" },
      { text: "Phone Number", value: "phonenumber" },
    ],
    items: [
    ],
    nameRules: [
    v => !!v || 'Name is required',
    v => (v && v.length <= 15) || 'Name must be less than 15 characters',
    v => v.length >= 6 || 'Min 6 characters'
      ],
    emailRules: [
    v => !!v || 'Email is required',
    v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
    phoneRules: [
    v => !!v || 'Phone is required',
    v => (v && v.length <= 12) || 'PhoneNumber must be less than 12 characters',
    ],
    rules: {
          required: v => !!v || 'Password is required',
          min: v => v.length >= 8 || 'Min 8 characters and dont use any symbol or number',
        },
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
  },
    watch: {
    dialog(val) {
      val || this.close();
    },
  },
  methods: {
  register() {
    let request = {
    "name" : this.form.name,
    "email" : this.form.email,
    "phonenumber" : this.form.phonenumber,
    "password" : this.form.password
    };
    if (this.editedIndex > -1) {
    updateUser(this.form._id, request).then((res) => {
        console.log(res);
        this.getData();
        });
      } else {
        postAsUser(request).then((res) => {
          console.log(res);
          this.getData();
        });
      }
      },

    deleteItem(item) {
      const index = this.items.indexOf(item);
      confirm("Are you sure you want to delete this item?") &&
        this.items.splice(index, 1);
      // this.$store.commit("deleteItem", index);
      updateUser(item._id, { is_deleted: true }).then(() => {
        this.getData();
      });

      // Todo: Make this delete item from store
    },
    
    close() {
      this.dialog = false;
      setTimeout(() => {
        this.form = Object.assign({}, this.defaultForm);
        this.editedIndex = -1;
      }, 300);
    },
    save() {
      if (this.editedIndex > -1) {
        const data = this.form;
        console.log(data);
        this.items = [];
        updateUser(this.form._id, data).then(() => {
          this.getData();
        });
      // goToLogin(){
      //   this.$router.push({name : 'Login'});
      // },
      } else {
        postAsUser({
        ...this.form,
        }).then((res) => {
          console.log(res);
          this.getData();
        });
      }
      this.close();
    },
      reset () {
        this.$refs.form.reset()
      },
    getData() {
      getUser().then((res) => {
        // console.log(res.data);
        const data = res.data.map((item, index) => {
          item.code = index + 1;
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
