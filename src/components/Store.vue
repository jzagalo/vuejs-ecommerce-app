<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col bg-dark text-white">
                <a href="" class="navbar-brand">
                    SPORTS STORE
                </a> 
            </div>
        </div>
        <div class="row">
            <div class="col-3 bg-info p-2">
                <h4 class="text-white m-2">
                    Categories
                </h4>
            </div>
            <div class="col-9 bg-success p-2">
                <h4 class="text-white m-2">
                    Products
                </h4>
                <ProductList />                
            </div>
        </div>
    </div>
</template>


<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import ProductList from "@/components/ProductList.vue";


@Component({
    components: {
        ProductList,       
    }
})
export default class Store extends Vue {
    
}

</script>