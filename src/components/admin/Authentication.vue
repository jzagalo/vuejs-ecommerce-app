<template>
    <div class="m-2">
        <h4 class="bg-primary text-white text-center p-2">
            SportsStore Administration
        </h4>
        <h4 v-if="showFailureMessage"
            class="bg-danger text-white text-center p-2 my-2">
            Authentication Failed. Please try again
        </h4>
        <div class="form-group">
            <label> Username </label>
            <input class="form-control" v-model="$v.username.$model"> 
            <ValidationError :validation="$v.username" />           
        </div>
        <div class="form-group">
            <label> Password </label>
            <input type="password" class="form-control" v-model="$v.password.$model"> 
            <ValidationError :validation="$v.password" />           
        </div>
        <div class="text-center">
            <button class="btn btn-primary"
            v-on:click="handleAuth">
                Log In
            </button>
        </div> 
    </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'; 
import { Action, State, namespace } from "vuex-class";
import ValidationError from '@/components/ValidationError.vue';
import { required } from "vuelidate/lib/validators";
import FormMixin from '@/mixins/form.js';
import { mapState } from 'vuex';



Component.registerHooks(['validations']);
const authModule = namespace("auth");


@Component({
    components: {
        ValidationError,
    }
})
export default class Authentication extends Vue {

    @authModule.State
    private authenticated!: boolean
    @authModule.Action
    private authenticate!: Function;

    private username = "admin";
    private password = "secret";
    private showFailureMessage = false;   

    private validations() {
        return {
            username: { required },
            password: { required }
        }       
    }

    mounted(){
        console.log(this.authenticated);
    }

    private async handleAuth(){
        this.$v.$touch();

        if(!this.$v.$invalid) {
            await this.authenticate({
                name: this.username,
                password: this.password,
            });        
    
            if(this.authenticated) {
                this.$router.push("/admin");
            } else {
                this.showFailureMessage = true;
            }
        }
    }
    
}
</script>