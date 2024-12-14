import { Page } from '@playwright/test';

type TriangleVariable = number | string;

export class TriangleCalculatorPage {
  constructor(readonly page: Page) {}

  readonly versionEndpoint = '/version';
  readonly triangleEndpoint = '/';

  async checkTriangleType(variables: TriangleVariable[]) {
    const a = variables[0];
    const b = variables[1];
    const c = variables[2];

    return await this.page.request.post(this.triangleEndpoint, {
      data: { a, b, c}
    });
  }
}

