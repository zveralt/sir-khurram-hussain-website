"use client";

import { MessageCircle } from "lucide-react";
import { hasWhatsApp, whatsAppChatUrl } from "@/lib/site-config";

export function WhatsAppFloat() {
  if (!hasWhatsApp()) return null;
  const href = whatsAppChatUrl();
  if (!href) return null;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-float"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="h-5 w-5" strokeWidth={1.75} />
    </a>
  );
}
