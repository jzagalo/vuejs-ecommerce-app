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
            <div class="col m">
                <h2 class="text-center"> Your Cart</h2>
                <table class="table table-bordered table-stripped p-2">
                    <thead>
                        <tr>
                            <th>Quantity</th>
                            <th>Product</th>
                            <th class="text-right">Price</th>
                             <th class="text-right">Subtotal</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-if="$store.state.cart.lines.length == 0">
                            <td colspan="4" class="text-center">
                                Your Cart is Empty
                            </td>
                        </tr>
                        <ShoppingCartLine v-for="line in $store.state.cart.lines" 
                            :key="line.product.id"
                            :line="line"
                            @quantity="handleQuantityChange(line, event)"
                            @remove="remove" />                        
                    </tbody>
                    <tfoot v-if="$store.state.cart.lines.length > 0">
                        <tr>
                            <td colspan="3" class="text-right">Total:</td>
                            <td class="text-right">
                                {{ totalPrice | currency }}
                            </td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>
        <div class="row">
            <div class="col">
                <router-link to="/" class="btn btn-secondary m-1">
                    Continue Shopping
                </router-link>
                <router-link to="/checkout" class="btn btn-primary m-1"
                    v-bind:disabled="$store.state.cart.lines.length == 0">
                    Checkout
                </router-link>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import ShoppingCartLine from '@/components/ShoppingCartLine.vue';
import { State, Getter, Mutation } from "vuex-class";

@Component({
    components: {
        ShoppingCartLine,
    },
})
export default class ShoppingCart extends Vue {
    @State('cart/lines') private lines!: any;
    @Getter('cart/totalPrice') private totalPrice!: Function;
    @Mutation('cart/changeQuantity') private change!: Function;
    @Mutation('cart/removeProduct') private remove!: Function;

    mounted(){
        console.log(this.lines);
    }

    private handleQuantityChange(line: any, event: any){
        this.change({ line, quantity: event});
    }

   
}
</script>