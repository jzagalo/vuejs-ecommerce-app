import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '../views/Home.vue'
import ShoppingCart from "@/components/ShoppingCart.vue";
import Checkout from "@/components/Checkout.vue";
import OrderThanks from "@/components/OrderThanks.vue";

Vue.use(VueRouter)

  const routes: Array<RouteConfig> = [
    { path: '/', name: 'Home', component: Home },  
    { path: '/cart', name: 'shoppingCart',component: ShoppingCart },  
    { path: '/checkout', name: 'checkout',  component: Checkout },
    { path: '/thanks/:id', name: 'order-thanks', component: OrderThanks },
    { path: "*", redirect: "/" },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
