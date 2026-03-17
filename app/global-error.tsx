"use client";

export default function GlobalError({ error, reset }) {
  return (
    <html>
      <body className="h-screen flex flex-col items-center justify-center">
        <h1>Something broke 😢</h1>
        <button onClick={() => reset()}>Reload Site</button>
      </body>
    </html>
  );
}
