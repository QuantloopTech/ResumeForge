import { NextResponse } from "next/server";
import Razorpay from "razorpay";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req) {
  try {
    const keyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;
    if (!keyId || !keySecret) {
      return NextResponse.json(
        { error: "Payment is not configured yet. Add your Razorpay keys to the server." },
        { status: 500 }
      );
    }

    const amount = parseInt(process.env.PRICE_AMOUNT || "29900", 10); // smallest unit
    const currency = process.env.PRICE_CURRENCY || "INR";

    const instance = new Razorpay({ key_id: keyId, key_secret: keySecret });
    const order = await instance.orders.create({
      amount,
      currency,
      receipt: `rf_${Date.now()}`,
      notes: { product: "resume-download" },
    });

    return NextResponse.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      keyId,
    });
  } catch (e) {
    const msg = e?.error?.description || e?.message || "Could not create order.";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
