import type { ProfileHeader } from "./types/type";

export function ProfileHeader(props: ProfileHeader) {
    const { name, username } = props;
    return (
        <div className="text-center space-y-2">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-muted text-2xl font-bold">
                {(name ?? username)[0]?.toUpperCase()}
            </div>

            <div>
                <h1 className="text-2xl font-bold">{name ?? username}</h1>
                <p className="text-sm text-muted-foreground">@{username}</p>
            </div>
        </div>
    );
}
