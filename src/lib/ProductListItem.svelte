<script>
  import { addItem } from "../store.js";

  export let product;

  let quantity = 1;

  const increment = () => {
    quantity += 1;
  };

  const decrement = () => {
    if (quantity > 1) {
      quantity -= 1;
    }
  };

  const addToCart = () => {
    const item = {
      id: product.id,
      title: product.title,
      price: product.price,
      quantity: quantity,
    };

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
    <button on:click={decrement}>-</button>
    <input type="number" bind:value={quantity} min="0" />
    <button on:click={increment}>+</button>
  </div>
  <button on:click={addToCart}>Add to cart</button>
  <h4>
    {#each product.tags as tag}
      <span class="tags">{tag}</span>
    {/each}
  </h4>
</li>
