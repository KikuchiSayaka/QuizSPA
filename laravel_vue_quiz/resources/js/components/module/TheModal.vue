<template>
  <div>
    <div id="modal-result" tabindex="-1" class="modal fade" aria-hidden="true" role="dialog">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" data-dismiss="modal" class="close">
              <span>×</span>
            </button>
            <h4 class="modal-title text-center">正解率</h4>
          </div>
          <div class="modal-body text-center">
            <!-- ここでref="chart"で設定した子コンポーネント(PieChart)に下の方で書いたスクリプトの中のthis.$refs.chartでアクセスしている。 -->
            <pie-chart :chartData="chartData" ref="chart"></pie-chart>
            <div>正解率 {{ correctPercentageObject['correctScore'] * 10 }} %</div>
            <input type="hidden" name="correctRatio" />
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" @click="quizFinish">終了する</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PieChart from "./PieChart";

export default {
  components: {
    PieChart
  },
  props: {
    correctPercentageObject: {
      type: Object
    }
  },
  data() {
    return {
      chartOptions: {
        hoverBorderWidth: 20
      },
      chartData: {
        hoverBackgroundColor: "red",
        hoverBorderWidth: 10,
        labels: ["正解", "不正解"],
        datasets: []
      },
    };
  },
  methods: {
    render() {
      this.$set(this.chartData, "datasets", [
        {
          backgroundColor: ["#00D8FF", "#E46651"],
          data: [
            this.correctPercentageObject["correctScore"],
            this.correctPercentageObject["mistakeScore"]
          ]
        }
      ]);
      // ここで子コンポーネント(PieChart)にアクセス。renderPieChart()を呼び出すという意味
      this.$refs.chart.renderPieChart();
    },
    quizFinish() {
      location.href = "/";
    }
  }
};
</script>

