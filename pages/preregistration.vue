<template>
  <div class="profile-page">
    <div class="columns is-centered is-8">
      <div class="column is-4 box is-fullheight">
        <h1>
          <b>Basic Information</b>
        </h1>
        <b-field label="First name">
          <b-input v-model="firstname"></b-input>
        </b-field>
        <b-field label="Last name">
          <b-input v-model="lastname"></b-input>
        </b-field>
        <b-field label="Birthdate">
          <b-input class="mx-1" v-model="birthday"></b-input>
        </b-field>
        <b-field label="Address">
          <b-input class="mx-1" v-model="address"></b-input>
        </b-field>
        <b-field label="Contact #">
          <b-input class="mx-1" v-model="contact"></b-input>
        </b-field>
        <b-field label="Gender">
          <b-input class="mx-1" v-model="gender"></b-input>
        </b-field>
        <b-field label>
          <b-button type="is-primary" @click="edit">Submit</b-button>
        </b-field>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: "default",
  data() {
    return {
      isEdit: false,
      firstname: "",
      lastname: "",
      year: "",
      month: "",
      day: "",
      address: "",
      username: "",
      password: "",
      birthday: "",
      contact: "",
      gender: "",
    };
  },
  async created() {
    console.log("HHH");
  },
  methods: {
    edit() {
      this.$axios.$post("/person", {
        firstname: this.firstname,
        lastname: this.lastname,
        birthday: this.birthday,
        gender: this.gender,
        contact: this.contact,
      });
      this.$router.push("/");
      this.$buefy.notification.open({
        type: "is-success",
        hasIcon: true,
        position: "is-bottom-right",
        message: "Pre registration complete",
      });
    },
  },
};
</script>

<style scoped>
.profile-page {
  padding: 1.5em;
}
.profile-image {
  height: 150px;
  border-radius: 50%;
}
</style>
