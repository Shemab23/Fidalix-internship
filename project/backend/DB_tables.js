import pool from './pool.js'

const db = await pool();

const user = async () =>{
    const name = "user";
    try{
        await db.execute(`
           CREATE TABLE ${name} (
                user_id INT PRIMARY KEY AUTO_INCREMENT,
                type Enum('customer','business','delivery'),
                names TEXT,
                location TEXT,
                phone VARCHAR(13),
                profile_path TEXT,
                password_ TEXT,
                record_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `)
        console.log(`created ${name} table successfully `);
    }catch(err){
        console.error(`couldn't create the ${name}`,err.message);
    }
}
const products = async () =>{// removed
    const name = "products";
    try{
        await db.execute(`
           CREATE TABLE ${name} (
                product_id INT PRIMARY KEY AUTO_INCREMENT,
                name_ TEXT,
                image_path TEXT,
                measure text,
                record_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `)
        console.log(`created ${name} table successfully `);
    }catch(err){
        console.error(`couldn't create the ${name}`,err.message);
    }
}
const store = async () =>{/// newly created
    const name = "store";
    try{
        await db.execute(`
           CREATE TABLE ${name} (
                shop_id INT ,
                product_id INT ,
                price double,
                PRIMARY KEY (shop_id,product_id),
                FOREIGN KEY (shop_id) REFERENCES user(user_id),
                FOREIGN KEY (product_id) REFERENCES products(product_id)
            )
        `)
        console.log(`created ${name} table successfully `);
    }catch(err){
        console.error(`couldn't create the ${name}`,err.message);
    }
}
const deliveries = async () =>{
    const name = "deliveries";
    try{
        await db.execute(`
           CREATE TABLE ${name} (
                delivery_id INT PRIMARY KEY AUTO_INCREMENT,
                status ENUM('ordered','pending','received') NOT NULL,
                order_id INT,
                delivery_man INT,
                record_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (order_id) REFERENCES orders(order_id),
                FOREIGN KEY (delivery_man) REFERENCES user(user_id)
            )
        `)
        console.log(`created ${name} table successfully `);
    }catch(err){
        console.error(`couldn't create the ${name}`,err.message);
    }
}

const orders = async () =>{
    const name = "orders";
    try{
        await db.execute(`
           CREATE TABLE ${name} (
                order_id INT PRIMARY KEY AUTO_INCREMENT,
                owner_id INT,

                cart_id INT,
                payment BOOLEAN DEFAULT false,
                bank TEXT DEFAULT NULL,
                bank_card TEXT DEFAULT NULL,
                FOREIGN KEY (owner_id) REFERENCES user(user_id),
                FOREIGN KEY (cart_id) REFERENCES cart(cart_id)
            )
        `)
        console.log(`created ${name} table successfully `);
    }catch(err){
        console.error(`couldn't create the ${name}`,err.message);
    }
}
const cart = async () =>{
    const name = "cart";
    try{
        await db.execute(`
           CREATE TABLE ${name} (
                cart_id INT PRIMARY KEY AUTO_INCREMENT,
                product_id INT,
                amount FLOAT,
                FOREIGN KEY (product_id) REFERENCES products(product_id)
            )
        `)
        console.log(`created ${name} table successfully `);
    }catch(err){
        console.error(`couldn't create the ${name}`,err.message);
    }
}
const blog = async () =>{
    const name = "blog";
    try{
        await db.execute(`
           CREATE TABLE ${name} (
                blog_id INT PRIMARY KEY AUTO_INCREMENT,
                path_ text,
                title text,
                description text
            )
        `)
        console.log(`created ${name} table successfully `);
    }catch(err){
        console.error(`couldn't create the ${name}`,err.message);
    }
}
const steps = async () =>{
    const name = "steps";
    try{
        await db.execute(`
           CREATE TABLE ${name} (
                step_id INT PRIMARY KEY AUTO_INCREMENT,
                path_ text,
                title text,
                description text
            )
        `)
        console.log(`created ${name} table successfully `);
    }catch(err){
        console.error(`couldn't create the ${name}`,err.message);
    }
}
const partner = async () =>{
    const name = "partner";
    try{
        await db.execute(`
           CREATE TABLE ${name} (
                partner_id INT PRIMARY KEY AUTO_INCREMENT,
                path_ text,
                name_ text
            )
        `)
        console.log(`created ${name} table successfully `);
    }catch(err){
        console.error(`couldn't create the ${name}`,err.message);
    }
}

await user();
await products();
await store();
await cart();
await orders();
await deliveries();
await blog();
await steps();
await partner();
