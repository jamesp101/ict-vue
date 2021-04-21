
<template>
  <div>
    <div class="columns is-multiline">
      <div class="column is-12">
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
      <div class="column is-12">
        <h1 class="has-background-primary is-size-5 pt-5 has-text-white">
          <b>Classroom</b>
        </h1>
        <div class="row mt-1">
          <nuxt-link class="button is-primary" to="/app/profile">View Classroom</nuxt-link>
        </div>
      </div>
    </div>
    <div class="columns is-multiline is-centered">
      <div class="column is-6">
        <h1 class="has-background-primary is-size-5 pt-5 has-text-white">
          <b>ICT MANUAL</b>
        </h1>
        <nuxt-link 
          v-for="(man, i ) in manual" 
          :key="i"
          :to="man.to"
          class="button is-fullwidth"
        >

          {{man.title}}
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
      manual: [
        {
          title: "Foreword",
          icon: "book",
          to: "/app/manual_foreword",
        },
        {
          title: "Internet Access Policy",
          icon: "book",
          to: "/app/manual_internet",
        },
        {
          title: "Computer Procurement",
          icon: "book",
          to: "/app/manual_procurement",
        },
        {
          title:
            "Computer, email, and Internet Usage",
          icon: "book",
          to: "/app/manual_computer_policy",
        },
        {
          title: "Rationale",
          icon: "book",
          to: "/app/manual_rationale",
        },
        {
          title: "Scope",
          icon: "book",
          to: "/app/manual_scope",
        },
        {
          title: "Policy",
          icon: "book",
          to: "/app/manual_policy",
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

