<template>
    <div class="row mt-2">
        <div class="col form-group">
            <select class="form-control" v-model="pageSize" v-on:change="setPageSize(pageSize)">
                <option value="4">4 per Page</option>
                <option value="8">8 per Page</option>
                <option value="12">12 per Page</option>
            </select>
        </div>
        <div class="text-right col">        
            <div class="btn-gorup mx-2">
                <button v-for="page in pageNumbers()" :key="page" class="btn"
                    v-bind:class="{ 'btn-primary' : page == currentPage, 'btn-secondary' : page != currentPage }"
                    v-on:click="setCurrentPage(page)">
                    {{ page }}
                </button>
            </div>        
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
    @Mutation('setPageSize') private setPageSize!: Function;
    private pageSize = 4;

    private pageNumbers(){
        const arrLength = this.pageCount + 1;
        const res = [...new Array(arrLength).keys()].slice(1);
        return res;
    }
    
}
</script>