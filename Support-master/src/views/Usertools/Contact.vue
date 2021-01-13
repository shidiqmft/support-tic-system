<template>
	<div>
	<v-btn
      bottom
      color="blue"
      dark
      fab
      fixed
      right
      @click="dialog = !dialog"
    >
      <v-icon>mdi-message-bulleted</v-icon>
    </v-btn>

    <v-dialog
      v-model="dialog"
      width="800px"
    >
              <v-card class="elevation-12" color="primary lighten-4">
            <v-toolbar dark color="primary darken-1">
              <v-toolbar-title>Chat</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
        <v-list ref="chat" id="logs">
          <template v-for="(item, index) in logs">
            <v-subheader v-if="item" :key="index">{{ item }}</v-subheader>
          </template>
        </v-list>
            </v-card-text>
            <v-card-actions>
              <v-form @submit.prevent="submit">
              <v-text-field v-model="msg" width="500px" label="Message" single-line solo-inverted></v-text-field>
              <v-btn fab dark small color="primary" type="submit">
                <v-icon dark>send</v-icon>
              </v-btn>
                </v-form>
            </v-card-actions>
          </v-card>
  </v-dialog>
</div>
</template>
<script>
export default {
	name: "Contact",
	data: () => ({
    logs: [],
    msg: null,
    dialog: false
  }),
  methods: {
    submit() {
      this.logs.push(this.msg);
      this.msg = "";
    }
  },
  watch: {
    logs() {
      setTimeout(() => {
        this.$refs.chat.$el.scrollTop = this.$refs.chat.$el.scrollHeight;
      }, 0);
    }
  }
};
</script>
<style>
  #logs {
  height: 100px;
  overflow: auto;
}
</style>