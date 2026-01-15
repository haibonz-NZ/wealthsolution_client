import React from 'react';
import type { CountryBoxProps } from '@/types/props/identity';
import '../styles/identity.css';

export const CountryBox: React.FC<CountryBoxProps> = ({
  countryCode,
  labelKey,
  isHighlighted,
  position,
  size,
}) => {
  return (
    <div className="country-box" style={{ width: size.width, height: size.height }}>
      <div className="country-title">
        <span>{countryCode === 'US' ? '美国 US' : countryCode === 'JP' ? '日本 JP' : countryCode}</span>
        <span className="badge">可拖拽</span>
      </div>
      <div className="country-hint">将身份头像拖拽到此区域以触发问答</div>
    </div>
  );
};

export default CountryBox;
