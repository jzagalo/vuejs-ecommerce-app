<template>
  <Store />
</template>

<script lang="ts">
// @ is an alias to /src
import Store from '@/components/Store.vue'
import { Vue, Component } from "vue-property-decorator";


@Component({
  components: {
    Store,
  }
})
export default class Home extends Vue {


}
</script>
