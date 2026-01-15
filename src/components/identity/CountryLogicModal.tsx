import React from 'react';
import type { CountryLogicModalProps } from '../../types/props/identity';
import '../../styles/identity.css';

export const CountryLogicModal: React.FC<CountryLogicModalProps> = ({
  countryCode,
  roleId,
  visible,
  questions,
  requiredIds = questions.map(q => q.id),
  onSubmit,
  onClose,
}) => {
  const [answers, setAnswers] = React.useState<Record<string, string | boolean>>({});

  React.useEffect(() => { if (!visible) setAnswers({}); }, [visible]);
  if (!visible) return null;

  const missingIds = requiredIds.filter((id) => {
    const v = answers[id];
    return v === undefined || v === '';
  });
  const isMissing = (id: string) => missingIds.includes(id);

  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true">
      <div className="modal">
        <div className="modal-header">{countryCode} 逻辑问答（{roleId}）</div>
        <div className="modal-body">
          <div className="note">{missingIds.length > 0 ? `还有 ${missingIds.length} 项必填未回答，请完成后再提交。` : ''}</div>
          {questions.map((q) => (
            <div key={q.id} className={`field ${isMissing(q.id) ? 'missing' : ''}`}>
              <div className="field-label">
                {q.text}
                {requiredIds.includes(q.id) && (
                  <span className={`required ${isMissing(q.id) ? 'alert' : ''}`}>（必填）</span>
                )}
              </div>
              {q.type === 'boolean' ? (
                <div style={{ display: 'flex', gap: 12 }}>
                  <label className="inline-flex" style={{ gap: 6 }}>
                    <input type="radio" name={q.id} onChange={() => setAnswers({ ...answers, [q.id]: true })} />
                    是
                  </label>
                  <label className="inline-flex" style={{ gap: 6 }}>
                    <input type="radio" name={q.id} onChange={() => setAnswers({ ...answers, [q.id]: false })} />
                    否
                  </label>
                </div>
              ) : (
                <select aria-invalid={isMissing(q.id)} className={isMissing(q.id) ? 'missing' : ''}
                  onChange={(e) => setAnswers({ ...answers, [q.id]: e.target.value })}
                >
                  <option value="">请选择</option>
                  {q.options?.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              )}
              {isMissing(q.id) && (<div className="note">请回答此问题</div>)}
            </div>
          ))}
        </div>
        <div className="modal-actions">
          <button className="btn-primary" style={{ background:'#e5e7eb', color:'#334155' }} onClick={onClose}>取消</button>
          <button className="btn-primary" disabled={missingIds.length > 0} aria-disabled={missingIds.length > 0} onClick={() => onSubmit(answers)}>提交</button>
        </div>
      </div>
    </div>
  );
};

export default CountryLogicModal;
