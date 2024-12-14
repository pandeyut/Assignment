import { TriangleCalculatorPage } from '../models/triangleCalculatorPage';
import { expect, test } from '@playwright/test';

type TriangleResult = 'equilateral' | 'isosceles' | 'versatile';

interface TriangleTest {
  arguments: Array<string | number>;
  result?: TriangleResult;
  error?: string;
  status: number;
}

const triangleTestSet: Array<TriangleTest & { isValid: boolean }> = [
    // Valid cases
    { arguments: [10, 10, 10], result: 'equilateral', status: 200, isValid: true },
    { arguments: [10, '10', 10], result: 'equilateral', status: 200, isValid: true },
    { arguments: [10, 10, 15], result: 'isosceles', status: 201, isValid: true },
    { arguments: [10, 12, 15], result: 'versatile', status: 200, isValid: true },
  
    // Invalid cases
    { arguments: [10, 2, 1], error: 'Sum of any 2 sides should be greater than the 3rd', status: 418, isValid: false },
    { arguments: [10, '@', 1], error: 'All triangle sides should be numeric', status: 422, isValid: false },
    { arguments: [10, 10], error: 'Triangle should have 3 side', status: 422, isValid: false },
    { arguments: [10, 'something', 10], error: 'All triangle sides should be numeric', status: 422, isValid: false },
    { arguments: [0, 0, 0], error: 'All triangle sides should be greater than 0', status: 422, isValid: false },
    { arguments: [10, 10, 10, 5], error: 'Invalid input', status: 422, isValid: false },
    { arguments: [], error: 'Triangle should have 3 side', status: 422, isValid: false },
  ];
  
  test.describe('Triangle Calculator API Tests', () => {
    triangleTestSet.forEach((testData, index) => {
      if (testData.isValid) {
        test(`[${index}] Valid: should return ${testData.result} with status ${testData.status}`, async ({ page }) => {
          const trianglePage = new TriangleCalculatorPage(page);
  
          const response = await trianglePage.checkTriangleType(testData.arguments);
          expect(response.status()).toBe(testData.status);
  
          const result = (await response.json()).result;
          expect(result).toBe(`This is ${testData.result} triangle`);
        });
      } else {
        test(`[${index}] Invalid: should reject with status ${testData.status} for invalid input`, async ({ page }) => {
          const trianglePage = new TriangleCalculatorPage(page);
  
          const response = await trianglePage.checkTriangleType(testData.arguments);
          expect(response.status()).toBe(testData.status);
  
          const error = (await response.json()).error;
          expect(error).toBe(testData.error);
        });
      }
    });
  });
  
