<template>
<div>
    <div class="container-fluid">
        <div class="row">
            <div class="col bg-dark text-white">
                <a href="/" class="navbar-brand">
                    SPORTS STORE
                </a>
            </div>
        </div>
    </div>
    <div class="m-2">
        <div class="form-group m-2">
            <label for="email">Name</label>
            <input v-model="$v.name.$model" class="form-control" :class="{ 'is-invalid': $v.name.$error }">
            <ValidationError  :validation="$v.name" />
        </div>
    </div>
    <div class="m-2">
        <div class="form-group m-2">
            <label for="email">Email</label>
            <input v-model="$v.email.$model" class="form-control" :class="{ 'is-invalid': $v.email.$error }">
            <ValidationError  :validation="$v.email" />
        </div>
    </div>
    <div class="m-2">
        <div class="form-group m-2">
            <label>Address</label>
            <input v-model="$v.address.$model" class="form-control"  :class="{ 'is-invalid': $v.address.$error }"/>
            <ValidationError :validation="$v.address" />
        </div>
    </div>
    <div class="m-2">
        <div class="form-group m-2">
            <label>City</label>
            <input v-model="$v.city.$model" class="form-control"  :class="{ 'is-invalid': $v.city.$error }"/>
            <ValidationError :validation="$v.city" />
        </div>
    </div>
    <div class="m-2">
        <div class="form-group m-2">
            <label>Zip</label>
            <input v-model="$v.zip.$model" class="form-control"  :class="{ 'is-invalid': $v.zip.$error }"/>
            <ValidationError :validation="$v.zip" />
        </div>
    </div>
    <div class="text-center">
        <router-link to="/cart" class="btn btn-secondary m-1">
            Back
        </router-link>
        <button class="btn btn-primary m-1"
            v-on:click="submitOrder">
            Place Order
        </button>
    </div>
</div>
</template>


<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import ValidationError from '@/components/ValidationError.vue';
import { required, minLength, email, integer } from 'vuelidate/lib/validators';
import FormMixin from '@/mixins/form.js';
import { Action } from "vuex-class";

Component.registerHooks(['validations']);


@Component({
    components: {
        ValidationError,
    }
})
export default class Checkout extends Vue  {
    @Action('storeOrder') private storeOrder!: Function;
    @Action('cart/clearCartData') private clearCart!: Function;

    private name = '';
    private email = '';
    private address = '';
    private city = '';
    private zip =   '';

    validations(){
        return {
            name: { required },
            email: { email, required },
            address: { required },
            city: { required },
            zip: { required, integer }
        }
    }

    private async submitOrder(){
        this.$v.$touch();
        if(! this.$v.$invalid) {
            const order = await this.storeOrder({
                name: this.name,
                email: this.email,
                address: this.address,
                city: this.city,
                zip: this.zip,
            });
            this.clearCart();
            this.$router.push(`/thanks/${order}`);
        }
    }

}
</script>

<style>
 .is-invalid {
     border-color: #dc3545;
 }
</style>