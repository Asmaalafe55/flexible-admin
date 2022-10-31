interface EnvVariables {
  apiUrl: string
}

export const env: EnvVariables = {
  apiUrl: process.env.API_URL || 'http://localhost:4000'
}
