import { expect, request } from "@playwright/test";
import config from "../../../../config";

export async function getSpi(token: string, type = 'all') {
    const apiRequestContext = await request.newContext({
      extraHTTPHeaders: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    });
    const response = await apiRequestContext.get(`${config.apiUrl}/`);
    return response;
  }
  
