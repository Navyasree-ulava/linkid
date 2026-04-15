// lib/generateQRCode.ts  ← move generateQRCode here
import QRCodeLib from "qrcode";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";

export async function generateQRCode() {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user?.email) redirect("/login");
        const user = await prisma.user.findUnique({
            where: { email: session.user.email },
        });
        if (!user?.username) redirect("/dashboard");
        const url = `https://linkid.qzz.io/${user.username}`;
        return await QRCodeLib.toDataURL(url);
    } catch (error) {
        console.error(error);
    }
}