<script>
  import { cart, removeItem } from "../store.js";
  import QuantityControl from "./QuantityControl.svelte";

  const toggleCart = () => {
    const cartContainer = document.querySelector(".cart-container");
    // @ts-ignore
    cartContainer.style.transform = "translateX(0px)";
  };

  const closeCart = () => {
    const cartContainer = document.querySelector(".cart-container");
    // @ts-ignore
    cartContainer.style.transform = "translateX(400px)";
  };

  const validateCart = () => {
    if ($cart.length === 0) {
      window.alert("Your basket is empty");
      return;
    }
    const total = $cart.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    window.alert(`Payment of ${total} € has been validated`);
    cart.set([]);
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  $: totalQuantity = $cart.reduce((acc, item) => acc + item.quantity, 0);
</script>

<button class="cart-header" on:click={toggleCart}>
  <div class="cart-icon-container">
    <img
      class="cart-icon"
      src="https://cdn-icons-png.flaticon.com/512/1170/1170678.png"
      alt="panier"
    />
  </div>
  <p class="cart-quantity">{totalQuantity}</p>
</button>

<div class="cart-container">
  <div class="cart-wrapper">
    <img
      on:click={closeCart}
      class="close-icon"
      src="../images/close.png"
      alt="fermer"
    />
    <h2>Basket</h2>
    <div class="cart-wrapper">
      {#if $cart.length === 0}
        <p>Your basket is empty</p>
      {:else}
        <ul>
          {#each $cart as item, index}
            <li class="cart-product">
              <span />
              <p>{item.title}</p>
              <div class="quantity-control">
                <QuantityControl bind:quantity={item.quantity} />
              </div>
              <div class="item-shopping-cart-container">
                <p>Price : <em>&nbsp;{item.price}</em> €</p>
                <p>Quantity :<em>&nbsp;{item.quantity}</em></p>
                <p class="total-price">
                  Total : {Math.round(item.price * item.quantity * 100) / 100} €
                </p>
                <button id="button-remove" on:click={() => removeItem(item.id)}
                  >Delete</button
                >
              </div>
            </li>
          {/each}
        </ul>
      {/if}
      <div class="cart-total-container">
        <span />
        <span />
        <div class="total-price-container">
          <p class="total-price">
            Total articles : {$cart.reduce(
              (acc, items) => acc + items.quantity,
              0
            )}
          </p>
          <p class="total-price">
            Total price : {Math.round(
              $cart.reduce(
                (acc, items) => acc + items.price * items.quantity,
                0
              ) * 100
            ) / 100}{" "}
            €
          </p>
        </div>
        {#if $cart.length === 0}
          <div class="empty-basket" />
        {:else}
          <button on:click={validateCart}>Validate my order</button>
        {/if}
      </div>
    </div>
  </div>
</div>
