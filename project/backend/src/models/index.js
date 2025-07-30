import Blog from "./Blog.js";
import Cart from "./Cart.js";
import Order from "./Order.js";
import Deliveries from "./Delivery.js";
import Store from "./Store.js";
import Partner from "./Partner.js";
import Product from "./Product.js";
import Step from "./Step.js";
import User from "./User.js";

// user 1:M order  -- owner
User.hasMany(Order,{foreignKey: 'owner_id'});
Order.belongsTo(User,{foreignKey: 'owner_id'});

// user 1:M deliveries   -- delivery_man
User.hasMany(Deliveries,{foreignKey: 'delivery_man_id'});
Deliveries.belongsTo(User,{foreignKey: 'delivery_man_id'});

// user 1:M store   -- shop owner
User.hasMany(Store,{foreignKey: 'shop_id'});
Store.belongsTo(User,{foreignKey: 'shop_id'});


// store M:1 product   -- belongs to many shops
Product.hasMany(Store,{foreignKey: 'product_id'});
Store.belongsTo(Product,{foreignKey: 'product_id'});

// Cart M:1 user  -- user can have many carts
User.hasMany(Cart,{foreignKey: 'user_id'});
Cart.belongsTo(User,{foreignKey: 'user_id'});

// Cart M:1 product   -- product can appear in many carts
Product.hasMany(Cart,{foreignKey: 'product_id'});
Cart.belongsTo(Product,{foreignKey: 'product_id'});

// Cart M:1 Order  -- an order can contain multiple carts
Cart.hasMany(Order,{foreignKey: 'cart_id'});
Order.belongsTo(Cart,{foreignKey: 'cart_id'});

// delivery 1:1 delivery -- an order can have
Order.hasOne(Deliveries,{foreignKey: 'order_id'});
Deliveries.belongsTo(Order,{foreignKey: 'order_id'});

export {Blog,Cart,Deliveries,Order,Step,Store,Partner,Product,User} ;
