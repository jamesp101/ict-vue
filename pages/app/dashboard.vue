
<template>
  <div class="container">
    <h1>Hello</h1>
    <div class="columns">
      <div class="column" v-for="(sum, i) in summary" :key="i">
        <CardSummary :desc="sum.desc" :num="sum.num" />
      </div>
    </div>
  </div>
</template>

<script>
import CardSummary from "~/components/CardSummary.vue";
export default {
  components: { CardSummary },
  layout: "app",
  data() {
    return {
      summary: [
        {
          num: "hello",
          desc: "hello",
        },
      ],
    };
  },
};
</script>

