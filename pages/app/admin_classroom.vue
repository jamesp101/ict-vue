<template>
  <section class="section">
    <div class="columns is-centered">
      <div class="column is-12 has-background-primary">
        <h1 class="is-text-4 has-text-white pt-5">
          <b>Classroom Managment</b>
        </h1>
        <b-field>
          <b-button
            type="is-primary"
            size="is-medium"
            icon-left="account-multiple-plus"
            @click="isAdd = true"
          ></b-button>
          <b-button type="is-primary" size="is-medium" icon-left="reload" @click="loadClasses"></b-button>
        </b-field>
        <b-autocomplete placeholder="Search" icon="maginify" clearable></b-autocomplete>
      </div>
    </div>
    <div class="columns is-multiline">
      <template v-if="myClasses.length != 0">
        <classroom-card
          class="column is-4"
          v-for="(myClass, i) in myClasses"
          :key="i"
          :title="myClass.title"
          :teacher="myClass.teacher"
          :footer="myClass.students"
          :section="myClass.section"
          :schedule="myClass.schedule"
          :to="myClass.to"
        />
      </template>
      <template v-else>
        <div class="column is-4 card mr-5" v-for="i in 10" :key="i">
          <b-skeleton width="20%"></b-skeleton>
          <b-skeleton width="20%"></b-skeleton>
          <b-skeleton width="20%"></b-skeleton>
          <b-skeleton width="100%"></b-skeleton>
        </div>
      </template>
    </div>

    <b-modal trap-focus v-model="isAdd" aria-modal v-on:close="loadClasses">
      <modal-create-class />
    </b-modal>
  </section>
</template>


<script>
import ClassroomCard from "~/components/ClassroomCard.vue";
import ModalCreateClass from "~/components/ModalCreateClass.vue";
import ModalCreateUser from "~/components/ModalCreateUser.vue";
export default {
  components: { ClassroomCard, ModalCreateUser, ModalCreateClass },
  layout: "app",

  data() {
    return {
      skeletonCard: 6,
      searchData: "",
      data: [],
      selectedData: {},
      myClasses: [],
      isAdd: false,
    };
  },
  async created() {
    const userType = this.$auth.user.access;
    if (userType <= 4) {
      this.$router.push("/app/dashboard");
      return;
    }
    this.loadClasses();
  },
  methods: {
    async loadClasses() {
      this.loading = true;
      this.myClasses = [];
      const res = await this.$axios.$get(`/class`);
      res.forEach((it) => {
        console.log("DEbug");
        this.myClasses.push({
          title: it.subject,
          students: it.students.length,
          section: it.yearLevel + " " + it.section,
          teacher:
            it.teacher.person?.firstname + " " + it.teacher.person?.lastname,
          schedule: it.schedule,
          yearLevel: it.yearLevel,
          to: it._id,
        });
      });
      console.log(this.myClasses);
      this.loading = false;
    },
    closeEditModal() {},
  },
};
</script>

<style>
</style>
