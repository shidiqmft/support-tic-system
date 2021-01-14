<template>
  <container>
  <v-card color="basil">
    <div class="pa-4 text-center">
          <v-img
            class="mb-4"
            contain
            height="128"
            src="@/views/Image/logo.png"
          ></v-img>
          <h3  class="font-weight-bold display-2 black--text">
            Admin
          </h3>
        </div>
    <!-- <v-row justify="center">
    <img height="250"
  width="350" src="@/views/Image/logo.png">
<h1 class="font-weight-bold display-2 black--text">Easy to Create Ticket</h1>

    </v-row> -->
  </v-card>
</container>
</template>
<script>
  export default {
    data () {
    },
  }
</script>
<style>
/* Helper classes */
.basil {
  background-color: #DF7401 !important;
}
.basil--text {
  color: #000000 !important;
}
</style>