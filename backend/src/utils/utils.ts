export function getRandomDelay({
  minDelay = 5 * 1000,
  maxDelay = 5 * 60 * 1000,
}: { minDelay?: number; maxDelay?: number } = {}): number {
  return Math.random() * (maxDelay - minDelay) + minDelay;
}
