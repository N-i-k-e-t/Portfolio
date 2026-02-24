'use client';

import React, { useEffect, useState } from 'react';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useRouter } from 'next/navigation';
import { useGame } from '@/lib/game-context';

interface PayPalCheckoutProps {
    amount: string;
    onSuccess?: (details: any) => void;
    onError?: (error: any) => void;
}

const PayPalCheckout: React.FC<PayPalCheckoutProps> = ({ amount, onSuccess, onError }) => {
    const router = useRouter();
    const { unlockPro } = useGame();
    const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
    const [userId, setUserId] = useState<string>("GUEST");

    useEffect(() => {
        // Try to get or generate a unique ID for the order
        let existingId = localStorage.getItem('kg_user_id');
        if (!existingId) {
            existingId = `KG-${Math.random().toString(36).substring(2, 9).toUpperCase()}`;
            localStorage.setItem('kg_user_id', existingId);
        }
        setUserId(existingId);
    }, []);

    if (!clientId) {
        return (
            <div className="p-4 bg-red-900/20 border border-red-500 rounded text-red-500 text-sm">
                PayPal Client ID is missing. Please check your environment variables.
            </div>
        );
    }

    const initialOptions: any = {
        "client-id": clientId,
        currency: "USD",
        intent: "capture",
    };

    return (
        <div className="w-full max-w-md mx-auto">
            <PayPalScriptProvider options={initialOptions}>
                <PayPalButtons
                    style={{ layout: "vertical", color: "blue", shape: "rect", label: "pay" }}
                    createOrder={async () => {
                        try {
                            const response = await fetch("/api/paypal/create-order", {
                                method: "POST",
                                headers: { "Content-Type": "application/json" },
                                body: JSON.stringify({ amount, userId }),
                            });

                            const order = await response.json();

                            if (order.id) {
                                return order.id;
                            } else {
                                const errorDetail = order?.details?.[0];
                                const errorMessage = errorDetail
                                    ? `${errorDetail.issue} ${errorDetail.description} (${order.debug_id})`
                                    : JSON.stringify(order);

                                throw new Error(errorMessage);
                            }
                        } catch (error) {
                            console.error(error);
                            throw error;
                        }
                    }}
                    onApprove={async (data, actions) => {
                        try {
                            const response = await fetch("/api/paypal/capture-order", {
                                method: "POST",
                                headers: { "Content-Type": "application/json" },
                                body: JSON.stringify({ orderID: data.orderID }),
                            });

                            const details = await response.json();

                            const errorDetail = details?.details?.[0];

                            if (errorDetail?.issue === "INSTRUMENT_DECLINED") {
                                return actions.restart();
                            } else if (errorDetail) {
                                throw new Error(`${errorDetail.description} (${details.debug_id})`);
                            } else {
                                // Save for invoice display
                                sessionStorage.setItem(`invoice_${details.id}`, JSON.stringify(details));

                                // Update local game state
                                unlockPro();

                                if (onSuccess) onSuccess(details);

                                // Redirect to premium invoice page
                                router.push(`/invoice/${details.id}`);
                            }
                        } catch (error) {
                            console.error(error);
                            if (onError) onError(error);
                        }
                    }}
                    onError={(err) => {
                        console.error("PayPal Error:", err);
                        if (onError) onError(err);
                    }}
                />
            </PayPalScriptProvider>
        </div>
    );
};

export default PayPalCheckout;
