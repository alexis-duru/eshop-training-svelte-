<script>
  import ProductListItem from "./ProductListItem.svelte";
  import products from "../data/eshop.json";
  // export let products;
</script>

<div class="product-list">
  {#each products as product}
    <ProductListItem {product} />
  {/each}
</div>
