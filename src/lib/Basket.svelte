<script>
  import { cart } from "../lib/store.js";

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
</script>

<h1>Panier</h1>

{#if $cart.length === 0}
  <p>Votre panier est vide</p>
{:else}
  <p>Nombre d'articles : {$cart.length}</p>
{/if}

<h2>Votre panier</h2>

{#if $cart.length === 0}
  <p>Votre panier est vide</p>
{:else}
  <ul>
    {#each $cart as item}
      <li>
        <div>
          <h3>{item.title}</h3>
          <p>Prix unitaire : {item.price} €</p>
          <div class="quantity">
            <button on:click={() => decrementQuantity(item.id)}>-</button>
            <input type="number" min="1" value={item.quantity} />
            <button on:click={() => incrementQuantity(item.id)}>+</button>
          </div>
          <p>Total : {item.price * item.quantity} €</p>
          <button on:click={() => removeFromCart(item.id)}>Supprimer</button>
        </div>
      </li>
    {/each}
  </ul>

  <div>
    <p>
      Total articles : {$cart.reduce((acc, items) => acc + items.quantity, 0)}
    </p>
    <p>
      Prix total : {$cart.reduce(
        (acc, items) => acc + items.price * items.quantity,
        0
      )} €
    </p>
  </div>

  <button on:click={validateCart}>Valider le panier</button>
{/if}

<style>
  .quantity {
    display: flex;
    align-items: center;
  }

  .quantity button {
    font-size: 1rem;
    padding: 0.5rem;
    border: 1px solid #ccc;
    background-color: #f7f7f7;
  }

  .quantity input {
    font-size: 1rem;
    padding: 0.5rem;
    border: 1px solid #ccc;
    text-align: center;
    width: 50px;
    margin: 0 5px;
  }
</style>
