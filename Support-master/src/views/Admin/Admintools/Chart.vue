  <template>
  <v-card
    class="mx-auto text-center"
    color="green"
    dark
    max-width="1000"
  >
    <v-card-text>
      <v-sheet color="rgba(0, 0, 0, .12)">
<GChart
    type="ColumnChart"
    :data="chartData"
    :options="chartOptions"
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
  data () {
    return {
      // Array will be automatically processed with visualization.arrayToDataTable function
      chartData: [
        ['Year', 'Visit', 'Create', 'Send'],
        ['2016', 1000, 400, 200],
        ['2017', 1170, 460, 250],
        ['2018', 660, 1120, 300],
        ['2019', 1030, 540, 350]
      ],
      chartOptions: {
        chart: {
          title: 'System Performance',
          subtitle: 'Visit, Create, and Send: 2016-2019',
        }
      }
    }
  }
} 
</script>
