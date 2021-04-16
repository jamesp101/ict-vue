<template>
  <div>
    <b-tabs>
      <b-tab-item label="Students">
        <div class="columns is-centered is-multiline mt-6">
          <div class="column is-11 has-background-primary">
            <h1 class="has-text-primary-light is-size-5">Student List</h1>
            <b-input
              placeholder="Search..."
              icon="magnify"
              size="is-small"
              v-model="studentSearch"
              @input="studentTextChange"
            />
            <div class="columns mt-3">
              <b-button
                class="column is-1"
                type="is-primary"
                size="is-medium"
                icon-left="account-multiple-plus"
                @click="isModalAddActive = true"
              ></b-button>
              <b-button class="column is-1" type="is-primary" size="is-medium" icon-left="pencil"></b-button>
              <b-button
                class="column is-1"
                type="is-primary"
                size="is-medium"
                @click="studentDelete"
                icon-left="delete"
              ></b-button>
              <b-button
                class="column is-1"
                type="is-primary"
                size="is-medium"
                @click="studentSelected = null"
                icon-left="backspace"
              ></b-button>
            </div>
          </div>

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
      </b-tab-item>
      <b-tab-item label="Employees">
        <div class="columns is-centered is-multiline mt-6">
          <div class="column is-9 has-background-primary">
            <h1 class="has-text-primary-light is-size-5">Employee</h1>
          </div>
          <div class="column is-9 border" v-if="isLoading">
            <b-skeleton width="100%"></b-skeleton>
            <b-skeleton width="100%"></b-skeleton>
            <b-skeleton width="100%"></b-skeleton>
            <b-skeleton width="100%"></b-skeleton>
            <b-skeleton width="100%"></b-skeleton>
          </div>
          <b-table v-else class="column is-9 border" :data="employeeData" :columns="accountColumns"></b-table>
        </div>
      </b-tab-item>
    </b-tabs>
    <b-modal
      v-model="isModalAddActive"
      has-modal-card
      trap-focus
      aria-label="Create new post"
      aria-modal
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
        { field: "id", label: "ID" },
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
    };
  },

  async created() {
    this.loadAccounts();
    this.loadEmployees();
  },
  methods: {
    clearStudentTable() {
      this.accountData = [];
    },

    async studentTextChange() {
      if (this.studentSearch == "") {
        await this.loadAccounts();
        return;
      }
      const data = await this.$axios.get(
        `/account/search/${this.studentSearch}?access=1`
      );
      // this.accountData = data.data;
      this.clearStudentTable();
      const getData = data.data;
      for (let user of getData) {
        console.log(user);
        this.accountData.push({
          id: user._id,
          lastname: user.person?.lastname,
          firstname: user.person?.firstname,
          gender: user.person?.gender,
          address:
            user.person?.address?.street +
            ", " +
            user.person?.address?.barangay +
            ", " +
            user.person?.address?.city +
            "," +
            user.person?.address?.province,
        });
      }
    },
    async loadAccounts() {
      this.clearStudentTable();
      const data = await this.$axios.get("/account?access=1");
      // this.accountData = data.data;
      const getData = data.data;
      for (let user of getData) {
        console.log(user);
        this.accountData.push({
          id: user._id,
          lastname: user.person?.lastname,
          firstname: user.person?.firstname,
          gender: user.person?.gender,
          address:
            user.person?.address?.street +
            ", " +
            user.person?.address?.barangay +
            ", " +
            user.person?.address?.city +
            "," +
            user.person?.address?.province,
        });
      }
      console.log("ACCOUNT DATA ", this.accountData);
      this.isLoading = false;
    },
    async loadEmployees() {
      const data = await this.$axios.get("/account?access=2");
      // this.accountData = data.data;
      const getData = data.data;
      for (let user of getData) {
        console.log(user);
        this.employeeData.push({
          id: user._id,
          lastname: user.person?.lastname,
          firstname: user.person?.firstname,
          gender: user.person?.gender,
          address:
            user.person?.address?.street +
            ", " +
            user.person?.address?.barangay +
            ", " +
            user.person?.address?.city +
            "," +
            user.person?.address?.province,
        });
      }
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
      console.log(this.studentSelected);
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
