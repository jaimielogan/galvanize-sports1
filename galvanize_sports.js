var data = require("./objects");
var inventory = data.inventory;
var shoppingCart = data.shoppingCart;

module.exports = {
    inventory: data.inventory,
    shoppingCart: data.shoppingCart,
    addItem: function(itemId, quantity){
        // Your code here!
        for(var index in inventory){
          if (inventory[index].id === itemId){
            if(quantity > inventory[index].quantityAvailable){
              shoppingCart[index].quantity += inventory[index].quantityAvailable;
              inventory[index].quantityAvailable = 0;
            }
            else {
            inventory[index].quantityAvailable -= quantity;
            shoppingCart[index].quantity += quantity;
            }
          }
        }
    },
    removeItem: function(itemId, quantity){
        // Your code here!
        for (var i in shoppingCart){
          if(shoppingCart[i].itemId === itemId){
            if(shoppingCart[i].quantity > quantity){
              shoppingCart[i].quantity -= quantity;
              inventory[i].quantityAvailable += quantity;
              }
          else if (shoppingCart[i].quantity <= quantity) {
            inventory[i].quantityAvailable += shoppingCart[i].quantity;
            shoppingCart[i].quantity = 0;
          }
        }
      }
    },
    getCheckoutSubtotal: function(){
        var checkoutSubtotal = 0.00;
        // Your code here!
        for (var j in shoppingCart){
          checkoutSubtotal += (shoppingCart[j].quantity * inventory[j].price);
        }
        return Number(checkoutSubtotal.toFixed(2));
    },
    getTax: function(subtotal, rate){
        var tax = 0.00;
        // Your code here!
        tax = subtotal * rate;
        return Number(tax.toFixed(2));
    },
    getCheckoutTotal: function(){
        var TAX_RATE = 0.078;
        var checkoutTotal = 0.00;
        // Your code here!
        checkoutTotal = this.getTax(this.getCheckoutSubtotal(),TAX_RATE)+this.getCheckoutSubtotal();
        return checkoutTotal.toFixed(2);
    }
};
