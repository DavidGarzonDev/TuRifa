-- CreateTable
CREATE TABLE "User" (
    "uid" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("uid")
);

-- CreateTable
CREATE TABLE "Rifa" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "totalTickets" INTEGER NOT NULL DEFAULT 0,
    "prize" TEXT,
    "startDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endDate" TIMESTAMP(3),
    "userID" TEXT NOT NULL,
    "ticketPrice" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "organizer" TEXT,
    "totalTicketsSold" INTEGER NOT NULL DEFAULT 0,
    "revenue" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "state" TEXT DEFAULT 'Activa',
    "winnerUserId" TEXT,
    "winnerTicketId" INTEGER,
    "drawDate" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Rifa_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ticket" (
    "id" SERIAL NOT NULL,
    "idRifa" INTEGER NOT NULL,
    "idUser" TEXT NOT NULL,
    "buyDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expireDate" TIMESTAMP(3),
    "state" TEXT NOT NULL DEFAULT 'Activo',
    "idPago" TEXT,
    "price" DOUBLE PRECISION NOT NULL,
    "methodPago" TEXT,
    "numeroBoleto" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Ticket_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "Rifa_userID_idx" ON "Rifa"("userID");

-- CreateIndex
CREATE INDEX "Rifa_state_idx" ON "Rifa"("state");

-- CreateIndex
CREATE INDEX "Ticket_idRifa_idx" ON "Ticket"("idRifa");

-- CreateIndex
CREATE INDEX "Ticket_idUser_idx" ON "Ticket"("idUser");

-- CreateIndex
CREATE INDEX "Ticket_state_idx" ON "Ticket"("state");

-- AddForeignKey
ALTER TABLE "Rifa" ADD CONSTRAINT "Rifa_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User"("uid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_idRifa_fkey" FOREIGN KEY ("idRifa") REFERENCES "Rifa"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_idUser_fkey" FOREIGN KEY ("idUser") REFERENCES "User"("uid") ON DELETE CASCADE ON UPDATE CASCADE;
