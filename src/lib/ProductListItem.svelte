<script>
  import { addItem } from "./store.js";
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

<div class="product">
  <div class="product-info">
    <h3>{product.title}</h3>
    <p class="tags">{product.tags.join(", ")}</p>
    <p class="description">{product.description}</p>
    <p class="price">{product.price} €</p>
    <div class="quantity-selector">
      <button on:click={decrement}>-</button>
      <input type="number" bind:value={quantity} min="0" />
      <button on:click={increment}>+</button>
    </div>
    <button on:click={addToCart}>Add to cart</button>
  </div>
</div>
