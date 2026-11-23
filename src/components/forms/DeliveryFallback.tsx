import { hasWhatsApp, whatsAppChatUrl } from "@/lib/site-config";
import { skhContact } from "@/lib/site";

export function DeliveryFallback() {
  const whatsApp = hasWhatsApp() ? whatsAppChatUrl() : null;

  return (
    <p role="alert" className="text-sm leading-relaxed text-fg">
      We couldn&apos;t send this right now. Email{" "}
      <a className="link-u" href={`mailto:${skhContact.email}`}>
        {skhContact.email}
      </a>
      {whatsApp ? (
        <>
          {" "}
          or{" "}
          <a className="link-u" href={whatsApp}>
            WhatsApp
          </a>
        </>
      ) : null}
      .
    </p>
  );
}
