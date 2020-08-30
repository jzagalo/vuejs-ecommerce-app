import axios from 'axios'
import Vue from 'vue';

const ORDERS_URL = "http://localhost:3500/orders";


export default {
    namespace:true,
    state: {
        orders: [],
    },
    mutations: {
        setOrders(state, data){
            console.log(data);
            state.orders = data;
        },
        changeOrderShipped(state, order){
            Vue.set(order, "shipped",  order.shipped == null || !order.shipped ? true : false);
        }
    },
    actions: {
        async storeOrder(context, order){
            order.cartLines = context.rootState.cart.lines;
            return (await axios.post(ORDERS_URL, order)).data.id
        },
        async getOrders(context){            
             const result = await context.rootGetters['auth/authenticatedAxios'].get(ORDERS_URL);
             context.commit("setOrders", result.data);    
        },
        async updateOrder(context, order) {
            context.commit("changeOrderShipped", order);
            await context.rootGetters.authenticatedAxios
                    .put(`${ORDERS_URL}/${order.id}`, order);
        }
    }
}