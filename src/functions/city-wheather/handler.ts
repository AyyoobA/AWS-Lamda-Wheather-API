import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { successResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import axios from 'axios';
require('dotenv').config();
import schema from './schema';

const OPENWEATHERMAP_API_KEY = "66710cb00f905feb17186c05c23acc0b"

const city_wheather: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {

  const { city } = event.body;

  const response = await axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${OPENWEATHERMAP_API_KEY}`);
  
  return successResponse({
    wheather: response.data,
  });
};

export const main = middyfy(city_wheather);

