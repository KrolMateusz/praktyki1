<template>
  <v-chart class="chart" :option="option" />
</template>

<script>
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { BarChart } from "echarts/charts";
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
} from "echarts/components";
import VChart, { THEME_KEY } from "vue-echarts";
import { ref, defineComponent } from "vue";
import { ToolboxComponent } from "echarts/components";
import { GridComponent } from "echarts/components";
import { LineChart } from "echarts/charts";

use([
  CanvasRenderer,
  BarChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  ToolboxComponent,
  GridComponent,
  LineChart,
]);

export default defineComponent({
  name: "Charts",
  components: {
    VChart,
  },
  provide: {
    [THEME_KEY]: "light",
  },
  setup() {
    const app = {};
    const posList = [
      "left",
      "right",
      "top",
      "bottom",
      "inside",
      "insideTop",
      "insideLeft",
      "insideRight",
      "insideBottom",
      "insideTopLeft",
      "insideTopRight",
      "insideBottomLeft",
      "insideBottomRight",
    ];

    app.configParameters = {
      rotate: {
        min: -90,
        max: 90,
      },
      align: {
        options: {
          left: "left",
          center: "center",
          right: "right",
        },
      },
      verticalAlign: {
        options: {
          top: "top",
          middle: "middle",
          bottom: "bottom",
        },
      },
      position: {
        options: posList.reduce(function (map, pos) {
          map[pos] = pos;
          return map;
        }, {}),
      },
      distance: {
        min: 0,
        max: 100,
      },
    };

    app.config = {
      rotate: 86,
      align: "left",
      verticalAlign: "bottom",
      position: "insideBottom",
      distance: 35,
    };
    const labelOption = {
      show: true,
      position: app.config.position,
      distance: app.config.distance,
      align: app.config.align,
      verticalAlign: app.config.verticalAlign,
      rotate: app.config.rotate,
      formatter: "{c}  {name|{a}}",
      fontSize: "2rem",
      rich: {
        name: {},
      },
    };
    const option = ref({
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow",
        },
      },
      legend: {
        data: ["fast", "slow"],
      },
      toolbox: {
        show: true,
        orient: "vertical",
        left: "right",
        top: "center",
        feature: {
          mark: { show: false },
          dataView: { show: false, readOnly: false },
          magicType: { show: true, type: ["bar", "stack", "tiled"] },
          restore: { show: true },
          saveAsImage: { show: true },
        },
      },
      xAxis: [
        {
          type: "category",
          axisTick: { show: true },
          data: ["Walking", "Skating", "Cycling"],
        },
      ],
      yAxis: [
        {
          type: "value",
        },
      ],
      series: [
        {
          name: "fast",
          type: "bar",
          barGap: -0.35,
          label: labelOption,
          emphasis: {
            focus: "series",
          },
          data: [320, 332, 301],
          color: "#ea1885",
        },
        {
          name: "slow",
          type: "bar",
          label: labelOption,
          emphasis: {
            focus: "series",
          },
          data: [150, 232, 201],
          color: "#eadc18",
        },
      ],
    });

    return { option };
  },
});
</script>

<style scoped>
.chart {
  height: 400px;
}
</style>
