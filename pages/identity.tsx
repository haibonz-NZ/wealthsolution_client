import Link from 'next/link';

export default function Identity() {
  return (
    <main className="min-h-screen bg-cream text-deepblue p-8">
      <h2 className="text-2xl font-semibold mb-4">身份地图（示意）</h2>
      <p className="mb-4">拖拽与国家逻辑弹窗将在后续迭代中实现。本版为静态占位以完成最小闭环。</p>
      <div className="border border-copper rounded p-6 bg-white mb-8">世界地图占位（Drag & Drop）</div>
      <div className="border border-copper rounded p-6 bg-white mb-8">侧边栏标签与红绿灯占位</div>
      <Link href="/assets" className="px-6 py-3 rounded bg-copper text-white">下一步</Link>
    </main>
  );
}
