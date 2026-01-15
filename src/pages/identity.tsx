import React from 'react';
import { IdentityMap } from '../components/identity/IdentityMap';
import { IdentityTray } from '../components/identity/IdentityTray';
import { CountryLogicModal } from '../components/identity/CountryLogicModal';
import { TagList } from '../components/identity/TagList';
import type { QuestionItem, TagItem } from '../types/common';
import type { RoleId, CountryCode } from '../types/common';
import '../styles/identity.css';

const buildQuestions = (country: CountryCode, role: RoleId): QuestionItem[] => {
  if (country === 'US') {
    return [
      { id: 'citizenship', text: '是否为美国公民或绿卡持有者？', type: 'boolean' },
      { id: 'tax_residency', text: '是否为美国税务居民？', type: 'boolean' },
      { id: 'days_in_us', text: '过去 12 个月在美国居住天数？', type: 'select', options: ['>183 天', '90-183 天', '<90 天'] },
      { id: 'income_us_ratio', text: '主要收入中美国来源占比？', type: 'select', options: ['>50%', '20%-50%', '<20%'] },
      { id: 'hold_us_assets', text: '是否持有美国金融资产（如美股/美债/基金）？', type: 'boolean' },
    ];
  }
  if (country === 'JP') {
    return [
      { id: 'long_term', text: '是否在日本长期居住（>5 年）？', type: 'boolean' },
      { id: 'income_source', text: '主要收入是否来源于日本？', type: 'boolean' },
      { id: 'days_in_jp', text: '过去 12 个月在日本居住天数？', type: 'select', options: ['>183 天', '90-183 天', '<90 天'] },
      { id: 'income_jp_ratio', text: '主要收入中日本来源占比？', type: 'select', options: ['>50%', '20%-50%', '<20%'] },
      { id: 'hold_jp_assets', text: '是否持有日本金融资产（如日股/债/基金）？', type: 'boolean' },
    ];
  }
  return [];
};

const buildRequiredIds = (country: CountryCode): string[] => {
  if (country === 'US') return ['citizenship', 'tax_residency', 'days_in_us', 'income_us_ratio'];
  if (country === 'JP') return ['long_term', 'income_source', 'days_in_jp', 'income_jp_ratio'];
  return [];
};

const isOver183Days = (val?: string) => val === '>183 天';
const isBetween90And183 = (val?: string) => val === '90-183 天';
const incomeOver50 = (val?: string) => val === '>50%';
const incomeBetween20And50 = (val?: string) => val === '20%-50%';

const deriveTags = (
  country: CountryCode,
  answers: Record<string, string | boolean>,
  role: RoleId
): TagItem[] => {
  const tags: TagItem[] = [];
  if (country === 'US') {
    const usPerson = answers['citizenship'] === true || answers['tax_residency'] === true;
    const days = String(answers['days_in_us'] || '');
    const income = String(answers['income_us_ratio'] || '');
    const holdAssets = answers['hold_us_assets'] === true;
    if (usPerson) tags.push({ id: `us_person_${role}`, label: 'US PERSON', severity: 'high' });
    if (isOver183Days(days) || incomeOver50(income) || holdAssets) tags.push({ id: `us_exposure_high_${role}`, label: 'US Exposure (High)', severity: 'high' });
    else if (isBetween90And183(days) || incomeBetween20And50(income)) tags.push({ id: `us_exposure_medium_${role}`, label: 'US Exposure (Medium)', severity: 'medium' });
    else if (days === '<90 天' || income === '<20%') tags.push({ id: `us_exposure_low_${role}`, label: 'US Exposure (Low)', severity: 'low' });
  }
  if (country === 'JP') {
    const jpResident = answers['long_term'] === true && answers['income_source'] === true;
    const days = String(answers['days_in_jp'] || '');
    const income = String(answers['income_jp_ratio'] || '');
    const holdAssets = answers['hold_jp_assets'] === true;
    if (jpResident) tags.push({ id: `jp_resident_${role}`, label: 'JP Resident', severity: 'medium' });
    if (isOver183Days(days) || incomeOver50(income) || holdAssets) tags.push({ id: `jp_exposure_high_${role}`, label: 'JP Exposure (High)', severity: 'high' });
    else if (isBetween90And183(days) || incomeBetween20And50(income)) tags.push({ id: `jp_exposure_medium_${role}`, label: 'JP Exposure (Medium)', severity: 'medium' });
    else if (days === '<90 天' || income === '<20%') tags.push({ id: `jp_exposure_low_${role}`, label: 'JP Exposure (Low)', severity: 'low' });
  }
  return tags.filter((t, idx, arr) => arr.findIndex(x => x.id === t.id) === idx);
};

const IdentityPage: React.FC = () => {
  const [activeCountries, setActiveCountries] = React.useState<string[]>([]);
  const [visibleModal, setVisibleModal] = React.useState<{ country: CountryCode; role: RoleId } | null>(null);
  const [questions, setQuestions] = React.useState<QuestionItem[]>([]);
  const [requiredIds, setRequiredIds] = React.useState<string[]>([]);
  const [tags, setTags] = React.useState<TagItem[]>([]);

  const handleDragStart = (roleId: RoleId, e: React.DragEvent) => {
    e.dataTransfer.setData('role-id', roleId);
  };

  const handleDrop = (countryCode: CountryCode, e: React.DragEvent) => {
    const roleId = (e.dataTransfer.getData('role-id') || 'self') as RoleId;
    setActiveCountries(prev => Array.from(new Set([...prev, countryCode])));
    const qs = buildQuestions(countryCode, roleId);
    setQuestions(qs);
    setRequiredIds(buildRequiredIds(countryCode));
    setVisibleModal({ country: countryCode, role: roleId });
  };

  const handleSubmit = (answers: Record<string, string | boolean>) => {
    if (!visibleModal) return;
    const newTags = deriveTags(visibleModal.country, answers, visibleModal.role);
    setTags(prev => {
      const merged = [...prev];
      newTags.forEach(t => { if (!merged.find(x => x.id === t.id)) merged.push(t); });
      return merged;
    });
    setVisibleModal(null);
  };

  return (
    <div className="identity-page">
      <div className="identity-grid">
        {/* 身份地图 */}
        <div className="card">
          <div className="card-header">身份地图：拖拽头像到国家区域</div>
          <div className="card-body">
            <IdentityMap
              activeCountryCodes={activeCountries}
              onDragStart={handleDragStart}
              onDrop={handleDrop}
              onMapReady={() => void 0}
            />
          </div>
        </div>
        {/* 标签与红绿灯 */}
        <div className="card">
          <div className="card-header">标签与红绿灯</div>
          <div className="card-body">
            <TagList tags={tags} removable onRemove={(id) => setTags((prev) => prev.filter((t) => t.id !== id))} />
          </div>
        </div>
        {/* 身份托盘 */}
        <div className="card">
          <div className="card-header">身份托盘</div>
          <div className="card-body">
            <IdentityTray onDragStart={handleDragStart} />
            <div style={{ marginTop: 16 }}>
              <button className="btn-primary">下一步</button>
            </div>
          </div>
        </div>
      </div>

      {/* 逻辑弹窗（含必填校验） */}
      <CountryLogicModal
        countryCode={visibleModal?.country || 'US'}
        roleId={visibleModal?.role || 'self'}
        visible={!!visibleModal}
        questions={questions}
        requiredIds={requiredIds}
        onSubmit={handleSubmit}
        onClose={() => setVisibleModal(null)}
      />
    </div>
  );
};

export default IdentityPage;
