import React from 'react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="identity-page page-hero">
      {/* Animated dark+gold backdrop */}
      <div className="hero-backdrop" aria-hidden="true">
        <div className="hero-lines" />
      </div>

      <div className="identity-grid" style={{ gridTemplateColumns: '2fr 1fr 1fr' }}>
        {/* Hero 卡片 */}
        <div className="card fade-up" style={{ gridColumn: '1 / span 2' }}>
          <div className="card-header">预见风险，守护传承</div>
          <div className="card-body">
            <p style={{ color: 'var(--text-muted)', marginBottom: 16 }}>3分钟极简匿名体检 · GWRC</p>
            <Link href="/entry" className="btn btn-primary" aria-label="开始体检">
              开始体检
            </Link>
          </div>
        </div>

        {/* 隐私/匿名背书 */}
        <div className="card fade-up" style={{ animationDelay: '120ms' }}>
          <div className="card-header">隐私与匿名背书</div>
          <div className="card-body">
            <ul style={{ color: 'var(--text-muted)' }}>
              <li>100% 匿名，不收集姓名/电话</li>
              <li>数据仅本地会话使用</li>
              <li>会话结束自动清除</li>
            </ul>
          </div>
        </div>

        {/* 顾问名片（示例） */}
        <div className="card fade-up" style={{ animationDelay: '240ms' }}>
          <div className="card-header">绑定顾问（示例）</div>
          <div className="card-body">
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 44, height: 44, borderRadius: 22, background: 'rgba(255,255,255,0.08)', border: '1px solid var(--border)' }} />
              <div>
                <div style={{ fontWeight: 600, color: 'var(--text)' }}>某某顾问</div>
                <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>财富传承顾问</div>
              </div>
            </div>
            <button className="btn btn-secondary" style={{ marginTop: 14 }}>联系顾问</button>
          </div>
        </div>
      </div>
    </div>
  );
}
