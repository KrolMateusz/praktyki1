<template>
  <div class="m-20 grid justify-items-center">
    <v-chart class="h-chart" :option="option" />
    <p class="text-base">
      Current Food Type:
      <span class="font-bold">{{ foodType.name.toUpperCase() }}</span>
    </p>
  </div>
</template>

<script>
import { use } from "echarts/core";
import { useStore } from "vuex";
import { CanvasRenderer } from "echarts/renderers";
import { BarChart } from "echarts/charts";
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
} from "echarts/components";
import VChart, { THEME_KEY } from "vue-echarts";
import { computed, defineComponent } from "vue";
import { ToolboxComponent } from "echarts/components";
import { GridComponent } from "echarts/components";
import { LineChart } from "echarts/charts";
import { weightUnitLBS } from "./variables.js";

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
    const store = useStore();
    const kcalBurned = computed(() => store.getters.getKcalBurned);
    const weightUnit = computed(() => store.getters.getWeightUnit);

    const foodType = store.state.foodType;

    const app = {
      config: {
        rotate: 86,
        align: "left",
        verticalAlign: "bottom",
        position: "insideBottom",
        distance: 35,
      },
    };

    const dataSlow = Object.keys(kcalBurned.value).map((key) => {
      if (weightUnit.value === weightUnitLBS) {
        return (
          ((foodType.kcal / kcalBurned.value[key]) * 60 * 2) /
          0.45359237
        ).toFixed(0);
      } else {
        return ((foodType.kcal / kcalBurned.value[key]) * 60 * 2).toFixed(0);
      }
    });

    const dataFast = Object.keys(kcalBurned.value).map((key) => {
      if (weightUnit.value === weightUnitLBS) {
        return (
          ((foodType.kcal / kcalBurned.value[key]) * 60) /
          0.45359237
        ).toFixed(0);
      } else {
        return ((foodType.kcal / kcalBurned.value[key]) * 60).toFixed(0);
      }
    });

    const labelOption = {
      show: true,
      position: app.config.position,
      distance: app.config.distance,
      align: app.config.align,
      verticalAlign: app.config.verticalAlign,
      rotate: app.config.rotate,
      formatter: "{c}  {name|{a}}",
      fontSize: "1.6rem",
      rich: {
        name: {},
      },
    };
    const option = {
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow",
        },
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
          name: "Activities",
          type: "category",
          axisTick: { show: true },
          data: ["Walking", "Skating", "Cycling"],
        },
      ],
      yAxis: [
        {
          name: "Time",
          nameLocation: "middle",
          nameGap: 30,
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
          data: dataFast,
          color: "#ea1885",
        },
        {
          name: "slow",
          type: "bar",
          label: labelOption,
          emphasis: {
            focus: "series",
          },
          data: dataSlow,
          color: "#eadc18",
        },
      ],
    };

    return { option, foodType };
  },
});
</script>
