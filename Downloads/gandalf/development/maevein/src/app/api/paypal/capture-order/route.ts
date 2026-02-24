import { NextResponse } from "next/server";
import { capturePayPalOrder } from "@/lib/paypal";

export async function POST(req: Request) {
    try {
        const { orderID } = await req.json();
        const captureData = await capturePayPalOrder(orderID);

        // Check if capture was successful
        const purchaseUnit = captureData.purchase_units[0];
        const capture = purchaseUnit.payments.captures[0];

        if (capture.status === "COMPLETED") {
            // In a real app, you would verify the signature and update the DB here
            // For now, we return data including the userId (custom_id)
            return NextResponse.json({
                id: capture.id,
                status: capture.status,
                amount: capture.amount,
                payer: captureData.payer,
                userId: purchaseUnit.custom_id,
                description: purchaseUnit.description,
                create_time: capture.create_time,
                success: true
            });
        }

        return NextResponse.json({ success: false, status: capture.status });
    } catch (error: any) {
        console.error("PayPal Capture Order Error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
