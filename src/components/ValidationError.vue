<template>
    <div v-if="show" class="text">
        <div v-for="m in messages" v-bind:key="m">
            {{ m }}
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class ValidationError extends Vue {
    @Prop() private validation!: any;

    show() {
        return this.validation.$dirty &&
            this.validation.$invalid;
    }

    mounted(){
        console.log(this.validation);
    }

    messages(){
        const messages = [];
        if(this.validation.$dirty){
            if(this.hasValidationError("required")){
                messages.push("Please enter a value")
            } else if(this.hasValidationError("minLength")){
                messages.push("Please enter a valid email address");
            }
        }
        return messages;
    }

    hasValidationError(type: string){
        return (type in this.validation.$params)
            && !this.validation[type];
    }
    
}

</script>