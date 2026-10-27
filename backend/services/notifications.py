import os
import logging
from typing import Dict, Any, Optional
import httpx

logger = logging.getLogger("barmabiz.notifications")


class NotificationService:
    """
    Dual-Channel Communication Engine for BarmaBiz:
    - SMS Gateway: Africa's Talking / Twilio
    - Email Gateway: Resend / Transactional SMTP
    - Sandbox Simulator: Real-time preview delivery when credentials are not set
    """

    def __init__(self):
        # Africa's Talking credentials
        self.at_username = os.environ.get("AT_USERNAME", "sandbox").strip()
        self.at_api_key = os.environ.get("AT_API_KEY", "").strip()
        self.at_sender_id = os.environ.get("AT_SENDER_ID", "BARMABIZ").strip()
        self.at_endpoint = (
            "https://api.sandbox.africastalking.com/version1/messaging"
            if self.at_username == "sandbox"
            else "https://api.africastalking.com/version1/messaging"
        )

        # Resend Email credentials
        self.resend_api_key = os.environ.get("RESEND_API_KEY", "").strip()
        self.from_email = os.environ.get(
            "FROM_EMAIL", "BarmaBiz Escrow <orders@barmabiz.co.ke>"
        ).strip()

    async def send_sms(self, phone: str, message: str) -> Dict[str, Any]:
        """Dispatches an SMS via Africa's Talking or returns sandbox preview."""
        clean_phone = phone.strip()
        if not clean_phone.startswith("+"):
            clean_phone = f"+{clean_phone}"

        if self.at_api_key:
            try:
                async with httpx.AsyncClient(timeout=10.0) as client:
                    data = {
                        "username": self.at_username,
                        "to": clean_phone,
                        "message": message,
                    }
                    if self.at_username != "sandbox" and self.at_sender_id:
                        data["from"] = self.at_sender_id

                    res = await client.post(
                        self.at_endpoint,
                        data=data,
                        headers={
                            "apiKey": self.at_api_key,
                            "Content-Type": "application/x-www-form-urlencoded",
                            "Accept": "application/json",
                        },
                    )
                    if res.status_code in (200, 201):
                        return {
                            "delivered": True,
                            "channel": "AFRICAS_TALKING_LIVE",
                            "recipient": clean_phone,
                            "response": res.json(),
                        }
                    else:
                        logger.warning(
                            f"Africa's Talking SMS failed: {res.text}. Falling back to preview."
                        )
            except Exception as e:
                logger.error(f"Africa's Talking exception: {e}")

        # Sandbox Preview
        return {
            "delivered": True,
            "channel": "SANDBOX_GATEWAY_PREVIEW",
            "provider": "Africa's Talking / Safaricom SMS Gateway",
            "recipient": clean_phone,
            "message": message,
        }

    async def send_email(
        self, to_email: str, subject: str, html_body: str, text_body: Optional[str] = None
    ) -> Dict[str, Any]:
        """Dispatches an email via Resend or returns sandbox preview."""
        clean_email = to_email.strip().lower()

        if self.resend_api_key:
            try:
                async with httpx.AsyncClient(timeout=10.0) as client:
                    payload = {
                        "from": self.from_email,
                        "to": [clean_email],
                        "subject": subject,
                        "html": html_body,
                        "text": text_body or subject,
                    }
                    res = await client.post(
                        "https://api.resend.com/emails",
                        json=payload,
                        headers={
                            "Authorization": f"Bearer {self.resend_api_key}",
                            "Content-Type": "application/json",
                        },
                    )
                    if res.status_code in (200, 201):
                        return {
                            "delivered": True,
                            "channel": "RESEND_LIVE",
                            "recipient": clean_email,
                            "response": res.json(),
                        }
                    else:
                        logger.warning(
                            f"Resend email dispatch failed: {res.text}. Falling back to preview."
                        )
            except Exception as e:
                logger.error(f"Resend exception: {e}")

        # Sandbox Preview
        return {
            "delivered": True,
            "channel": "SANDBOX_GATEWAY_PREVIEW",
            "provider": "BarmaBiz Transactional SMTP / Resend",
            "recipient": clean_email,
            "subject": subject,
            "preview_snippet": (text_body or subject)[:120],
        }

    async def dispatch_otp(
        self, phone: str, email: str, sms_code: str, email_code: str
    ) -> Dict[str, Any]:
        """Dispatches dual-channel 6-digit verification codes to phone and email."""
        sms_msg = f"Your BarmaBiz verification code is {sms_code}. Valid for 10 minutes. Do not share this code."
        email_sub = f"{email_code} is your BarmaBiz security code"
        email_html = f"""
        <div style="font-family: sans-serif; max-width: 500px; margin: auto; padding: 20px; border: 1px solid #e2e8f0; rounded: 12px;">
            <div style="background: #008060; color: white; padding: 12px; border-radius: 8px; font-weight: bold; text-align: center;">
                BarmaBiz Commerce — Account Verification
            </div>
            <p style="margin-top: 20px; font-size: 14px; color: #334155;">
                Use the 6-digit code below to complete your verification:
            </p>
            <div style="background: #f1f5f9; padding: 16px; border-radius: 8px; text-align: center; font-size: 28px; font-weight: 800; letter-spacing: 6px; color: #0f172a; font-family: monospace;">
                {email_code}
            </div>
            <p style="font-size: 12px; color: #64748b; margin-top: 20px;">
                This code expires in 10 minutes. If you did not request this, please ignore this email.
            </p>
        </div>
        """
        sms_res = await self.send_sms(phone, sms_msg)
        email_res = await self.send_email(email, email_sub, email_html, f"Your code is {email_code}")
        return {"sms": sms_res, "email": email_res}

    async def dispatch_order_placed(
        self,
        buyer_phone: str,
        buyer_email: str,
        order_number: str,
        total_amount: float,
        mpesa_receipt: str,
        delivery_pin: str,
    ) -> None:
        """Notifies buyer of successful M-Pesa Escrow lock and delivers their secret 4-digit Delivery PIN."""
        sms_msg = (
            f"BarmaBiz Order #{order_number} confirmed! KES {total_amount:,.0f} secured in Escrow "
            f"(M-Pesa: {mpesa_receipt}). Your Delivery Release PIN is {delivery_pin}. "
            f"Give PIN to rider ONLY after inspecting your package."
        )
        email_sub = f"Order #{order_number} Confirmed — BarmaBiz Escrow & Delivery PIN"
        email_html = f"""
        <div style="font-family: sans-serif; max-width: 540px; margin: auto; padding: 24px; border: 1px solid #cbd5e1; border-radius: 12px;">
            <h2 style="color: #008060; margin-top: 0;">M-Pesa Escrow Payment Approved</h2>
            <p>Thank you for shopping on BarmaBiz. Your payment of <strong>KES {total_amount:,.0f}</strong> is held safely in Platform Escrow.</p>
            <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 14px; margin: 16px 0;">
                <div><strong>Order Number:</strong> #{order_number}</div>
                <div><strong>M-Pesa Receipt:</strong> {mpesa_receipt}</div>
                <div style="margin-top: 10px; padding-top: 10px; border-top: 1px solid #e2e8f0;">
                    <span style="font-size: 13px; color: #475569;">Secret Buyer Delivery PIN:</span><br/>
                    <strong style="font-size: 22px; letter-spacing: 4px; color: #0f172a; font-family: monospace;">{delivery_pin}</strong>
                </div>
            </div>
            <p style="font-size: 12px; color: #b45309; background: #fef3c7; padding: 10px; border-radius: 6px;">
                ⚠️ <strong>Escrow Protection Notice:</strong> Do not share your 4-digit Delivery PIN with the rider until you have received and inspected your order.
            </p>
        </div>
        """
        await self.send_sms(buyer_phone, sms_msg)
        await self.send_email(buyer_email, email_sub, email_html, sms_msg)


notification_service = NotificationService()
