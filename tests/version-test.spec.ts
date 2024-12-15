import { test, expect } from '@playwright/test';

test.describe('GET /version', () => {
  test('should return the current version of the application', async ({ request }) => {
    const response = await request.get('/version');
    expect(response.status()).toBe(200);

    const version = await response.text();
    expect(version).toBeDefined();
  });
   //The /version endpoint returns 418 I'm a Teapot when accessed via POST/PUT and with an empty payload. 
   //This response seems incorrect for a versioning endpoint and may indicate unintended behavior

  test('should reject when POST method is used on /version', async ({ request }) => {
    const response = await request.post('/version');
    expect(response.status()).toBe(418); //Ideally this should be 405 but this is how API behaves
  
    const responseBody = await response.text();
    expect(responseBody).toBe("I'm a Teapot");
  });
  test('should return a consistent response for empty payload in POST', async ({ request }) => {
    const response = await request.post('/version', { data: {} });
    expect(response.status()).toBe(418); 

    const responseBody = await response.text();
    expect(responseBody).toBe("I'm a Teapot"); 
  });

  test('should handle unsupported methods (e.g., PUT) gracefully', async ({ request }) => {
    const response = await request.put('/version');
    expect(response.status()).toBe(418); //Ideally this should be 405 but this is how API behaves

    const responseBody = await response.text();
    expect(responseBody).toBe("I'm a Teapot");
  });
});