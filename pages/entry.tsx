import React, { useState } from 'react';
import Link from 'next/link';

export default function Entry() {
  const [consent, setConsent] = useState(false);
  return (
    <div className="identity-page page-hero">
      {/* Animated dark+gold backdrop */}
      <div className="hero-backdrop" aria-hidden="true">
        <div className="hero-lines" />
      </div>

      <div className="identity-grid" style={{ gridTemplateColumns: '2fr 1fr 1fr' }}>
        {/* 匿名承诺卡片 */}
        <div className="card fade-up" style={{ gridColumn: '1 / span 2' }}>
          <div className="card-header">匿名与隐私承诺</div>
          <div className="card-body">
            <p style={{ color: 'var(--text-muted)', marginBottom: 12 }}>当前为匿名扫描模式，数据本地暂存（会话结束自动清除）。</p>
            <label className="inline-flex" style={{ gap: 8, alignItems: 'center' }}>
              <input type="checkbox" checked={consent} onChange={() => setConsent(!consent)} aria-label="我已阅读并同意匿名隐私协议" />
              我已阅读并同意匿名隐私协议
            </label>
          </div>
        </div>

        {/* 操作卡片 */}
        <div className="card fade-up" style={{ animationDelay: '160ms' }}>
          <div className="card-header">开始体检</div>
          <div className="card-body">
            <Link href={consent ? '/identity' : '#'} aria-label="开始录入" className="btn btn-primary" style={{ pointerEvents: consent ? 'auto' : 'none', opacity: consent ? 1 : 0.65 }}>
              开始录入
            </Link>
            <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 10 }}>未勾选协议将无法进入下一步</div>
          </div>
        </div>
      </div>
    </div>
  );
}
