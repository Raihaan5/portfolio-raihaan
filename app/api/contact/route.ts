export const runtime = "nodejs";

type ContactPayload = {
  email?: unknown;
  message?: unknown;
  name?: unknown;
  subject?: unknown;
  website?: unknown;
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function readText(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export async function POST(request: Request) {
  let payload: ContactPayload;

  try {
    payload = await request.json();
  } catch {
    return Response.json({ message: "Pedido inválido." }, { status: 400 });
  }

  const honeypot = readText(payload.website);
  if (honeypot) {
    return Response.json({ ok: true });
  }

  const name = readText(payload.name);
  const email = readText(payload.email);
  const subject = readText(payload.subject);
  const message = readText(payload.message);

  if (!name || !email || !subject || !message) {
    return Response.json({ message: "Preencha todos os campos." }, { status: 400 });
  }

  if (!emailPattern.test(email)) {
    return Response.json({ message: "Informe um email válido." }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL || "raihaanabubacar@gmail.com";
  const from = process.env.CONTACT_FROM_EMAIL || "Portfolio <onboarding@resend.dev>";

  if (!apiKey) {
    return Response.json(
      { message: "Envio ainda não configurado. Defina RESEND_API_KEY no ambiente do site." },
      { status: 503 },
    );
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to,
      reply_to: email,
      subject: `Portfolio: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; color: #172338; line-height: 1.6;">
          <h2 style="margin: 0 0 16px;">Nova mensagem pelo portfolio</h2>
          <p><strong>Nome:</strong> ${escapeHtml(name)}</p>
          <p><strong>Email:</strong> ${escapeHtml(email)}</p>
          <p><strong>Assunto:</strong> ${escapeHtml(subject)}</p>
          <p><strong>Mensagem:</strong></p>
          <p style="white-space: pre-line;">${escapeHtml(message)}</p>
        </div>
      `,
      text: [
        "Nova mensagem pelo portfolio",
        "",
        `Nome: ${name}`,
        `Email: ${email}`,
        `Assunto: ${subject}`,
        "",
        message,
      ].join("\n"),
    }),
  });

  if (!response.ok) {
    return Response.json(
      { message: "Não foi possível enviar agora. Tente novamente mais tarde." },
      { status: 502 },
    );
  }

  return Response.json({ ok: true });
}
