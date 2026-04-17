import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function ProfileHeader({
  name,
  username,
  image,
}: {
  name?: string | null;
  username: string;
  image: string | null;
}) {
  return (
    <div className="text-center space-y-2">
      <Avatar className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-muted ">
        <AvatarImage src={image ?? ""} />
        <AvatarFallback className="text-2xl font-bold">
          {(name ?? username)[0]?.toUpperCase()}
        </AvatarFallback>
      </Avatar>

      <div>
        <h1 className="text-2xl font-bold">{name ?? username}</h1>
        <p className="text-sm text-muted-foreground">@{username}</p>
      </div>
    </div>
  );
}
