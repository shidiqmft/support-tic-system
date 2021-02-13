<template>
  <v-card
    class="mx-auto"
    max-width="1000"
  >
    <v-toolbar
      color="pink"
      dark
    >
      <v-app-bar-nav-icon></v-app-bar-nav-icon>

      <v-toolbar-title>Notification</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-checkbox-marked-circle</v-icon>
      </v-btn>
    </v-toolbar>

    <v-list two-line>
      <v-list-item-group
        v-model="selected"
        active-class="pink--text"
        multiple
      >
        <template v-for="(item, index) in items">
          <v-list-item :key="item.title">
            <template v-slot:default="{ active }">
              <v-list-item-content>
                <v-list-item-title v-text="item.title"></v-list-item-title>

                <v-list-item-subtitle
                  class="text--primary"
                  v-text="item.headline"
                ></v-list-item-subtitle>

                <v-list-item-subtitle v-text="item.subtitle"></v-list-item-subtitle>
              </v-list-item-content>

              <v-list-item-action>
                <v-list-item-action-text v-text="item.action"></v-list-item-action-text>

                <v-icon
                  v-if="!active"
                  color="grey lighten-1"
                >
                  mdi-check-circle-outline
                </v-icon>

                <v-icon
                  v-else
                  color="green lighten-1"
                >
                  mdi-check-circle
                </v-icon>
              </v-list-item-action>
            </template>
          </v-list-item>


          <v-divider
            v-if="index < items.length - 1"
            :key="index"
          ></v-divider>
        </template>
      </v-list-item-group>
    </v-list>
  </v-card>
</template>
<script>
  export default {
    name: 'notif',
    data: () => ({
      selected: [2],
      items: [
        {
          action: '15 min',
          headline: 'Frontend',
          subtitle: `Can you please fix bug in another project`,
          title: 'Rizkiki',
        },
        {
          action: '2 hr',
          headline: 'Backend',
          subtitle: `Ready to fix send data in last time project`,
          title: 'Aldino Bagas',
        },
        {
          action: '6 hr',
          headline: 'Frontend',
          subtitle: 'Finished to fix last error and ready to deploy',
          title: 'Dian Andini',
        },
        {
          action: '12 hr',
          headline: 'Backend',
          subtitle: 'I have problem with sending data',
          title: 'Shidiq Mifta',
        },
        {
          action: '18hr',
          headline: 'Frontend',
          subtitle: 'Need accomplice to fixing layout in paging project',
          title: 'Gilang Tunggul',
        },
      ],
    }),
  }
</script>