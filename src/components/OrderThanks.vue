<template>
    <div class="m-2 text-center">
        <h2>Thanks!</h2>
        <p>Thanks for placing your order, which is #{{ orderId() }} </p>
        <p>We will ship your goods as soon as possible</p>
        <router-link to="/" class="btn btn-primary">
            Return to Store
        </router-link>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class OrderThanks extends Vue {

    private orderId(){
        return this.$route.params.id;
    }

}
</script>