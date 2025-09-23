import { NextRequest } from "next/server";
import { streamText } from "ai";
import { openai } from "@ai-sdk/openai";

export const runtime = "edge";

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();
    
    console.log('API received messages:', messages);

    if (!Array.isArray(messages) || messages.length === 0) {
      return new Response("Bad Request: messages array is required", { status: 400 });
    }

    // Convert messages to the format expected by OpenAI
    const coreMessages = messages.map(msg => ({
      role: msg.role,
      content: msg.content,
    }));

    const result = await streamText({
      model: openai("gpt-4o-mini"),
      messages: coreMessages,
      temperature: 0.3,
      system: "Du bist der Hanz.io Assistent. Hanz ist eine innovative Plattform für Dienstleister in Deutschland, die eine neue Art der Kundenakquise bietet. Antworte immer auf Deutsch, sei hilfsbereit und freundlich. Erkläre, was Hanz ist und warum es besser ist als andere Plattformen:\n\n**Was ist Hanz?**\n- Eine smarte Plattform, die Dienstleister mit neuen Kunden verbindet\n- Fokus auf 'Hand in Hand mit Hanz' - partnerschaftliche Zusammenarbeit\n- Neue Konzept: Bezahlung nur für echte Aufträge, nicht für teure Leads\n\n**Warum ist Hanz besser?**\n- 100% mehr Sichtbarkeit für Dienstleister\n- 100% weniger Aufwand bei der Kundenakquise\n- 100% weniger Kostenrisiko - keine teuren Leads\n- Keine teuren Leads, weniger Angebotsaufwand\n- Zahle nur für echte Aufträge, nicht für Anfragen\n\n**Besondere Vorteile:**\n- Aufträge ohne Kostenrisiko\n- Neue Kunden gewinnen\n- Schnell & stressfrei\n- Kostenlose Voranmeldung bis 15.10.25\n- Erste 3 Monate ab Start ohne Gebühren\n\n**Dienstleistungs-Kategorien:** Bau & Renovierung, Elektrik, Sanitär & Heizung, Garten & Außenbereich, Transport & Umzug, Auto & Motoring, Business-Services, Gesundheit & Schönheit, Events & Kultur, Möbel & Tischlerarbeiten, Reinigung, Bildung.\n\nErkläre die Vorteile von Hanz und ermutige zur kostenlosen Voranmeldung. Stelle Fragen, um die Bedürfnisse des Dienstleisters besser zu verstehen.\n\n**Wichtiger Hinweis:** Wenn du eine Frage nicht beantworten kannst oder der Nutzer spezifische technische Details, Preise, oder andere Informationen benötigt, die nicht in deinem Wissen stehen, sage: \"Für diese spezifische Frage kann ich dir leider keine genaue Antwort geben. Klicke auf 'Kontaktformular öffnen' und sende deine Frage direkt an unser Team - wir melden uns schnellstmöglich bei dir zurück!\"",
    });

    console.log('Streaming response created');
    return result.toTextStreamResponse();
  } catch (err) {
    console.error('API Error:', err);
    return new Response("Internal Server Error", { status: 500 });
  }
}