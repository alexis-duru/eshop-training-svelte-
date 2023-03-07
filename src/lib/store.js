import { writable } from "svelte/store";

export const cart = writable([]);

export const count = writable(0);

export const addItem = (item) => {
  cart.update((items) => {
    const existingItem = items.find((i) => i.id === item.id);
    if (existingItem) {
      existingItem.quantity += item.quantity;
      return [...items];
    } else {
      return [...items, item];
    }
  });
};

export const removeItem = (id) => {
  cart.update((items) => {
    return items.filter((i) => i.id !== id);
  });
};

export const updateItemQuantity = (id, quantity) => {
  cart.update((items) => {
    const item = items.find((i) => i.id === id);
    item.quantity = quantity;
    return [...items];
  });
};

export const getCartTotal = () => {
  let total = 0;
  cart.subscribe((items) => {
    items.forEach((item) => {
      total += item.price * item.quantity;
    });
  });
  return total;
};
