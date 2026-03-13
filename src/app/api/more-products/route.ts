export async function GET() {
  const res = await fetch(
    "https://v0-api-endpoint-request.vercel.app/api/more-products",
  );
  const data = await res.json();
  return Response.json(data, { status: res.status });
}
