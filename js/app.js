(function () {
  const S = window.STORE;
  const P = window.PRODUCTS;

  const money = (n) =>
    new Intl.NumberFormat(S.locale, {
      style: "currency",
      currency: S.currency,
      minimumFractionDigits: n % 1 ? 2 : 0,
    }).format(n);

  const esc = (s) =>
    String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  // ── Placeholder garment drawings (used until real photos are added) ──
  const SHAPES = {
    tee: `<path d="M150 70 Q200 105 250 70 L338 104 L372 184 L318 204 L302 172 L302 430 L98 430 L98 172 L82 204 L28 184 L62 104 Z"/>
          <path class="trim" d="M150 70 Q200 105 250 70 Q200 122 150 70 Z"/>`,
    hoodie: `<path d="M140 92 L260 92 L344 124 L382 352 L338 362 L302 202 L302 440 L98 440 L98 202 L62 362 L18 352 L56 124 Z"/>
             <path class="trim" d="M148 96 Q144 24 200 22 Q256 24 252 96 Q228 132 200 132 Q172 132 148 96 Z"/>
             <path class="trim" d="M140 340 L260 340 L278 404 L122 404 Z"/>
             <path class="line" d="M188 132 L184 196 M212 132 L216 196"/>`,
    crew: `<path d="M145 76 Q200 100 255 76 L344 116 L382 352 L338 362 L302 200 L302 432 L98 432 L98 200 L62 362 L18 352 L56 116 Z"/>
           <path class="trim" d="M145 76 Q200 100 255 76 Q200 118 145 76 Z"/>
           <path class="trim" d="M98 412 L302 412 L302 432 L98 432 Z"/>`,
    trousers: `<path d="M118 46 L282 46 L306 446 L222 446 L200 168 L178 446 L94 446 Z"/>
               <path class="trim" d="M118 46 L282 46 L284 74 L116 74 Z"/>`,
    tote: `<path class="line thick" d="M150 160 Q150 50 200 50 Q250 50 250 160"/>
           <path d="M84 150 L316 150 L330 446 L70 446 Z"/>
           <path class="line" d="M140 290 q15 -18 30 0 t30 0 t30 0 t30 0"/>`,
  };

  function garmentSVG(product, color) {
    const shape = SHAPES[product.type] || SHAPES.tee;
    return `<svg class="garment" viewBox="0 0 400 480" role="img" aria-label="${esc(product.name)} in ${esc(color.name)}" style="--fill:${color.hex}">${shape}</svg>`;
  }

  function productVisual(product, color, index = 0) {
    if (product.images && product.images.length) {
      const src = product.images[index] || product.images[0];
      return `<img src="${esc(src)}" alt="${esc(product.name)}" loading="lazy">`;
    }
    return garmentSVG(product, color);
  }

  const hasPhoto = (p) => p.images && p.images.length > 0;

  // ── Shared chrome ──
  function renderChrome() {
    document.querySelectorAll("[data-store-name]").forEach((el) => (el.textContent = S.name));
    document.querySelectorAll("[data-store-tagline]").forEach((el) => (el.textContent = S.tagline));
    document.querySelectorAll("[data-store-email]").forEach((el) => {
      el.textContent = S.email;
      el.href = "mailto:" + S.email;
    });
    document.querySelectorAll("[data-store-instagram]").forEach((el) => (el.href = S.instagram));
    document.querySelectorAll("[data-year]").forEach((el) => (el.textContent = new Date().getFullYear()));

    const banner = document.querySelector("[data-banner]");
    if (banner) {
      const items = S.shippingBanner.split("·").map((t) => `<span>${esc(t.trim())}</span>`).join("");
      banner.innerHTML = `<div class="marquee-track">${items}${items}${items}${items}</div>`;
    }

    const toggle = document.querySelector(".nav-toggle");
    const nav = document.querySelector(".site-nav");
    if (toggle && nav) {
      toggle.addEventListener("click", () => {
        const open = nav.classList.toggle("open");
        toggle.setAttribute("aria-expanded", open);
      });
      nav.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => nav.classList.remove("open")));
    }
  }

  // ── Home page ──
  function card(p) {
    const c = p.colors[0];
    const badge = p.soldOut ? `<span class="badge muted">Sold out</span>` : p.tag ? `<span class="badge">${esc(p.tag)}</span>` : "";
    const swatches = p.colors
      .map((col) => `<span class="dot" style="background:${col.hex}" title="${esc(col.name)}"></span>`)
      .join("");
    return `
      <a class="card${p.soldOut ? " is-soldout" : ""}" href="product.html?id=${encodeURIComponent(p.id)}" data-category="${esc(p.category)}">
        <div class="card-media${hasPhoto(p) ? " has-photo" : ""}" style="--tint:${c.hex}">${badge}${productVisual(p, c)}${
          p.images.length > 1 ? `<img class="alt" src="${esc(p.images[1])}" alt="" loading="lazy">` : ""
        }</div>
        <div class="card-body">
          <div class="card-row"><h3>${esc(p.name)}</h3><span class="price">${money(p.price)}</span></div>
          <div class="card-row"><span class="swatches">${swatches}</span><span class="meta">${p.colors.length} colour${p.colors.length > 1 ? "s" : ""}</span></div>
        </div>
      </a>`;
  }

  function renderHome() {
    const grid = document.querySelector("[data-grid]");
    if (!grid) return;
    grid.innerHTML = P.map(card).join("");

    const filters = document.querySelector("[data-filters]");
    const cats = ["all", ...new Set(P.map((p) => p.category))];
    filters.hidden = cats.length < 3; // no point filtering a single category
    filters.innerHTML = cats
      .map((c, i) => `<button class="chip${i === 0 ? " active" : ""}" data-filter="${c}">${c === "all" ? "All" : c[0].toUpperCase() + c.slice(1)}</button>`)
      .join("");
    filters.addEventListener("click", (e) => {
      const btn = e.target.closest("[data-filter]");
      if (!btn) return;
      filters.querySelectorAll(".chip").forEach((b) => b.classList.toggle("active", b === btn));
      const f = btn.dataset.filter;
      grid.querySelectorAll(".card").forEach((el) => {
        el.hidden = f !== "all" && el.dataset.category !== f;
      });
    });

    const hero = document.querySelector("[data-hero-visual]");
    if (hero) {
      const featured = P.find((p) => p.featured && !p.soldOut) || P.find((p) => !p.soldOut) || P[0];
      hero.innerHTML = productVisual(featured, featured.colors[0]);
      hero.style.setProperty("--tint", featured.colors[0].hex);
      hero.classList.toggle("has-photo", hasPhoto(featured));
      hero.closest("a").href = `product.html?id=${encodeURIComponent(featured.id)}`;
      document.querySelector("[data-hero-caption]").textContent = `${featured.name} — ${money(featured.price)}`;
    }
  }

  // ── Product page ──
  function renderProduct() {
    const root = document.querySelector("[data-product]");
    if (!root) return;

    const id = new URLSearchParams(location.search).get("id");
    const p = P.find((x) => x.id === id);
    if (!p) {
      root.innerHTML = `<div class="empty"><h1>Not found</h1><p>That item doesn't exist (any more).</p><a class="btn" href="index.html#shop">Back to the shop</a></div>`;
      return;
    }

    document.title = `${p.name} — ${S.name}`;
    const state = { color: p.colors[0], size: p.sizes.length === 1 ? p.sizes[0] : null, image: 0 };
    const guide = window.SIZE_GUIDE && window.SIZE_GUIDE[p.category];

    root.innerHTML = `
      <nav class="crumbs"><a href="index.html#shop">Shop</a> / <span>${esc(p.name)}</span></nav>
      <div class="pdp">
        <div class="pdp-gallery">
          <div class="pdp-main" data-main></div>
          ${p.images.length > 1 ? `<div class="pdp-thumbs" data-thumbs></div>` : ""}
        </div>
        <div class="pdp-info">
          ${p.tag && !p.soldOut ? `<span class="badge inline">${esc(p.tag)}</span>` : ""}
          <h1>${esc(p.name)}</h1>
          <p class="pdp-price">${money(p.price)}</p>
          <p class="pdp-desc">${esc(p.description)}</p>

          <fieldset class="opt">
            <legend>Colour — <span data-color-name>${esc(state.color.name)}</span></legend>
            <div class="opt-row">
              ${p.colors
                .map(
                  (c, i) =>
                    `<button type="button" class="swatch${i === 0 ? " active" : ""}" style="background:${c.hex}" data-color="${i}" aria-label="${esc(c.name)}" aria-pressed="${i === 0}"></button>`
                )
                .join("")}
            </div>
          </fieldset>

          <fieldset class="opt">
            <legend>Size ${guide ? `<button type="button" class="link" data-open-guide>Size guide</button>` : ""}</legend>
            <div class="opt-row">
              ${p.sizes
                .map(
                  (s) =>
                    `<button type="button" class="size${state.size === s ? " active" : ""}" data-size="${esc(s)}" aria-pressed="${state.size === s}">${esc(s)}</button>`
                )
                .join("")}
            </div>
          </fieldset>

          <button class="btn btn-block" data-buy ${p.soldOut ? "disabled" : ""}></button>
          <p class="hint" data-hint></p>

          <details class="pdp-details" open>
            <summary>Details</summary>
            <ul>${p.details.map((d) => `<li>${esc(d)}</li>`).join("")}</ul>
          </details>
          <details class="pdp-details">
            <summary>Shipping &amp; returns</summary>
            <p>${esc(S.shippingBanner.replace(/ · /g, ". "))}.</p>
          </details>
        </div>
      </div>
      ${
        guide
          ? `<dialog class="guide" data-guide>
              <form method="dialog"><button class="close" aria-label="Close">×</button></form>
              <h2>Size guide</h2>
              <p class="meta">Garment measurements in cm, measured flat and doubled.</p>
              <table><thead><tr>${guide.headers.map((h) => `<th>${h}</th>`).join("")}</tr></thead>
              <tbody>${guide.rows.map((r) => `<tr>${r.map((c) => `<td>${c}</td>`).join("")}</tr>`).join("")}</tbody></table>
            </dialog>`
          : ""
      }`;

    const main = root.querySelector("[data-main]");
    const thumbs = root.querySelector("[data-thumbs]");
    const buy = root.querySelector("[data-buy]");
    const hint = root.querySelector("[data-hint]");

    function paintImage() {
      main.style.setProperty("--tint", state.color.hex);
      main.classList.toggle("has-photo", hasPhoto(p));
      main.innerHTML = productVisual(p, state.color, state.image);
      if (thumbs) {
        thumbs.innerHTML = p.images
          .map((src, i) => `<button class="${i === state.image ? "active" : ""}" data-thumb="${i}" aria-label="Image ${i + 1} of ${p.images.length}"><img src="${esc(src)}" alt=""></button>`)
          .join("");
      }
    }

    function paintBuy() {
      if (p.soldOut) {
        buy.textContent = "Sold out";
        hint.textContent = `Email ${S.email} to hear about restocks.`;
        return;
      }
      buy.textContent = state.size
        ? `${p.stripeLink ? "Buy now" : "Order by email"} — ${money(p.price)}`
        : "Select a size";
      buy.disabled = !state.size;
      hint.textContent = p.stripeLink ? "Secure checkout by Stripe." : "We'll reply with payment details and shipping.";
    }

    root.addEventListener("click", (e) => {
      const color = e.target.closest("[data-color]");
      const size = e.target.closest("[data-size]");
      const thumb = e.target.closest("[data-thumb]");

      if (color) {
        state.color = p.colors[+color.dataset.color];
        root.querySelectorAll("[data-color]").forEach((b) => {
          b.classList.toggle("active", b === color);
          b.setAttribute("aria-pressed", b === color);
        });
        root.querySelector("[data-color-name]").textContent = state.color.name;
        paintImage();
      }
      if (size) {
        state.size = size.dataset.size;
        root.querySelectorAll("[data-size]").forEach((b) => {
          b.classList.toggle("active", b === size);
          b.setAttribute("aria-pressed", b === size);
        });
        paintBuy();
      }
      if (thumb) {
        state.image = +thumb.dataset.thumb;
        paintImage();
      }
      if (e.target.closest("[data-open-guide]")) root.querySelector("[data-guide]").showModal();
    });

    buy.addEventListener("click", () => {
      if (!state.size || p.soldOut) return;
      if (p.stripeLink) {
        // client_reference_id shows on the order in your Stripe dashboard,
        // so you know which colour and size to ship.
        const ref = `${p.id}_${state.color.name}_${state.size}`.replace(/[^A-Za-z0-9_-]/g, "-");
        const url = new URL(p.stripeLink);
        url.searchParams.set("client_reference_id", ref);
        location.href = url.toString();
      } else {
        const subject = `Order: ${p.name} (${state.color.name}, ${state.size})`;
        const body = `Hi ${S.name},\n\nI'd like to order:\n\n${p.name}\nColour: ${state.color.name}\nSize: ${state.size}\nPrice: ${money(p.price)}\n\nShipping address:\n\n\nThanks!`;
        location.href = `mailto:${S.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      }
    });

    paintImage();
    paintBuy();

    // More from the shop
    const more = document.querySelector("[data-more]");
    if (more) {
      const others = P.filter((x) => x.id !== p.id).slice(0, 3);
      more.innerHTML = others.map(card).join("");
      more.closest("section").hidden = others.length === 0;
    }
  }

  renderChrome();
  renderHome();
  renderProduct();
})();
