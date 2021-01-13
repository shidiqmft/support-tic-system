<template>
  <v-data-table
    :headers="headers"
    :items="table"
    sort-by="name"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat color="white" max-width="500px">
        <v-toolbar-title>My Ticket</v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="1000px">
          <template v-slot:activator="{ on }">
            <v-btn color="teal" dark class="mb-2" v-on="on">New Data</v-btn>
          </template>

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
      src="@/components/Image/view.jpg"
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
            <h3 class="headline"> New Ticket</h3>
            <span class="grey--text text--lighten-1"> Create New Ticket</span>
          </v-col>
        </v-row>
      </v-row>
    </v-img>

      <v-container>
        <v-form>
        <v-row>
          <v-col
            cols="12"
            md="6"
          >
            <v-text-field
              ref="Number"
              v-model="editedItem.number"
              :disabled="isUpdating"
              :rules="numberRules"
              filled
              required
              color="blue-grey lighten-2"
              label="Number"
            ></v-text-field>
          </v-col>
          <v-col
            cols="12"
            md="6"
          >
            <v-text-field
              ref="Name"
              v-model="editedItem.name"
              :disabled="isUpdating"
              :rules="nameRules"
              filled
              required
              color="blue-grey lighten-2"
              label="Name"
            ></v-text-field>
          </v-col>
          
    <v-textarea
      ref="Description"
      v-model="editedItem.description"
      label="Description"
      required
      :disabled="isUpdating"
      :rules="numberRules"
      filled
      color="blue-grey lighten-2"
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
    </v-row>

          <v-col cols="12">
            <v-autocomplete
              ref="Priority"
              v-model="editedItem.priority"
              :disabled="isUpdating"
              :items="people"
              :rules="priorityRules"
              required
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
              ref="Divison"
              v-model="editedItem.Division"
              :disabled="isUpdating"
              :items="people"
              :rules="DivisionRules"
              required
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
              v-model="editedItem.date"
              :rules="dateRules"
              label="Date"
              append-icon="mdi-calendar-range"
              readonly
              color="teal"
              required
              outlined
              v-on="on"
              ></v-text-field>
              </template>
              <v-date-picker v-model="editedItem.date" no-title scrollable>
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
              <v-btn text color="primary" @click="$refs.menu.save(date)">OK</v-btn>
              </v-date-picker>
              </v-menu>
              </v-col>
      </v-row>
      </v-form>
      </v-container>

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
        @click="isUpdating(saveNewTicket=true)"
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
      <!-- <v-icon
        small
        class="mr-2"
        @click="editItem(item)"
      >
        mdi-pencil
      </v-icon> -->
      <v-icon
        small
        @click="deleteItem(item)"
      >
        mdi-delete
      </v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn color="primary" @click="initialize">Reset</v-btn>
    </template>
  </v-data-table>
</template>
<script>
  import { table } from '@api';
  export default {
    name: 'Table',
    data () {
      const srcs = {
        1: '@/components/Image/merah.png',
        2: '@/components/Image/kuning.png',
        3: '@/components/Image/orange.png',
        4: '@/components/Image/biru.png',
      }

      form = {
      number: '',
      name: '',
      description: '',
      priority: '',
      division: '',
      date: '',
      },

      alignment = 1,
      formatting = [],
      description = '',
      dialog = false,
      date = new Date().toISOString().substr(0, 10),
      menu = false,

    numberRules = [
    v => !!v || 'Number is required',
      ],
    nameRules = [
    v => !!v || 'Name is required',
      ],
    descriptionRules = [
    v => !!v || 'Description is required',
    ],    
    priorityRules = [
    v => !!v || 'Priority is required',
    ],
    divisionRules = [
    v => !!v || 'Divison is required',
    ],
    dateRules = [
    v => !!v || 'Date is required',
    ],
      headers = [
      { text: 'Number', value: 'number' },
        {
          text: 'Name',
          align: 'left',
          sortable: false,
          value: 'name',
        },
        { text: 'Description', value: 'description' },
        { text: 'Priority', value: 'priority' },
        { text: 'Divison', value: 'division' },
        { text: 'Date', value: 'date' },
        { text: 'Actions', value: 'action', sortable: false },
      ],
      table = [],
      editedIndex = -1,
      editedItem = {
        number: 0,
        name: '',
        description: '',
        priority: '',
        division: '',
        date: 0,
      }
      
      defaultItem : {
        number = 0,
        name = '',
        description = '',
        priority = '',
        division = '',
        date : ""
      }
        
        return  {
        autoUpdate: true,
        isUpdating: false,
        people: [
          { header: 'Priority' },
          { choice: 'High', group: 'Priority', avatar: srcs[1] },
          { choice: 'Low', group: 'Priority', avatar: srcs[2] },
          { header: 'Division' },
          { choice: 'Frontend', group: 'Division', avatar: srcs[3] },
          { choice: 'Backend', group: 'Division', avatar: srcs[4] },
        ],
      }
    },

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
      },
    },

    watch: {
      dialog (val) {
        val || this.close()
      },
      isUpdating (val) {
        if (val) {
          setTimeout(() => (this.isUpdating = false), 3000)
        }
      },
    },

    created () {
      this.initialize()
    },

    methods: {
    saveNewTicket() {
      let request = {
      "number" : this.editedItem.number,
      "name" : this.editedItem.name,
      "description" : this.editedItem.description,
      "priority" : this.editedItem.priority,
      "division" : this.editedItem.division,
      "date" : this.editedItem.date
    }  

    console.log("masuk");
    table(request)
      .then((response)=> {
          if(response.status == 200 ){
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
      remove (item) {
        const index = this.pilih.indexOf(item.choice)
        if (index >= 0) this.pilih.splice(index, 1)
      },

      initialize () {
        this.table = [
        {
            number: 159,
            name: 'Reza Rahardian',
            description: 'Its hard to using button',
            priority : '',
            Divison : 'Frontend',
            date: '2019-10-07',
          },
          {
            number: 237,
            name: 'Awkarin',
            description: 'error not found in number',
            priority: '',
            date: '2019-12-27',
          },
          {
            number: 262,
            name: 'Pancaindra',
            description: 'hard to use when blackout',
            priority : '',
            date: '2019-04-09',
          },
          {
            number: 306,
            name: 'Sulastri',
            description: 'what happen?',
            priority : '',
            date: '2019-10-17',
          },
          {
            number: 356,
            name: 'Fatin Shidiq Miftah',
            description: 'knowing more about more',
            date: '2019-06-29',
          },
          {
            number: 456,
            name: 'Agung Hercules',
            description: 'lazy form validation',
            priority : '',
            date: '2019-02-25',
          },
          {
            number: 885,
            name: 'Lollita',
            description: 'crazy little things called love',
            priority : '',
            date: '2019-12-02',
          },
          {
            number: 402,
            name: 'Pak Kumis',
            description: 'error mulu',
            priority : '',
            date: '2019-10-14',
          },
          {
            number: 458,
            name: 'Yokiu Parasatha',
            description: 'yakali ga kuy',
            priority : '',
            date: '2019-11-07',
          },
          {
            number: 652,
            name: 'KitkutSu',
            description: 'saitama anaknya siapa',
            priority : '',
            date: '2019-10-08',
          },
         ]
      },

      editItem (item) {
        this.editedIndex = this.table.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        const index = this.table.indexOf(item)
        confirm('Are you sure you want to delete this item?') && this.table.splice(index, 1)
      },

      close () {
        this.dialog = false
        setTimeout(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        }, 300)
      },

      save () {
        if (this.editedIndex > -1) {
          Object.assign(this.table[this.editedIndex], this.editedItem)
        } else {
          this.table.push(this.editedItem)
        }
        this.close()
      },
    },
  }
</script>