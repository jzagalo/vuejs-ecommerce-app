<template>
    <div class="container-fluid">
        <div class="row my-2"  v-for="category in categories" :key="category">
            <button class="btn btn-block"
            v-on:click="setCurrentCategory(category)"
            v-bind:class="category == currentCategory ? 'btn-primary': 'btn-secondary'">
                {{ category }}
            </button>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { State, Getter, Mutation } from 'vuex-class';

@Component
export default class CategoryControls extends Vue {
    @State('currentCategory') private currentCategory!: string;
    @Getter('categories') private categories!: Array<string>;
    @Mutation('setCurrentCategory') private setCurrentCategory!: Function;
    
}
</script>