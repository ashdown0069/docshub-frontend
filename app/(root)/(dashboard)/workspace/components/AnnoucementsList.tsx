"use client";
import { ScrollArea } from "@/components/ui/scroll-area";
import { PackageOpen } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface Announcement {
  _id: string;
  title: string;
  description: string;
  createdAt: string;
}

export default function AnnouncementsList({
  announcements,
}: {
  announcements: Announcement[];
}) {
  if (announcements.length === 0) {
    return (
      <div className="flex h-72 items-center justify-center rounded-2xl border bg-white">
        <div className="flex gap-2">
          <PackageOpen size={25} />
          <p>No announcements yet</p>
        </div>
      </div>
    );
  }

  return (
    <ScrollArea className="h-72 rounded-2xl border-2">
      <div className="p-4">
        <h4 className="body-2 mb-4">Recent Announcements</h4>
        {announcements.map((announcement) => (
          <Dialog key={announcement._id}>
            <DialogTrigger asChild>
              <div className="cursor-pointer rounded-md p-2 hover:bg-accent">
                <div className="flex justify-between gap-1">
                  <div className="body-2">{announcement.title}</div>
                  <div className="body-3 text-gray-500">
                    {announcement.createdAt.slice(0, 10)}
                  </div>
                </div>
              </div>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{announcement.title}</DialogTitle>
                <DialogDescription className="py-4">
                  {announcement.description}
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        ))}
      </div>
    </ScrollArea>
  );
}
