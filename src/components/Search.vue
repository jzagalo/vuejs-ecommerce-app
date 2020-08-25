<template>
    <div class="row my-2">
        <label class="col-2 col-form-label text-right"></label>
        <input v-bind:value="searchTerm" @input="doSearch" 
        class="col form-control"  placeholder="Enter Search term...">
        <button class="col-1 btn btn-small btn-secondary mx-4"
            @click="handleClose"> Close </button>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { State, Mutation, Action } from "vuex-class";

@Component
export default class Search extends Vue {
    @State('showSearch') private showSearch!: boolean;
    @State('searchTerm') private searchTerm!: string;
    @Mutation('setShowSearch') private setShowSearch!: Function;
    @Action('clearSearchTerm') private clearSearchTerm!: Function;
    @Action('search') private search!: Function;

    private handleClose(){
        this.clearSearchTerm();
        this.setShowSearch(false);
    }

    private doSearch(event: any){
        this.search(event.target.value);
    }    
    
}
</script>