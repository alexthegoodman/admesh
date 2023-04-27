const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export default async function createPortalSession(req: any, res: any) {
  // For demonstration purposes, we're using the Checkout session to retrieve the customer ID.
  // Typically this is stored alongside the authenticated user in your database.
  const { sessionId } = req.body;
  const checkoutSession = await stripe.checkout.sessions.retrieve(sessionId);

  // This is the url to which the customer will be redirected when they are done
  // managing their billing with the portal.
  const returnUrl = process.env.WEBAPP_DOMAIN + "/settings";

  const portalSession = await stripe.billingPortal.sessions.create({
    customer: checkoutSession.customer,
    return_url: returnUrl,
  });

  //   res.redirect(303, portalSession.url);
  return res.json({ url: portalSession.url });
}
