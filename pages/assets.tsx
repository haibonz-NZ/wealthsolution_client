import Link from 'next/link';

export default function Assets() {
  return (
    <main className="min-h-screen bg-cream text-deepblue p-8">
      <h2 className="text-2xl font-semibold mb-4">资产画像</h2>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
        {['房产','公司股权','金融账户','大额保单','其他'].map((x) => (
          <div key={x} className="p-4 border border-copper rounded bg-white text-deepblue">{x}</div>
        ))}
      </div>
      <div className="mb-6">
        <p className="mb-2">模糊估值区间（USD）</p>
        <div className="flex gap-2 flex-wrap">
          {['<500w','500-2000w','2000-5000w','>5000w'].map((x) => (
            <span key={x} className="px-3 py-2 border border-copper rounded bg-white">{x}</span>
          ))}
        </div>
      </div>
      <div className="mb-10">
        <p className="mb-2">资产所在地</p>
        <div className="flex gap-2 flex-wrap">
          {['CN','US','UK','CA','AU','JP','HK','SG'].map((x) => (
            <span key={x} className="px-3 py-2 border border-copper rounded bg-white">{x}</span>
          ))}
        </div>
      </div>
      <Link href="/dashboard" className="px-6 py-3 rounded bg-copper text-white">继续</Link>
    </main>
  );
}
