<template>
  <v-parallax src="@/views/Image/bk2.jpg" dark height="700">
    <v-row>
      <v-col md="6" offset-md="3">
        <v-card class="mx-auto mt-5" max-width="600" color="yellow lighten-3">
      <v-btn
      class="mr-4"
      dark
      color="indigo"
      to="login"
    >
      <v-icon dark>
        mdi-arrow-left
      </v-icon>
    </v-btn>
          <v-card-title class="text-center justify-center py-6">
            <h2
              class="display-2 font-weight-bold"
              align="center"
              justify="center"
            >
              Admin Login
            </h2>
          </v-card-title>

          <v-card-text>
            <v-form ref="form" v-model="valid" lazy-validation solo>
              <v-text-field
                v-model="email"
                label="Email"
                value=""
                :rules="emailRules"
                filled
                required
              />
              <v-text-field
                v-model="password"
                :append-icon="passwordd ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="[rules.required, rules.min]"
                label="Password"
                :type="passwordd ? 'text' : 'password'"
                name="input-10-2"
                hint="At least 8 characters"
                @click:append="passwordd = !passwordd"
                filled
                required
              />
            </v-form>
            <span class="caption grey--text text--darken-1">
              This is the email and password you will use to login to your Admin
              account
            </span>
          </v-card-text>

          <v-divider />

          <v-card-actions class="text-center justify-center py-6">
            <v-btn
              :enabled="!valid"
              color="primary"
              depressed
              :loading="loading"
              @click="logins((validate = true))"
              class="mr-4"
            >
              Login
            </v-btn>
            <div class="text-center">

    <v-dialog
      v-model="dialog"
      width="500"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="red lighten-2"
          dark
          v-bind="attrs"
          v-on="on"
        >
          Become Admin?
        </v-btn>
      </template>

      <v-card>
        <v-card-title class="headline grey lighten-2">
          Do You Want to Become Administrator?
        </v-card-title>

        <v-card-text>
          If you want to become admin and managed the system you must fill our terms and condition so you become administrator, if you interested to become administrator you can contact our team at
        <p style="font-weight: bold;">Email : Support.Ticket.System@gmail.com</p>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            text
            @click="dialog = false"
          >
            I accept
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <v-snackbar v-model="snackbar" :vertical="vertical" color="red">
      {{ text }}
      <v-btn color="black" text justify="center" @click="snackbar = false">
        Close
      </v-btn>
    </v-snackbar>
  </v-parallax>
</template>
<script>
import { loginAsAdmin } from "@api/admin.js";
import { setCookie } from "@/helpers/cookie";
export default {
  name: "Logins",
  data: () => ({
    email: "",
    dialog: false,
    loading: false,
    password: "",
    snackbar: false,
    text: "Sorry But Password or Email Incorrect",
    passwordd: false,
    valid: true,
    emailRules: [
      (v) => !!v || "Email is required",
      (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
    ],
    rules: {
      required: (value) => !!value || "Password is Required.",
      min: (v) => v.length >= 8 || "Min 8 characters",
    },
  }),

  methods: {
    logins() {
      const base = this;
      this.loading = true;
      setTimeout(()=>{
        this.loading=!true
      },2000)
      let request = {
        email: this.email,
        password: this.password,
      };
      loginAsAdmin(request)
        .then((response) => {
          console.log(response);
          if (response.status == 200) {
            if (response.data) {
              setCookie("token_admin", response.data.token);
              this.$router.push({
                name: "AdminHome",
              });
            }
          } else {
            // handle warning, dll
          }
        })
        .catch((error) => {
          console.log(error);
          base.snackbar = true;
        });
    },
    validate() {
      if (this.$refs.form.validate()) {
        this.snackbar = true;
      }
    },
  },
};
</script>
