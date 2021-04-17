<template>
  <div class="modal-card">
    <div class="modal-card-body">
      <b-field label="Username">
        <b-input type="text" v-model="username" />
      </b-field>
      <b-field label="Password">
        <b-input type="password" v-model="password" />
      </b-field>
      <b-field label="User Type">
        <b-select v-model="userType">
          <option value="1" selected>Student</option>
          <option value="2">Teacher</option>
          <option value="4">Admin</option>
        </b-select>
      </b-field>
      <table-persons class="limit" @data="dataSelected" />
      <b-button label="Add User" type="is-primary" @click="addUser"></b-button>
    </div>
  </div>
</template>

<script>
import TablePersons from "./TablePersons.vue";
export default {
  components: { TablePersons },

  data() {
    return {
      user: "",
      username: "",
      password: "",
      userType: "",
    };
  },

  methods: {
    async addUser() {
      if (this.user == {} || this.user == "") {
        this.showError("No Person Clicked!");
        return;
      }
      if (this.username == "") {
        this.showError("No username");
        return;
      }
      if (this.password == "") {
        this.showError("No password");
        return;
      }

      try {
        console.log(this.user);
        this.$axios.$post("/account", {
          username: this.username,
          password: this.password,
          access: this.userType,
          person: this.user,
        });

        this.$buefy.notification.open({
          type: "is-success",
          message: `User created`,
          hasIcon: true,
        });
      } catch {
        this.$buefy.notification.open({
          type: "is-danger",
          message: `Something went wrong`,
          hasIcon: true,
        });
      }
      this.$parent.close();
    },
    dataSelected(e) {
      console.log(e);
      this.user = e?.id;
    },
    showError(err) {
      this.$buefy.notification.open({
        message: err,
        type: "is-danger",
        hasIcon: true,
        position: "is-bottom-right",
      });
    },
  },
};
</script>

<style scoped lang="scss">
.limit {
  height: 22rem;
  overflow: auto;
}
.modal-card {
}
</style>
