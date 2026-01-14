import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-deepblue text-cream flex flex-col items-center justify-center p-8">
      <h1 className="text-3xl font-semibold mb-4">预见风险，守护传承</h1>
      <p className="mb-6">3分钟极简匿名体检 · GWRC</p>
      <Link href="/entry" className="px-6 py-3 rounded bg-copper text-white hover:opacity-90">开始体检</Link>
      <div className="mt-8 text-sm opacity-80">theonefo.com · wealthsolution_client</div>
    </main>
  );
}
