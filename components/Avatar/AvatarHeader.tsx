"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CreditCard, LogOut, UserRound } from "lucide-react";
import { Separator } from "../ui/separator";
interface AvatarHeaderProps {
  nickname: string;
  email: string;
}
export const AvatarHeader = ({ email, nickname }: AvatarHeaderProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="size-10 cursor-pointer">
          <AvatarImage src="https://github.com/shadcn.png" alt="avatar" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[200px]">
        <DropdownMenuLabel className="text-center">
          My Account
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onSelect={(e) => e.preventDefault()}
          className="flex flex-col gap-2"
        >
          <Avatar className="size-10">
            <AvatarImage src="https://github.com/shadcn.png" alt="avatar" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="body-3">{nickname}</div>
          <div className="body-2">{email}</div>
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer">
          <CreditCard />
          Billing
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer">
          <UserRound />
          Account
        </DropdownMenuItem>
        <Separator />
        <DropdownMenuItem className="h-12 cursor-pointer">
          <LogOut />
          Log-Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
