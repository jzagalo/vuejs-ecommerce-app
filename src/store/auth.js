import axios from "axios";

const loginUrl = "http://localhost:3500/login";

export default {
    namespaced: true,
    state: {
        authenticated: false,
        jwt: null
    },
    getters: {
        authenticatedAxios(state){
            return axios.create({
                headers: {
                    "Authorization": `Bearer<${state.jwt}>`
                }
            })
        }
    },
    mutations: {
        setAuthenticated(state, header){
            console.log('authenticated');
            state.jwt = header;
            state.authenticated = true;
        },
        clearAuthentication(state){
            state.authenticated = false;
            state.jwt = null;
        }
    },
    actions: {
        async authenticate(context, credentials){
            const response = await axios.post(loginUrl, credentials);
            console.log(response.data.token);
            response.data.success &&
                context.commit("setAuthenticated", response.data.token);
            
        }
    }
}
