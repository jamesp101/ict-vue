<template>
  <div class="profile-page">
    <div class="columns is-centered is-8">
      <div class="column is-4 box is-fullheight">
        <h1>
          <b>Basic Information</b>
        </h1>
        <b-field label="First name">
          <b-input :disabled="!isEdit" v-model="firstname"></b-input>
        </b-field>
        <b-field label="Last name">
          <b-input :disabled="!isEdit" v-model="lastname"></b-input>
        </b-field>
        <b-field label="Birthdate">
          <b-input class="mx-1" v-model="birthday" :disabled="!isEdit"></b-input>
        </b-field>
        <b-field label="Address">
          <b-input class="mx-1" v-model="address" :disabled="!isEdit"></b-input>
        </b-field>
        <b-field label="Username">
          <b-input class="mx-1" v-model="username" :disabled="!isEdit"></b-input>
        </b-field>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: "app",
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
    };
  },
  async created() {
    console.log("HHH");
    const x = await this.$axios.$get(`/account/${this.$auth.user.message.id}`);
    this.firstname = x[0].person.firstname;
    this.lastname = x[0].person.lastname;
    this.address = x[0].person.address;
    this.username = x[0].username;
    this.password = x[0].password;
    this.birthday = x[0].person.birthday;
  },
  methods: {
    edit() {},
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
