// components/QRCodeButton.tsx
"use client";

import { useState } from "react";
import { QrCode, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface QRCodeButtonProps {
  qrCode: string;
}

export default function QRCodeButton({ qrCode }: QRCodeButtonProps) {
  const [open, setOpen] = useState(false);

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = qrCode;
    link.download = "qrcode.png";
    link.click();
  };

  return (
    <>
      <Button variant="outline" size="sm" onClick={() => setOpen(true)} className="flex items-center gap-2">
        <QrCode className="h-4 w-4" />
        Show QR Code
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-xs">
          <DialogHeader>
            <DialogTitle className="text-center">Your QR Code</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center gap-4 py-2">
            <img src={qrCode} alt="QR Code" className="h-48 w-48 rounded-md border" />
            <Button onClick={handleDownload} className="w-full gap-2">
              <Download className="h-4 w-4" />
              Download QR Code
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}