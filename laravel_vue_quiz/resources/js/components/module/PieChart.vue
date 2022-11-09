<script>
// 描画するグラフのデータは親コンポーネントTheModal.vueからpropsでchartDataを渡すように設定します。mountedではなくmethodで定義したのは、新規作成する親コンポーネントから呼び出すため
import { Pie } from "vue-chartjs";
export default {
  extends: Pie,
  props: {
    chartData: {
      type: Object
    }
  },
  methods: {
    renderPieChart() {
      this.renderChart(this.chartData, {
        borderWidth: "10px",
        hoverBackgroundColor: "red",
        hoverBorderWidth: "10px"
      });
    }
  }
};
</script>

