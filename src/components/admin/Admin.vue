<template>
   <div class="container-fluid">
       <div class="row">
           <div class="col bg-secondary text-white">
               <a href="/" class="navbar-brand">SPORTS STORE</a>
           </div>
       </div>
       <div class="row">
           <div class="col-3 bg-secondary p-2">
               <router-link to="/admin/products" class="btn btn-block btn-primary"
               active-class="active">
                Products
               </router-link>
               <router-link to="/admin/orders" class="btn btn-block btn-primary"
               active-class="active">
                Orders
               </router-link>
           </div>
           <div class="col-9 p-2">
               <router-view />
           </div>
       </div>
   </div>
</template>


<script lang="ts">
import  { Vue, Component } from 'vue-property-decorator';

@Component 
export default class Admin extends Vue {
    
}

</script>

<style scoped>
    .bg-secondary{
        background: #083863 !important;
    }
</style>