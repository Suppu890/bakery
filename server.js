const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.static('.'));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(cors());
app.use(session({
    secret: 'your-secret-key-change-this',
    resave: false,
    saveUninitialized: true
}));

// Database file paths
const DB_DIR = './db';
const PRODUCTS_FILE = path.join(DB_DIR, 'products.json');
const ADMIN_FILE = path.join(DB_DIR, 'admin.json');
const CONTACT_FILE = path.join(DB_DIR, 'contacts.json');

// Initialize database
if (!fs.existsSync(DB_DIR)) {
    fs.mkdirSync(DB_DIR, { recursive: true });
}

// Default admin credentials
const DEFAULT_ADMIN = {
    username: 'admin',
    password: 'admin123', // CHANGE THIS IN PRODUCTION
    email: 'admin@anytimefreshbake.com'
};

// Default products
const DEFAULT_PRODUCTS = [
    {
        id: 1,
        name: 'Custom Cakes',
        description: 'Delicious custom-made cakes for every occasion - birthdays, weddings, and celebrations',
        category: 'cakes',
        badge: 'Popular',
        emoji: '🎂',
        image: null
    },
    {
        id: 2,
        name: 'Pastries',
        description: 'Flaky, buttery pastries including croissants, danishes, and more',
        category: 'pastries',
        badge: 'Fresh Daily',
        emoji: '🥐',
        image: null
    },
    {
        id: 3,
        name: 'Cookies',
        description: 'Homemade cookies in various flavors - chocolate chip, sugar, oatmeal & more',
        category: 'cookies',
        badge: 'Best Seller',
        emoji: '🍪',
        image: null
    },
    {
        id: 4,
        name: 'Cupcakes',
        description: 'Individually decorated cupcakes with premium frosting and toppings',
        category: 'cupcakes',
        badge: 'New',
        emoji: '🧁',
        image: null
    },
    {
        id: 5,
        name: 'Fresh Pizza',
        description: 'Delicious pizzas with fresh toppings, made to order',
        category: 'pizza',
        badge: 'Fast Food',
        emoji: '🍕',
        image: null
    },
    {
        id: 6,
        name: 'Gourmet Burgers',
        description: 'Juicy burgers with premium meat and fresh vegetables',
        category: 'burgers',
        badge: 'Fast Food',
        emoji: '🍔',
        image: null
    },
    {
        id: 7,
        name: 'Sandwiches',
        description: 'Fresh sandwiches packed with quality ingredients',
        category: 'sandwiches',
        badge: 'Fast Food',
        emoji: '🥪',
        image: null
    },
    {
        id: 8,
        name: 'Fast Food Specials',
        description: 'Amazing combo deals on your favorite fast food items',
        category: 'fastfood',
        badge: 'Combo Deals',
        emoji: '🍟',
        image: null
    }
];

// Initialize files
function initializeDB() {
    if (!fs.existsSync(ADMIN_FILE)) {
        fs.writeFileSync(ADMIN_FILE, JSON.stringify(DEFAULT_ADMIN, null, 2));
    }
    if (!fs.existsSync(PRODUCTS_FILE)) {
        fs.writeFileSync(PRODUCTS_FILE, JSON.stringify(DEFAULT_PRODUCTS, null, 2));
    }
    if (!fs.existsSync(CONTACT_FILE)) {
        fs.writeFileSync(CONTACT_FILE, JSON.stringify([], null, 2));
    }
}

initializeDB();

// Helper functions to read/write JSON
function readProducts() {
    try {
        const data = fs.readFileSync(PRODUCTS_FILE, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        console.error('Error reading products:', err);
        return DEFAULT_PRODUCTS;
    }
}

function writeProducts(products) {
    fs.writeFileSync(PRODUCTS_FILE, JSON.stringify(products, null, 2));
}

function readAdmin() {
    try {
        const data = fs.readFileSync(ADMIN_FILE, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        return DEFAULT_ADMIN;
    }
}

function readContacts() {
    try {
        const data = fs.readFileSync(CONTACT_FILE, 'utf8');
        return JSON.parse(data) || [];
    } catch (err) {
        return [];
    }
}

function writeContacts(contacts) {
    fs.writeFileSync(CONTACT_FILE, JSON.stringify(contacts, null, 2));
}

// ==================== ROUTES ====================

// Admin Login
app.post('/api/admin/login', (req, res) => {
    const { username, password } = req.body;
    const admin = readAdmin();

    if (username === admin.username && password === admin.password) {
        req.session.adminLoggedIn = true;
        req.session.username = username;
        res.json({ success: true, message: 'Login successful' });
    } else {
        res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
});

// Admin Logout
app.post('/api/admin/logout', (req, res) => {
    req.session.adminLoggedIn = false;
    res.json({ success: true, message: 'Logged out' });
});

// Check if admin is logged in
app.get('/api/admin/check', (req, res) => {
    if (req.session.adminLoggedIn) {
        res.json({ loggedIn: true, username: req.session.username });
    } else {
        res.json({ loggedIn: false });
    }
});

// Get all products
app.get('/api/products', (req, res) => {
    const products = readProducts();
    res.json(products);
});

// Get single product
app.get('/api/products/:id', (req, res) => {
    const products = readProducts();
    const product = products.find(p => p.id === parseInt(req.params.id));
    if (product) {
        res.json(product);
    } else {
        res.status(404).json({ error: 'Product not found' });
    }
});

// Add new product (Admin only)
app.post('/api/products', (req, res) => {
    if (!req.session.adminLoggedIn) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    const { name, description, category, badge, emoji, image } = req.body;
    const products = readProducts();
    
    const newProduct = {
        id: Math.max(...products.map(p => p.id), 0) + 1,
        name,
        description,
        category,
        badge,
        emoji,
        image: image || null
    };

    products.push(newProduct);
    writeProducts(products);
    res.json({ success: true, product: newProduct });
});

// Update product (Admin only)
app.put('/api/products/:id', (req, res) => {
    if (!req.session.adminLoggedIn) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    const { name, description, category, badge, emoji, image } = req.body;
    let products = readProducts();
    const productIndex = products.findIndex(p => p.id === parseInt(req.params.id));

    if (productIndex === -1) {
        return res.status(404).json({ error: 'Product not found' });
    }

    products[productIndex] = {
        ...products[productIndex],
        name: name || products[productIndex].name,
        description: description || products[productIndex].description,
        category: category || products[productIndex].category,
        badge: badge || products[productIndex].badge,
        emoji: emoji || products[productIndex].emoji,
        image: image !== undefined ? image : products[productIndex].image
    };

    writeProducts(products);
    res.json({ success: true, product: products[productIndex] });
});

// Delete product (Admin only)
app.delete('/api/products/:id', (req, res) => {
    if (!req.session.adminLoggedIn) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    let products = readProducts();
    products = products.filter(p => p.id !== parseInt(req.params.id));
    writeProducts(products);
    res.json({ success: true, message: 'Product deleted' });
});

// Change admin password
app.post('/api/admin/change-password', (req, res) => {
    if (!req.session.adminLoggedIn) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    const { currentPassword, newPassword } = req.body;
    let admin = readAdmin();

    if (currentPassword !== admin.password) {
        return res.status(401).json({ error: 'Current password is incorrect' });
    }

    admin.password = newPassword;
    fs.writeFileSync(ADMIN_FILE, JSON.stringify(admin, null, 2));
    res.json({ success: true, message: 'Password changed successfully' });
});

// Save contact form message
app.post('/api/contacts', (req, res) => {
    const { name, email, phone, message } = req.body;
    const contacts = readContacts();
    
    const newContact = {
        id: contacts.length + 1,
        name,
        email,
        phone,
        message,
        timestamp: new Date().toISOString()
    };

    contacts.push(newContact);
    writeContacts(contacts);
    res.json({ success: true, message: 'Contact saved' });
});

// Get all contacts (Admin only)
app.get('/api/contacts', (req, res) => {
    if (!req.session.adminLoggedIn) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    const contacts = readContacts();
    res.json(contacts);
});

// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'Server is running' });
});

// Serve static files
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, 'admin.html'));
});

// Start server
app.listen(PORT, () => {
    console.log(`🍰 Anytime Fresh Bake Server running on port ${PORT}`);
    console.log(`📍 Visit: http://localhost:${PORT}`);
    console.log(`👨‍💼 Admin Panel: http://localhost:${PORT}/admin`);
    console.log(`\n📝 Default Admin Credentials:`);
    console.log(`   Username: admin`);
    console.log(`   Password: admin123`);
    console.log(`\n⚠️  IMPORTANT: Change these credentials in production!`);
});

module.exports = app;
