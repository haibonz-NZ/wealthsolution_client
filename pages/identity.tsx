import { useState } from 'react';
import Link from 'next/link';

// 简化实现：两国区域（US、JP）+ 身份托盘（本人/配偶/子女/父母）
// 目标：拖拽头像到国家区域，触发命中高亮动画与标签生成

type AvatarId = 'self' | 'spouse' | 'child' | 'parent';

const COUNTRIES = [
  { id: 'US', name: '美国 US', style: { left: '8%', top: '24%', width: '32%', height: '28%' } },
  { id: 'JP', name: '日本 JP', style: { left: '60%', top: '32%', width: '26%', height: '22%' } },
];

export default function Identity() {
  const [dragged, setDragged] = useState<AvatarId | null>(null);
  const [highlight, setHighlight] = useState<{ [key: string]: boolean }>({});
  const [tags, setTags] = useState<string[]>([]);
  const [lastDrop, setLastDrop] = useState<string>('');

  const onDragStart = (id: AvatarId) => setDragged(id);
  const onDragOver = (e: React.DragEvent<HTMLDivElement>) => e.preventDefault();
  const onDrop = (countryId: string) => {
    if (!dragged) return;
    // 命中高亮动画
    setHighlight((h) => ({ ...h, [countryId]: true }));
    setLastDrop(`${dragged} → ${countryId}`);
    // 生成示例标签（真实规则后端计算，这里先前端占位）
    const newTags: string[] = [];
    if (countryId === 'US') {
      newTags.push('US_TAX_RESIDENT');
    }
    if (countryId === 'JP') {
      newTags.push('JP_RES_10Y');
    }
    setTags((prev) => Array.from(new Set([...prev, ...newTags])));
    setDragged(null);
    // 2秒后移除高亮效果（保留标签）
    setTimeout(() => setHighlight((h) => ({ ...h, [countryId]: false })), 2000);
  };

  return (
    <main className="min-h-screen bg-cream text-deepblue p-8">
      <h2 className="text-2xl font-semibold mb-2">身份地图：拖拽头像到国家区域</h2>
      <p className="mb-4 text-sm opacity-80">将下方头像拖拽到地图上的国家区域，会触发命中高亮与标签生成（示例：US_TAX_RESIDENT / JP_RES_10Y）。</p>

      <div className="grid grid-cols-3 gap-6">
        {/* 地图与国家区域 */}
        <div className="relative bg-white border border-copper rounded h-[440px] overflow-hidden">
          <div className="absolute inset-0 opacity-10 pointer-events-none" aria-hidden>
            {/* 简化的背景栅格 */}
            <svg width="100%" height="100%">
              <defs>
                <pattern id="grid" width="24" height="24" patternUnits="userSpaceOnUse">
                  <path d="M 24 0 L 0 0 0 24" fill="none" stroke="#0C2340" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>

          {COUNTRIES.map((c) => (
            <div
              key={c.id}
              className={`country-box ${highlight[c.id] ? 'highlight' : ''}`}
              style={{ position: 'absolute', ...c.style as any }}
              onDragOver={onDragOver}
              onDrop={() => onDrop(c.id)}
              role="button"
              aria-label={`country-${c.id}`}
            >
              <div className="font-semibold mb-1">{c.name}</div>
              <div className="text-xs opacity-80">拖拽头像到这里</div>
            </div>
          ))}
        </div>

        {/* 侧边信息流：标签与红绿灯 */}
        <div className="bg-white border border-copper rounded p-4">
          <h3 className="font-semibold mb-2">标签与红绿灯</h3>
          {tags.length === 0 ? (
            <div className="text-sm opacity-70">尚未生成标签</div>
          ) : (
            <ul className="space-y-1">
              {tags.map((t) => (
                <li key={t} className="flex items-center gap-2 text-sm">
                  <span className={`inline-block w-2 h-2 rounded-full ${t.includes('US') ? 'bg-red-600' : t.includes('JP') ? 'bg-yellow-500' : 'bg-green-600'}`}></span>
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          )}
          {lastDrop && (
            <div className="mt-3 text-xs opacity-70">最近命中：{lastDrop}</div>
          )}
        </div>

        {/* 身份托盘（头像） */}
        <div className="bg-white border border-copper rounded p-4">
          <h3 className="font-semibold mb-2">身份托盘</h3>
          <div className="flex flex-wrap gap-3">
            {(['self', 'spouse', 'child', 'parent'] as AvatarId[]).map((id) => (
              <div
                key={id}
                className="avatar-chip"
                draggable
                onDragStart={() => onDragStart(id)}
                aria-grabbed={dragged === id}
                role="button"
                aria-label={`avatar-${id}`}
              >
                {id === 'self' && '本人'}
                {id === 'spouse' && '配偶'}
                {id === 'child' && '子女'}
                {id === 'parent' && '父母'}
              </div>
            ))}
          </div>
          <div className="mt-4 text-xs opacity-70">
            提示：拖拽头像到地图上的国家区域（US/JP）以查看高亮动画与标签生成效果。
          </div>
          <div className="mt-6">
            <Link href="/assets" className="px-4 py-2 rounded bg-copper text-white">下一步</Link>
          </div>
        </div>
      </div>
    </main>
  );
}
