export async function POST(request: Request) {
  if (process.env.NODE_ENV === "production") {
    return Response.json(
      { error: "Analytics disabled in production" },
      { status: 403 }
    );
  }

  const apiBaseUrl = process.env.API_URL || "http://localhost:30001";
  const body = await request.json();

  const res = await fetch(`${apiBaseUrl}/analytics/events`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
    cache: "no-store",
  });

  const text = await res.text();
  return new Response(text, {
    status: res.status,
    headers: { "content-type": res.headers.get("content-type") || "application/json" },
  });
}

