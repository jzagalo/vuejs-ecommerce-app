import Vue from 'vue'
import Vuex from 'vuex'
import CartModule from '@/store/cart.js';
import OrdersModule from '@/store/orders.js';

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
}

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
  products: Array<object>;
  productsTotal: number;
  categoriesData: Array<string>;
  currentPage: number;
  pageSize: number;
  currentCategory: string;
};


export default new Vuex.Store({
  strict: true,
  modules: {
    cart: CartModule,
    orders: OrdersModule,
  },
  state: {
    products: [],
    productsTotal: 0 ,
    categoriesData: [],
    currentPage: 1,
    pageSize: 4,
    currentCategory: "All",
  },
  getters: {
    productsFilteredByCategory: state => state.products
      .filter((product: productInterface) => state.currentCategory == "All" || product.category == state.currentCategory),
    processedProducts: (state: stateInterface, getters: any) => {
      const index = (state.currentPage - 1 ) * state.pageSize;
      return getters.productsFilteredByCategory.slice(index, index + state.pageSize);
    },
    pageCount: (state: stateInterface, getters: any) => Math.ceil(
      getters.productsFilteredByCategory.length/ state.pageSize),
    categories: state => ["All", ...state.categoriesData]
  },
  mutations: {
    setCurrentPage(state, page){
      state.currentPage = page;
    },
    setPageSize(state, size){
      state.pageSize = size;
      state.currentPage = 1;
    },
    setCurrentCategory(state, category){
      state.currentCategory = category;
      state.currentPage = 1;
    },
    setData(state, data){
      state.products = data.pdata;
      state.productsTotal = data.pdata.length;
      state.categoriesData = data.cdata.sort();
    }
  },
  actions: {
    getData(context) {
      const promise1 = new Promise((resolve: Function) => {
        fetch(productsUrl, { method: "GET"})
          .then(response => response.json())
          .then(data =>{
            resolve(data);
         });
      });

      const promise2 = new Promise((resolve: Function) => {
        fetch(categoriesUrl, { method: "GET"})
          .then(response => response.json())
          .then(data =>{
            resolve(data);
         });
      });

      Promise.all([promise1, promise2]).then(function(result) {
         context.commit("setData", { pdata: result[0], cdata: result[1] });
      });
    }
  }
});
