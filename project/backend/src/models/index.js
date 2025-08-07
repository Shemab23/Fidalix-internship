// src/models/index.js
import Blog from './Blog.js';
import Cart from './Cart.js';
import Order from './Order.js';
import Deliveries from './Delivery.js';
import Store from './Store.js';
import Partner from './Partner.js';
import Product from './Product.js';
import Step from './Step.js';
import User from './User.js';

// ---- Associations ----

// user 1:M order  -- owner
User.hasMany(Order, { foreignKey: 'owner_id', as: 'ordering'});
Order.belongsTo(User, { foreignKey: 'owner_id', as: 'ordered' });

// user 1:M deliveries   -- delivery_man
User.hasMany(Deliveries, { foreignKey: 'delivery_man_id', as: 'orderOwner'});
Deliveries.belongsTo(User, { foreignKey: 'delivery_man_id', as: 'ordersDestination' });

// user 1:M store   -- shop owner
User.hasMany(Store, { foreignKey: 'shop_id',as : 'stores' });
Store.belongsTo(User, { foreignKey: 'shop_id',as: 'shopOwner' });

// store M:1 product   -- belongs to many shops
Product.hasMany(Store, { foreignKey: 'product_id', as: 'storing' });
Store.belongsTo(Product, { foreignKey: 'product_id', as : 'Inproduct' });

// Cart M:1 user  -- user can have many carts
User.hasMany(Cart, { foreignKey: 'user_id', as: 'cartOwner' });
Cart.belongsTo(User, { foreignKey: 'user_id', as: 'cartProducts' });

// Cart M:1 product   -- product can appear in many carts
Product.hasMany(Cart, { foreignKey: 'product_id', as: 'cartProduct' });
Cart.belongsTo(Product, { foreignKey: 'product_id', as: 'ordeCart' });

// Cart M:1 Order  -- an order can contain multiple carts
Cart.hasMany(Order, { foreignKey: 'cart_id', as: 'productsart' });
Order.belongsTo(Cart, { foreignKey: 'cart_id', as: 'orderCost'  });

// delivery 1:1 delivery -- an order can have
Order.hasOne(Deliveries, { foreignKey: 'order_id', as: 'orderDelivery'  });
Deliveries.belongsTo(Order, { foreignKey: 'order_id', as: 'orderdelivery'  });


  // { "path","name","measure","price"
  //   "name":"product1",
  //   "measure":"kg",
  //   "path":"./public/image/product1",
  //   "storing":[{
  //     "price":450
  //   }]
  // }


export {
  Blog,
  Cart,
  Deliveries,
  Order,
  Step,
  Store,
  Partner,
  Product,
  User,
};
