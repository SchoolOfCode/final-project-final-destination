export async function GET(request) {
  const memoryUsage = process.memoryUsage();

  return new Response(
    JSON.stringify({
      rss: `${(memoryUsage.rss / 1024 / 1024).toFixed(2)} MB`,
      heapTotal: `${(memoryUsage.heapTotal / 1024 / 1024).toFixed(2)} MB`,
      heapUsed: `${(memoryUsage.heapUsed / 1024 / 1024).toFixed(2)} MB`,
      external: `${(memoryUsage.external / 1024 / 1024).toFixed(2)} MB`,
    }),
    {
      status: 200, // Set the HTTP status code
      headers: { 'Content-Type': 'application/json' }, // Set appropriate headers
    }
  );
}
