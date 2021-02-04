<template>
  <v-container>
    <v-col cols="12">
      <v-card color="red lighten-3" dark>
        <v-card-title class="text-center justify-center py-6">
          <h1 class="font-weight-bold display-3 basil--text">
            Create User
          </h1>
        </v-card-title>

        <v-card-subtitle class="text-center justify-center py-6"
          >Created User Account</v-card-subtitle
        >
      </v-card>
    </v-col>
          <v-card width="1000" class="mx-auto mt-5" color="cyan darken-3">
      <v-card-title>
        <!-- <v-col cols="12" sm="3">
            <v-btn text icon color="black" to="login">
              <v-icon to="login">mdi-arrow-left</v-icon>
            </v-btn>
          </v-col> -->
        <!-- <h2 class="display" width="200px" >Register </h2> -->
      </v-card-title>
      <v-card-text>
      <v-form
      ref="form"
      v-model="valid"
      lazy-validation
      >
        <v-text-field
          v-model="form.name"
          :counter="15"
          :rules="nameRules"
          prepend-icon="mdi-account-cicle"
          hint="At least 5 characters"
          label="Name"
          required
          solo
          />
          <v-text-field
          v-model="form.email"
          :rules="emailRules"
          prepend-icon="mdi-account-cicle"
          label="Email"
          required
          solo
          />
          <v-text-field
          v-model="form.phonenumber"
          :counter="12"
          :rules="phoneRules"
          prepend-icon="mdi-account-cicle"
          label="Phone Number"
          required
          solo
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
            solo
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
      x-large
      color="success"
      @click="register(snackbar = true)"
      >Done 
    </v-btn>
      <v-snackbar
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
    </v-snackbar>
    <v-btn
    x-large
      color="error"
      class="mr-4"
      @click="reset"
    >
      Reset
    </v-btn>
    </v-card-actions>
    </v-card>
    </v-container>
</template>

<script>
import { postAsUser } from '@api/admin.js';
export default {
  name: 'Register',
  components: {
  },
  data: () => ({
    form: {
      name: '',
      email: '',
      phonenumber: '',
      password: '',
    },
    // gender: [
    //   'Female',
    //   'Male',
    // ],
    passwordd: false,
    snackbar: false,
    text: 'Register success',
    select: null,
    nameRules: [
    v => !!v || 'Name is required',
    v => (v && v.length <= 15) || 'Name must be less than 15 characters',
    v => v.length >= 5 || 'Min 5 characters'
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
  methods: {
  register() {
    let request = {
      "name" : this.form.name,
      "email" : this.form.email,
      "phonenumber" : this.form.phonenumber,
      // "gender" : this.gender,
      "password" : this.form.password
    }  
    postAsUser(request)
      .then((response)=> {
          if(response.status == 200 ) {
            console.log(response.data)
          }
          else {
            // handle warning, dll
          }
        })
        .catch((e)=> {
          // handle error
          console.log(e)
        })
      },
      reset () {
        this.$refs.form.reset()
      },
    }
  };
</script>
