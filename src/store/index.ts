import Vue from 'vue'
import Vuex from 'vuex'
import CartModule from '@/store/cart.js';
import OrdersModule from '@/store/orders.js';
import axios from 'axios';
import AuthModule from "@/store/auth.js";

const baseUrl = "http://localhost:3500";
const productsUrl = `${baseUrl}/products`;
const categoriesUrl = `${baseUrl}/categories`;

Vue.use(Vuex)

const testData = [];
type productInterface = {
  id: number;
  name: string;
  category: string | number;
  description: string;
  price: number;
};

for(let i = 1; i <= 10; i++){
  testData.push({
    id: i,
    name: `Product #${i}`,
    category: `Category ${i % 3}`,
    description: `This is Product #${i}`,
    price: `${i * 50}`
  });
}

type stateInterface =  {
  categoriesData: Array<string>;
  currentPage: number;
  pageSize: number;
  currentCategory: string;
  pages: Array<any>;
  serverPageCount: number;
  searchTerm: string;
  showSearch: boolean;
};

export default new Vuex.Store({
  strict: true,
  modules: {
    cart: CartModule,
    orders: OrdersModule,
    auth: AuthModule,
  },
  state: {   
    categoriesData: [],
    currentPage: 1,
    pageSize: 4,
    currentCategory: "All",
    pages: [],
    serverPageCount: 0,
    searchTerm: "",
    showSearch: false,
  },
  getters: {
    processedProducts: (state: stateInterface) => {
      return state.pages[state.currentPage];
    },
    pageCount: (state) => state.serverPageCount,
    categories: state => ["All", ...state.categoriesData],
    productById:(state: any) => (id: number) => {
      return state.pages[state.currentPage].find((p: any) =>p.id == id)
    },
  },
  mutations: {
    _setCurrentPage(state, page){
      state.currentPage = page;
    },
    _setPageSize(state, size){
      state.pageSize = size;
      state.currentPage = 1;
    },
    _setCurrentCategory(state, category){
      state.currentCategory = category;
      state.currentPage = 1;
    },
    addPage(state, page){
      for(let i = 0; i < page.pageCount; i++) {
          Vue.set(state.pages, page.number + i,
              page.data.slice(i * state.pageSize, (i * state.pageSize) + state.pageSize))
      }
    },
    clearPages(state){
      state.pages.splice(0, state.pages.length);
    },
    setCategories(state, categories){
      state.categoriesData = categories;
    },
    setPageCount(state, count) {
      state.serverPageCount = Math.ceil(Number(count)/ state.pageSize);
    },
    setShowSearch(state, show){
      state.showSearch = show;
    },
    setSearchTerm(state, term){
      state.searchTerm = term;
      state.currentPage = 1;
    },
    _addProduct(state: any, product: any){
      state.pages[state.currentPage].unshift(product);      
    },
    _updateProduct(state: any, product: any){
      const page = state.pages[state.currentPage];
      const index = page.findIndex((p: any) => p.id == product.id);
      Vue.set(page, index, product);
    }
  },
  actions: {
    getData(context) {
      const promise2 = new Promise((resolve: Function) => {
        fetch(categoriesUrl, { method: "GET"})
          .then(response => response.json())
          .then(data => resolve(data))
      });

      Promise.resolve(promise2).then(function(result) {
         context.dispatch("getPage", 2);
         context.commit("setCategories", result);
      });
    },
    async addProduct(context, product){
      const data =(await context.getters.authenticatedAxios.post(productsUrl, product)).data;
      product.id = data.id;
      this.commit("_addProduct", product);
    },
    async removeProduct(context, product){
      await context.getters.authenticatedAxios.
        delete(`${productsUrl}/${product.id}`);
        context.commit('clearPages');
        context.dispatch("getPage", 1);
    },
    async updateProduct(context, product){
      await context.getters.authenticatedAxios.
          put(`${productsUrl}/${product.id}`, product);
      this.commit("_updateProduct", product);
    },
    async getPage(context, getPageCount = 1){
      let url = `${productsUrl}?_page=${context.state.currentPage}`
                + `&_limit=${context.state.pageSize * getPageCount}`;
      if(context.state.currentCategory != "All"){
        url += `&category=${context.state.currentCategory}`;
      }

      if(context.state.searchTerm != ""){
        url += `&q=${context.state.searchTerm}`;
      }
      const response = await axios.get(url);
      context.commit("setPageCount", response.headers["x-total-count"]);
      context.commit("addPage", { number: context.state.currentPage,
        data: response.data, pageCount: getPageCount });
    },
    setCurrentPage(context, size){
      context.commit("clearPages");
      context.commit("_setPageSize", size);
      context.dispatch("getPage", 2);
    },
    setPageSize(context, category){
      context.commit("clearPages");
      context.commit("_setCurrentCategory", category);
      context.dispatch("getPage", 2);
    },
    setCurrentCategory(context, category){
      context.commit('clearPages');
      context.commit('_setCurrentCategory', category);
      context.dispatch('getPage', 1);
    },
    search(context, term){
      context.commit("setSearchTerm", term);
      context.commit("clearPages");
      context.dispatch("getPage", 2);
    },
    clearSearchTerm(context){
      context.commit("searchTerm", "");
      context.commit("clearPages");
      context.dispatch("getPage", 2);
    },
  }
});
