<script>
  import { cart } from "../store.js";

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

  const removeFromCart = (id) => {
    cart.update((items) => {
      const itemIndex = items.findIndex((item) => item.id === id);
      if (itemIndex !== -1) {
        items.splice(itemIndex, 1);
      }
      return items;
    });
  };

  const incrementQuantity = (id) => {
    cart.update((items) => {
      const itemIndex = items.findIndex((item) => item.id === id);
      if (itemIndex !== -1) {
        items[itemIndex].quantity++;
      }
      return items;
    });
  };

  const decrementQuantity = (id) => {
    cart.update((items) => {
      const itemIndex = items.findIndex((item) => item.id === id);
      if (itemIndex !== -1 && items[itemIndex].quantity > 1) {
        items[itemIndex].quantity--;
      }
      return items;
    });
  };

  const validateCart = () => {
    if ($cart.length === 0) {
      window.alert("Votre panier est vide");
      return;
    }
    const total = $cart.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    window.alert(`Le paiement de ${total} € a été validé`);
    cart.set([]);
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
      src="../public/images/close.png"
      alt="fermer"
    />
    <h2>Panier</h2>
    <div class="cart-wrapper">
      {#if $cart.length === 0}
        <p>Votre panier est vide</p>
      {:else}
        <ul>
          {#each $cart as item, index}
            <li class="cart-product">
              <span />
              <p>{item.title}</p>
              <div class="quantity-control">
                <button
                  class="control-left"
                  on:click={() => decrementQuantity(item.id)}>-</button
                >
                <input type="number" min="1" value={item.quantity} />
                <button
                  class="control-right"
                  on:click={() => incrementQuantity(item.id)}>+</button
                >
              </div>
              <div class="item-shopping-cart-container">
                <p>Prix unitaire : <em>&nbsp;{item.price}</em> €</p>
                <p>Quantity :<em>&nbsp;{item.quantity}</em></p>
                <p>Total : <em>&nbsp;{item.price * item.quantity} €</em></p>
                <button
                  id="button-remove"
                  on:click={() => removeFromCart(item.id)}>Supprimer</button
                >
              </div>
            </li>
          {/each}
        </ul>

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
              Prix total : {Math.round(
                $cart.reduce(
                  (acc, items) => acc + items.price * items.quantity,
                  0
                ) * 100
              ) / 100}{" "}
              €
            </p>
          </div>
          <button on:click={validateCart}>Valider le panier</button>
        </div>
      {/if}
    </div>
  </div>
</div>
