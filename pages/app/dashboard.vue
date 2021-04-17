
<template>
  <div class="columns is-multiline is-5 p-6">
    <div class="column is-5">
      <h1 class="has-background-primary is-size-5 pt-5 has-text-white">
        <b>Account</b>
      </h1>
      <div class="row mt-1">
        <nuxt-link class="button is-primary" to="/app/classroom">View Account</nuxt-link>
      </div>
      <div class="row mt-1">
        <b-button type="is-primary" @click="this.$auth.logout()">Logout</b-button>
      </div>
    </div>
    <div class="column is-5">
      <h1 class="has-background-primary is-size-5 pt-5 has-text-white">
        <b>Classroom</b>
      </h1>
      <div class="row mt-1">
        <nuxt-link class="button is-primary" to="/app/profile">View Classroom</nuxt-link>
      </div>
    </div>
    <div class="row"></div>
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

