<template>
  <div>
    <app-navbar></app-navbar>
    <div class="container">
      <section class="section">
        <h1 class="title">Your Classes</h1>
        <section>
          <b-field label="School Year">
            <b-select>
              <option selected>2020-2021</option>
            </b-select>
          </b-field>
        </section>

        <p v-if="loading">Loading</p>

        <div v-else class="columns is-multiline mt-4">
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
          ></classroom-card>
        </div>
      </section>
    </div>
  </div>
</template>
<script>
import AppNavbar from "~/components/AppNavbar.vue";
import ClassroomCard from "~/components/ClassroomCard.vue";
export default {
  components: {
    ClassroomCard,
    AppNavbar,
  },
  head: {
    title: "Classroom",
  },
  layout: "app",
  data() {
    return {
      page: "Classroom",
      myClasses: [],
      loading: true,
    };
  },

  created: async function () {
    console.log(this.$auth.user);
    this.loading = true;
    const userId = this.$auth.user.message.id;
    const access = this.$auth.user.message.access > 1 ? "teacher" : "students";
    const res = await this.$axios.$get(`/class?${access}=${userId}`);
    res.forEach((it) => {
      this.myClasses.push({
        title: it.subject,
        students: it.students.length,
        section: it.yearLevel + " " + it.section,
        teacher: it.teacher.person.firstname + " " + it.teacher.person.lastname,
        schedule: it.schedule.join(),
        yearLevel: it.yearLevel,
        to: it._id,
      });
    });
    console.log(this.myClasses);
    this.loading = false;
  },
};
</script>

<style>
</style>
