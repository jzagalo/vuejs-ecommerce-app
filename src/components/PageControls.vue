<template>
    <div class="text-right">        
        <div class="btn-gorup mx-2">
            <button v-for="page in pageNumbers()" :key="page" class="btn btn-secondary"
                v-bind:class="{ 'btn-primary' : page == currentPage }"
                v-on:click="setCurrentPage(page)">

                {{ page }}
            </button>
        </div>        
    </div>    
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { State, Getter, Mutation } from 'vuex-class';

@Component
export default class PageControls extends Vue {
    @State('currentPage') private currentPage!: number;
    @Getter('pageCount') private pageCount!: number;
    @Mutation('setCurrentPage') private setCurrentPage!: Function;


    private pageNumbers(){
        const arrLength = this.pageCount + 1;
        const res = [...new Array(arrLength).keys()].slice(1);

        return res;
    }
    
}
</script>