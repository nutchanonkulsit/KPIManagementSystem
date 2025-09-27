// src/environments/environment.ts
export interface Environment {
  production: boolean;
  apiUrl: string;
  appName: string;
}

export const environment: Environment = {
  production: false,
  apiUrl: 'http://localhost:3000/api',
  appName: 'KPI',
};
