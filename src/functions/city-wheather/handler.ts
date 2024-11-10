import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { clientErrorResponse, successResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import axios from 'axios';
require('dotenv').config();
import schema from './schema';

const OPENWEATHERMAP_API_KEY = "66710cb00f905feb17186c05c23acc0b"

const city_wheather: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {

  const { city } = event.body;

  if (!city) {
    return clientErrorResponse({
      Error: "Please enter a city"
    });
  }

  try {
    const response = await axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${OPENWEATHERMAP_API_KEY}`);

    if (response.data.length === 0) {
      return clientErrorResponse({
        Error: `No weather data found for city: ${city}`
      });
    }

    return successResponse({
      wheather: response.data,
    });
  } catch (error) {
    return clientErrorResponse({
      Error: `Unexpected error occurred - ${error.message}`,
    });
  }
};

export const main = middyfy(city_wheather);

