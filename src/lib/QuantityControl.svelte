<script>
  export let quantity;
  export let min = 1;
  export let max = 100;

  const handleInput = (event) => {
    const value = parseInt(event.target.value);
    quantity = isNaN(value) ? 1 : Math.min(Math.max(min, value), max);
  };

  const increment = () => {
    quantity = Math.min(quantity + 1, max);
  };

  const decrement = () => {
    quantity = Math.max(quantity - 1, min);
  };
</script>

<div class="quantity-picker">
  <button on:click={decrement}>-</button>
  <input type="number" value={quantity} {min} {max} on:input={handleInput} />
  <button on:click={increment}>+</button>
</div>
