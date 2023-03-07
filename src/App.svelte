<script>
  import { onMount } from "svelte";
  import ProductList from "./lib/ProductList.svelte";
  import AOS from "aos";
  import "aos/dist/aos.css";
  import Basket from "./lib/Basket.svelte";

  onMount(() => {
    AOS.init();
  });
</script>

<div class="app-container">
  <Basket />
  <ProductList />
</div>
