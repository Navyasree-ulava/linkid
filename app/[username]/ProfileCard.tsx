import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ProfileHeader } from "./ProfileHeader";
import { ProfileLinks } from "./ProfileLinks";
import { ProfileCTA } from "./ProfileCTA";
import { User } from "./types/type";    

export function ProfileCard(props: User) {
    const { user, username, showCTA } = props;
    return (
        <Card className="shadow-lg">
            <CardHeader className="pb-2">
                <ProfileHeader name={user.name} username={username} />
            </CardHeader>

            <CardContent className="space-y-3">
                <ProfileLinks links={user.links} username={username} />
                {showCTA && <ProfileCTA />}
            </CardContent>
        </Card>
    );
}
