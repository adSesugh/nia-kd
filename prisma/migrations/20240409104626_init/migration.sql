-- CreateEnum
CREATE TYPE "Role" AS ENUM ('MEMBER', 'ADMIN');
-- CreateEnum
CREATE TYPE "EventLocation" AS ENUM ('ONLINE', 'IN_PERSON');
-- CreateEnum
CREATE TYPE "EventType" AS ENUM ('SINGLE', 'RECURRING');
-- CreateEnum
CREATE TYPE "TicketType" AS ENUM ('FREE', 'PAID');
-- CreateEnum
CREATE TYPE "MemberType" AS ENUM (
    'STUDENT',
    'GRADUATE',
    'ASSOCIATE',
    'PROFESSIONAL'
);
-- CreateEnum
CREATE TYPE "Status" AS ENUM ('ACTIVE', 'INACTIVE');
-- CreateEnum
CREATE TYPE "EventStatus" AS ENUM ('DRAFT', 'PUBLISHED');
-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "regId" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'MEMBER',
    "password" TEXT NOT NULL,
    "rememberMe" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);
-- CreateTable
CREATE TABLE "members" (
    "id" TEXT NOT NULL,
    "regId" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "photoURL" TEXT,
    "address" TEXT,
    "userId" TEXT NOT NULL,
    "joined" TIMESTAMP(3),
    "memberType" "MemberType" NOT NULL DEFAULT 'STUDENT',
    "staus" "Status" NOT NULL DEFAULT 'ACTIVE',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "members_pkey" PRIMARY KEY ("id")
);
-- CreateTable
CREATE TABLE "events" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "locationType" "EventLocation" NOT NULL DEFAULT 'IN_PERSON',
    "lat" TEXT NOT NULL,
    "lng" TEXT NOT NULL,
    "eventType" "EventType" NOT NULL DEFAULT 'SINGLE',
    "startAt" TIMESTAMP(3),
    "endAt" TIMESTAMP(3),
    "ticketType" "TicketType" NOT NULL DEFAULT 'FREE',
    "seats" INTEGER DEFAULT 0,
    "isInfinity" BOOLEAN NOT NULL DEFAULT false,
    "coverPhoto" TEXT NOT NULL,
    "userId" TEXT,
    "formTitle" TEXT NOT NULL,
    "instructions" TEXT,
    "mailFormat" TEXT,
    "mailTicket" BOOLEAN NOT NULL DEFAULT false,
    "ticketCharge" DECIMAL(65, 30) NOT NULL DEFAULT 0.0,
    "status" "EventStatus" NOT NULL DEFAULT 'DRAFT',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "events_pkey" PRIMARY KEY ("id")
);
-- CreateTable
CREATE TABLE "event_forms" (
    "id" TEXT NOT NULL,
    "eventId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,
    CONSTRAINT "event_forms_pkey" PRIMARY KEY ("id")
);
-- CreateTable
CREATE TABLE "event_registrations" (
    "id" TEXT NOT NULL,
    "registrant" JSONB NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "event_registrations_pkey" PRIMARY KEY ("id")
);
-- CreateTable
CREATE TABLE "tags" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "tags_pkey" PRIMARY KEY ("id")
);
-- CreateTable
CREATE TABLE "blogs" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "summary" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "blogs_pkey" PRIMARY KEY ("id")
);
-- CreateTable
CREATE TABLE "_BlogToTag" ("A" TEXT NOT NULL, "B" TEXT NOT NULL);
-- CreateIndex
CREATE UNIQUE INDEX "users_regId_key" ON "users"("regId");
-- CreateIndex
CREATE UNIQUE INDEX "members_userId_key" ON "members"("userId");
-- CreateIndex
CREATE UNIQUE INDEX "members_regId_email_phoneNumber_key" ON "members"("regId", "email", "phoneNumber");
-- CreateIndex
CREATE UNIQUE INDEX "events_title_formTitle_key" ON "events"("title", "formTitle");
-- CreateIndex
CREATE UNIQUE INDEX "event_forms_eventId_key" ON "event_forms"("eventId");
-- CreateIndex
CREATE UNIQUE INDEX "tags_name_key" ON "tags"("name");
-- CreateIndex
CREATE UNIQUE INDEX "_BlogToTag_AB_unique" ON "_BlogToTag"("A", "B");
-- CreateIndex
CREATE INDEX "_BlogToTag_B_index" ON "_BlogToTag"("B");
-- AddForeignKey
ALTER TABLE "members"
ADD CONSTRAINT "members_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
-- AddForeignKey
ALTER TABLE "events"
ADD CONSTRAINT "events_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE
SET NULL ON UPDATE CASCADE;
-- AddForeignKey
ALTER TABLE "event_forms"
ADD CONSTRAINT "event_forms_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "events"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
-- AddForeignKey
ALTER TABLE "_BlogToTag"
ADD CONSTRAINT "_BlogToTag_A_fkey" FOREIGN KEY ("A") REFERENCES "blogs"("id") ON DELETE CASCADE ON UPDATE CASCADE;
-- AddForeignKey
ALTER TABLE "_BlogToTag"
ADD CONSTRAINT "_BlogToTag_B_fkey" FOREIGN KEY ("B") REFERENCES "tags"("id") ON DELETE CASCADE ON UPDATE CASCADE;