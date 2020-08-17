<template>
    <div>
        <div v-for="p in products" v-bind:key="p.id" class="card m-1 p-1 bg-light">
            <h4>
                {{ p.name}}
                <span class="badge badge-bill badge-primary float-right">
                    {{ p.price != "0" ? p.price : "25" | currency }}
                </span>
                <div class="card-text bg-white p-1">{{ p.description }}</div>
            </h4>
        </div>
    </div>    
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { State } from "vuex-class";

@Component({
    filters: {
        currency(value: any){
            return new Intl.NumberFormat("en-US",
            { style: "currency", currency: "USD" }).format(value);
        }
    }
})
export default class ProductList extends Vue {
    @State('products') products!: object[];
    
}
</script>
