<template>
    <div class="float-right">
        <small>
            Your cart:
            <span v-if="itemCount > 0">
                {{ itemCount }} item(s) {{ totalPrice | currency }}
            </span>
            <span v-else>
                (rmpty)
            </span>
        </small>
        <router-link to="/cart" class="btn btn-sm bg-dark text-white"
            :disabled="itemCount == 0">
            <i class="fa fa-shopping-cart"></i>
        </router-link>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { Getter } from 'vuex-class';

@Component
export default class CartSummary extends Vue {
    @Getter('cart/itemCount') private itemCount!: number;
    @Getter('cart/totalPrice') private totalPrice!: number;
    
}
</script>