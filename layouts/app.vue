
<template>
  <div class="sidebar-page">
    <section class="sidebar-layout">
      <b-sidebar
        position="static"
        :mobile="mobile"
        :expand-on-hover="expandOnHover"
        :reduce="reduce"
        :fullheight="fullheight"
        :expand-on-hover-fixed="expandOnHoverFixed"
        open
        right
      >
        <div>
          <div class="block has-text-centered">
            <!-- TODO: Insert profile image -->
            <img src="https://www.aclcbukidnon.com/Account/ACLCLogo.png" class="is-image is-128x128 is-rounded has-background-white" alt />
            <h1 class="is-size-5">{{ user.firstname + ' ' + user.lastname }}</h1>
          </div>
          <b-menu class="is-custom-mobile">
            <!-- <b-menu-list label="Menu">
                   <nuxt-link to="app/dashboard" exact-active-class="is-active">
                   <b-menu-item icon="information-outline" label="Dashboard"></b-menu-item>
                   </nuxt-link>
                   <nuxt-link to="app/classroom" exact-active-class="is-active">
                   <b-menu-item icon="information-outline" label="Classroom"></b-menu-item>
                   </nuxt-link>
            </b-menu-list>-->
            <!-- <li v-for="(item, key) of links" :key="key">
                   <NuxtLink :to="item.to" exact-active-class="is-active">
                   <b-icon :icon="item.icon" />
                   {{ item.title }}
                   </NuxtLink>
            </li>-->
            <b-menu-list label="Menu">
              <li v-for="(item,key) of menu" :key="key">
                <NuxtLink class="" :to="item.to" exact-active-class="button is-warning">
                  <b-icon :icon="item.icon" size="is-small" />
                  <span>{{item.title}}</span>
                </NuxtLink>
              </li>
            </b-menu-list>
            <!-- manual -->
            <b-menu-list label="Manual" class="is-text-white">
              <b-menu-item expanded label="ICT Manual">
                <li v-for="(item,key) of manual" :key="key">
                  <NuxtLink :to="item.to" class="" exact-active-class="button is-warning">
                    <b-icon :icon="item.icon" size="is-small" />
                    <span>{{item.title}}</span>
                  </NuxtLink>
                </li>
                <li >
                  <a
                  class="button is-primary"
                    href="https://drive.google.com/file/d/1b3xUZD8JYgoQM4WguojdkFa5fvgzTXzx/view?usp=sharing"
                  >
                    <b-icon icon="download" size="is-small" />
                    <span>Download</span>
                  </a>
                </li>
              </b-menu-item>
            </b-menu-list>
            <!-- manual -->

            <!-- Admin -->
            <b-menu-list label="Admin" v-if="access == 4">
              <li v-for="(item,key) of admin" :key="key">
                <NuxtLink :to="item.to" class="" exact-active-class="button is-warning">
                  <b-icon :icon="item.icon" size="is-small" />
                  <span>{{item.title}}</span>
                </NuxtLink>
              </li>
            </b-menu-list>

            <!-- Admin -->

            <b-menu-list label="Account">
              <li v-for="(item,key) of account" :key="key">
                <NuxtLink :to="item.to" class="" exact-active-class="button is-warning">
                  <b-icon :icon="item.icon" size="is-small" />
                  <span>{{item.title}}</span>
                </NuxtLink>
              </li>
              <li>
                <a @click="logout" class="button is-primary" >
                  <b-icon icon="exit-to-app" size="is-small" />
                  <span>Logout</span>
                </a>
              </li>
            </b-menu-list>
          </b-menu>
        </div>
      </b-sidebar>

      <div class="page">
        <Nuxt />
      </div>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      expandOnHoverFixed: true,
      expandOnHover: true,
      mobile: "reduce",
      reduce: false,
      fullheight: true,
      user: {},
      access: 1,
      menu: [
        {
          title: "Dashboard",
          icon: "view-dashboard",
          to: "/app/dashboard",
        },
        {
          title: "Classroom",
          icon: "google-classroom",
          to: "/app/classroom",
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

      account: [
        {
          title: "Profile",
          icon: "account",
          to: "/app/profile",
        },
      ],
      admin: [
        {
          title: "User Management",
          icon: "clipboard-account-outline",
          to: "/app/admin_user",
        },
        {
          title: "Classroom Management",
          icon: "google-classroom",
          to: "/app/admin_classroom",
        },
      ],
    };
  },
  async created() {
    this.access = this.$auth.$state.user.message.access;
    const id = this.$auth.$state.user.message.id;
    const res = await this.$axios.$get(`/account/${id}`);
    console.log(res);
    const response = res[0];
    this.user = {
      firstname: response.person?.firstname,
      lastname: response.person?.lastname,
      id: response._id,
      access: response.access,
    };
  },
  methods: {
    async logout() {
      console.log("HELLO");
      await this.$auth.logout();
      this.$router.push("/login");
    },
  },
};
</script>

<style lang="scss">
.page {
  width: 100%;
  max-height: 100%;
  overflow: auto;
}
.sidebar-page {
  display: flex;
  flex-direction: column;
  width: 100vw;
  /* min-height: 100%; */
  min-height: 100vh;
  .sidebar-layout {
    display: flex;
    flex-direction: row;
    height: 100vh;
    // min-height: 100vh;
  }
}
@media screen and (max-width: 412px) {
  .b-sidebar {
    .sidebar-content {
      &.is-mini-mobile {
        &:not(.is-mini-expand),
        &.is-mini-expand:not(:hover) {
          .menu-list {
            li {
              a {
                span:nth-child(2) {
                  display: none;
                }
              }
              ul {
                padding-left: 0;
                li {
                  a {
                    display: inline-block;
                  }
                }
              }
            }
          }
          .menu-label:not(:last-child) {
            margin-bottom: 0;
          }
        }
      }
    }
  }
}
@media screen and (min-width: 1024px) {
  .b-sidebar {
    .sidebar-content {
      &.is-mini {
        &:not(.is-mini-expand),
        &.is-mini-expand:not(:hover) {
          .menu-list {
            li {
              a {
                span:nth-child(2) {
                  display: none;
                }
              }
              ul {
                padding-left: 0;
                li {
                  a {
                    display: inline-block;
                  }
                }
              }
            }
          }
          .menu-label:not(:last-child) {
            margin-bottom: 0;
          }
        }
      }
    }
  }
}
.is-mini-expand {
  .menu-list a {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
</style>
