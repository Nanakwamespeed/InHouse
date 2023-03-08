import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ThemeView from "@/views/ThemeView.vue";
import RegisterDeclarationView from "@/views/RegisterDeclarationView.vue";
import PostDeclarationView from "@/views/PostDeclarationView.vue";
import DeclarationReportView from "@/views/DeclarationReportView.vue";
import AdditionalInformationView from "@/views/AdditionalInformationView.vue";
import PortView from "@/views/PortView.vue";
import PetroleumManagementView from "@/views/PetroleumManagementView.vue";
import MenuView from "@/views/MenuView.vue";
import CargoView from "@/views/CargoView.vue";
import CollectionView from "@/views/CollectionView.vue";
import SingleWindowView from "@/views/SingleWindowView.vue";
import ClearanceView from "@/views/ClearanceView.vue";
import MenuEditView from "@/views/MenuEditView.vue";
import RatesView from "@/views/RatesView.vue";
import TrackingView from "@/views/TrackingView.vue";

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/themes',
    name: 'Themes',
    component: ThemeView,
  },
  {
    path: '/register-declaration',
    name: 'Register Declaration',
    component: RegisterDeclarationView,
  },
  {
    path: '/post-declaration',
    name: 'Post Declaration',
    component: PostDeclarationView,
  },
  {
    path: '/declaration-report',
    name: 'Declaration Report',
    component: DeclarationReportView,
  },
  {
    path: '/additional-information',
    name: 'Additional Information',
    component: AdditionalInformationView,
  },
  {
    path: '/port',
    name: 'Port',
    component: PortView,
  },
  {
    path: '/petroleum-management',
    name: 'Petroleum Management',
    component: PetroleumManagementView,
  },
  {
    path: '/menus',
    name: 'Menus',
    component: MenuView,
  },
  {
    path: '/cargo',
    name: 'Cargo',
    component: CargoView,
  },
  {
    path: '/collection',
    name: 'Collection',
    component: CollectionView,
  },
  {
    path: '/single-window',
    name: 'Single Window',
    component: SingleWindowView,
  },
  {
    path: '/clearance',
    name: 'Clearance',
    component: ClearanceView,
  },
  {
    path: '/menu-edit',
    name: 'Edit Menu',
    component: MenuEditView
  },
  {
    path: '/rates',
    name: 'Exchange Rates',
    component: RatesView
  },
  {
    path: '/tracking',
    name: 'Tracking',
    component: TrackingView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
