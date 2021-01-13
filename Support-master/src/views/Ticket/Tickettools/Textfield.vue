  <v-card
    max-width="400"
    class="mx-auto"
  >
    <v-textarea
      v-model="value"
      auto-grow
      full-width
      rows="2"
    ></v-textarea>

    <v-row
      class="px-2 pb-2 ma-0"
      justify="space-between"
    >
      <v-btn-toggle
        v-model="formatting"
        multiple
      >
        <v-btn color="white">
          <v-icon>mdi-format-italic</v-icon>
        </v-btn>

        <v-btn color="white">
          <v-icon>mdi-format-bold</v-icon>
        </v-btn>

        <v-btn color="white">
          <v-icon>mdi-format-underline</v-icon>
        </v-btn>

        <v-btn color="white">
          <v-row
            align="center"
            class="flex-column"
            justify="center"
          >
            <v-icon class="cols 12">mdi-format-color-text</v-icon>

            <v-sheet
              tile
              style="margin-top: -4px;"
              height="4"
              width="26"
              color="purple"
            ></v-sheet>
          </v-row>
        </v-btn>
      </v-btn-toggle>

      <v-btn-toggle v-model="alignment">
      <v-btn color="white">
          <v-icon>mdi-format-align-justify</v-icon>
        </v-btn>

        <v-btn color="white">
          <v-icon>mdi-format-align-center</v-icon>
        </v-btn>

        <v-btn color="white">
          <v-icon>mdi-format-align-left</v-icon>
        </v-btn>

        <v-btn color="white">
          <v-icon>mdi-format-align-right</v-icon>
        </v-btn>
      </v-btn-toggle>
      <v-sheet
      class="pa-4 text-center"
      color="grey lighten-3"
      tile
    >
    <v-overflow-btn
      :items="dropdown_font"
      label="Select font"
      hide-details
      class="pa-0"
    ></v-overflow-btn>

    <template v-if="$vuetify.breakpoint.mdAndUp">
      <v-divider vertical></v-divider>

      <v-overflow-btn
        :items="dropdown_edit"
        editable
        label="Select size"
        hide-details
        class="pa-0"
        overflow
      ></v-overflow-btn>
    </v-sheet>
  </template>
    </v-row>
  </v-card>

<script>
  export default {
    data: () => ({
      alignment: 1,
      formatting: [],
      value: '',
    }),
  }
</script>