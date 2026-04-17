export type Link = {
    label: string;
    id: string;
    createdAt: Date;
    platform: string;
    url: string;
    order: number;
    clicks: number;
    userId: string;
}

export type PlatformParams = {
    platform: string;
    username: string;
}

export type User = {
    user: {
        name: string | null;
        username: string;
        links: Link[]
    };
    username: string;
    showCTA: boolean;
}


export type ProfileHeader = {
    name: string | null;
    username: string;
}

export type ProfileLinks = {
    link: Link;
    username: string;
}

