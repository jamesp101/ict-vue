
<template>
  <div class="container">
    <h1>Hello</h1>
    <div class="columns"></div>
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
  head: {
    title: "Dashboard",
  },
};
</script>

