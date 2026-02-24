const PAYPAL_CLIENT_ID = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
const PAYPAL_CLIENT_SECRET = process.env.PAYPAL_CLIENT_SECRET;
const PAYPAL_API_BASE = process.env.PAYPAL_API_BASE || 'https://api-m.paypal.com';

export async function getAccessToken() {
  if (!PAYPAL_CLIENT_ID || !PAYPAL_CLIENT_SECRET) {
    throw new Error("Missing PayPal credentials");
  }

  const auth = Buffer.from(`${PAYPAL_CLIENT_ID}:${PAYPAL_CLIENT_SECRET}`).toString("base64");
  const response = await fetch(`${PAYPAL_API_BASE}/v1/oauth2/token`, {
    method: "POST",
    body: "grant_type=client_credentials",
    headers: {
      Authorization: `Basic ${auth}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });

  const data = await response.json();
  return data.access_token;
}

/**
 * Create a PayPal order with custom metadata
 */
export async function createPayPalOrder(amount: string, customId: string = "GUEST") {
  const accessToken = await getAccessToken();
  const url = `${PAYPAL_API_BASE}/v2/checkout/orders`;

  const payload = {
    intent: "CAPTURE",
    purchase_units: [
      {
        custom_id: customId,
        description: `Maevein Pro Upgrade - Order for User ${customId}`,
        amount: {
          currency_code: "USD",
          value: amount,
        },
      },
    ],
    application_context: {
      brand_name: "Maevein",
      user_action: "PAY_NOW",
      shipping_preference: "NO_SHIPPING"
    }
  };

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(payload),
  });

  return handleResponse(response);
}

/**
 * Capture payment for an approved order
 */
export async function capturePayPalOrder(orderId: string) {
  const accessToken = await getAccessToken();
  const url = `${PAYPAL_API_BASE}/v2/checkout/orders/${orderId}/capture`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return handleResponse(response);
}

async function handleResponse(response: Response) {
  if (response.status === 200 || response.status === 201) {
    return await response.json();
  }

  const errorMessage = await response.text();
  throw new Error(errorMessage);
}
