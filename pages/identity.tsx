import React from 'react';
import { IdentityMap } from '../src/components/identity/IdentityMap';
import { IdentityTray } from '../src/components/identity/IdentityTray';
import { CountryLogicModal } from '../src/components/identity/CountryLogicModal';
import { TagList } from '../src/components/identity/TagList';
import type { QuestionItem, TagItem } from '../src/types/common';
import type { RoleId, CountryCode } from '../src/types/common';

/**
 * Identity (Dark+Gold): client-facing interactive identity map page
 * - Animated backdrop + glass cards + gold glow accents
 * - Drag avatars to US/JP regions → modal QA → generate tags
 */
export default function IdentityPage() {
  const [activeCountries, setActiveCountries] = React.useState<string[]>([]);
  const [visibleModal, setVisibleModal] = React.useState<{ country: CountryCode; role: RoleId } | null>(null);
  const [questions, setQuestions] = React.useState<QuestionItem[]>([]);
  const [requiredIds, setRequiredIds] = React.useState<string[]>([]);
  const [tags, setTags] = React.useState<TagItem[]>([]);

  const buildQuestions = (country: CountryCode, role: RoleId): QuestionItem[] => {
    if (country === 'US') {
      return [
        { id: 'citizenship', text: '是否为美国公民或绿卡持有者？', type: 'boolean' },
        { id: 'tax_residency', text: '是否为美国税务居民？', type: 'boolean' },
        { id: 'days_in_us', text: '过去 12 个月在美国居住天数？', type: 'select', options: ['>183 天', '90-183 天', '<90 天'] },
        { id: 'income_us_ratio', text: '主要收入中美国来源占比？', type: 'select', options: ['>50%', '20%-50%', '<20%'] },
      ];
    }
    if (country === 'JP') {
      return [
        { id: 'long_term', text: '是否在日本长期居住（>5 年）？', type: 'boolean' },
        { id: 'income_source', text: '主要收入是否来源于日本？', type: 'boolean' },
        { id: 'days_in_jp', text: '过去 12 个月在日本居住天数？', type: 'select', options: ['>183 天', '90-183 天', '<90 天'] },
        { id: 'income_jp_ratio', text: '主要收入中日本来源占比？', type: 'select', options: ['>50%', '20%-50%', '<20%'] },
      ];
    }
    if (country === 'UK') {
      return [
        { id: 'uk_resident', text: '是否为英国税务居民？', type: 'boolean' },
        { id: 'days_in_uk', text: '过去 12 个月在英国居住天数？', type: 'select', options: ['>183 天', '90-183 天', '<90 天'] },
        { id: 'income_uk_ratio', text: '主要收入中英国来源占比？', type: 'select', options: ['>50%', '20%-50%', '<20%'] },
      ];
    }
    if (country === 'CA') {
      return [
        { id: 'ca_resident', text: '是否为加拿大税务居民？', type: 'boolean' },
        { id: 'days_in_ca', text: '过去 12 个月在加拿大居住天数？', type: 'select', options: ['>183 天', '90-183 天', '<90 天'] },
        { id: 'income_ca_ratio', text: '主要收入中加拿大来源占比？', type: 'select', options: ['>50%', '20%-50%', '<20%'] },
      ];
    }
    if (country === 'AU') {
      return [
        { id: 'au_resident', text: '是否为澳大利亚税务居民？', type: 'boolean' },
        { id: 'days_in_au', text: '过去 12 个月在澳大利亚居住天数？', type: 'select', options: ['>183 天', '90-183 天', '<90 天'] },
        { id: 'income_au_ratio', text: '主要收入中澳大利亚来源占比？', type: 'select', options: ['>50%', '20%-50%', '<20%'] },
      ];
    }
    if (country === 'UK') return ['uk_resident', 'days_in_uk', 'income_uk_ratio'];
    if (country === 'CA') return ['ca_resident', 'days_in_ca', 'income_ca_ratio'];
    if (country === 'AU') return ['au_resident', 'days_in_au', 'income_au_ratio'];
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

  const deriveTags = (country: CountryCode, answers: Record<string, string | boolean>, role: RoleId): TagItem[] => {
    const tags: TagItem[] = [];
    if (country === 'US') {
      const usPerson = answers['citizenship'] === true || answers['tax_residency'] === true;
      const days = String(answers['days_in_us'] || '');
      const income = String(answers['income_us_ratio'] || '');
      if (usPerson) tags.push({ id: `us_person_${role}`, label: 'US PERSON', severity: 'high' });
      if (isOver183Days(days) || incomeOver50(income)) tags.push({ id: `us_exposure_high_${role}`, label: 'US Exposure (High)', severity: 'high' });
      else if (isBetween90And183(days) || incomeBetween20And50(income)) tags.push({ id: `us_exposure_medium_${role}`, label: 'US Exposure (Medium)', severity: 'medium' });
      else tags.push({ id: `us_exposure_low_${role}`, label: 'US Exposure (Low)', severity: 'low' });
    }
    if (country === 'JP') {
      const jpResident = answers['long_term'] === true && answers['income_source'] === true;
      const days = String(answers['days_in_jp'] || '');
      const income = String(answers['income_jp_ratio'] || '');
      if (jpResident) tags.push({ id: `jp_resident_${role}`, label: 'JP Resident', severity: 'medium' });
      if (isOver183Days(days) || incomeOver50(income)) tags.push({ id: `jp_exposure_high_${role}`, label: 'JP Exposure (High)', severity: 'high' });
      else if (isBetween90And183(days) || incomeBetween20And50(income)) tags.push({ id: `jp_exposure_medium_${role}`, label: 'JP Exposure (Medium)', severity: 'medium' });
      else tags.push({ id: `jp_exposure_low_${role}`, label: 'JP Exposure (Low)', severity: 'low' });
    }
    if (country === 'UK') {
      const ukResident = answers['uk_resident'] === true;
      const days = String(answers['days_in_uk'] || '');
      const income = String(answers['income_uk_ratio'] || '');
      if (ukResident) tags.push({ id: `uk_resident_${role}`, label: 'UK Resident', severity: 'medium' });
      if (isOver183Days(days) || incomeOver50(income)) tags.push({ id: `uk_exposure_high_${role}`, label: 'UK Exposure (High)', severity: 'high' });
      else if (isBetween90And183(days) || incomeBetween20And50(income)) tags.push({ id: `uk_exposure_medium_${role}`, label: 'UK Exposure (Medium)', severity: 'medium' });
      else tags.push({ id: `uk_exposure_low_${role}`, label: 'UK Exposure (Low)', severity: 'low' });
    }

    if (country === 'CA') {
      const caResident = answers['ca_resident'] === true;
      const days = String(answers['days_in_ca'] || '');
      const income = String(answers['income_ca_ratio'] || '');
      if (caResident) tags.push({ id: `ca_resident_${role}`, label: 'CA Resident', severity: 'medium' });
      if (isOver183Days(days) || incomeOver50(income)) tags.push({ id: `ca_exposure_high_${role}`, label: 'CA Exposure (High)', severity: 'high' });
      else if (isBetween90And183(days) || incomeBetween20And50(income)) tags.push({ id: `ca_exposure_medium_${role}`, label: 'CA Exposure (Medium)', severity: 'medium' });
      else tags.push({ id: `ca_exposure_low_${role}`, label: 'CA Exposure (Low)', severity: 'low' });
    }

    if (country === 'AU') {
      const auResident = answers['au_resident'] === true;
      const days = String(answers['days_in_au'] || '');
      const income = String(answers['income_au_ratio'] || '');
      if (auResident) tags.push({ id: `au_resident_${role}`, label: 'AU Resident', severity: 'medium' });
      if (isOver183Days(days) || incomeOver50(income)) tags.push({ id: `au_exposure_high_${role}`, label: 'AU Exposure (High)', severity: 'high' });
      else if (isBetween90And183(days) || incomeBetween20And50(income)) tags.push({ id: `au_exposure_medium_${role}`, label: 'AU Exposure (Medium)', severity: 'medium' });
      else tags.push({ id: `au_exposure_low_${role}`, label: 'AU Exposure (Low)', severity: 'low' });
    }

    return tags.filter((t, i, arr) => arr.findIndex(x => x.id === t.id) === i);
  };

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
    <div className="identity-page page-hero">
      {/* Animated dark+gold backdrop */}
      <div className="hero-backdrop" aria-hidden="true"><div className="hero-lines" /></div>

      <div className="identity-grid">
        {/* 身份地图（世界地图 + US/JP 可拖拽） */}
        <div className="card fade-up" style={{ gridColumn: '1 / span 1' }}>
          <div className="card-header">身份地图：拖拽头像到国家区域</div>
          <div className="card-body">
            <IdentityMap
              activeCountryCodes={activeCountries}
              onDragStart={() => void 0}
              onDrop={handleDrop}
              onMapReady={() => void 0}
            />
          </div>
        </div>

        {/* 标签与红绿灯 */}
        <div className="card fade-up" style={{ animationDelay: '120ms' }}>
          <div className="card-header">标签与红绿灯</div>
          <div className="card-body">
            <TagList tags={tags} removable onRemove={(id) => setTags(prev => prev.filter(t => t.id !== id))} />
          </div>
        </div>

        {/* 身份托盘 */}
        <div className="card fade-up" style={{ animationDelay: '240ms' }}>
          <div className="card-header">身份托盘</div>
          <div className="card-body">
            <IdentityTray onDragStart={handleDragStart} />
            <div style={{ marginTop: 16 }}>
              <a className="btn btn-primary" href="#" aria-label="下一步">下一步</a>
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
}
