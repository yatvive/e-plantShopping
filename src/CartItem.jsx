import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
  // Récupération des articles du panier depuis le store Redux
  const cart = useSelector(state => state.cart.items);
 
  const dispatch = useDispatch();

  // 1. Coût de tous les articles dans le panier (Tâche 3 - Algorithme forEach)
  const calculateTotalAmount = () => {
    let total = 0; // Initialise une variable total pour contenir la somme cumulative
    
    cart.forEach(item => { // Itère sur le tableau cart en utilisant cart.forEach()
      // Convertit la chaîne cost en nombre avec parseFloat(item.cost.substring(1))
      const itemCost = parseFloat(item.cost.substring(1));
      // Multiplie par la quantité et ajoute la valeur résultante à total
      total += itemCost * item.quantity;
    });
    
    return total; // Renvoie la somme finale total
  };

  // 2. Continuer à magasiner
  const handleContinueShopping = (e) => {
    // Appelle la fonction onContinueShopping(e) passée depuis le composant parent
    if (onContinueShopping) {
      onContinueShopping(e);
    }
  };

  // 3. Passer à la caisse
  const handleCheckoutShopping = (e) => {
    alert('Functionality to be added for future reference');
  };

  // 4. Incrémenter la quantité d'un article
  const handleIncrement = (item) => {
    // Dispatch le réducteur updateQuantity en utilisant le paramètre 'name' pour identifier l'article
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  // 4. Décrémenter la quantité d'un article (Logique If-Else de la consigne)
  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      // Si la quantité de l'article est supérieure à 1, on diminue de 1
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    } else {
      // Sinon, si la quantité tombe à 0, on dispatch l'action removeItem
      dispatch(removeItem(item.name));
    }
  };

  // 5. Retirer une plante du panier complètement
  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  // 6. Calculer le sous-total pour chaque type de plante (Consigne substring)
  const calculateTotalCost = (item) => {
    const unitPrice = parseFloat(item.cost.substring(1));
    return unitPrice * item.quantity;
  };

  return (
    <div className="cart-container">
      {/* Affichage du coût total global */}
      <h2 style={{ color: 'black' }}>Total Cart Amount: ${calculateTotalAmount()}</h2>
      
      <div>
        {cart.map(item => (
          <div className="cart-item" key={item.name}>
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">{item.cost}</div>
              
              {/* Zone des contrôles de quantité (+ / -) */}
              <div className="cart-item-quantity">
                <button className="cart-item-button cart-item-button-dec" onClick={() => handleDecrement(item)}>-</button>
                <span className="cart-item-quantity-value">{item.quantity}</span>
                <button className="cart-item-button cart-item-button-inc" onClick={() => handleIncrement(item)}>+</button>
              </div>
              
              {/* Affichage du sous-total de la ligne */}
              <div className="cart-item-total">Total: ${calculateTotalCost(item)}</div>
              
              {/* Bouton de suppression totale */}
              <button className="cart-item-delete" onClick={() => handleRemove(item)}>Delete</button>
            </div>
          </div>
        ))}
      </div>

      {/* Zone des boutons d'action du bas de page */}
      <div className="continue_shopping_btn">
        <button className="get-started-button" onClick={(e) => handleContinueShopping(e)}>
          Continue Shopping
        </button>
        <br />
        <button className="get-started-button1" onClick={(e) => handleCheckoutShopping(e)}>
          Checkout
        </button>
      </div>
    </div>
  );
};

export default CartItem;
