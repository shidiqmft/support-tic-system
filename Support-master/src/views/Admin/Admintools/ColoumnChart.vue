  <template>
  <v-card
    class="mx-auto text-center"
    color="blue"
    dark
    max-width="1000"
  >
    <v-card-text>
      <v-sheet color="rgba(0, 0, 0, .12)">
<GChart
    type="ColumnChart"
    @ready="onChartReady"
  />
          <template v-slot:label="item">
            {{ item.value }}
          </template>
      </v-sheet>
    </v-card-text>

    <v-card-text>
      <div class="display-1 font-weight-thin">
        User Visit Last 24h
      </div>
    </v-card-text>

    <v-divider></v-divider>

  </v-card>
</template>
<script>
import { GChart } from 'vue-google-charts'
export default {
  components: {
    GChart
  },
  methods: {
    onChartReady (chart, google) {
      const query = new google.visualization.Query('https://url-to-spreadsheet...')
      query.send(response => {
        const options = {
          // some custom options
        }
        const data = response.getDataTable()
        chart.draw(data, options)
      })
    }
  }
} 
</script>
