import Vue from "vue";
import VueRouter from "vue-router";
import Layout from "@/views/Layout.vue";
import Home from "@/views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: Layout,
    children: [
      {
        path: "/",
        name: "home",
        component: Home
      },
      {
        path: "/lastestNews",
        name: "lastestNews",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
          import(/* webpackChunkName: "about" */ "@/views/LastestNews.vue")
      },
      {
        path: "/News",
        name: "news",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
          import(/* webpackChunkName: "about" */ "@/views/New.vue")
      },
      {
        path: "/about",
        name: "about",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
          import(/* webpackChunkName: "about" */ "@/views/About.vue")
      },
      {
        path: "/registration",
        name: "registration",
        component: () => import("@/views/Registration.vue")
      }
    ]
  },
  {
    path: "/admin",
    name: "admin",
    component: () => import("@/views/admin/Layout.vue"),
    children: [
      {
        path: "account/accountall",
        name: "account/accountall",
        component: () => import("@/views/admin/account/AccountAll.vue")
      },
      {
        path: "account/accountform",
        name: "account/accountform",
        component: () => import("@/views/admin/account/AccountForm.vue"),
        props: true
      },
      {
        path: "account/accountset",
        name: "account/accountset",
        component: () => import("@/views/admin/account/AccountSet.vue")
      },
      {
        path: "account/passwordupdate",
        name: "account/passwordupdate",
        component: () => import("@/views/admin/account/PasswordUpdate.vue")
      },
      {
        path: "account/accountset",
        name: "account/accountset",
        component: () => import("@/views/admin/account/AccountSet.vue")
      },
      {
        path: "financial/financialform",
        name: "financial/financialform",
        component: () => import("@/views/admin/financial/FinancialForm.vue")
      },
      {
        path: "financial/financial",
        name: "financial/financial",
        component: () => import("@/views/admin/financial/Financial.vue")
      },
      {
        path: "pill/pill",
        name: "pill/pill",
        component: () => import("@/views/admin/pill/Pill.vue")
      },
      {
        path: "pill/pillform",
        name: "pill/pillform",
        component: () => import("@/views/admin/pill/PillForm.vue")
      },
      {
        path: "healthrecord/healthrecord",
        name: "healthrecord/healthrecord",
        component: () => import("@/views/admin/healthrecord/HealthRecord.vue")
      },
      {
        path: "healthrecord/healthrecordform",
        name: "healthrecord/healthrecordform",
        component: () =>
          import("@/views/admin/healthrecord/HealthRecordForm.vue")
      },
      {
        path: "onlineregistration/onlineregistration",
        name: "onlineregistration/onlineregistration",
        component: () =>
          import("@/views/admin/onlineregistration/OnlineRegistration.vue")
      },
      {
        path: "onlineregistration/onlineregistrationform",
        name: "onlineregistration/onlineregistrationform",
        component: () =>
          import("@/views/admin/onlineregistration/OnlineRegistrationForm.vue")
      },
      {
        path: "onlineregistration/onlineregistrationtimeset",
        name: "onlineregistration/onlineregistrationtimeset",
        component: () =>
          import(
            "@/views/admin/onlineregistration/OnlineRegistrationTimeSet.vue"
          )
      },
      {
        path: "patientmanagement/patientmanagement",
        name: "patientmanagement/patientmanagement",
        component: () =>
          import("@/views/admin/patientmanagement/PatientManagement.vue")
      },
      {
        path: "patientmanagement/patientmanagementform",
        name: "patientmanagement/patientmanagementform",
        component: () =>
          import("@/views/admin/patientmanagement/PatientManagementForm.vue")
      },
      {
        path: "webmanagement/bulletinall",
        name: "webmanagement/bulletinall",
        component: () => import("@/views/admin/webmanagement/BulletinAll.vue")
      },
      {
        path: "webmanagement/bulletinform",
        name: "webmanagement/bulletinform",
        component: () => import("@/views/admin/webmanagement/BulletinForm.vue")
      },
      {
        path: "webmanagement/webdesign",
        name: "webmanagement/webdesign",
        component: () => import("@/views/admin/webmanagement/WebDesign.vue")
      }
    ]
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/Login.vue")
  }
];
const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
