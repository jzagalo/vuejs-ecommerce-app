<template>
    <div>
        <h4 class="text-center text-white p-2" :class="themeClass">
            {{ editMode ? "Edit": "Create Product" }}
        </h4>
        <h4 v-if="$v.$invalid && $v.$dirty"
            class="bg-danger text-white text-center p-2">
            Values Required for All Fields
        </h4>    
        <div class="form-group" v-if="editMode">
            <label>ID(Not Editable)</label>
            <input class="form-control" disabled v-model="product.id">
        </div>
        <div class="form-group">
            <label>Name</label>
            <input class="form-control"  v-model="product.name">
        </div>
        <div class="form-group">
            <label>Description</label>
            <input class="form-control" v-model="product.description">
        </div>
        <div class="form-group">
            <label>Category</label>
            <select v-model="product.category" class="form-control">
                <option v-for="c in categories" :key="c">
                    {{ c }}
                </option>
            </select>
        </div>
        <div class="form-group">
            <label>Price</label>
            <input class="form-control" v-model="product.price">
        </div>
        <div>
            <router-link to="/admin/products"
            class="btn btn-secondary m-1"> Cancel </router-link>
            <button class="btn m-1" :class="themeClassButton"
            @click="handleSave">
                {{ editMode ? "Save Changes" : "Store Product" }}
            </button>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { State, Action } from "vuex-class";
import { required } from "vuelidate/lib/validators";

Component.registerHooks(['validations']);

@Component
export default class ProductEditor extends Vue{
    private product = {};

    @State('pages') private pages!: Array<any>;
    @State('currentPage') private currentPage!: number;
    @State('categories') private categories!: number;
    @Action('addProduct') private addProduct!: Function;
    @Action('updateProduct') private updateProduct!: Function;

    private editMode(){
        return this.$route.params["op"] == "edit";
    }

    private themeClass(){
        return this.editMode() ? "bg-info" : "bg-primary"
    }

    private themeClassButton(){
         return this.editMode() ? "btn-info" : "btn-primary"
    }

    private validations(){
        return {
            name: { required },
            description: { required },
            category: { required },
            price: { required }
        }
    }

    private async handleSave(){
        this.$v.touch();
        if(!this.$v.$invalid){
            if(this.editMode()){
                await this.updateProduct(this.product);
            }else {
                await this.addProduct(this.product);
            }

            this.$router.push("/admin/products");
        }
    }

    created(){
        if(this.editMode()){
            Object.assign(this.product,
            this.$store.getters.productBxId(this.$route.params["id"]));
        }
    }

}
</script>