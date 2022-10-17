import { Handler } from "@netlify/functions";
import axios from 'axios';

const handler: Handler = async (event, context) => {
  if (!event.queryStringParameters) throw new Error('Missing query parameters');
  const { lat, long, lang } = event.queryStringParameters;
  const API_KEY = process.env.API_KEY;

  // forecast for 5 days with 3 hours step
  const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&appid=${API_KEY}&lang=${lang}`;

  try {
    const { data } = await axios.get(url);

    return {
      statusCode: 200,
      body: JSON.stringify(data)
    }
  } catch (error) {
    // check if the error was thrown from axios
    if (axios.isAxiosError(error)) {
      const { status, message, code } = error;

      return {
        statusCode: status!,
        body: JSON.stringify({ status, message, code }),
      };
    } else {
      throw new Error('different error than axios');
    }
  }
};

export { handler };