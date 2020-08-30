import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '../views/Home.vue'
import ShoppingCart from "@/components/ShoppingCart.vue";
import Checkout from "@/components/Checkout.vue";
import OrderThanks from "@/components/OrderThanks.vue";
import Authentication from "@/components/admin/Authentication.vue"
import Admin from "@/components/admin/Admin.vue";
import ProductAdmin from "@/components/admin/ProductAdmin.vue";
import OrderAdmin from "@/components/admin/OrderAdmin.vue";
import dataStore from "@/store";
import ProductEditor from "@/components/admin/ProductEditor.vue";
import { State, namespace } from "vuex-class";

Vue.use(VueRouter)

  const routes: Array<RouteConfig> = [
    { path: '/', name: 'Home', component: Home },  
    { path: '/cart', name: 'shoppingCart',component: ShoppingCart },  
    { path: '/checkout', name: 'checkout',  component: Checkout },
    { path: '/thanks/:id', name: 'order-thanks', component: OrderThanks },
    { path: '/login',  name: 'login', component: Authentication },
    { path: '/admin', name: 'admin',  component: Admin,
        
        children: [
          { path: "product/:op(create|edit)/:id(\\d+)?", 
          component: ProductEditor },
          { path: "products", component: ProductAdmin },
          { path: "orders", component: OrderAdmin },
          { path: "", redirect: "/admin/products" },
        ]
    
    },
    { path: "*", redirect: "/" },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
