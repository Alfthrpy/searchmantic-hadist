'use server'

export async function searchHadith(query: string, hadits: string,limit:string) {
  if (!query.trim() || !hadits.trim() || !limit.trim()) {
    return [];
  }

  const SECRET_KEY = process.env.SECRET_KEY;

  if (!SECRET_KEY) {
    throw new Error("SECRET_KEY is not configured");
  }

  try {
    const externalApiUrl = `${process.env.API_ENDPOINT_NGROK}/api/search`;
    console.log("External API URL:", externalApiUrl);

    const response = await fetch(externalApiUrl, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json', 
        'Authorization': `Bearer ${SECRET_KEY}`,
      },
      body: JSON.stringify({
        "query": query,
        "hadits": hadits,
        "all_source":false
      })
    });
    
    if (!response.ok) {
      return {error : response.statusText};
    }
    return await response.json();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error : any) {
    console.error("Search error:", error);
    return {error : error.message};
  }
}