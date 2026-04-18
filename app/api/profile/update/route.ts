import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
        return new Response("Unauthorized", { status: 401 });
    }

    const { name, username,bio } = await req.json();

     if (bio && bio.length > 160) {
        return Response.json(
            { error: "Bio must be under 160 characters" },
            { status: 400 }
        );
    }
    await prisma.user.update({
        where: { email: session.user.email },
        data: {
            name,
            username,
            bio: bio?.trim() || null,
        },
    });

    return Response.json({ success: true });
}
