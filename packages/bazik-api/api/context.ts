import { PrismaClient, User } from "@prisma/client";
import MixpanelClient from "../helpers/mixpanel";
import { Request } from "express";
import Stripe from "stripe";

const prisma = new PrismaClient();
const mixpanel = new MixpanelClient();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export interface Context {
  prisma: PrismaClient;
  mixpanel: MixpanelClient;
  req: Request;
  currentUser: User;
  stripe: Stripe;
}

export const context = {
  prisma,
  mixpanel,
  stripe,
};
