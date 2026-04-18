"use client";
import { useState } from "react";
import { DashboardNavbar } from "@/app/components/DashboardNavbar";
import { getCsrfToken } from "@/lib/csrfClient";
import toast, { Toaster } from "react-hot-toast";
import { LinksSection } from "./LinksSection";
import { LinkIdCard } from "./LinkIdCard";

type DashboardLink = {
    id: string;
    url: string;
} & Record<string, unknown>;

export default function DashboardClient({
    username,
    initialLinks,
    qrCode,
}: {
    username: string;
    initialLinks: DashboardLink[];
    qrCode?: React.ReactNode;
}) {
    const [links, setLinks] = useState(initialLinks);
    const [showAdd, setShowAdd] = useState(false);

    async function addLink(link: DashboardLink) {
        setLinks((prev) => [...prev, link]);
        setShowAdd(false);
    }

    async function updateLink(id: string, url: string) {
        const csrfToken = await getCsrfToken();

        await fetch(`/api/links/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "x-csrf-token": csrfToken,
            },
            body: JSON.stringify({ url }),
        });
        toast.success("Link updated");

        setLinks((prev) =>
            prev.map((l) =>
                l.id === id ? { ...l, url } : l
            )
        );
    }

    async function deleteLink(id: string) {
        if (!confirm("Delete this link?")) return;

        const csrfToken = await getCsrfToken();

        await fetch(`/api/links/${id}`, {
            headers: {
                "x-csrf-token": csrfToken,
            },
            method: "DELETE",
        });
        toast.success("Link deleted");
        setLinks((prev) => prev.filter((l) => l.id !== id));
    }

    return (
        <>
            <DashboardNavbar />
            <Toaster position="bottom-center" />

            <main className="mx-auto max-w-6xl px-6 py-10 space-y-10">
                <section>
                    <h1 className="text-3xl font-bold">Welcome, {username}</h1>
                    <p className="text-muted-foreground">
                        Manage and share your professional links
                    </p>
                </section>

                <LinkIdCard username={username} qrCode={qrCode} />

                <LinksSection
                    username={username}
                    links={links}
                    showAdd={showAdd}
                    setShowAdd={setShowAdd}
                    onAdd={addLink}
                    onUpdate={updateLink}
                    onDelete={deleteLink}
                />

                <footer className="pt-10 border-t text-center text-sm text-muted-foreground">
                    © {new Date().getFullYear()} LinkID · Built for developers
                </footer>
            </main>
        </>
    );
}
