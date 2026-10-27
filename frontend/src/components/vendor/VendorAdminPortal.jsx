import React from "react";
import {
  Home,
  Package,
  Tag,
  Users,
  Percent,
  Wallet,
  BarChart3,
  Palette,
  Settings,
  Eye,
  ExternalLink,
  AlertCircle,
} from "lucide-react";
import VendorHomeTab from "./tabs/VendorHomeTab";
import VendorOrdersTab from "./tabs/VendorOrdersTab";
import VendorProductsTab from "./tabs/VendorProductsTab";
import VendorCustomersTab from "./tabs/VendorCustomersTab";
import VendorDiscountsTab from "./tabs/VendorDiscountsTab";
import VendorFinancesTab from "./tabs/VendorFinancesTab";
import VendorAnalyticsTab from "./tabs/VendorAnalyticsTab";
import VendorThemeTab from "./tabs/VendorThemeTab";
import VendorSettingsTab from "./tabs/VendorSettingsTab";

export default function VendorAdminPortal({
  vendorDashboard,
  authSession,
  vendorTab,
  setVendorTab,
  openVendorStorefront,
  handlePayVendorSubscription,
  subscriptionPaying,
  // Tab props
  openAddProductModal,
  openEditProductModal,
  handleDeleteProduct,
  orderFilterTab,
  setOrderFilterTab,
  filteredVendorOrders,
  downloadCsv,
  handleUpdateOrderStatus,
  productFilterTab,
  setProductFilterTab,
  filteredVendorProducts,
  storeProfileForm,
  setStoreProfileForm,
  handleSaveStoreProfile,
  withdrawAmount,
  setWithdrawAmount,
  handleVendorWithdraw,
  themePreviewDevice,
  setThemePreviewDevice,
}) {
  if (!vendorDashboard) return null;
  const store = vendorDashboard.store;

  const navItems = [
    { id: "home", label: "Home & Privileges", icon: Home, allowed: true },
    {
      id: "orders",
      label: "Orders & Escrow",
      icon: Package,
      badge: (vendorDashboard.suborders || []).filter(
        (o) => o.fulfillment_status !== "DELIVERED"
      ).length,
      allowed: true,
    },
    {
      id: "products",
      label: "Products",
      icon: Tag,
      badge: (vendorDashboard.products || []).length,
      allowed: true,
    },
    {
      id: "customers",
      label: "Customers",
      icon: Users,
      badge: (vendorDashboard.customers || []).length,
      allowed: true,
    },
    {
      id: "discounts",
      label: "Discounts",
      icon: Percent,
      allowed: store.perm_discounts,
    },
    {
      id: "finances",
      label: "Finances & M-Pesa B2C",
      icon: Wallet,
      allowed: store.perm_b2c_payouts,
    },
    { id: "analytics", label: "Analytics", icon: BarChart3, allowed: true },
    {
      id: "theme",
      label: "Online Store & Theme",
      icon: Palette,
      allowed: store.perm_theme_customizer,
    },
    {
      id: "settings",
      label: "Domains & SaaS Plan",
      icon: Settings,
      allowed: true,
    },
  ].filter((item) => (authSession?.role === "VENDOR" ? item.allowed : true));

  return (
    <div className="flex-1 flex min-h-[calc(100vh-6rem)]">
      {/* LEFT POLARIS SIDEBAR */}
      <aside className="w-64 bg-[#ebebeb] border-r border-stone-300/80 flex flex-col justify-between shrink-0 select-none">
        <div className="p-3 space-y-1">
          {/* Isolated Tenant Header Card */}
          <div className="p-3 mb-2 rounded-xl bg-white border border-stone-200 shadow-xs space-y-2">
            <div className="flex items-center gap-2.5">
              <img
                src={store.logo_url}
                alt=""
                className="w-9 h-9 rounded-lg object-cover border border-stone-200 shrink-0"
              />
              <div className="min-w-0">
                <div className="text-xs font-extrabold text-stone-900 truncate">
                  {store.name}
                </div>
                <div className="text-[10px] font-mono text-[#008060] truncate">
                  {store.admin_portal_domain}
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between text-[10px] pt-1.5 border-t border-stone-100">
              <span className="text-stone-500">Onboarding Status:</span>
              <span
                className={`font-bold px-1.5 py-0.5 rounded ${
                  store.onboarding_status === "ACTIVE"
                    ? "bg-emerald-100 text-[#008060]"
                    : "bg-amber-100 text-amber-800"
                }`}
              >
                {store.onboarding_status}
              </span>
            </div>
          </div>

          {navItems.map((item) => {
            const Icon = item.icon;
            const active = vendorTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setVendorTab(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold transition ${
                  active
                    ? "bg-white text-[#1a1a1a] shadow-xs border border-stone-200/80"
                    : "text-stone-700 hover:bg-stone-200/70"
                }`}
              >
                <span className="flex items-center gap-2.5">
                  <Icon
                    className={`w-4 h-4 ${
                      active ? "text-[#008060]" : "text-stone-500"
                    }`}
                  />
                  {item.label}
                </span>
                {item.badge > 0 && (
                  <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-[#008060]/15 text-[#008060]">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        <div className="p-3 border-t border-stone-300/80">
          <button
            onClick={() => openVendorStorefront(store.slug)}
            className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-bold bg-white border border-stone-300 text-stone-800 hover:bg-stone-50 shadow-2xs"
          >
            <span className="flex items-center gap-2">
              <Eye className="w-3.5 h-3.5 text-[#008060]" />
              {store.storefront_domain}
            </span>
            <ExternalLink className="w-3.5 h-3.5 text-stone-400" />
          </button>
        </div>
      </aside>

      {/* MAIN MERCHANT WORKSPACE */}
      <main className="flex-1 p-6 lg:p-8 overflow-y-auto max-w-6xl mx-auto w-full space-y-6">
        {/* Banner if Awaiting SaaS Plan M-Pesa Payment or Approval */}
        {store.onboarding_status !== "ACTIVE" && (
          <div className="bg-amber-50 border border-amber-300 text-amber-950 rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div className="text-xs space-y-1">
                <div className="font-extrabold text-sm text-amber-950">
                  Portal Approval Pending Plan Payment ({store.subscription_plan} Plan — KES{" "}
                  {(store.subscription_amount || 3500).toLocaleString()}/mo)
                </div>
                <p className="text-amber-800">
                  Your Email & SMS OTP are verified, and your portal domain (
                  <code className="font-mono font-bold">
                    {store.admin_portal_domain}
                  </code>
                  ) is reserved. Complete your M-Pesa subscription payment to automatically approve your store and unlock public checkout & B2C payouts.
                </p>
              </div>
            </div>
            <button
              onClick={() =>
                handlePayVendorSubscription(
                  store.id,
                  store.mpesa_phone,
                  store.subscription_plan
                )
              }
              disabled={subscriptionPaying}
              className="bg-[#008060] hover:bg-[#006e52] text-white text-xs font-extrabold px-4 py-2.5 rounded-xl shadow-sm shrink-0 transition"
            >
              {subscriptionPaying
                ? "Processing STK Push..."
                : `Pay KES ${(
                    store.subscription_amount || 3500
                  ).toLocaleString()} via M-Pesa & Approve Now`}
            </button>
          </div>
        )}

        {/* TAB RENDERING */}
        {vendorTab === "home" && (
          <VendorHomeTab
            vendorDashboard={vendorDashboard}
            openAddProductModal={openAddProductModal}
          />
        )}

        {vendorTab === "orders" && (
          <VendorOrdersTab
            vendorDashboard={vendorDashboard}
            orderFilterTab={orderFilterTab}
            setOrderFilterTab={setOrderFilterTab}
            filteredVendorOrders={filteredVendorOrders}
            downloadCsv={downloadCsv}
            handleUpdateOrderStatus={handleUpdateOrderStatus}
          />
        )}

        {vendorTab === "products" && (
          <VendorProductsTab
            vendorDashboard={vendorDashboard}
            productFilterTab={productFilterTab}
            setProductFilterTab={setProductFilterTab}
            filteredVendorProducts={filteredVendorProducts}
            openAddProductModal={openAddProductModal}
            openEditProductModal={openEditProductModal}
            handleDeleteProduct={handleDeleteProduct}
          />
        )}

        {vendorTab === "customers" && (
          <VendorCustomersTab vendorDashboard={vendorDashboard} />
        )}

        {vendorTab === "discounts" && (
          <VendorDiscountsTab
            vendorDashboard={vendorDashboard}
            storeProfileForm={storeProfileForm}
            setStoreProfileForm={setStoreProfileForm}
            handleSaveStoreProfile={handleSaveStoreProfile}
          />
        )}

        {vendorTab === "finances" && (
          <VendorFinancesTab
            vendorDashboard={vendorDashboard}
            withdrawAmount={withdrawAmount}
            setWithdrawAmount={setWithdrawAmount}
            handleVendorWithdraw={handleVendorWithdraw}
          />
        )}

        {vendorTab === "analytics" && (
          <VendorAnalyticsTab vendorDashboard={vendorDashboard} />
        )}

        {vendorTab === "theme" && (
          <VendorThemeTab
            vendorDashboard={vendorDashboard}
            storeProfileForm={storeProfileForm}
            setStoreProfileForm={setStoreProfileForm}
            handleSaveStoreProfile={handleSaveStoreProfile}
            themePreviewDevice={themePreviewDevice}
            setThemePreviewDevice={setThemePreviewDevice}
          />
        )}

        {vendorTab === "settings" && (
          <VendorSettingsTab
            vendorDashboard={vendorDashboard}
            storeProfileForm={storeProfileForm}
            setStoreProfileForm={setStoreProfileForm}
            handleSaveStoreProfile={handleSaveStoreProfile}
          />
        )}
      </main>
    </div>
  );
}
