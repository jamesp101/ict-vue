
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
      <div class="column is-6">
        <h1 class="has-background-primary is-size-5 pt-5 has-text-white">
          <b>Classroom</b>
        </h1>
        <div class="row mt-1">
          <nuxt-link class="button is-primary" to="/app/profile">View Classroom</nuxt-link>
        </div>
      </div>
    </div>
    <div class="columns is-multiline">
      <div class="column is-12">
        <h1 class="has-background-primary is-size-5 pt-5 has-text-white">
          <b>ICT MANUAL</b>
        </h1>
      </div>
      <div class="columns px-4">
        <nuxt-link to="/app/manual_foreword" class="column">
          <b-icon icon="book" size="is-large"></b-icon>
          <h1>I. Foreword</h1>
        </nuxt-link>
        <nuxt-link to="/app/manual_internet" class="column">
          <b-icon icon="book" size="is-large"></b-icon>
          <h1>II. Internet Access Policy</h1>
        </nuxt-link>
        <nuxt-link to="/app/manual_procurement" class="column">
          <b-icon icon="book" size="is-large"></b-icon>
          <h1>III. Computer Procurement</h1>
        </nuxt-link>
        <nuxt-link to="/app/manual_procurement" class="column">
          <b-icon icon="book" size="is-large"></b-icon>
          <h1>IV. Computer Policy, Disposal, Procedure, and Printing Guidelines</h1>
        </nuxt-link>
        <nuxt-link to="/app/manual_procurement" class="column">
          <b-icon icon="book" size="is-large"></b-icon>
          <h1>V. Computer Laboratory Policy</h1>
        </nuxt-link>
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

