<template>
    <div >
        <h4 class="bg-info text-white text-center p-2">Orders</h4>
        <div class="form-group text-center">
            <input class="form-check-input" type="checkbox" v-model="showShipped" />
            <label class="form-check-label"> Show Shipped Orders </label>
        </div>
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th> City, Zip </th>
                    <th class="text-right">Total</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr v-if="displayOrders.length == 0">
                    <td colspan="5"> There are no orders </td>
                </tr>
                <tr v-for="entry in displayOrders" :key="entry.id">
                    <td>{{ entry.id }}</td>
                    <td>{{ entry.name }}</td> 
                    <td>{{ `${entry.city}, ${entry.city}` }}</td>
                    <td class="text-right">
                        {{ getTotal(entry) |c currency }} 
                    </td>
                    <td class="text-center">
                        <button class="btn btn-sm btn-danger" @click="shipOrder(entry)">
                                {{ entry.shipped ? 'Not Shipped' : 'Shipped' }}
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { namespace, Action, State } from 'vuex-class';

const ordersModule = namespace("auth");

@Component
export default class OrderAdmin extends Vue {
    private showShipped = false;

    
    @State('orders') private orders!: Array<object>;
    @ordersModule.Mutation
    private changeOrderShipped!: Function;

    mounted(){
        console.log(this.displayOrders());
    }
    
    @Action('getOrders') private getOrders!: Function;
    @ordersModule.Action
    private updateOrder!: Function;

    private getTotal(order: any){
        if(order.cartLines != null && order.cartlines.length > 0){            
            return order.cartLines.reduce((total: any, line: any) =>
            total + (line.quantity * line.product.price), 0);
        } else {
            return 0;
        }
    }

    created(){
        this.getOrders();
    }

    private shipOrder(order: any){
        this.updateOrder(order);
    }

    displayOrders(){
        return this.showShipped ? 
        this.orders : this.orders.filter((order: any) => order.shipped != true)
    }
    
}
</script>