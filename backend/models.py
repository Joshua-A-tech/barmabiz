from datetime import datetime
from sqlalchemy import Column, Integer, String, Float, Boolean, ForeignKey, Text
from sqlalchemy.orm import relationship
from database import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    phone = Column(String, nullable=False)
    password_hash = Column(String, nullable=False)
    role = Column(String, default="VENDOR")  # SUPERADMIN, VENDOR, BUYER
    email_verified = Column(Boolean, default=True)
    phone_verified = Column(Boolean, default=True)
    api_token = Column(String, unique=True, index=True, nullable=True)
    created_at = Column(String, default=lambda: datetime.utcnow().isoformat())

    store = relationship("VendorStore", back_populates="owner", uselist=False)


class OTPVerification(Base):
    __tablename__ = "otp_verifications"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, index=True, nullable=False)
    phone = Column(String, index=True, nullable=False)
    purpose = Column(String, default="VENDOR_REGISTRATION")  # VENDOR_REGISTRATION, BUYER_CHECKOUT
    email_otp = Column(String, nullable=False)
    sms_otp = Column(String, nullable=False)
    email_verified = Column(Boolean, default=False)
    sms_verified = Column(Boolean, default=False)
    attempts = Column(Integer, default=0)
    expires_at = Column(Integer, nullable=False)  # Unix epoch timestamp
    created_at = Column(String, default=lambda: datetime.utcnow().isoformat())


class VendorStore(Base):
    __tablename__ = "vendor_stores"

    id = Column(Integer, primary_key=True, index=True)
    owner_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    name = Column(String, nullable=False)
    slug = Column(String, unique=True, index=True, nullable=False)
    custom_domain = Column(String, unique=True, nullable=True)  # e.g. www.remedystore.co.ke
    category = Column(String, default="Health & Wellness")
    description = Column(Text, default="")
    logo_url = Column(String, default="")
    banner_url = Column(String, default="")
    location = Column(String, default="Nairobi, Kenya")
    mpesa_phone = Column(String, nullable=False)
    is_verified = Column(Boolean, default=True)
    onboarding_status = Column(String, default="ACTIVE")  # PENDING_PLAN_PAYMENT, PENDING_APPROVAL, ACTIVE, SUSPENDED
    commission_rate = Column(Float, default=5.0)  # Platform commission %
    escrow_balance = Column(Float, default=0.0)
    available_balance = Column(Float, default=0.0)
    total_sales = Column(Float, default=0.0)
    # SaaS Subscription Billing & Verification Status
    subscription_plan = Column(String, default="Growth")  # Starter, Growth, Pro
    subscription_amount = Column(Float, default=3500.0)
    subscription_paid = Column(Boolean, default=True)
    subscription_mpesa_receipt = Column(String, nullable=True)
    email_verified = Column(Boolean, default=True)
    phone_verified = Column(Boolean, default=True)
    # Granular RBAC Service Privileges (Enforced by SuperAdmin & Plan)
    perm_b2c_payouts = Column(Boolean, default=True)
    perm_theme_customizer = Column(Boolean, default=True)
    perm_discounts = Column(Boolean, default=True)
    # Shopify Theme & SaaS Settings
    theme_color = Column(String, default="#008060")
    announcement_text = Column(
        String,
        default="Free Nairobi delivery on orders above KES 2,500 • Pay safely via M-Pesa",
    )
    hero_title = Column(String, default="Crafted for Everyday Excellence")
    discount_code = Column(String, default="KARIBU10")
    discount_percent = Column(Float, default=10.0)
    created_at = Column(String, default=lambda: datetime.utcnow().isoformat())

    owner = relationship("User", back_populates="store")
    products = relationship("Product", back_populates="store", cascade="all, delete-orphan")
    suborders = relationship("SubOrder", back_populates="store")
    payouts = relationship("PayoutTransaction", back_populates="store")


class Product(Base):
    __tablename__ = "products"

    id = Column(Integer, primary_key=True, index=True)
    store_id = Column(Integer, ForeignKey("vendor_stores.id"), nullable=False)
    name = Column(String, nullable=False)
    sku = Column(String, default="SKU-1001")
    category = Column(String, default="General")
    price = Column(Float, nullable=False)
    original_price = Column(Float, nullable=True)
    stock = Column(Integer, default=20)
    image_url = Column(String, default="")
    description = Column(Text, default="")
    badge = Column(String, default="Featured")
    rating = Column(Float, default=4.9)
    reviews_count = Column(Integer, default=12)
    is_active = Column(Boolean, default=True)
    created_at = Column(String, default=lambda: datetime.utcnow().isoformat())

    store = relationship("VendorStore", back_populates="products")


class Order(Base):
    __tablename__ = "orders"

    id = Column(Integer, primary_key=True, index=True)
    order_number = Column(String, unique=True, index=True, nullable=False)
    buyer_name = Column(String, nullable=False)
    buyer_email = Column(String, nullable=False)
    buyer_phone = Column(String, nullable=False)
    delivery_county = Column(String, default="Nairobi")
    delivery_address = Column(String, nullable=False)
    payment_method = Column(String, default="M-Pesa")
    mpesa_receipt = Column(String, nullable=True)
    checkout_request_id = Column(String, nullable=True)
    discount_code = Column(String, nullable=True)
    discount_amount = Column(Float, default=0.0)
    total_amount = Column(Float, nullable=False)
    payment_status = Column(String, default="PAID")  # PENDING, PAID, FAILED
    created_at = Column(String, default=lambda: datetime.utcnow().isoformat())

    suborders = relationship("SubOrder", back_populates="order", cascade="all, delete-orphan")


class SubOrder(Base):
    __tablename__ = "suborders"

    id = Column(Integer, primary_key=True, index=True)
    order_id = Column(Integer, ForeignKey("orders.id"), nullable=False)
    store_id = Column(Integer, ForeignKey("vendor_stores.id"), nullable=False)
    subtotal = Column(Float, nullable=False)
    commission_amount = Column(Float, nullable=False)
    vendor_net_payout = Column(Float, nullable=False)
    fulfillment_status = Column(String, default="CONFIRMED")  # CONFIRMED, PACKED, DISPATCHED, DELIVERED, DISPUTED, REFUNDED
    rider_name = Column(String, nullable=True)
    rider_phone = Column(String, nullable=True)
    delivery_pin = Column(String, default="4821")  # 4-digit Buyer Delivery Release PIN
    dispute_reason = Column(String, nullable=True)
    items_json = Column(Text, nullable=False)
    escrow_released = Column(Boolean, default=False)
    created_at = Column(String, default=lambda: datetime.utcnow().isoformat())

    order = relationship("Order", back_populates="suborders")
    store = relationship("VendorStore", back_populates="suborders")


class PayoutTransaction(Base):
    __tablename__ = "payout_transactions"

    id = Column(Integer, primary_key=True, index=True)
    store_id = Column(Integer, ForeignKey("vendor_stores.id"), nullable=False)
    amount = Column(Float, nullable=False)
    mpesa_phone = Column(String, nullable=False)
    mpesa_b2c_ref = Column(String, nullable=False)
    status = Column(String, default="COMPLETED")
    created_at = Column(String, default=lambda: datetime.utcnow().isoformat())

    store = relationship("VendorStore", back_populates="payouts")


class AuditLog(Base):
    __tablename__ = "audit_logs"

    id = Column(Integer, primary_key=True, index=True)
    actor_email = Column(String, nullable=False)
    actor_role = Column(String, nullable=False)  # SUPERADMIN, VENDOR, BUYER, SYSTEM
    action = Column(String, nullable=False)
    target = Column(String, nullable=False)
    details = Column(Text, default="")
    created_at = Column(String, default=lambda: datetime.utcnow().isoformat())

