const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export default async function createCheckoutSession(req: any, res: any) {
  //   const prices = await stripe.prices.list({
  //     lookup_keys: [req.body.lookup_key],
  //     expand: ["data.product"],
  //   });

  const { priceId } = req.body;

  // console.info("priceId", req);

  const session = await stripe.checkout.sessions.create({
    billing_address_collection: "auto",
    line_items: [
      {
        price: priceId,
        quantity: 1,
        // currency: "usd",
      },
    ],
    mode: "subscription",
    success_url: `${process.env.WEBAPP_DOMAIN}/projects?success=true&session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.WEBAPP_DOMAIN}/settings?canceled=true`,
  });

  console.info("session", session);

  //   res.redirect(303, session.url);
  return res.json({ url: session.url });
}
