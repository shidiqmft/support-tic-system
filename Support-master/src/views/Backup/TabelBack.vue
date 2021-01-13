<template>
   <v-card
          color="blue-grey darken-1"
          dark
          :loading="isUpdating">
        <template v-slot:progress>
      <v-progress-linear
        absolute
        color="green lighten-3"
        height="4"
        indeterminate
      ></v-progress-linear>
    </template>
    <v-img
      height="200"
      src="https://cdn.vuetifyjs.com/images/cards/dark-beach.jpg"
    >
      <v-row>
        <v-col
          class="text-right"
          cols="12"
        >
          <v-menu
            bottom
            left
            transition="slide-y-transition"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                icon
                v-bind="attrs"
                v-on="on"
              >
                <v-icon>mdi-dots-vertical</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item @click="isUpdating = true">
                <v-list-item-action>
                  <v-icon>mdi-settings</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-title>Update</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-col>
        <v-row
          class="pa-4"
          align="center"
          justify="center"
        >
          <v-col class="text-center">
            <h3 class="headline">{{ name }}</h3>
            <span class="grey--text text--lighten-1">{{ title }}</span>
          </v-col>
        </v-row>
      </v-row>
    </v-img>
    <v-form>
      <v-container>
        <v-row>
          <v-col
            cols="12"
            md="6"
          >
            <v-text-field
              v-model="number"
              :disabled="isUpdating"
              filled
              color="blue-grey lighten-2"
              label="Number"
            ></v-text-field>
          </v-col>
          <v-col
            cols="12"
            md="6"
          >
            <v-text-field
              v-model="name"
              :disabled="isUpdating"
              filled
              color="blue-grey lighten-2"
              label="Name"
            ></v-text-field>
          </v-col>
          
<v-textarea
      v-model="v"
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
    </v-row>

          <v-col cols="12">
            <v-autocomplete
              v-model="pilih"
              :disabled="isUpdating"
              :items="people"
              filled
              chips
              color="blue-grey lighten-2"
              label="Select"
              item-text="Choice"
              item-value="Choice"
              multiple
            >
              <template v-slot:selection="data">
                <v-chip
                  v-bind="data.attrs"
                  :input-value="data.selected"
                  close
                  @click="data.select"
                  @click:close="remove(data.item)"
                >
                  <v-avatar left>
                    <v-img :src="data.item.avatar"></v-img>
                  </v-avatar>
                  {{ data.item.choice }}
                </v-chip>
              </template>

              <template v-slot:item="data">
                <template v-if="typeof data.item !== 'object'">
                  <v-list-item-content v-text="data.item"></v-list-item-content>
                </template>
                <template v-else>
                  <v-list-item-avatar>
                    <img :src="data.item.avatar">
                  </v-list-item-avatar>

                  <v-list-item-content>
                    <v-list-item-title v-html="data.item.choice"></v-list-item-title>
                    <v-list-item-subtitle v-html="data.item.group"></v-list-item-subtitle>
                  </v-list-item-content>
                </template>
              </template>
            </v-autocomplete>
          </v-col>

          <v-col cols="12">
            <v-autocomplete
              v-model="pilih"
              :disabled="isUpdating"
              :items="people"
              filled
              chips
              color="blue-grey lighten-2"
              label="Select"
              item-text="Choice"
              item-value="Choice"
              multiple
            >
              <template v-slot:selection="data">
                <v-chip
                  v-bind="data.attrs"
                  :input-value="data.selected"
                  close
                  @click="data.select"
                  @click:close="remove(data.item)"
                >
                  <v-avatar left>
                    <v-img :src="data.item.avatar"></v-img>
                  </v-avatar>
                  {{ data.item.choice }}
                </v-chip>
              </template>

              <template v-slot:item="data">
                <template v-if="typeof data.item !== 'object'">
                  <v-list-item-content v-text="data.item"></v-list-item-content>
                </template>
                <template v-else>
                  <v-list-item-avatar>
                    <img :src="data.item.avatar">
                  </v-list-item-avatar>

                  <v-list-item-content>
                    <v-list-item-title v-html="data.item.choice"></v-list-item-title>
                    <v-list-item-subtitle v-html="data.item.group"></v-list-item-subtitle>
                  </v-list-item-content>
                </template>
              </template>
            </v-autocomplete>
          </v-col>

      </v-container>
    </v-form>

    <v-divider></v-divider>
    <v-card-actions>
      <v-switch
        v-model="autoUpdate"
        :disabled="isUpdating"
        class="mt-0"
        color="green lighten-2"
        hide-details
        label="Auto Update"
      ></v-switch>
      <v-spacer></v-spacer>
      <v-btn
        :disabled="autoUpdate"
        :loading="isUpdating"
        color="blue-grey darken-3"
        depressed
        @click="isUpdating = true"
      >
        <v-icon left>mdi-update</v-icon>
        Update Now
      </v-btn>
    </v-card-actions>
  </v-card>
</template>


<script>
  export default {
    data () {
      const srcs = {
        1: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
        2: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
        3: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
        4: 'https://cdn.vuetifyjs.com/images/lists/4.jpg',
      }

      return {
        autoUpdate: true,
        isUpdating: false,
        name: '',
        people: [
          { header: 'Priority' },
          { choice: 'High', group: 'Priority', avatar: srcs[1] },
          { choice: 'Low', group: 'Priority', avatar: srcs[1] },
          { header: 'Division' },
          { choice: 'High', group: 'Division', avatar: srcs[4] },
          { choice: 'Low', group: 'Division', avatar: srcs[5] },
        ],
        title: '',
      }
    },

    watch: {
      isUpdating (val) {
        if (val) {
          setTimeout(() => (this.isUpdating = false), 3000)
        }
      },
    },

    methods: {
      remove (item) {
        const index = this.pilih.indexOf(item.choice)
        if (index >= 0) this.pilih.splice(index, 1)
      },
    },
  }
</script>