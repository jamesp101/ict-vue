<template>
  <div>
    <div class="columns is-centered is-multiline mt-6">
      <div class="column is-11 has-background-primary mb-5">
        <h1 class="has-text-primary-light is-size-5">User lists</h1>
        <b-input
          placeholder="Search..."
          icon="magnify"
          size="is-small"
          v-model="studentSearch"
          @input="studentTextChange"
        />
        <b-field>
          <b-button type="is-primary" size="is-medium" @click="loadAccounts" icon-left="reload"></b-button>
          <b-button
            type="is-primary"
            size="is-medium"
            icon-left="account-multiple-plus"
            @click="isModalAddActive = true"
          ></b-button>
          <b-button type="is-primary" size="is-medium" icon-left="pencil"></b-button>
          <b-button type="is-primary" size="is-medium" @click="studentDelete" icon-left="delete"></b-button>
          <b-button
            type="is-primary"
            size="is-medium"
            @click="studentSelected = null"
            icon-left="backspace"
          ></b-button>
        </b-field>
        <b-field>
          <nuxt-link
            to="/preregistration"
            class="is-primary is-pulled-right has-text-white"
          >Pre-registration</nuxt-link>
        </b-field>
      </div>
      <b-field>
        <b-radio-button
          v-model="selection"
          @input="loadAccounts()"
          native-value="student"
          type="is-outlined is-primary is-light"
        >
          <span>Student</span>
        </b-radio-button>
        <b-radio-button
          v-model="selection"
          native-value="teacher"
          type="is-outlined is-primary is-light"
          @input="loadAccounts()"
        >
          <span>Teacher</span>
        </b-radio-button>
        <b-radio-button
          v-model="selection"
          native-value="admin"
          type="is-outlined is-primary is-light"
          @input="loadAccounts()"
        >
          <span>Admin</span>
        </b-radio-button>
      </b-field>

      <div class="column is-11 border" v-if="isLoading">
        <b-skeleton width="100%"></b-skeleton>
        <b-skeleton width="100%"></b-skeleton>
        <b-skeleton width="100%"></b-skeleton>
        <b-skeleton width="100%"></b-skeleton>
        <b-skeleton width="100%"></b-skeleton>
      </div>
      <b-table
        v-else
        :selected.sync="studentSelected"
        class="column is-11 border"
        :data="accountData"
        :columns="accountColumns"
      ></b-table>
    </div>
    <b-modal
      v-model="isModalAddActive"
      has-modal-card
      trap-focus
      aria-label="Create new post"
      aria-modal
      @close="loadAccounts()"
    >
      <modal-create-user />
    </b-modal>
  </div>
</template>


<script>
import ModalCreateUser from "~/components/ModalCreateUser.vue";
import ModalYesNo from "~/components/ModalYesNo.vue";
export default {
  components: { ModalYesNo, ModalCreateUser },
  layout: "app",
  data() {
    return {
      accountColumns: [
        { field: "username", label: "Username" },
        { field: "lastname", label: "Last Name" },
        { field: "firstname", label: "First Name" },
        { field: "address", label: "Address" },
      ],
      accountData: [],
      employeeData: [],
      isLoading: true,
      studentSearch: "",
      studentSelected: null,
      activeTab: 0,
      isModalAddActive: false,
      selection: "student",
      isModalEditActive: false,
    };
  },

  async created() {
    const userType = this.$auth.user.access;
    if (userType <= 3) {
      this.$router.push("/app/dashboard");
      return;
    }
    this.loadAccounts();
  },
  methods: {
    clearStudentTable() {
      this.accountData = [];
    },
    getAccessType() {
      console.log("log", this.selection);
      switch (this.selection) {
        default:
        case "student":
          return 1;
        case "teacher":
          return 2;
        case "admin":
          return 4;
      }
    },

    async studentTextChange() {
      if (this.studentSearch == "") {
        await this.loadAccounts();
        return;
      }
      const data = await this.$axios.get(
        `/account/search/${this.studentSearch}?access=${this.getAccessType()}`
      );
      console.log("request", data);
      // this.accountData = data.data;
      this.clearStudentTable();
      const getData = data.data;
      for (let user of getData) {
        console.log(user);
        this.accountData.push({
          id: user._id,
          username: user.username,
          lastname: user.person?.lastname,
          firstname: user.person?.firstname,
          gender: user.person?.gender,
          address: user.person?.address,
        });
      }
    },
    async loadAccounts() {
      this.clearStudentTable();
      const data = await this.$axios.get(
        `/account?access=${this.getAccessType()}`
      );
      // this.accountData = data.data;
      const getData = data.data;
      for (let user of getData) {
        console.log(user);
        this.accountData.push({
          id: user._id,
          username: user.username,
          lastname: user.person?.lastname,
          firstname: user.person?.firstname,
          gender: user.person?.gender,
          address: user.person?.address,
        });
      }
      console.log("ACCOUNT DATA ", this.accountData);
      this.isLoading = false;
    },
    async studentDelete() {
      if (this.studentSelected == null) {
        this.$buefy.notification.open({
          type: "is-danger",
          hasIcon: true,
          position: "is-top-right",
          message: "No student Selected",
        });
        return;
      }
      if (!confirm("Delete this student?")) {
        return;
      }
      try {
        await this.$axios.$delete(`/account/${this.studentSelected.id}`);
        this.loadAccounts();
        this.$buefy.notification.open({
          type: "is-success",
          hasIcon: true,
          position: "is-top-right",
          message: "User Deleted",
        });
      } catch {
        this.$buefy.notification.open({
          type: "is-danger",
          hasIcon: true,
          position: "is-top-right",
          message: "Something went wrong",
        });
      }
    },
  },
};
</script>

<style scoped>
.border {
  border: black solid 1px;
  max-height: 100%;
  height: 100%;
  min-height: 500px;
}
</style>
