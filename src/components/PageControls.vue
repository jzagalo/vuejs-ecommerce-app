<template>
    <div class="row mt-2">
        <div class="col-3 form-group">
            <select class="form-control" v-model="pageSize"  v-on:change="setPageSize(pageSize)">
                <option value="4">4 per Page</option>
                <option value="8">8 per Page</option>
                <option value="12">12 per Page</option>
            </select>
        </div>
        <div class="text-right col">
            <button v-bind:disabled="currentPage == 1"
            v-on:click="setCurrentPage(currentPage - 1)"
            class="btn btn-secondary mx -1">Previous</button>
            <span v-if="currentPage > 4">
                <button v-on:click="setCurrentPage(1)"
                class="btn btn-secondary mx-1">1</button>
                <span class="h4">...</span>
            </span>
            <span class="mx-1">
                <button v-for="i in pageNumbers()" v-bind:key="i"
                class="btn btn-secpmdary"
                v-bind:class="{ 'btn-primary': i == currentPage }"
                v-on:click="setCurrentPage(i)">{{ i }}</button>
            </span>
            <span v-if="currentPage <= pageCount - 4">
                <span class="h4">...</span>
                <button v-on:click="setCurrentPage(pageCount)"
                class="btn btn-secondary mx-1">{{ pageCount}}</button>
            </span>
            <button v-bind:disabled="currentPage == pageCount"
            v-on:click="setCurrentPage(currentPage + 1)"
            class="btn btn-secondary mx-1">Next</button>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { State, Getter, Mutation, Action } from 'vuex-class';

@Component
export default class PageControls extends Vue {
    @State('currentPage') private currentPage!: number;
    @Getter('pageCount') private pageCount!: number;
   // @Mutation('_setCurrentPage') private setCurrentPage!: Function;
   // @Mutation('_setPageSize') private setPageSize!: Function;
    @Action('setCurrentPage') private setCurrentPage!: Function;
    @Action('setPageSize') private setPageSize!: Function;
    private pageSize = 4;

    private pageNumbers(){
        if(this.pageCount < 4){
            return [...Array(this.pageCount + 1).keys()].slice(1);
        } else if(this.currentPage <= 4 ){
            return [1, 2, 3, 4, 5];
        } else if(this.currentPage > this.pageCount - 4){
            return [...Array(5).keys()].reverse().map(v => this.pageCount - v);
        }else {
            return [this.currentPage -1, this.currentPage, this.currentPage + 1];
        }
    }

}
</script>