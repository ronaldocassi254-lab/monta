# MONTA — shop website

A static online shop for your own designs: plain HTML, CSS and JavaScript, with no build step and no server. Stripe hosts the checkout.

```
index.html        Home: hero, collection grid with filters, about, FAQ
product.html      Product page (product.html?id=drift-tee)
js/products.js    ← YOUR CATALOG: brand info, products, size guide
js/app.js         Rendering logic (no need to touch)
css/style.css     Look and feel (colours and fonts are at the top)
images/           Put your product photos here
```

## 1. Preview it on your computer

```bash
python3 -m http.server 8080
```

Then open http://localhost:8080.

## 2. Make it yours

Everything lives in **`js/products.js`**:

- **`STORE`**: brand name, email, Instagram, currency and the shipping banner text.
- **`PRODUCTS`**: one block per item. Copy an existing block to add a new item, and delete a block to remove one.
- **`SIZE_GUIDE`**: measurements for each category.

Edit the hero headline, the About story and the FAQ answers directly in `index.html`. To change the colours, edit the variables at the top of `css/style.css` (`--bg`, `--ink`, `--accent`).

## 3. Add your photos

1. Export your photos in **4:5 portrait** (for example 1600×2000), saved as JPG or WebP and under about 400 KB each.
2. Put them in `images/`.
3. List them on the product:
   ```js
   images: ["images/drift-tee-front.jpg", "images/drift-tee-back.jpg"],
   ```

Until a product has photos, the site draws a placeholder garment in the selected colour.

## 4. Take payments with Stripe Payment Links

1. Create a free account at https://stripe.com.
2. For each product, go to **Product catalogue → Add product** and set the name and price.
3. Open **Payment Links → New**, then pick the product. Turn on:
   - **Collect customers' addresses** → shipping address
   - **Let customers adjust quantity** (optional)
   - Under **After payment**, set a confirmation page or a redirect back to your site.
4. Copy the link (`https://buy.stripe.com/...`) into that product's `stripeLink`.

The Buy button passes the selected **colour and size** to Stripe as `client_reference_id`, for example `drift-tee_Ink_M`. You'll see it on each payment in the Stripe dashboard, so you know what to ship.

If a product has no `stripeLink`, the button changes to **Order by email**. It opens the customer's email app with the item, colour and size already filled in. This is handy for testing demand before you set up Stripe.

## 5. Put it online (free)

Any static host works. Easiest options:

- **Netlify Drop**: go to https://app.netlify.com/drop and drag this folder onto the page. You get a live link straight away.
- **Cloudflare Pages** or **GitHub Pages**: push this folder to a GitHub repo and connect it to either service.

Then connect your own domain in the host's settings.

## Ideas for later

- **Multi-item cart**: Snipcart or Shopify's Buy Button can be added to static sites.
- **Stock counts**: set `soldOut: true` as each run sells through.
- **Newsletter**: embed a Buttondown, Mailchimp or Kit signup form in the footer.
