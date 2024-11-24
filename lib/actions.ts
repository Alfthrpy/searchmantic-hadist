'use server'

export async function searchHadith(query: string, hadits: string) {
  if (!query.trim() || !hadits.trim()) {
    return [];
  }

  const SECRET_KEY = process.env.SECRET_KEY;

  if (!SECRET_KEY) {
    throw new Error("SECRET_KEY is not configured");
  }

  try {
    const externalApiUrl = `${process.env.API_ENDPOINT_NGROK}/api/search?query=${encodeURIComponent(
      query
    )}&hadits=${encodeURIComponent(hadits)}`;

    const response = await fetch(externalApiUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${SECRET_KEY}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Search error:", error);
    throw new Error("Failed to fetch results");
  }
}