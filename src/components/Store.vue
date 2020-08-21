<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col bg-dark text-white">
                <router-link to="home"> SPORTS STORE</router-link> 
                <CartSummary />               
            </div>
        </div>
        <div class="row">
            <div class="col-3  p-2">
                <CategoryControls />
            </div>
            <div class="col-9 p-2">                
                <ProductList />                
            </div>
        </div>
    </div>
</template>


<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import ProductList from "@/components/ProductList.vue";
import CategoryControls from "@/components/CategoryControls.vue"
import CartSummary from '@/components/CartSummary.vue';


@Component({
    components: {
        ProductList,
        CategoryControls,   
        CartSummary,
    }
})
export default class Store extends Vue {
    
}

</script>