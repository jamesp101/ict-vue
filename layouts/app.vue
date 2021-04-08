
<template>
  <div class="sidebar-page">
    <section class="sidebar-layout">
      <b-sidebar
        position="static"
        :mobile="mobile"
        :expand-on-hover="expandOnHover"
        :reduce="reduce"
        type="is-light"
        :fullheight="fullheight"
        open
      >
        <div class="p-1">
          <div class="block">
            <img
              src="https://raw.githubusercontent.com/buefy/buefy/dev/static/img/buefy-logo.png"
              alt="Lightweight UI components for Vue.js based on Bulma"
            />
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
                <NuxtLink :to="item.to" exact-active-class="is-active">
                  <b-icon :icon="item.icon" size="is-small" />
                  <span>{{item.title}}</span>
                </NuxtLink>
              </li>
            </b-menu-list>
            <b-menu-list label="Account">
              <li v-for="(item,key) of account" :key="key">
                <NuxtLink :to="item.to" exact-active-class="is-active">
                  <b-icon :icon="item.icon" size="is-small" />
                  <span>{{item.title}}</span>
                </NuxtLink>
              </li>
              <li>
                <a @click="logout">
                  <b-icon size="is-small" />
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
      expandOnHover: true,
      mobile: "reduce",
      reduce: false,
      fullheight: true,
      menu: [
        {
          title: "Dashboard",
          icon: "view-dashboard",
          to: "/app/dashboard",
        },
        {
          title: "Classroom",
          icon: "view-dashboard",
          to: "/app/classroom",
        },
      ],

      account: [
        {
          title: "Profile",
          icon: "view-dashboard",
          to: "/app/profile",
        },
      ],
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
@media screen and (max-width: 1023px) {
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
