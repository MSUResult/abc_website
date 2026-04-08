

export async function getGoogleReviews(){

    const placeId = "7095965674458396405";
    const apiKey  = process.env.GOOGLE_MAPS_API_KEY;

    const res= await fetch(
      `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=reviews,rating&key=${apiKey}`
    )
    const data = await res.json();

 // THIS IS THE FIX: Check if 'result' exists before accessing reviews
    if (!data.result) {
        console.error("Google API Error Response:", data); // This will show the real error in your terminal
        return []; // Return an empty array so the frontend doesn't crash
    }

    return data.result.reviews || [];

}