import { NextResponse } from "next/server";

// Reads today's gold rate from the shop's current website, which renders it on the server.
// Cached for 5 minutes. If the source changes or is unreachable, the client falls back to the last known rate.
const SOURCE = "https://www.nalukandathilgold.in/";

export const revalidate = 300; // refresh the cached rate every 5 minutes in production

const num = (s) => (s ? Number(String(s).replace(/,/g, "")) : null);

export async function GET() {
  try {
    const res = await fetch(SOURCE, {
      next: { revalidate: 300 },
      headers: { "user-agent": "Mozilla/5.0 (compatible; NalukandathilSite/1.0)" },
    });
    if (!res.ok) throw new Error(`source ${res.status}`);
    const html = await res.text();

    const start = html.indexOf('class="gldrate');
    if (start < 0) throw new Error("rate section not found");
    const end = html.indexOf("Daily Gold Rate Posters", start);
    const block = html.slice(start, end > start ? end : start + 4000);

    const gram = num(block.match(/1\s*Gram<\/p>\s*<span[^>]*>\s*₹\s*([\d,]+)/i)?.[1]);
    const eight = num(block.match(/8\s*Grams<\/p>\s*<span[^>]*>\s*₹\s*([\d,]+)/i)?.[1]);
    if (!gram || !eight) throw new Error("rate values not found");

    const rawChange = block.match(/<b>\s*([^<]*?)\s*<\/b>/i)?.[1]?.replace(/\s+/g, " ").trim() || "";
    const change = rawChange.replace(/^[↑↓▲▼•\s]+/, ""); // arrow is drawn by the UI
    const updated = block.match(/Last Update\s*:\s*([\d./-]+)/i)?.[1] || "";
    const amount = num(change.match(/₹\s*([\d,]+)/)?.[1]);
    const dir = /increase|↑|up/i.test(change) ? "up" : /decrease|↓|down|drop/i.test(change) ? "down" : "same";

    return NextResponse.json(
      { gram, eight, change, amount, dir, updated, live: true },
      { headers: { "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600" } }
    );
  } catch (e) {
    return NextResponse.json({ live: false, error: String(e.message || e) }, { status: 502 });
  }
}
