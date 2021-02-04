// import Vue from 'vue'
// import VueRouter from 'vue-router'
// Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    name: "login",
    meta: {
      public: true,
    },
    component: () => import("@/views/Login.vue"),
    children: [],
  },
  {
    path: "/",
    name: "navigation",
    component: () => import("@/views/Master/Navigation.vue"),
    redirect: "/home",
    children: [
      {
        path: "/home",
        name: "home",
        component: () => import("@/views/home.vue"),
      },
      {
        path: "/myticket",
        name: "MyTicket",
        component: () => import("@/views/Ticket/MyTicket.vue"),
      },
      {
        path: "/allticket",
        name: "AllTicket",
        component: () => import("@/views/Ticket/Allticket.vue"),
      },
      {
        path: "/newticket",
        name: "NewTicket",
        component: () => import("@/views/Ticket/Newticket.vue"),
      },
      {
        path: "/profile",
        name: "Profile",
        component: () => import("@/views/Profile.vue"),
      },
      {
        path: "/settings",
        name: "Settings",
        component: () => import("@/views/Settings.vue"),
      },
      {
        path: "/article",
        name: "Article",
        component: () => import("@/views/Article.vue"),
      },
      {
        path: "/maps",
        name: "Maps",
        component: () => import("@/views/Maps.vue"),
      },
    ],
  },
  // {
  //   path: "/page",
  //   name: "Page",
  //   meta: {
  //     public: true,
  //   },
  //   component: () => import("@/views/page.vue"),
  // },
  {
    path: "/logins",
    name: "Logins",
    meta: {
      public: true,
    },
    component: () => import("@/views/Admin/Logins.vue"),
    children: [],
  },
  {
    path: "/",
    name: "navigationadmin",
    component: () => import("@/views/Master/NavigationAdmin.vue"),
    redirect: "/adminhome",
    children: [
      {
        path: "/adminhome",
        name: "AdminHome",
        component: () => import("@/views/Admin/AdminHome.vue"),
      },
      {
        path: "/calendar",
        name: "Calendar",
        component: () => import("@/views/Admin/Calendar.vue"),
      },
      {
        path: "/reminders",
        name: "Reminders",
        component: () => import("@/views/Admin/Reminders.vue"),
      },
      {
        path: "/tableadmin",
        name: "TableAdmin",
        component: () => import("@/views/Admin/TableAdmin.vue"),
      },
      {
        path: "/tableadminview",
        name: "TableAdminView",
        component: () => import("@/views/Admin/TableAdminView.vue"),
      },
      {
        path: "/notification",
        name: "Notification",
        component: () => import("@/views/Admin/Notification.vue"),
      },
      {
        path: "/setting",
        name: "Setting",
        component: () => import("@/views/Admin/Setting.vue"),
      },
      {
        path: "/AddUser",
        name: "AddUser",
        component: () => import("@/views/Admin/AddUser.vue"),
      },
    ],
  },
  {
    path: "*",
    name: "NotFound",
    component: () => import("@/views/NotFound.vue"),
  },
];
export default routes;
//navigate vuejs
