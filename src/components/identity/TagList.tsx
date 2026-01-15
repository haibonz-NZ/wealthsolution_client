import React from 'react';
import type { TagListProps } from '../../types/props/identity';
import '../../styles/identity.css';

export const TagList: React.FC<TagListProps> = ({ tags, removable, onRemove, emptyText }) => {
  if (!tags?.length) {
    return <div className="empty-state">尚未生成标签</div>;
  }
  const dotClass = (sev: 'high'|'medium'|'low'|'safe') => sev==='high' ? 'dot red' : sev==='medium' ? 'dot yellow' : 'dot green';
  return (
    <div className="tag-list">
      {tags.map((t) => (
        <div key={t.id} className="tag-chip">
          <div className="tag-left">
            <span className={dotClass(t.severity)} />
            <span>{t.label}</span>
          </div>
          {removable && (
            <button className="remove-btn" aria-label={`移除标签 ${t.label}`} onClick={() => onRemove?.(t.id)}>✕</button>
          )}
        </div>
      ))}
    </div>
  );
};

export default TagList;
