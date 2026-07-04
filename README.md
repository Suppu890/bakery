# 🍰 Anytime Fresh Bake - Complete Bakery Website with Admin Panel

## 📋 Project Overview

This is a production-ready premium bakery website with a full-featured admin panel that allows admins to:
- ✅ Add, edit, delete products
- ✅ Upload product images
- ✅ Change product names, descriptions, categories
- ✅ Manage menu items dynamically
- ✅ View contact form submissions
- ✅ Change admin password
- ✅ Dashboard with analytics

## 📁 File Structure

```
anytime-fresh-bake/
├── index-dynamic.html      (Main website - USE THIS)
├── admin.html              (Admin panel)
├── server.js              (Express backend)
├── package.json           (Dependencies)
├── db/                    (Auto-created folder for data)
│   ├── products.json
│   ├── admin.json
│   └── contacts.json
└── README.md (This file)
```

## 🚀 Quick Start (Replit)

### Step 1: Setup on Replit

1. Go to https://replit.com
2. Click "Create" → "New Replit"
3. Select "Node.js"
4. Name it "Anytime Fresh Bake"

### Step 2: Upload Files

1. Create the following files in your Replit project:
   - `server.js` - Copy from the server.js file
   - `admin.html` - Copy from the admin.html file
   - `package.json` - Copy from the package.json file

2. Rename `index-dynamic.html` to `index.html` and upload it

### Step 3: Install Dependencies

In the Replit terminal, run:
```bash
npm install
```

### Step 4: Start Server

```bash
npm start
```

You'll see:
```
🍰 Anytime Fresh Bake Server running on port 3000
📍 Visit: http://localhost:3000
👨‍💼 Admin Panel: http://localhost:3000/admin
📝 Default Admin Credentials:
   Username: admin
   Password: admin123
```

### Step 5: Access Website & Admin

- **Main Website:** https://your-replit-url.repl.co
- **Admin Panel:** https://your-replit-url.repl.co/admin

---

## 🔐 Admin Panel Login

**Default Credentials:**
- Username: `admin`
- Password: `admin123`

⚠️ **IMPORTANT:** Change these credentials immediately after first login!

### How to Change Password:
1. Login to Admin Panel
2. Go to Settings
3. Click "Change Admin Password"
4. Enter current password, new password, and confirm

---

## 📝 Features & Usage

### Main Website Features:
✅ Hero section with CTA buttons
✅ About section
✅ Dynamic products section (loads from backend)
✅ Why choose us section
✅ Customer reviews
✅ Photo gallery
✅ Contact form
✅ Floating WhatsApp & Call buttons
✅ Mobile responsive design
✅ Smooth animations

### Admin Panel Features:

#### Dashboard
- View total products count
- View total contact messages
- View total categories
- Quick action buttons

#### Manage Products
- **Add New Product:**
  - Product name
  - Description
  - Category (Cakes, Pastries, Cookies, etc.)
  - Badge (Popular, New, Fresh Daily, etc.)
  - Emoji icon (🎂, 🥐, 🍪, etc.)
  - Product image (with preview)

- **Edit Product:**
  - Click "Edit" button on any product
  - Update details
  - Update image
  - Save changes

- **Delete Product:**
  - Click "Delete" button
  - Confirm deletion

#### View Contact Messages
- See all messages from contact form
- Name, email, phone, message, date

#### Settings
- Change admin password
- View system information
- Check API server status

---

## 🖼️ How to Add/Change Product Images

### In Admin Panel:

1. Go to **Manage Products**
2. Click **Add New Product** or **Edit** existing product
3. In the "Product Image" section:
   - **Click the dashed box** to select image from computer
   - **OR Drag & drop** image directly into the box
4. Click "Save Product"

### Image Requirements:
- Format: JPG, PNG, WebP, GIF
- Size: Up to 5MB
- Recommended: 500x500px or larger
- The image will be converted to base64 and stored in the database

---

## 📊 Database Structure

### products.json
```json
[
  {
    "id": 1,
    "name": "Custom Cakes",
    "description": "Delicious custom-made cakes...",
    "category": "cakes",
    "badge": "Popular",
    "emoji": "🎂",
    "image": "base64-encoded-image-data or null"
  }
]
```

### admin.json
```json
{
  "username": "admin",
  "password": "admin123",
  "email": "admin@anytimefreshbake.com"
}
```

### contacts.json
```json
[
  {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "1234567890",
    "message": "Great service!",
    "timestamp": "2024-01-15T10:30:00.000Z"
  }
]
```

---

## 🌐 API Endpoints

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Add new product (Admin only)
- `PUT /api/products/:id` - Update product (Admin only)
- `DELETE /api/products/:id` - Delete product (Admin only)

### Admin
- `POST /api/admin/login` - Login
- `POST /api/admin/logout` - Logout
- `GET /api/admin/check` - Check login status
- `POST /api/admin/change-password` - Change password

### Contacts
- `POST /api/contacts` - Save contact form submission
- `GET /api/contacts` - Get all contacts (Admin only)

### Health
- `GET /api/health` - Server status

---

## 🎨 Customization

### Colors
Edit in `index-dynamic.html` and `admin.html`:
```css
:root {
  --cream: #FFF8F0;
  --soft-beige: #F5E6D3;
  --chocolate-brown: #4E342E;
  --bakery-gold: #D4A017;
  --warm-orange: #FF8C42;
}
```

### Business Information
Edit in `index-dynamic.html`:
- Phone: Change "90093 78380" to your number
- Address: Update in contact section
- Business Hours: Modify in footer
- Email: Change contact email

### Product Categories
Edit in `admin.html` (line ~600 in product form):
```html
<option value="cakes">Cakes</option>
<option value="pastries">Pastries</option>
<!-- Add more categories -->
```

---

## 🔒 Security Tips

1. **Change default password immediately**
2. **Use strong password** (Mix of uppercase, lowercase, numbers, special chars)
3. **Keep credentials private**
4. **Don't share admin URL publicly**
5. **For production:**
   - Use environment variables for secrets
   - Implement proper authentication
   - Use HTTPS
   - Add rate limiting
   - Database encryption

---

## 📱 Mobile Responsiveness

Website is fully responsive on:
- ✅ Desktop (1920px+)
- ✅ Tablet (768px - 1024px)
- ✅ Mobile (320px - 767px)

Admin panel is also responsive but optimized for desktop.

---

## 🐛 Troubleshooting

### Products not showing?
- Check browser console for errors
- Ensure server is running
- Clear browser cache

### Can't login?
- Check username and password (case-sensitive)
- Make sure server is running
- Try incognito/private browsing

### Images not uploading?
- File size must be under 5MB
- Must be an image file (JPG, PNG, GIF, WebP)
- Check browser console for errors

### Contact form not working?
- Check if server is running
- Try sending via WhatsApp button if API fails
- Message still saves to WhatsApp fallback

---

## 📞 Contact Support

For issues or customizations:
1. Check the troubleshooting section above
2. Review error messages in browser console
3. Check server logs in Replit terminal

---

## 🎯 Next Steps for Production

When selling this website to a client:

1. **Host on proper server** (not Replit for production)
   - Use services like:
     - AWS (EC2, Lightsail)
     - DigitalOcean
     - Heroku
     - Vercel (frontend)
     - Backend service (Node.js hosting)

2. **Domain Setup**
   - Register domain
   - Point DNS to server
   - Setup SSL/HTTPS

3. **Database Migration**
   - Move from JSON files to real database
   - PostgreSQL or MongoDB recommended

4. **Enhancements**
   - Payment integration (Stripe, PayPal, Razorpay)
   - Order management system
   - Email notifications
   - SMS notifications
   - Multi-language support
   - SEO optimization

5. **Backup & Security**
   - Regular backups
   - Security audits
   - DDoS protection

---

## 📄 License & Rights

This is a custom bakery website. Full customization rights included.

---

## Version History

**v1.0.0** - Initial Release
- Complete website with admin panel
- Product management
- Image upload functionality
- Contact form
- Dynamic content loading

---

## Support & Updates

For custom features or modifications, contact the developer.

**Happy Baking! 🍰**
