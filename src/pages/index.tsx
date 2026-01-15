import React from 'react';
import Link from 'next/link';
import '../styles/identity.css';

const LandingPage: React.FC = () => {
  return (
    <div className="identity-page">
      <div className="identity-grid" style={{ gridTemplateColumns: '2fr 1fr 1fr' }}>
        {/* Hero 卡片 */}
        <div className="card" style={{ gridColumn: '1 / span 2' }}>
          <div className="card-header">预见风险，守护传承</div>
          <div className="card-body">
            <p style={{ color: 'var(--slate)', marginBottom: 16 }}>3分钟极简匿名体检 · GWRC</p>
            <Link href="/entry" className="btn btn-primary" aria-label="开始体检">
              开始体检
            </Link>
          </div>
        </div>

        {/* 信任/安全卡片 */}
        <div className="card">
          <div className="card-header">隐私与匿名背书</div>
          <div className="card-body">
            <ul style={{ color: 'var(--slate)' }}>
              <li>100% 匿名，不收集姓名/电话</li>
              <li>数据仅本地会话使用</li>
              <li>会话结束自动清除</li>
            </ul>
          </div>
        </div>

        {/* 顾问名片（示例） */}
        <div className="card">
          <div className="card-header">绑定顾问（示例）</div>
          <div className="card-body">
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 44, height: 44, borderRadius: 22, background: '#e5e7eb' }} />
              <div>
                <div style={{ fontWeight: 600, color: 'var(--deepBlue)' }}>某某顾问</div>
                <div style={{ fontSize: 12, color: '#64748b' }}>财富传承顾问</div>
              </div>
            </div>
            <button className="btn btn-secondary" style={{ marginTop: 14 }}>联系顾问</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
