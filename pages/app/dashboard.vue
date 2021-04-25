
<template>
  <div>
    <div class="columns is-multiline">
      <div class="column is-6">
        <h1 class="has-background-primary is-size-5 pt-5 has-text-white">
          <b>Account</b>
        </h1>
        <div class="row mt-1">
          <nuxt-link class="button is-primary" to="/app/classroom">View Account</nuxt-link>
        </div>
        <div class="row mt-1">
          <b-button type="is-danger is-light" @click="clickLogout">Logout</b-button>
        </div>
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
  head: {
    title: "Dashboard",
  },
  methods: {
    clickLogout() {
      this.$auth.logout();
      this.$router.push("/login");
    },
  },
};
</script>

