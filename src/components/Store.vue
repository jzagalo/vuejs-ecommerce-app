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
                <CategoryControls />
            </div>
            <div class="col-9 bg-success p-2">                
                <ProductList />                
            </div>
        </div>
    </div>
</template>


<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import ProductList from "@/components/ProductList.vue";
import CategoryControls from "@/components/CategoryControls.vue"


@Component({
    components: {
        ProductList,
        CategoryControls,       
    }
})
export default class Store extends Vue {
    
}

</script>