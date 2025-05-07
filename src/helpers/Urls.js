const baseApiUrl = `${process.env.NEXT_PUBLIC_BASE_API_URL}`;
const baseUIUrl = `${process.env.NEXT_PUBLIC_BASE_UI_URL}`;
const authUrl = `${process.env.NEXT_PUBLIC_BASE_API_URL}${process.env.NEXT_PUBLIC_AUTH_URL}`;
const paymentUrl = `${process.env.NEXT_PUBLIC_BASE_API_URL}${process.env.NEXT_PUBLIC_PAYMENT_URL}`;

export { authUrl, baseApiUrl, baseUIUrl, paymentUrl };