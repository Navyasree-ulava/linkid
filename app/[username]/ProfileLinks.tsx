import { ProfileLinkItem } from "./ProfileLinkItem";
import { EmptyProfileState } from "./EmptyProfileState";

export function ProfileLinks({ links,username }: { links: any[] ,username:string}) {
    if (links.length === 0) {
        return <EmptyProfileState />;
    }

    return (
        <div className="space-y-3">
            {links.map((link) => (
                <ProfileLinkItem key={link.id} link={link} username = {username} />
            ))}
        </div>
    );
}
