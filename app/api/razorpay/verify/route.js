import { NextResponse } from "next/server";
import crypto from "crypto";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req) {
  try {
    const secret = process.env.RAZORPAY_KEY_SECRET;
    if (!secret) {
      return NextResponse.json({ error: "Server not configured." }, { status: 500 });
    }
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = await req.json();
    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return NextResponse.json({ error: "Missing payment fields." }, { status: 400 });
    }

    // Razorpay signature = HMAC_SHA256(order_id + "|" + payment_id, key_secret)
    const expected = crypto
      .createHmac("sha256", secret)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    const valid =
      expected.length === razorpay_signature.length &&
      crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(razorpay_signature));

    if (!valid) {
      return NextResponse.json({ verified: false, error: "Invalid payment signature." }, { status: 400 });
    }

    // Issue a small proof token (signed with the secret) the client can hold.
    const token = crypto
      .createHmac("sha256", secret)
      .update(`paid:${razorpay_payment_id}`)
      .digest("hex")
      .slice(0, 32);

    return NextResponse.json({ verified: true, token, paymentId: razorpay_payment_id });
  } catch (e) {
    return NextResponse.json({ error: e.message || "Verification failed." }, { status: 500 });
  }
}
