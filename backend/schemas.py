import re
from typing import List, Optional
from pydantic import BaseModel, Field, field_validator


def validate_safe_url(v: Optional[str]) -> Optional[str]:
    if not v:
        return ""
    clean = v.strip()
    if clean and not (
        clean.startswith("https://")
        or clean.startswith("http://")
        or clean.startswith("/api/uploads/")
    ):
        raise ValueError(
            "URL must start with https://, http://, or /api/uploads/ (javascript: and unsafe URIs are blocked)"
        )
    return clean


def validate_kenyan_phone(v: str) -> str:
    clean = re.sub(r"[\s\-\+]", "", v.strip())
    if clean.startswith("07") or clean.startswith("01"):
        clean = "254" + clean[1:]
    if not re.match(r"^254[17]\d{8}$", clean):
        raise ValueError("Phone number must be a valid Kenyan M-Pesa number (e.g. 254712345678 or 0712345678)")
    return clean


class SendOTPRequest(BaseModel):
    email: str = Field(..., min_length=5, max_length=120)
    phone: str
    purpose: str = Field(default="VENDOR_REGISTRATION")  # VENDOR_REGISTRATION, BUYER_CHECKOUT, USER_VERIFY

    @field_validator("phone")
    @classmethod
    def check_phone(cls, v: str) -> str:
        return validate_kenyan_phone(v)


class VerifyOTPRequest(BaseModel):
    verification_id: int
    email_otp: str = Field(..., min_length=6, max_length=6)
    sms_otp: str = Field(..., min_length=6, max_length=6)


class PaySubscriptionRequest(BaseModel):
    store_id: int
    mpesa_phone: str
    subscription_plan: Optional[str] = None

    @field_validator("mpesa_phone")
    @classmethod
    def check_phone(cls, v: str) -> str:
        return validate_kenyan_phone(v)


class VendorRegisterRequest(BaseModel):
    owner_name: str = Field(..., min_length=2, max_length=80)
    email: str = Field(..., min_length=5, max_length=120)
    phone: str
    password: str = Field(..., min_length=6, max_length=128)
    store_name: str = Field(..., min_length=2, max_length=80)
    store_slug: str = Field(..., min_length=2, max_length=60)
    custom_domain: Optional[str] = None
    category: str = "Health & Wellness"
    description: str = Field(default="", max_length=600)
    location: str = Field(default="Nairobi, Kenya", max_length=120)
    mpesa_phone: str
    subscription_plan: str = "Growth"
    theme_color: str = "#008060"
    otp_verification_id: Optional[int] = None

    @field_validator("mpesa_phone", "phone")
    @classmethod
    def check_phone(cls, v: str) -> str:
        return validate_kenyan_phone(v)


class SuperAdminOnboardVendorRequest(BaseModel):
    owner_name: str = Field(..., min_length=2, max_length=80)
    email: str = Field(..., min_length=5, max_length=120)
    phone: str
    password: str = Field(..., min_length=6, max_length=128)
    store_name: str = Field(..., min_length=2, max_length=80)
    store_slug: str = Field(..., min_length=2, max_length=60)
    custom_domain: Optional[str] = None
    category: str = "Health & Wellness"
    location: str = "Nairobi, Kenya"
    mpesa_phone: str
    subscription_plan: str = "Growth"
    commission_rate: float = Field(default=3.5, ge=0.0, le=50.0)
    perm_b2c_payouts: bool = True
    perm_theme_customizer: bool = True
    perm_discounts: bool = True

    @field_validator("mpesa_phone", "phone")
    @classmethod
    def check_phone(cls, v: str) -> str:
        return validate_kenyan_phone(v)


class LoginRequest(BaseModel):
    email: str = Field(..., min_length=3, max_length=120)
    password: str = Field(..., min_length=1, max_length=128)


class StoreUpdateRequest(BaseModel):
    name: str = Field(..., min_length=2, max_length=80)
    category: str = Field(..., min_length=2, max_length=80)
    description: str = Field(default="", max_length=600)
    logo_url: str = ""
    banner_url: str = ""
    location: str = Field(default="Nairobi, Kenya", max_length=120)
    mpesa_phone: str
    custom_domain: Optional[str] = None
    theme_color: Optional[str] = "#008060"
    announcement_text: Optional[str] = Field(default=None, max_length=220)
    hero_title: Optional[str] = Field(default=None, max_length=140)
    discount_code: Optional[str] = Field(default=None, max_length=24)
    discount_percent: Optional[float] = Field(default=None, ge=0.0, le=50.0)

    @field_validator("logo_url", "banner_url")
    @classmethod
    def check_urls(cls, v: str) -> str:
        return validate_safe_url(v) or ""

    @field_validator("mpesa_phone")
    @classmethod
    def check_phone(cls, v: str) -> str:
        return validate_kenyan_phone(v)


class ProductCreateRequest(BaseModel):
    name: str = Field(..., min_length=2, max_length=120)
    sku: Optional[str] = Field(default="SKU-1001", max_length=40)
    category: str = Field(..., min_length=2, max_length=80)
    price: float = Field(..., gt=0.0, le=10000000.0)
    original_price: Optional[float] = Field(default=None, gt=0.0, le=10000000.0)
    stock: int = Field(default=20, ge=0, le=100000)
    image_url: str = ""
    description: str = Field(default="", max_length=1000)
    badge: str = Field(default="Featured", max_length=40)
    is_active: Optional[bool] = True

    @field_validator("image_url")
    @classmethod
    def check_img_url(cls, v: str) -> str:
        return validate_safe_url(v) or ""


class CartItemSchema(BaseModel):
    product_id: int = Field(..., gt=0)
    quantity: int = Field(..., gt=0, le=500)
    # Note: price and store_id from client are ignored by the server to prevent price tampering!
    store_id: Optional[int] = None
    name: Optional[str] = None
    price: Optional[float] = None
    image_url: Optional[str] = ""


class CheckoutRequest(BaseModel):
    buyer_name: str = Field(..., min_length=2, max_length=80)
    buyer_email: str = Field(..., min_length=5, max_length=120)
    buyer_phone: str
    delivery_county: str = Field(default="Nairobi", max_length=60)
    delivery_address: str = Field(..., min_length=3, max_length=200)
    payment_method: str = "M-Pesa"
    discount_code: Optional[str] = Field(default=None, max_length=24)
    items: List[CartItemSchema]

    @field_validator("buyer_phone")
    @classmethod
    def check_phone(cls, v: str) -> str:
        return validate_kenyan_phone(v)


class SubOrderStatusUpdateRequest(BaseModel):
    fulfillment_status: str  # CONFIRMED, PACKED, DISPATCHED, DELIVERED
    rider_name: Optional[str] = Field(default=None, max_length=80)
    rider_phone: Optional[str] = Field(default=None, max_length=30)
    delivery_pin: Optional[str] = Field(default=None, max_length=10)

    @field_validator("fulfillment_status")
    @classmethod
    def check_status(cls, v: str) -> str:
        allowed = {"CONFIRMED", "PACKED", "DISPATCHED", "DELIVERED"}
        clean = v.strip().upper()
        if clean not in allowed:
            raise ValueError(f"Invalid fulfillment_status. Must be one of {allowed}")
        return clean


class ImageUploadRequest(BaseModel):
    filename: str = Field(..., min_length=1, max_length=120)
    content_type: str = Field(default="image/jpeg", max_length=60)
    data_base64: str = Field(..., min_length=16)


class BuyerDisputeRequest(BaseModel):
    order_number: str = Field(..., min_length=3, max_length=40)
    suborder_id: int
    reason: str = Field(..., min_length=5, max_length=400)


class WithdrawRequest(BaseModel):
    amount: float = Field(..., gt=0.0, le=5000000.0)
    mpesa_phone: Optional[str] = None


class SuperAdminStoreUpdateRequest(BaseModel):
    is_verified: bool
    commission_rate: float = Field(..., ge=0.0, le=50.0)
    subscription_plan: Optional[str] = None
    onboarding_status: Optional[str] = None
    custom_domain: Optional[str] = None
    perm_b2c_payouts: Optional[bool] = None
    perm_theme_customizer: Optional[bool] = None
    perm_discounts: Optional[bool] = None


class MpesaSTKPushRequest(BaseModel):
    phone: str
    amount: float = Field(..., gt=0.0)
    reference: str = Field(..., min_length=2, max_length=60)
    description: Optional[str] = Field(default="BarmaBiz Escrow Checkout", max_length=100)

    @field_validator("phone")
    @classmethod
    def check_phone(cls, v: str) -> str:
        return validate_kenyan_phone(v)


class ResolveDisputeRequest(BaseModel):
    action: str = Field(..., description="REFUND_BUYER, RESOLVE_TO_VENDOR, or REJECT_DISPUTE")
    resolution_notes: Optional[str] = Field(default="", max_length=400)

    @field_validator("action")
    @classmethod
    def check_action(cls, v: str) -> str:
        allowed = {"REFUND_BUYER", "RESOLVE_TO_VENDOR", "REJECT_DISPUTE"}
        clean = v.strip().upper()
        if clean not in allowed:
            raise ValueError(f"Action must be one of {allowed}")
        return clean


