import React from 'react';
import type { IdentityMapProps } from '../../types/props/identity';
import { CountryBox } from './CountryBox';
import '../../styles/identity.css';

export const IdentityMap: React.FC<IdentityMapProps> = ({
  activeCountryCodes,
  onDragStart,
  onDrop,
  onMapReady,
  mapConfig,
}) => {
  React.useEffect(() => {
    onMapReady?.();
  }, [onMapReady]);

  const handleDragOver: React.DragEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
  };

  const handleDrop: (code: string) => React.DragEventHandler<HTMLDivElement> = (code) => (e) => {
    e.preventDefault();
    onDrop(code as any, e);
  };

  return (
    <div className="identity-map" onDragOver={handleDragOver} aria-label="身份地图区域">
      {/* US 区域 */}
      <div
        className={`country-region us ${activeCountryCodes.includes('US') ? 'active' : ''}`}
        style={{ top: 60, left: 40, width: 260, height: 180 }}
        onDrop={handleDrop('US')}
        role="region"
        aria-label="美国 US 区域"
      >
        <CountryBox
          countryCode="US"
          labelKey="country.us"
          isHighlighted={activeCountryCodes.includes('US')}
          position={{ top: '0px', left: '0px' }}
          size={{ width: '100%', height: '100%' }}
        />
      </div>
      {/* JP 区域 */}
      <div
        className={`country-region jp ${activeCountryCodes.includes('JP') ? 'active' : ''}`}
        style={{ top: 260, left: 360, width: 200, height: 150 }}
        onDrop={handleDrop('JP')}
        role="region"
        aria-label="日本 JP 区域"
      >
        <CountryBox
          countryCode="JP"
          labelKey="country.jp"
          isHighlighted={activeCountryCodes.includes('JP')}
          position={{ top: '0px', left: '0px' }}
          size={{ width: '100%', height: '100%' }}
        />
      </div>
    </div>
  );
};

export default IdentityMap;
