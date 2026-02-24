import { NextResponse } from "next/server";
import { createPayPalOrder } from "@/lib/paypal";

export async function POST(req: Request) {
    try {
        const { amount, userId } = await req.json();
        const order = await createPayPalOrder(amount, userId || "GUEST_USER");
        return NextResponse.json(order);
    } catch (error: any) {
        console.error("PayPal Create Order Error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
