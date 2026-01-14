import Link from 'next/link';
import { useState } from 'react';

export default function Entry() {
  const [consent, setConsent] = useState(false);
  return (
    <main className="min-h-screen bg-cream text-deepblue p-8">
      <h2 className="text-2xl font-semibold mb-4">匿名与隐私承诺</h2>
      <p className="mb-4">当前为匿名扫描模式，数据本地暂存（会话结束自动清除）。</p>
      <label className="flex items-center gap-2 mb-6">
        <input type="checkbox" checked={consent} onChange={() => setConsent(!consent)} />
        <span>我已阅读并同意匿名隐私协议</span>
      </label>
      <Link
        href={consent ? '/identity' : '#'}
        className={`px-6 py-3 rounded ${consent ? 'bg-copper text-white' : 'bg-gray-400 text-white cursor-not-allowed'}`}
      >
        开始录入
      </Link>
    </main>
  );
}
