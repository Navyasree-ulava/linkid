import prisma from "@/lib/prisma";
import { redirect, notFound } from "next/navigation";
import { PlatformParams } from "../types/type";

export default async function PlatformRedirect({
    params,
}: {
    params: Promise<PlatformParams>;
}) {
    const { username, platform } = await params;

    const link = await prisma.link.findFirst({
        where: {
            platform,
            user: { username },
        },
    });

    if (!link) {
        notFound();
    }

    await prisma.link.update({
        where: { id: link.id },
        data: { clicks: { increment: 1 } },
    });

    redirect(link.url);
}
