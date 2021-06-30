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
    [THEME_KEY]: "dark",
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
      rotate: 90,
      align: "left",
      verticalAlign: "middle",
      position: "insideBottom",
      distance: 15,
    };
    const labelOption = {
      show: true,
      position: app.config.position,
      distance: app.config.distance,
      align: app.config.align,
      verticalAlign: app.config.verticalAlign,
      rotate: app.config.rotate,
      formatter: "{c}  {name|{a}}",
      fontSize: 16,
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
        data: ["Walking", "Skating", "Cycling"],
      },
      toolbox: {
        show: true,
        orient: "vertical",
        left: "right",
        top: "center",
        feature: {
          mark: { show: true },
          dataView: { show: true, readOnly: false },
          magicType: { show: true, type: ["line", "bar", "stack", "tiled"] },
          restore: { show: true },
          saveAsImage: { show: true },
        },
      },
      xAxis: [
        {
          type: "category",
          axisTick: { show: false },
          data: ["Burger", "Pizza", "Kebson"],
        },
      ],
      yAxis: [
        {
          type: "value",
        },
      ],
      series: [
        {
          name: "Walking",
          type: "bar",
          barGap: 0,
          label: labelOption,
          emphasis: {
            focus: "series",
          },
          data: [320, 332, 301, 334, 390],
        },
        {
          name: "Skating",
          type: "bar",
          label: labelOption,
          emphasis: {
            focus: "series",
          },
          data: [150, 232, 201, 154, 190],
        },
        {
          name: "Cycling",
          type: "bar",
          label: labelOption,
          emphasis: {
            focus: "series",
          },
          data: [98, 77, 101, 99, 40],
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
