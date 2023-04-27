-- AlterTable
ALTER TABLE "User" ADD COLUMN     "plan" TEXT NOT NULL DEFAULT 'STARTER',
ADD COLUMN     "stripeSubscriptionId" TEXT;
