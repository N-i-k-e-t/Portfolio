import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const eventType = body.event_type;

        console.log(`Received PayPal Webhook: ${eventType}`);

        switch (eventType) {
            case "CHECKOUT.ORDER.APPROVED":
                // Order approved but maybe not captured yet if using separate capture
                break;
            case "PAYMENT.CAPTURE.COMPLETED":
                // Payment successfully captured
                const orderId = body.resource.supplementary_data?.related_ids?.order_id || body.resource.parent_payment;
                console.log(`Payment captured for order: ${orderId}`);
                // Update user status in DB
                break;
            case "PAYMENT.CAPTURE.DENIED":
                console.warn("Payment capture denied");
                break;
            default:
                console.log(`Unhandled event type: ${eventType}`);
        }

        return NextResponse.json({ received: true });
    } catch (error: any) {
        console.error("PayPal Webhook Error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
