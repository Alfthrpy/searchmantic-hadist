import { NextResponse } from "next/server";

export async function GET(req: Request) {
  // Ambil query parameters dari URL
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("query");
  const hadits = searchParams.get("hadits");

  if (!query || !hadits) {
    return NextResponse.json({ error: "Missing query or hadits parameters" }, { status: 400 });
  }

  // Ambil SECRET_KEY dari environment server-side
  const SECRET_KEY = process.env.SECRET_KEY;

  if (!SECRET_KEY) {
    return NextResponse.json({ error: "SECRET_KEY is not configured" }, { status: 500 });
  }

  try {
    // URL API eksternal
    const externalApiUrl = `${process.env.API_ENDPOINT_NGROK}/api/search?query=${encodeURIComponent(
      query
    )}&hadits=${encodeURIComponent(hadits)}`;

    // Fetch ke API eksternal dengan Bearer Token
    const response = await fetch(externalApiUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${SECRET_KEY}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.statusText}`);
    }

    const data = await response.json();

    // Return hasil dari API eksternal
    return NextResponse.json(data);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error : any) {
    return NextResponse.json(
      { error: error.message || "Something went wrong" },
      { status: 500 }
    );
  }
}
