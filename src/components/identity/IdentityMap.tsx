import React from 'react';
import type { IdentityMapProps } from '../../types/props/identity';
import '../../styles/identity.css';

/**
 * IdentityMap (Dark+Gold): interactive world map canvas with droppable regions
 * - Inline simplified SVG world map (abstract shapes)
 * - US / JP regions overlay (absolute boxes) remain droppable
 */
export const IdentityMap: React.FC<IdentityMapProps> = ({
  activeCountryCodes,
  onDragStart,
  onDrop,
  onMapReady,
}) => {
  React.useEffect(() => { onMapReady?.(); }, [onMapReady]);

  const handleDragOver: React.DragEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
  };
  const handleDrop: (code: string) => React.DragEventHandler<HTMLDivElement> = (code) => (e) => {
    e.preventDefault();
    onDrop(code as any, e);
  };

  return (
    <div className="identity-map glow-border" onDragOver={handleDragOver} aria-label="身份世界地图">
      {/* SVG world map background (abstract) */}
      <svg className="world-map" viewBox="0 0 1200 600" role="img" aria-label="World map decorative">
        <defs>
          <linearGradient id="oceanGrad" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="rgba(255,255,255,0.05)" />
            <stop offset="100%" stopColor="rgba(201,160,90,0.08)" />
          </linearGradient>
        </defs>
        <rect x="0" y="0" width="1200" height="600" fill="url(#oceanGrad)" />
        {/* Abstract continents (stylized) */}
        {/* North America */}
        <path d="M220,140 l120,-40 160,60 40,80 -180,60 -140,-40 z" fill="rgba(255,255,255,0.08)" stroke="rgba(201,160,90,0.25)" strokeWidth="1" />
        {/* South America */}
        <path d="M460,340 l60,30 20,100 -40,70 -60,-30 10,-60 z" fill="rgba(255,255,255,0.08)" stroke="rgba(201,160,90,0.25)" strokeWidth="1" />
        {/* Europe */}
        <path d="M740,160 l60,-20 70,30 -40,40 -70,10 -30,-30 z" fill="rgba(255,255,255,0.08)" stroke="rgba(201,160,90,0.25)" strokeWidth="1" />
        {/* Africa */}
        <path d="M780,240 l100,20 40,120 -80,80 -80,-50 20,-120 z" fill="rgba(255,255,255,0.08)" stroke="rgba(201,160,90,0.25)" strokeWidth="1" />
        {/* Asia */}
        <path d="M860,140 l160,20 120,60 -60,60 -120,20 -150,-40 40,-80 z" fill="rgba(255,255,255,0.08)" stroke="rgba(201,160,90,0.25)" strokeWidth="1" />
        {/* Australia */}
        <path d="M1040,420 l90,20 20,50 -80,40 -70,-30 40,-60 z" fill="rgba(255,255,255,0.08)" stroke="rgba(201,160,90,0.25)" strokeWidth="1" />
        {/* Grid meridians */}
        {[...Array(10)].map((_, i) => (
          <line key={i} x1={i * 120} y1={0} x2={i * 120} y2={600} stroke="rgba(255,255,255,0.04)" />
        ))}
        {[...Array(6)].map((_, i) => (
          <line key={`h${i}`} x1={0} y1={i * 100} x2={1200} y2={i * 100} stroke="rgba(255,255,255,0.04)" />
        ))}
      </svg>

      {/* US region overlay */}
      <div
        className={`country-region ${activeCountryCodes.includes('US') ? 'active' : ''}`}
        style={{ top: 120, left: 220, width: 220, height: 160 }}
        onDrop={handleDrop('US')}
        role="region"
        aria-label="美国 US 区域"
      >
        <div className="country-box">
          <div className="country-title">美国 US <span className="badge">可拖拽</span></div>
          <div className="country-hint">将身份头像拖拽到此区域以触发问答</div>
        </div>
      </div>

      {/* JP region overlay (near East Asia block) */}
      <div
        className={`country-region ${activeCountryCodes.includes('JP') ? 'active' : ''}`}
        style={{ top: 180, left: 980, width: 180, height: 120 }}
        onDrop={handleDrop('JP')}
        role="region"
        aria-label="日本 JP 区域"
      >
        <div className="country-box">
          <div className="country-title">日本 JP <span className="badge">可拖拽</span></div>
          <div className="country-hint">将身份头像拖拽到此区域以触发问答</div>
        </div>
      </div>

      {/* UK region overlay (near Europe block) */}
      <div
        className={`country-region ${activeCountryCodes.includes('UK') ? 'active' : ''}`}
        style={{ top: 150, left: 780, width: 140, height: 100 }}
        onDrop={handleDrop('UK')}
        role="region"
        aria-label="英国 UK 区域"
      >
        <div className="country-box">
          <div className="country-title">英国 UK <span className="badge">可拖拽</span></div>
          <div className="country-hint">拖拽头像到此区域以触发问答</div>
        </div>
      </div>

      {/* Canada region overlay (north of US) */}
      <div
        className={`country-region ${activeCountryCodes.includes('CA') ? 'active' : ''}`}
        style={{ top: 80, left: 180, width: 240, height: 140 }}
        onDrop={handleDrop('CA')}
        role="region"
        aria-label="加拿大 CA 区域"
      >
        <div className="country-box">
          <div className="country-title">加拿大 CA <span className="badge">可拖拽</span></div>
          <div className="country-hint">拖拽头像到此区域以触发问答</div>
        </div>
      </div>

      {/* Australia region overlay */}
      <div
        className={`country-region ${activeCountryCodes.includes('AU') ? 'active' : ''}`}
        style={{ top: 420, left: 1040, width: 200, height: 120 }}
        onDrop={handleDrop('AU')}
        role="region"
        aria-label="澳大利亚 AU 区域"
      >
        <div className="country-box">
          <div className="country-title">澳大利亚 AU <span className="badge">可拖拽</span></div>
          <div className="country-hint">拖拽头像到此区域以触发问答</div>
        </div>
      </div>
    </div>
  );
};

export default IdentityMap;
