<script>
  import ProductListItem from "./ProductListItem.svelte";
  import products from "../data/eshop.json";
</script>

<div class="product-list-container">
  <div class="product-list">
    <ul class="product-list-wrapper">
      {#each products as product}
        <ProductListItem {product} />
      {/each}
    </ul>
  </div>
</div>
