 <v-card-title>
              <span class="headline">{{ formTitle }}</span>
          </v-card-title>

            <v-card-text class="text-center justify-center" >
              <v-container>
                <v-form>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field 
                    ref="number"
                    v-model="editedItem.number" 
                    label="Number" 
                    :rules="numberRules" 
                    color="teal"
                    required 
                    outlined>
                    </v-text-field>
                  </v-col>

                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                    ref="name" 
                    v-model="editedItem.name"
                    label="Name"
                    :rules="nameRules"
                    color="teal"
                    required
                    outlined>
                    </v-text-field>
                  </v-col>

                  <v-col cols="12" sm="6" md="4">
                    <v-textarea
                      ref="description"
                      v-model="editedItem.description"
                      color="teal"
                      label="Description"
                      :rules="descriptionRules"
                      required
                      outlined
                      >
                      <template v-slot:label>
                      <div>
                      Description
                      </div>
                      </template>
                      </v-textarea>
                      </v-col>

                      <v-col cols="12" sm="6" md="4">
                      <v-select
                      ref="priority"
                      v-model="editedItem.priority"
                      :items="priority"
                      :rules="priorityRules"
                      label="Priority"
                      required
                      outlined
                      ></v-select>
                      </v-col>

                      <v-col cols="12" sm="6" md="4">
                      <v-select
                      ref="division"
                      v-model="editedItem.division"
                      :items="division"
                      :rules="divisionRules"
                      label="Division"
                      required
                      outlined
                      ></v-select>
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
                  </v-form>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="saveNewTicket">Save</v-btn>
            </v-card-actions>