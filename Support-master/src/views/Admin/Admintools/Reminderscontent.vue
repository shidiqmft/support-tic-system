<template>
  <v-row>
  <v-card>
    <v-toolbar
      flat
      color="primary"
      dark
    >
      <v-toolbar-title>How to Operated Administrator</v-toolbar-title>
    </v-toolbar>
    <v-tabs vertical>
      <v-tab>
        <v-icon left>
          mdi-account
        </v-icon>
        Admin Account
      </v-tab>
      <v-tab>
        <v-icon left>
          mdi-ticket-percent
        </v-icon>
        Manage Ticket
      </v-tab>
      <v-tab>
        <v-icon left>
          mdi-lock
        </v-icon>
        Adnin Rules
      </v-tab>

      <v-tab-item>
        <v-card flat>
          <v-card-text>
            <p>
              Administrator had a several jobdesk, for example Track, compile, and analyze system usage data.
            </p>

            <p>
              Once you become admin you must Set up or maintain monitoring on web servers to make web capable to use by user.
            </p>

            <p class="mb-0">
              You should manage and organized ticketing system to make user more helpfull to use system
            </p>
          </v-card-text>
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <v-card flat>
          <v-card-text>
            <p>
               To operated and managed ticket admin have a few privilaged
            </p>

            <p>
               Admin can monitoring all tickets that every user input, it means admin managed to look how much every ticket that been input tp application.
            </p>

            <p>
             Account registered counted on how much every user registered to created account profile, same like Registered admin also can see how much user login to the system. 
            </p>

            <p>
               Admin also have a Features to managed and operated ticked. first its edited features, like user admin can edited every ticked that every user inputed. Admin also can deleted ticket that every user inputed.
            </p>

            <p class="mb-0">
              Only admin who can see every ticket has been recently deleted and managed by them, admin also can see how much ticket has been deleted
            </p>
          </v-card-text>
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <v-card flat>
          <v-card-text>
            <p>
              System Administrator Job Responsibilities: Maintains web environment by identifying system requirements, installing upgrades and monitoring system performance. Establishes web system specifications by analyzing access, information and security requirements
            </p>

            <p class="mb-0">
              Although sometimes called upon to create websites, the main responsibility of administrators is to maintain, back up and update existing websites for organizations. As a website administrator you would be responsible for making sure the site's user interface is easy to understand and efficient.
            </p>
          </v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs>
  </v-card>
</v-row>
</template>
<script>
  export default {
    name: "remindercontent",
    data: () => ({
    }),
  }
</script>