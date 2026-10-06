export type Result = { service: string; before: string; after: string; caption: { en: string; ar: string } };
// Add entries only for real patients with written consent. Images go in public/results/.
export const results: Result[] = [];
