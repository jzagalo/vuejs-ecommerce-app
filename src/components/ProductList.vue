<template>
    <div>
        <div v-for="p in products" v-bind:key="p.id" class="card m-1 p-1 bg-light">
            <h4>
                {{ p.name}}
                <span class="badge badge-bill badge-primary float-right">
                    {{ p.price != "0" ? p.price : "25" | currency }}
                </span>
                <div class="card-text bg-white p-1">
                    {{ p.description }}
                    <button class="btn btn-success btn-sm float-right"
                        v-on:click="handleProductAdd(p)"> 
                        Add To Cart 
                    </button>                    
                </div>
            </h4>
        </div>
        <PageControls />
    </div>    
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { State, Getter, Action, Mutation } from "vuex-class";
import PageControls from '@/components/PageControls.vue';

@Component({
    components:{
        PageControls, 
    }
})
export default class ProductList extends Vue {
    @Getter('processedProducts') products!: object[];
    @Action('getData') private getData!: Function;
    @Action('cart/initializeCart') private initiaizeCart!: Function;
    @Mutation('cart/addProduct') private addProduct!: Function;

    created(){       
        this.getData();
        this.initiaizeCart(this.$store);
    }

    handleProductAdd(product: any){
        this.addProduct(product);
        this.$router.push("/cart");
    }
  
}
</script>
