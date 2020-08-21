<template>
    <div>
        <div v-if="show()" class="text">
            <div v-for="m in messages()" v-bind:key="m">
                {{ m }}
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class ValidationError extends Vue {
    @Prop() private validation!: any;

    private show() {
        return (this.validation.$dirty && this.validation.$invalid);
    }

    private messages(){
        const messages = [];

        if(this.validation.$dirty){
            console.log('validation dirty');
            if(this.hasValidationError("required")){
                messages.push("Please enter a value");
            } else if(this.hasValidationError("minLength")){
                messages.push("Please enter at least 5 characters");
            } else if(this.hasValidationError("email")) {
                messages.push("Please enter a valid email address");
            }else if(this.hasValidationError("integer")) {
                messages.push("Please enter a number");
            }
        }

        return messages;
    }

    private hasValidationError(type: string){
        return this.validation.$params[type] && !this.validation[type];
    }

}

</script>