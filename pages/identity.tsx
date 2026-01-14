import { useState } from 'react';
import Link from 'next/link';

type AvatarId = 'self' | 'spouse' | 'child' | 'parent';

type ModalAnswer = {
  [key: string]: string | boolean;
};

const COUNTRIES = [
  { id: 'US', name: '美国 US', style: { left: '8%', top: '24%', width: '32%', height: '28%' } },
  { id: 'JP', name: '日本 JP', style: { left: '60%', top: '32%', width: '26%', height: '22%' } },
];

export default function Identity() {
  const [dragged, setDragged] = useState<AvatarId | null>(null);
  const [highlight, setHighlight] = useState<{ [key: string]: boolean }>({});
  const [tags, setTags] = useState<string[]>([]);
  const [lastDrop, setLastDrop] = useState<string>('');

  // 弹窗相关状态
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [modalCountry, setModalCountry] = useState<string>('');
  const [modalAnswers, setModalAnswers] = useState<ModalAnswer>({});

  const onDragStart = (id: AvatarId) => setDragged(id);
  const onDragOver = (e: React.DragEvent<HTMLDivElement>) => e.preventDefault();

  // 命中后打开国家逻辑弹窗
  const onDrop = (countryId: string) => {
    if (!dragged) return;
    setHighlight((h) => ({ ...h, [countryId]: true }));
    setLastDrop(`${dragged} → ${countryId}`);
    setDragged(null);
    setModalCountry(countryId);
    setModalAnswers({});
    setModalOpen(true);
  };

  // US 问题序列（示例）
  const US_QUESTIONS = [
    { key: 'us_docs', label: '是否持有美国护照或绿卡？', type: 'boolean' },
    { key: 'us_183', label: '过去三年加权居住是否满183天？', type: 'boolean' },
    { key: 'us_exit', label: '是否计划放弃身份（脱籍）？', type: 'boolean' },
  ];

  // JP 问题序列（示例）
  const JP_QUESTIONS = [
    { key: 'jp_table2', label: '在留资格是否为永住/配偶/定住（Table 2）？', type: 'boolean' },
    { key: 'jp_10y', label: '过去15年居住是否已满10年？', type: 'boolean' },
  ];

  const applyModal = () => {
    const newTags: string[] = [];
    if (modalCountry === 'US') {
      // 根据回答生成标签（示例映射）
      if (modalAnswers['us_docs']) newTags.push('US_TAX_RESIDENT');
      if (modalAnswers['us_183']) newTags.push('SUBSTANTIAL_PRESENCE_TEST');
      if (modalAnswers['us_exit']) newTags.push('EXIT_TAX_EXPAT_RISK');
    }
    if (modalCountry === 'JP') {
      if (modalAnswers['jp_table2']) newTags.push('TABLE_2_VISA_HOLDER');
      if (modalAnswers['jp_10y']) newTags.push('JP_RES_10Y');
    }
    setTags((prev) => Array.from(new Set([...prev, ...newTags])));
    setModalOpen(false);
    // 2秒后移除高亮效果（保留标签）
    setTimeout(() => setHighlight((h) => ({ ...h, [modalCountry]: false })), 2000);
  };

  const closeModal = () => {
    setModalOpen(false);
    setTimeout(() => setHighlight((h) => ({ ...h, [modalCountry]: false })), 200);
  };

  const renderQuestions = () => {
    const list = modalCountry === 'US' ? US_QUESTIONS : JP_QUESTIONS;
    return (
      <div className="space-y-3">
        {list.map((q) => (
          <div key={q.key} className="flex items-center justify-between">
            <span className="text-sm">{q.label}</span>
            <div className="flex gap-2">
              <button
                className={`px-3 py-1 rounded border ${modalAnswers[q.key] === true ? 'bg-copper text-white' : 'bg-white border-copper text-deepblue'}`}
                onClick={() => setModalAnswers((a) => ({ ...a, [q.key]: true }))}
              >是</button>
              <button
                className={`px-3 py-1 rounded border ${modalAnswers[q.key] === false ? 'bg-copper text-white' : 'bg-white border-copper text-deepblue'}`}
                onClick={() => setModalAnswers((a) => ({ ...a, [q.key]: false }))}
              >否</button>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <main className="min-h-screen bg-cream text-deepblue p-8">
      <h2 className="text-2xl font-semibold mb-2">身份地图：拖拽头像到国家区域</h2>
      <p className="mb-4 text-sm opacity-80">拖拽头像到 US/JP 区域后，会弹出国家逻辑弹窗。根据选择实时生成风险标签（示例）。</p>

      <div className="grid grid-cols-3 gap-6">
        {/* 地图与国家区域 */}
        <div className="relative bg-white border border-copper rounded h-[440px] overflow-hidden">
          <div className="absolute inset-0 opacity-10 pointer-events-none" aria-hidden>
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
            提示：拖拽头像到地图上的国家区域（US/JP），根据弹窗回答生成标签。
          </div>
          <div className="mt-6">
            <Link href="/assets" className="px-4 py-2 rounded bg-copper text-white">下一步</Link>
          </div>
        </div>
      </div>

      {/* 国家逻辑弹窗 */}
      {modalOpen && (
        <div className="modal-backdrop">
          <div className="modal-card">
            <div className="font-semibold mb-3">{modalCountry === 'US' ? '美国（US）逻辑问题' : '日本（JP）逻辑问题'}</div>
            {renderQuestions()}
            <div className="mt-6 flex justify-end gap-3">
              <button className="px-4 py-2 rounded bg-gray-300 text-deepblue" onClick={closeModal}>取消</button>
              <button className="px-4 py-2 rounded bg-copper text-white" onClick={applyModal}>应用并生成标签</button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
