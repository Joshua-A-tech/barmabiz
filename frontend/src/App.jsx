import React, { useState, useEffect, useMemo } from "react";
import { THEME_PRESETS, SAAS_PLANS } from "./constants";
import Toast from "./components/common/Toast";
import PortalContextBanner from "./components/common/PortalContextBanner";
import TopCommandBar from "./components/common/TopCommandBar";
import PlatformFooter from "./components/common/PlatformFooter";
import StorefrontView from "./components/marketplace/StorefrontView";
import CentralMarketplaceView from "./components/marketplace/CentralMarketplaceView";
import QuickViewModal from "./components/marketplace/QuickViewModal";
import TrackOrderModal from "./components/marketplace/TrackOrderModal";
import FooterInfoModal from "./components/marketplace/FooterInfoModal";
import CartDrawer from "./components/cart/CartDrawer";
import LoginModal from "./components/auth/LoginModal";
import VendorRegisterWizardModal from "./components/auth/VendorRegisterWizardModal";
import VendorAdminPortal from "./components/vendor/VendorAdminPortal";
import ProductEditModal from "./components/vendor/ProductEditModal";
import SuperAdminPortal from "./components/superadmin/SuperAdminPortal";
import OnboardVendorModal from "./components/superadmin/OnboardVendorModal";

export default function App() {
  // Navigation Mode: 'marketplace' | 'vendor' | 'superadmin'
  const [activePortal, setActivePortal] = useState("marketplace");

  // RBAC Authenticated Session State
  const [demoAccounts, setDemoAccounts] = useState([]);
  const [authSession, setAuthSession] = useState(null); // { id, name, email, role, token, store_id, store_name, store_slug, portal_domain, storefront_domain, custom_domain }
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });

  // Simulated Domain Simulator State
  const [simulatedHost, setSimulatedHost] = useState("barmabiz.co.ke");
  const [domainResolution, setDomainResolution] = useState(null);

  // Marketplace & Storefront States
  const [stores, setStores] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedStoreSlug, setSelectedStoreSlug] = useState(null);
  const [storefrontData, setStorefrontData] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  // Cart & Checkout States (+ Buyer Email & SMS Verification)
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [discountInput, setDiscountInput] = useState("");
  const [appliedDiscount, setAppliedDiscount] = useState(null);
  const [checkoutForm, setCheckoutForm] = useState({
    buyer_name: "",
    buyer_email: "",
    buyer_phone: "",
    delivery_county: "Nairobi",
    delivery_address: "",
  });
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [orderReceipt, setOrderReceipt] = useState(null);
  const [buyerOtpData, setBuyerOtpData] = useState(null); // { verification_id, dev_otp_preview, verified }
  const [buyerOtpInputs, setBuyerOtpInputs] = useState({
    email_otp: "",
    sms_otp: "",
  });

  // Quick View, Order Tracker & Footer Info Modals
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [isTrackModalOpen, setIsTrackModalOpen] = useState(false);
  const [trackNumber, setTrackNumber] = useState("BMZ-90104");
  const [trackedOrder, setTrackedOrder] = useState(null);
  const [trackError, setTrackError] = useState("");
  const [activeFooterModal, setActiveFooterModal] = useState(null); // 'about' | 'escrow' | 'pricing' | 'domains' | 'returns' | 'privacy' | 'terms' | 'contact'

  // Shopify Merchant Admin States
  const [activeVendorStoreId, setActiveVendorStoreId] = useState(1);
  const [vendorTab, setVendorTab] = useState("home");
  const [vendorDashboard, setVendorDashboard] = useState(null);
  const [orderFilterTab, setOrderFilterTab] = useState("ALL");
  const [productFilterTab, setProductFilterTab] = useState("ALL");
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [productForm, setProductForm] = useState({
    name: "",
    sku: "SKU-1001",
    category: "Health & Organic Remedies",
    price: "",
    original_price: "",
    stock: 25,
    image_url: "",
    description: "",
    badge: "Featured",
    is_active: true,
  });
  const [storeProfileForm, setStoreProfileForm] = useState({
    name: "",
    category: "",
    description: "",
    logo_url: "",
    banner_url: "",
    location: "",
    mpesa_phone: "",
    custom_domain: "",
    theme_color: "#008060",
    announcement_text: "",
    hero_title: "",
    subscription_plan: "Growth",
    discount_code: "KARIBU10",
    discount_percent: 10,
  });
  const [themePreviewDevice, setThemePreviewDevice] = useState("desktop");
  const [withdrawAmount, setWithdrawAmount] = useState("");

  // 3-Step Self-Service Vendor Registration Wizard:
  // Step 1: Details + SaaS Plan Selection -> Step 2: Email & SMS OTP Verification -> Step 3: M-Pesa Plan Payment & Approval
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [registerStep, setRegisterStep] = useState(1); // 1 | 2 | 3
  const [vendorOtpState, setVendorOtpState] = useState(null); // { verification_id, dev_otp_preview, verified }
  const [vendorOtpInputs, setVendorOtpInputs] = useState({
    email_otp: "",
    sms_otp: "",
  });
  const [pendingRegisteredVendor, setPendingRegisteredVendor] = useState(null); // { user, store, token }
  const [subscriptionPaying, setSubscriptionPaying] = useState(false);
  const [registerForm, setRegisterForm] = useState({
    owner_name: "",
    email: "",
    phone: "",
    password: "",
    store_name: "",
    store_slug: "",
    custom_domain: "",
    category: "Health & Organic Remedies",
    description: "",
    location: "Nairobi, Kenya",
    mpesa_phone: "",
    subscription_plan: "Growth",
    theme_color: "#008060",
  });

  // SuperAdmin States & Onboard Vendor Modal
  const [superAdminData, setSuperAdminData] = useState(null);
  const [superAdminTab, setSuperAdminTab] = useState("merchants");
  const [isOnboardModalOpen, setIsOnboardModalOpen] = useState(false);
  const [onboardForm, setOnboardForm] = useState({
    owner_name: "",
    email: "",
    phone: "",
    password: "vendor123",
    store_name: "",
    store_slug: "",
    custom_domain: "",
    category: "Fashion & Retail",
    location: "Nairobi, Kenya",
    mpesa_phone: "",
    subscription_plan: "Growth",
    commission_rate: 3.5,
    perm_b2c_payouts: true,
    perm_theme_customizer: true,
    perm_discounts: true,
  });

  // Toast Notification
  const [toast, setToast] = useState(null);
  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 4500);
  };

  // Helper: Auth Headers with Bearer Token
  const getAuthHeaders = (overrideToken) => {
    const t = overrideToken || authSession?.token;
    return {
      "Content-Type": "application/json",
      ...(t ? { Authorization: `Bearer ${t}` } : {}),
    };
  };

  // Load Demo Account Metadata (used only for Quick-Fill inside the Login Modal; no auto-login!)
  const fetchDemoAccounts = async () => {
    try {
      const res = await fetch("/api/auth/demo-accounts");
      const data = await res.json();
      if (data.success && data.accounts.length > 0) {
        setDemoAccounts(data.accounts);
      }
      // Restore active session if user previously logged in during this browser session
      const savedSession = localStorage.getItem("barmabiz_auth_session");
      if (savedSession && !authSession) {
        try {
          const parsed = JSON.parse(savedSession);
          if (parsed && parsed.token && parsed.role) {
            setAuthSession(parsed);
            if (parsed.role === "SUPERADMIN") {
              setSimulatedHost("hq.barmabiz.co.ke");
              setActivePortal("superadmin");
              fetchSuperAdmin(parsed.token);
            } else if (parsed.role === "VENDOR") {
              setSimulatedHost(parsed.portal_domain);
              setActiveVendorStoreId(parsed.store_id);
              setActivePortal("vendor");
              fetchVendorDashboard(parsed.store_id, parsed.token);
            }
          }
        } catch (e) {
          localStorage.removeItem("barmabiz_auth_session");
        }
      }
    } catch (err) {
      console.error("Failed loading demo accounts:", err);
    }
  };

  const fetchMarketplace = async () => {
    setLoading(true);
    try {
      const [storesRes, prodRes] = await Promise.all([
        fetch("/api/marketplace/stores"),
        fetch("/api/marketplace/products"),
      ]);
      const storesJson = await storesRes.json();
      const prodJson = await prodRes.json();
      if (storesJson.success) setStores(storesJson.stores);
      if (prodJson.success) setProducts(prodJson.products);
    } catch (err) {
      console.error("Failed to load marketplace:", err);
    } finally {
      setLoading(false);
    }
  };

  // Sign Out — clears session and returns to public marketplace
  const handleLogout = () => {
    localStorage.removeItem("barmabiz_auth_session");
    setAuthSession(null);
    setVendorDashboard(null);
    setSuperAdminData(null);
    setSelectedStoreSlug(null);
    setStorefrontData(null);
    setSimulatedHost("barmabiz.co.ke");
    setActivePortal("marketplace");
    showToast("Signed out of admin portal");
  };

  // Domain Resolver Tester
  const handleResolveDomain = async (hostToTest) => {
    setSimulatedHost(hostToTest);
    try {
      const res = await fetch(
        `/api/resolve-domain?hostname=${encodeURIComponent(hostToTest)}`
      );
      const data = await res.json();
      setDomainResolution(data);

      if (data.resolved_type === "VENDOR_STOREFRONT" && data.store) {
        openVendorStorefront(data.store.slug, hostToTest);
      } else {
        setSelectedStoreSlug(null);
        setStorefrontData(null);
        setActivePortal("marketplace");
      }
    } catch (err) {
      console.error("Domain resolve error:", err);
    }
  };

  // Authenticate & Route User Strictly by Role (SUPERADMIN vs VENDOR)
  const handleSwitchIdentity = async (account, navigateToPortal = true) => {
    let token = account.token;
    if (!token) {
      const defaultPassword =
        account.role === "SUPERADMIN" ? "admin123" : "vendor123";
      try {
        const res = await fetch("/api/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: account.email,
            password: defaultPassword,
          }),
        });
        const data = await res.json();
        if (res.ok && data.success) {
          token = data.token;
        }
      } catch (e) {
        console.error("Auth exchange failed:", e);
      }
    }

    const enriched = { ...account, token };
    setAuthSession(enriched);
    localStorage.setItem("barmabiz_auth_session", JSON.stringify(enriched));

    if (!navigateToPortal) {
      if (enriched.store_id) setActiveVendorStoreId(enriched.store_id);
      return;
    }

    if (enriched.role === "SUPERADMIN") {
      setSimulatedHost("hq.barmabiz.co.ke");
      setActivePortal("superadmin");
      fetchSuperAdmin(token);
      showToast(
        `Authenticated as Platform Owner (${enriched.email}) → Routed to hq.barmabiz.co.ke`
      );
    } else if (enriched.role === "VENDOR") {
      setSimulatedHost(enriched.portal_domain);
      setActiveVendorStoreId(enriched.store_id);
      setVendorTab("home");
      setActivePortal("vendor");
      fetchVendorDashboard(enriched.store_id, token);
      showToast(
        `Authenticated as Vendor Admin (${enriched.store_name}) → Routed to ${enriched.portal_domain}`
      );
    }
  };

  // Unified Email/Password Login — Automatically detects role & routes to assigned portal
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginForm),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        const newSession = {
          id: data.user.id,
          name: data.user.name,
          email: data.user.email,
          role: data.user.role,
          token: data.token,
          store_id: data.store ? data.store.id : null,
          store_name: data.store ? data.store.name : "BarmaBiz Platform HQ",
          store_slug: data.store ? data.store.slug : null,
          portal_domain: data.assigned_portal_domain,
          storefront_domain: data.store
            ? `${data.store.slug}.barmabiz.co.ke`
            : "barmabiz.co.ke",
          custom_domain: data.store ? data.store.custom_domain : null,
        };
        setIsLoginModalOpen(false);
        setLoginForm({ email: "", password: "" });
        await handleSwitchIdentity(newSession, true);
      } else {
        showToast(data.detail || "Invalid email or password", "error");
      }
    } catch (err) {
      showToast("Login failed", "error");
    }
  };

  // Fetch Individual Storefront
  const openVendorStorefront = async (slug, customHostLabel = null) => {
    if (!slug) {
      setSelectedStoreSlug(null);
      setStorefrontData(null);
      setSimulatedHost("barmabiz.co.ke");
      return;
    }
    try {
      const res = await fetch(`/api/marketplace/stores/${slug}`);
      const data = await res.json();
      if (data.success) {
        setSelectedStoreSlug(slug);
        setStorefrontData(data);
        setActivePortal("marketplace");
        setSimulatedHost(
          customHostLabel ||
            data.store.custom_domain ||
            `${data.store.slug}.barmabiz.co.ke`
        );
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    } catch (err) {
      showToast("Could not load storefront", "error");
    }
  };

  // Fetch Vendor Dashboard (Strictly guarded by Bearer token!)
  const fetchVendorDashboard = async (
    storeId = activeVendorStoreId,
    overrideToken = null
  ) => {
    try {
      const res = await fetch(`/api/vendor/${storeId}/dashboard`, {
        headers: getAuthHeaders(overrideToken),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setVendorDashboard(data);
        setStoreProfileForm({
          name: data.store.name,
          category: data.store.category,
          description: data.store.description,
          logo_url: data.store.logo_url,
          banner_url: data.store.banner_url,
          location: data.store.location,
          mpesa_phone: data.store.mpesa_phone,
          custom_domain: data.store.custom_domain || "",
          theme_color: data.store.theme_color || "#008060",
          announcement_text: data.store.announcement_text || "",
          hero_title: data.store.hero_title || "",
          subscription_plan: data.store.subscription_plan || "Growth",
          discount_code: data.store.discount_code || "KARIBU10",
          discount_percent: data.store.discount_percent || 10,
        });
      } else {
        showToast(data.detail || "Access Denied by RBAC Policy", "error");
      }
    } catch (err) {
      console.error("Error loading vendor portal:", err);
    }
  };

  // Fetch SuperAdmin Overview (Strictly guarded by SUPERADMIN Bearer token!)
  const fetchSuperAdmin = async (overrideToken = null) => {
    try {
      const res = await fetch("/api/superadmin/overview", {
        headers: getAuthHeaders(overrideToken),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setSuperAdminData(data);
      } else {
        showToast(
          data.detail ||
            "RBAC Denied: Only SuperAdmin can access Platform Owner HQ",
          "error"
        );
      }
    } catch (err) {
      console.error("Error loading superadmin:", err);
    }
  };

  useEffect(() => {
    fetchDemoAccounts();
    fetchMarketplace();
  }, []);

  useEffect(() => {
    if (!authSession) return;
    if (activePortal === "vendor") {
      // If VENDOR role, enforce their own store_id
      const targetStoreId =
        authSession.role === "VENDOR"
          ? authSession.store_id
          : activeVendorStoreId;
      fetchVendorDashboard(targetStoreId);
    }
    if (activePortal === "superadmin") {
      fetchSuperAdmin();
    }
  }, [activePortal, activeVendorStoreId, authSession]);

  // Categories list
  const categories = useMemo(() => {
    const cats = new Set(products.map((p) => p.category));
    return ["All", ...Array.from(cats)];
  }, [products]);

  // Filtered Products
  const displayedProducts = useMemo(() => {
    const source =
      selectedStoreSlug && storefrontData ? storefrontData.products : products;
    return source.filter((p) => {
      const matchesCat =
        selectedCategory === "All" || p.category === selectedCategory;
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.store_name.toLowerCase().includes(q) ||
        (p.sku && p.sku.toLowerCase().includes(q));
      return matchesCat && matchesSearch;
    });
  }, [products, selectedStoreSlug, storefrontData, selectedCategory, searchQuery]);

  // Cart Functions
  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.product_id === product.id);
      if (existing) {
        return prev.map((i) =>
          i.product_id === product.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [
        ...prev,
        {
          product_id: product.id,
          store_id: product.store_id,
          store_name: product.store_name,
          name: product.name,
          price: product.price,
          quantity: 1,
          image_url: product.image_url,
        },
      ];
    });
    showToast(`Added "${product.name}" to bag`);
  };

  const updateCartQty = (productId, delta) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.product_id === productId
            ? { ...item, quantity: item.quantity + delta }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const cartSubtotal = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const discountAmount = appliedDiscount
    ? Math.round(cartSubtotal * (appliedDiscount.percent / 100))
    : 0;
  const cartTotal = Math.max(0, cartSubtotal - discountAmount);

  const cartVendorsGroup = useMemo(() => {
    const groups = {};
    cart.forEach((item) => {
      if (!groups[item.store_name]) groups[item.store_name] = [];
      groups[item.store_name].push(item);
    });
    return groups;
  }, [cart]);

  const handleApplyDiscount = () => {
    const clean = discountInput.trim().toUpperCase();
    if (!clean) return;
    const matchedStore = stores.find(
      (s) => (s.discount_code || "").toUpperCase() === clean
    );
    if (matchedStore) {
      setAppliedDiscount({
        code: clean,
        percent: matchedStore.discount_percent || 10,
      });
      showToast(
        `Promo code ${clean} (${matchedStore.discount_percent}% OFF) applied!`
      );
    } else if (["KARIBU10", "WELCOME10", "SHOP10"].includes(clean)) {
      setAppliedDiscount({ code: clean, percent: 10 });
      showToast(`Promo code ${clean} (10% OFF) applied!`);
    } else {
      showToast("Invalid discount code. Try KARIBU10 or SOLAR10", "error");
    }
  };

  // Checkout
  const handleCheckout = async (e) => {
    e.preventDefault();
    if (cart.length === 0) return;
    setCheckoutLoading(true);
    try {
      const res = await fetch("/api/marketplace/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...checkoutForm,
          payment_method: "M-Pesa",
          discount_code: appliedDiscount ? appliedDiscount.code : null,
          items: cart,
        }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setOrderReceipt(data.order);
        setCart([]);
        setAppliedDiscount(null);
        setDiscountInput("");
        fetchMarketplace();
        showToast(data.message);
      } else {
        showToast(data.detail || "Checkout failed", "error");
      }
    } catch (err) {
      showToast("Network error processing M-Pesa STK Push", "error");
    } finally {
      setCheckoutLoading(false);
    }
  };

  // Track Order Lookup
  const handleTrackOrder = async (e) => {
    e.preventDefault();
    setTrackError("");
    try {
      const res = await fetch(`/api/marketplace/orders/${trackNumber.trim()}`);
      const data = await res.json();
      if (res.ok && data.success) {
        setTrackedOrder(data.order);
      } else {
        setTrackedOrder(null);
        setTrackError(data.detail || "Order not found");
      }
    } catch (err) {
      setTrackError("Unable to reach server");
    }
  };

  // Vendor Product CRUD
  const openAddProductModal = () => {
    setEditingProduct(null);
    setProductForm({
      name: "",
      sku: `SKU-${Math.floor(1000 + Math.random() * 9000)}`,
      category: vendorDashboard?.store?.category || "Health & Organic Remedies",
      price: "",
      original_price: "",
      stock: 25,
      image_url: "",
      description: "",
      badge: "New Arrival",
      is_active: true,
    });
    setIsProductModalOpen(true);
  };

  const openEditProductModal = (prod) => {
    setEditingProduct(prod);
    setProductForm({
      name: prod.name,
      sku: prod.sku || `SKU-${1000 + prod.id}`,
      category: prod.category,
      price: prod.price,
      original_price: prod.original_price || "",
      stock: prod.stock,
      image_url: prod.image_url,
      description: prod.description,
      badge: prod.badge,
      is_active: prod.is_active !== false,
    });
    setIsProductModalOpen(true);
  };

  const handleSaveProduct = async (e) => {
    e.preventDefault();
    const targetStoreId = vendorDashboard.store.id;
    const url = editingProduct
      ? `/api/vendor/${targetStoreId}/products/${editingProduct.id}`
      : `/api/vendor/${targetStoreId}/products`;
    const method = editingProduct ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: getAuthHeaders(),
        body: JSON.stringify({
          ...productForm,
          price: parseFloat(productForm.price),
          original_price: productForm.original_price
            ? parseFloat(productForm.original_price)
            : null,
          stock: parseInt(productForm.stock, 10),
        }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setIsProductModalOpen(false);
        fetchVendorDashboard(targetStoreId);
        fetchMarketplace();
        showToast(
          editingProduct ? "Product updated in catalog!" : "New product published!"
        );
      } else {
        showToast(data.detail || "Failed to save product", "error");
      }
    } catch (err) {
      showToast("Failed to save product", "error");
    }
  };

  const handleDeleteProduct = async (productId) => {
    const targetStoreId = vendorDashboard.store.id;
    try {
      const res = await fetch(
        `/api/vendor/${targetStoreId}/products/${productId}`,
        { method: "DELETE", headers: getAuthHeaders() }
      );
      if (res.ok) {
        fetchVendorDashboard(targetStoreId);
        fetchMarketplace();
        showToast("Product removed from catalog");
      }
    } catch (err) {
      showToast("Could not delete product", "error");
    }
  };

  // Direct Device Image Upload for Vendor Products (FR-1)
  const handleProductImageFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file || !vendorDashboard?.store?.id) return;
    if (file.size > 5 * 1024 * 1024) {
      showToast("Image file must be under 5 MB", "error");
      return;
    }
    const reader = new FileReader();
    reader.onload = async () => {
      try {
        const res = await fetch(
          `/api/vendor/${vendorDashboard.store.id}/upload-image`,
          {
            method: "POST",
            headers: getAuthHeaders(),
            body: JSON.stringify({
              filename: file.name,
              content_type: file.type || "image/jpeg",
              data_base64: reader.result,
            }),
          }
        );
        const data = await res.json();
        if (res.ok && data.success) {
          setProductForm((prev) => ({ ...prev, image_url: data.image_url }));
          showToast(data.message);
        } else {
          showToast(data.detail || "Image upload failed", "error");
        }
      } catch (err) {
        showToast("Network error uploading product picture", "error");
      }
    };
    reader.readAsDataURL(file);
  };

  // Buyer Self-Service Escrow Dispute (FR-2)
  const handleRaiseBuyerDispute = async (orderNumber, suborderId) => {
    const reason = window.prompt(
      "Describe the issue to freeze M-Pesa Escrow release (e.g., wrong item delivered, damaged packaging, delayed rider):",
      "Item has not arrived within promised window — requesting Escrow hold"
    );
    if (!reason || !reason.trim()) return;
    try {
      const res = await fetch("/api/marketplace/orders/dispute", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          order_number: orderNumber,
          suborder_id: suborderId,
          reason: reason.trim(),
        }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setTrackedOrder(data.order);
        showToast(data.message);
      } else {
        showToast(data.detail || "Could not raise dispute", "error");
      }
    } catch (err) {
      showToast("Error submitting Escrow dispute", "error");
    }
  };

  // CSV Export Helper for Orders, Inventory & B2C Ledgers (FR-6)
  const downloadCsv = (filename, headers, rows) => {
    const escapeCell = (val) =>
      `"${String(val ?? "").replace(/"/g, '""')}"`;
    const csvContent = [
      headers.map(escapeCell).join(","),
      ...rows.map((r) => r.map(escapeCell).join(",")),
    ].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    showToast(`Exported ${filename}`);
  };

  // Vendor Order Status Update (+ 4-Digit Buyer Delivery Release PIN Verification)
  const handleUpdateOrderStatus = async (
    suborderId,
    status,
    expectedPin = null
  ) => {
    const targetStoreId = vendorDashboard.store.id;
    let deliveryPinToSend = null;
    if (status === "DELIVERED") {
      const entered = window.prompt(
        `Enter the Buyer's 4-Digit Delivery Release PIN to unlock Escrow funds (Demo PIN for this order: ${
          expectedPin || "4821"
        }):`,
        expectedPin || "4821"
      );
      if (entered === null) return;
      deliveryPinToSend = entered.trim();
    }
    try {
      const res = await fetch(
        `/api/vendor/${targetStoreId}/suborders/${suborderId}/status`,
        {
          method: "PUT",
          headers: getAuthHeaders(),
          body: JSON.stringify({
            fulfillment_status: status,
            rider_name: "Express Boda Dispatch",
            rider_phone: "0722991100",
            delivery_pin: deliveryPinToSend,
          }),
        }
      );
      const data = await res.json();
      if (res.ok && data.success) {
        fetchVendorDashboard(targetStoreId);
        showToast(data.message);
      } else {
        showToast(data.detail || "Error updating status", "error");
      }
    } catch (err) {
      showToast("Error updating fulfillment status", "error");
    }
  };

  // Vendor Store & Theme Save
  const handleSaveStoreProfile = async (e) => {
    if (e) e.preventDefault();
    const targetStoreId = vendorDashboard.store.id;
    try {
      const res = await fetch(`/api/vendor/${targetStoreId}/store`, {
        method: "PUT",
        headers: getAuthHeaders(),
        body: JSON.stringify({
          ...storeProfileForm,
          discount_percent: parseFloat(storeProfileForm.discount_percent || 10),
        }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        fetchVendorDashboard(targetStoreId);
        fetchMarketplace();
        showToast(data.message || "Shopify Storefront & Domain settings saved!");
      } else {
        showToast(data.detail || "Privilege restricted", "error");
      }
    } catch (err) {
      showToast("Failed to update storefront settings", "error");
    }
  };

  // Vendor B2C Withdrawal
  const handleVendorWithdraw = async (e) => {
    e.preventDefault();
    const amt = parseFloat(withdrawAmount);
    if (!amt || amt <= 0) return;
    const targetStoreId = vendorDashboard.store.id;
    try {
      const res = await fetch(`/api/vendor/${targetStoreId}/withdraw`, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify({ amount: amt }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setWithdrawAmount("");
        fetchVendorDashboard(targetStoreId);
        showToast(data.message);
      } else {
        showToast(data.detail || "Withdrawal restricted", "error");
      }
    } catch (err) {
      showToast("Error processing B2C payout", "error");
    }
  };

  // STEP 1 -> STEP 2: Send 6-Digit Email OTP + 6-Digit SMS OTP for Vendor Registration
  const handleSendVendorOtp = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/auth/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: registerForm.email,
          phone: registerForm.mpesa_phone || registerForm.phone,
          purpose: "VENDOR_REGISTRATION",
        }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setVendorOtpState({
          verification_id: data.verification_id,
          dev_otp_preview: data.dev_otp_preview,
          verified: false,
        });
        setVendorOtpInputs({ email_otp: "", sms_otp: "" });
        setRegisterStep(2);
        showToast(data.message);
      } else {
        showToast(data.detail || "Failed to send OTP codes", "error");
      }
    } catch (err) {
      showToast("Network error dispatching SMS & Email OTP", "error");
    }
  };

  // STEP 2 -> STEP 3: Verify Email + SMS OTP & Create Store in PENDING_PLAN_PAYMENT Status
  const handleVerifyVendorOtpAndRegister = async (e) => {
    e.preventDefault();
    if (!vendorOtpState?.verification_id) return;
    try {
      // 1. Verify both 6-digit Email OTP and 6-digit SMS OTP
      const otpRes = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          verification_id: vendorOtpState.verification_id,
          email_otp: vendorOtpInputs.email_otp,
          sms_otp: vendorOtpInputs.sms_otp,
        }),
      });
      const otpData = await otpRes.json();
      if (!otpRes.ok || !otpData.success) {
        showToast(otpData.detail || "Invalid OTP codes", "error");
        return;
      }

      // 2. Register vendor store (starts as PENDING_PLAN_PAYMENT until M-Pesa subscription payment!)
      const regRes = await fetch("/api/auth/register-vendor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...registerForm,
          otp_verification_id: vendorOtpState.verification_id,
        }),
      });
      const regData = await regRes.json();
      if (regRes.ok && regData.success) {
        setPendingRegisteredVendor(regData);
        setRegisterStep(3);
        showToast(regData.message);
      } else {
        showToast(regData.detail || "Registration failed", "error");
      }
    } catch (err) {
      showToast("Error verifying OTP & creating vendor store", "error");
    }
  };

  // STEP 3 -> APPROVED: Pay SaaS Plan via M-Pesa STK Push to Approve & Activate Store
  const handlePayVendorSubscription = async (
    targetStoreId = null,
    targetPhone = null,
    targetPlan = null
  ) => {
    const storeId = targetStoreId || pendingRegisteredVendor?.store?.id;
    const phone =
      targetPhone ||
      pendingRegisteredVendor?.store?.mpesa_phone ||
      registerForm.mpesa_phone;
    const plan =
      targetPlan ||
      pendingRegisteredVendor?.store?.subscription_plan ||
      registerForm.subscription_plan;
    if (!storeId) return;

    setSubscriptionPaying(true);
    try {
      const res = await fetch("/api/auth/pay-subscription", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          store_id: storeId,
          mpesa_phone: phone,
          subscription_plan: plan,
        }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setIsRegisterModalOpen(false);
        setRegisterStep(1);
        await fetchMarketplace();
        await fetchDemoAccounts();

        if (pendingRegisteredVendor) {
          const newSession = {
            id: pendingRegisteredVendor.user.id,
            name: pendingRegisteredVendor.user.name,
            email: pendingRegisteredVendor.user.email,
            role: "VENDOR",
            token: pendingRegisteredVendor.token,
            store_id: data.store.id,
            store_name: data.store.name,
            store_slug: data.store.slug,
            portal_domain: data.store.admin_portal_domain,
            storefront_domain: data.store.storefront_domain,
            custom_domain: data.store.custom_domain,
          };
          setPendingRegisteredVendor(null);
          await handleSwitchIdentity(newSession, true);
        } else {
          fetchVendorDashboard(storeId);
        }
        showToast(data.message);
      } else {
        showToast(data.detail || "Subscription M-Pesa payment failed", "error");
      }
    } catch (err) {
      showToast("Error processing SaaS subscription payment", "error");
    } finally {
      setSubscriptionPaying(false);
    }
  };

  // Buyer / Client Email & SMS OTP Verification at Checkout
  const handleSendBuyerOtp = async () => {
    if (!checkoutForm.buyer_email || !checkoutForm.buyer_phone) {
      showToast(
        "Enter your Email Receipt address and M-Pesa Phone first to receive OTP codes",
        "error"
      );
      return;
    }
    try {
      const res = await fetch("/api/auth/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: checkoutForm.buyer_email,
          phone: checkoutForm.buyer_phone,
          purpose: "BUYER_CHECKOUT",
        }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setBuyerOtpData({
          verification_id: data.verification_id,
          dev_otp_preview: data.dev_otp_preview,
          verified: false,
        });
        setBuyerOtpInputs({ email_otp: "", sms_otp: "" });
        showToast(data.message);
      } else {
        showToast(data.detail || "Could not send buyer OTP", "error");
      }
    } catch (err) {
      showToast("Network error sending buyer OTP", "error");
    }
  };

  const handleVerifyBuyerOtp = async () => {
    if (!buyerOtpData?.verification_id) return;
    try {
      const res = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          verification_id: buyerOtpData.verification_id,
          email_otp: buyerOtpInputs.email_otp,
          sms_otp: buyerOtpInputs.sms_otp,
        }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setBuyerOtpData({ ...buyerOtpData, verified: true });
        showToast(data.message);
      } else {
        showToast(data.detail || "Invalid buyer OTP codes", "error");
      }
    } catch (err) {
      showToast("Error verifying buyer OTP", "error");
    }
  };

  // SuperAdmin Direct Vendor Onboarding & Domain Provisioning
  const handleSuperAdminOnboardVendor = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/superadmin/onboard-vendor", {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify({
          ...onboardForm,
          commission_rate: parseFloat(onboardForm.commission_rate || 3.5),
        }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setIsOnboardModalOpen(false);
        await fetchSuperAdmin();
        await fetchMarketplace();
        await fetchDemoAccounts();
        showToast(data.message);
      } else {
        showToast(data.detail || "Onboarding failed", "error");
      }
    } catch (err) {
      showToast("Error onboarding vendor", "error");
    }
  };

  // SuperAdmin Update Store Privileges / Domain / Status
  const handleSuperAdminStoreUpdate = async (storeId, patch) => {
    const st = superAdminData.stores.find((s) => s.id === storeId);
    if (!st) return;
    try {
      const res = await fetch(`/api/superadmin/stores/${storeId}`, {
        method: "PUT",
        headers: getAuthHeaders(),
        body: JSON.stringify({
          is_verified:
            patch.is_verified !== undefined ? patch.is_verified : st.is_verified,
          commission_rate:
            patch.commission_rate !== undefined
              ? parseFloat(patch.commission_rate)
              : st.commission_rate,
          subscription_plan: patch.subscription_plan || st.subscription_plan,
          onboarding_status: patch.onboarding_status || st.onboarding_status,
          custom_domain:
            patch.custom_domain !== undefined
              ? patch.custom_domain
              : st.custom_domain,
          perm_b2c_payouts:
            patch.perm_b2c_payouts !== undefined
              ? patch.perm_b2c_payouts
              : st.perm_b2c_payouts,
          perm_theme_customizer:
            patch.perm_theme_customizer !== undefined
              ? patch.perm_theme_customizer
              : st.perm_theme_customizer,
          perm_discounts:
            patch.perm_discounts !== undefined
              ? patch.perm_discounts
              : st.perm_discounts,
        }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        fetchSuperAdmin();
        fetchMarketplace();
        showToast(data.message);
      } else {
        showToast(data.detail || "Update failed", "error");
      }
    } catch (err) {
      showToast("Error updating vendor privileges", "error");
    }
  };

  // SuperAdmin Resolve Escrow Dispute
  const handleResolveDispute = async (suborderId, action) => {
    try {
      const res = await fetch(
        `/api/superadmin/suborders/${suborderId}/resolve-dispute`,
        {
          method: "POST",
          headers: getAuthHeaders(),
          body: JSON.stringify({
            action,
            resolution_notes: `Resolved by SuperAdmin HQ via ${action}`,
          }),
        }
      );
      const data = await res.json();
      if (res.ok && data.success) {
        fetchSuperAdmin();
        fetchMarketplace();
        showToast(data.message);
      } else {
        showToast(data.detail || "Failed to resolve dispute", "error");
      }
    } catch (err) {
      showToast("Error resolving Escrow dispute", "error");
    }
  };

  // Filtered Orders & Products
  const filteredVendorOrders = useMemo(() => {
    const list = vendorDashboard?.suborders || [];
    if (orderFilterTab === "UNFULFILLED")
      return list.filter(
        (o) =>
          o.fulfillment_status === "CONFIRMED" ||
          o.fulfillment_status === "PACKED"
      );
    if (orderFilterTab === "DISPATCHED")
      return list.filter((o) => o.fulfillment_status === "DISPATCHED");
    if (orderFilterTab === "DELIVERED")
      return list.filter((o) => o.fulfillment_status === "DELIVERED");
    return list;
  }, [vendorDashboard, orderFilterTab]);

  const filteredVendorProducts = useMemo(() => {
    const list = vendorDashboard?.products || [];
    if (productFilterTab === "ACTIVE")
      return list.filter((p) => p.is_active !== false);
    if (productFilterTab === "LOW_STOCK")
      return list.filter((p) => p.stock <= 10);
    return list;
  }, [vendorDashboard, productFilterTab]);

  return (
    <div className="min-h-screen flex flex-col bg-[#f1f2f4] text-[#1a1a1a] font-sans antialiased">
      {/* Toast Notification */}
      <Toast toast={toast} />

      {/* Authenticated Context Banner */}
      <PortalContextBanner
        authSession={authSession}
        onLogout={handleLogout}
      />

      {/* Top Command Bar */}
      <TopCommandBar
        authSession={authSession}
        activePortal={activePortal}
        setActivePortal={setActivePortal}
        selectedStoreSlug={selectedStoreSlug}
        vendorDashboard={vendorDashboard}
        onNavigateHome={() => {
          setSelectedStoreSlug(null);
          setStorefrontData(null);
          setSimulatedHost("barmabiz.co.ke");
          setActivePortal("marketplace");
        }}
        onSelectVendorAdmin={() => {
          setActiveVendorStoreId(authSession.store_id);
          setSimulatedHost(authSession.portal_domain);
          setActivePortal("vendor");
        }}
        onOpenVendorStorefront={(slug) => openVendorStorefront(slug)}
        onSelectSuperadmin={() => {
          setSimulatedHost("hq.barmabiz.co.ke");
          setActivePortal("superadmin");
        }}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onOpenRegisterModal={() => setIsRegisterModalOpen(true)}
        onOpenLoginModal={() => setIsLoginModalOpen(true)}
        onOpenTrackModal={() => setIsTrackModalOpen(true)}
        onOpenCart={() => setIsCartOpen(true)}
        cartCount={cart.reduce((s, i) => s + i.quantity, 0)}
      />

      {/* VIEW 1: Marketplace / Dedicated Storefront */}
      {activePortal === "marketplace" && (
        <div className="flex-1 flex flex-col">
          {selectedStoreSlug && storefrontData ? (
            <StorefrontView
              storefrontData={storefrontData}
              setDiscountInput={setDiscountInput}
              setAppliedDiscount={setAppliedDiscount}
              showToast={showToast}
              openVendorStorefront={openVendorStorefront}
              setIsCartOpen={setIsCartOpen}
              cart={cart}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              displayedProducts={displayedProducts}
              setQuickViewProduct={setQuickViewProduct}
              addToCart={addToCart}
            />
          ) : (
            <CentralMarketplaceView
              stores={stores}
              demoAccounts={demoAccounts}
              categories={categories}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              displayedProducts={displayedProducts}
              openVendorStorefront={openVendorStorefront}
              handleSwitchIdentity={handleSwitchIdentity}
              setIsRegisterModalOpen={setIsRegisterModalOpen}
              setActivePortal={setActivePortal}
              setQuickViewProduct={setQuickViewProduct}
              addToCart={addToCart}
            />
          )}
        </div>
      )}

      {/* VIEW 2: Vendor Admin Portal */}
      {activePortal === "vendor" && vendorDashboard && (
        <VendorAdminPortal
          vendorDashboard={vendorDashboard}
          authSession={authSession}
          vendorTab={vendorTab}
          setVendorTab={setVendorTab}
          openVendorStorefront={openVendorStorefront}
          handlePayVendorSubscription={handlePayVendorSubscription}
          subscriptionPaying={subscriptionPaying}
          openAddProductModal={openAddProductModal}
          openEditProductModal={openEditProductModal}
          handleDeleteProduct={handleDeleteProduct}
          orderFilterTab={orderFilterTab}
          setOrderFilterTab={setOrderFilterTab}
          filteredVendorOrders={filteredVendorOrders}
          downloadCsv={downloadCsv}
          handleUpdateOrderStatus={handleUpdateOrderStatus}
          productFilterTab={productFilterTab}
          setProductFilterTab={setProductFilterTab}
          filteredVendorProducts={filteredVendorProducts}
          storeProfileForm={storeProfileForm}
          setStoreProfileForm={setStoreProfileForm}
          handleSaveStoreProfile={handleSaveStoreProfile}
          withdrawAmount={withdrawAmount}
          setWithdrawAmount={setWithdrawAmount}
          handleVendorWithdraw={handleVendorWithdraw}
          themePreviewDevice={themePreviewDevice}
          setThemePreviewDevice={setThemePreviewDevice}
        />
      )}

      {/* VIEW 3: SuperAdmin Portal */}
      {activePortal === "superadmin" && superAdminData && (
        <SuperAdminPortal
          superAdminData={superAdminData}
          setIsOnboardModalOpen={setIsOnboardModalOpen}
          handleSuperAdminStoreUpdate={handleSuperAdminStoreUpdate}
          handleResolveDispute={handleResolveDispute}
          setActiveVendorStoreId={setActiveVendorStoreId}
          setSimulatedHost={setSimulatedHost}
          setActivePortal={setActivePortal}
          downloadCsv={downloadCsv}
        />
      )}

      {/* Platform Global Footer */}
      <PlatformFooter
        setActiveFooterModal={setActiveFooterModal}
        setIsTrackModalOpen={setIsTrackModalOpen}
        setSelectedStoreSlug={setSelectedStoreSlug}
        setStorefrontData={setStorefrontData}
        setSelectedCategory={setSelectedCategory}
        setSearchQuery={setSearchQuery}
        setActivePortal={setActivePortal}
        categories={categories}
        stores={stores}
        openVendorStorefront={openVendorStorefront}
        setRegisterStep={setRegisterStep}
        setIsRegisterModalOpen={setIsRegisterModalOpen}
        setIsLoginModalOpen={setIsLoginModalOpen}
        setIsCartOpen={setIsCartOpen}
        cart={cart}
      />

      {/* Modals */}
      <OnboardVendorModal
        isOnboardModalOpen={isOnboardModalOpen}
        setIsOnboardModalOpen={setIsOnboardModalOpen}
        onboardForm={onboardForm}
        setOnboardForm={setOnboardForm}
        handleSuperAdminOnboardVendor={handleSuperAdminOnboardVendor}
      />

      <LoginModal
        isLoginModalOpen={isLoginModalOpen}
        setIsLoginModalOpen={setIsLoginModalOpen}
        loginForm={loginForm}
        setLoginForm={setLoginForm}
        handleLoginSubmit={handleLoginSubmit}
        demoAccounts={demoAccounts}
      />

      <CartDrawer
        isCartOpen={isCartOpen}
        setIsCartOpen={setIsCartOpen}
        orderReceipt={orderReceipt}
        setOrderReceipt={setOrderReceipt}
        setTrackNumber={setTrackNumber}
        setIsTrackModalOpen={setIsTrackModalOpen}
        cart={cart}
        cartVendorsGroup={cartVendorsGroup}
        updateCartQty={updateCartQty}
        discountInput={discountInput}
        setDiscountInput={setDiscountInput}
        handleApplyDiscount={handleApplyDiscount}
        cartSubtotal={cartSubtotal}
        appliedDiscount={appliedDiscount}
        discountAmount={discountAmount}
        cartTotal={cartTotal}
        checkoutForm={checkoutForm}
        setCheckoutForm={setCheckoutForm}
        buyerOtpData={buyerOtpData}
        buyerOtpInputs={buyerOtpInputs}
        setBuyerOtpInputs={setBuyerOtpInputs}
        handleSendBuyerOtp={handleSendBuyerOtp}
        handleVerifyBuyerOtp={handleVerifyBuyerOtp}
        handleCheckout={handleCheckout}
        checkoutLoading={checkoutLoading}
      />

      <ProductEditModal
        isProductModalOpen={isProductModalOpen}
        setIsProductModalOpen={setIsProductModalOpen}
        editingProduct={editingProduct}
        productForm={productForm}
        setProductForm={setProductForm}
        handleSaveProduct={handleSaveProduct}
        handleProductImageFileUpload={handleProductImageFileUpload}
      />

      <VendorRegisterWizardModal
        isRegisterModalOpen={isRegisterModalOpen}
        setIsRegisterModalOpen={setIsRegisterModalOpen}
        registerStep={registerStep}
        setRegisterStep={setRegisterStep}
        registerForm={registerForm}
        setRegisterForm={setRegisterForm}
        handleSendVendorOtp={handleSendVendorOtp}
        vendorOtpState={vendorOtpState}
        vendorOtpInputs={vendorOtpInputs}
        setVendorOtpInputs={setVendorOtpInputs}
        handleVerifyVendorOtpAndRegister={handleVerifyVendorOtpAndRegister}
        pendingRegisteredVendor={pendingRegisteredVendor}
        setPendingRegisteredVendor={setPendingRegisteredVendor}
        subscriptionPaying={subscriptionPaying}
        handlePayVendorSubscription={handlePayVendorSubscription}
        fetchMarketplace={fetchMarketplace}
        fetchDemoAccounts={fetchDemoAccounts}
        handleSwitchIdentity={handleSwitchIdentity}
      />

      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={addToCart}
      />

      <TrackOrderModal
        isOpen={isTrackModalOpen}
        onClose={() => setIsTrackModalOpen(false)}
        trackNumber={trackNumber}
        setTrackNumber={setTrackNumber}
        handleTrackOrder={handleTrackOrder}
        trackError={trackError}
        trackedOrder={trackedOrder}
        handleRaiseBuyerDispute={handleRaiseBuyerDispute}
      />

      <FooterInfoModal
        activeFooterModal={activeFooterModal}
        setActiveFooterModal={setActiveFooterModal}
        setRegisterStep={setRegisterStep}
        setIsRegisterModalOpen={setIsRegisterModalOpen}
        setIsTrackModalOpen={setIsTrackModalOpen}
      />
    </div>
  );
}
