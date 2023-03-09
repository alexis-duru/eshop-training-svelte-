<script>
  import { addItem } from "../store.js";
  import QuantityControl from "./QuantityControl.svelte";

  export let product;

  let quantity = 1;

  const addToCart = () => {
    const item = { ...product, quantity };

    addItem(item);
    quantity = 1;
  };
</script>

<li class="product-list-item" data-aos="fade-up">
  <p>{product.id}</p>
  <h2>{product.title}</h2>
  <p class="price">{product.price} €</p>
  <p class="description">{product.description}</p>
  <div class="quantity-selector">
    <QuantityControl bind:quantity />
  </div>
  <button on:click={addToCart}>Add to cart</button>
  <h4>
    {#each product.tags as tag}
      <span class="tags">{tag}</span>
    {/each}
  </h4>
</li>
