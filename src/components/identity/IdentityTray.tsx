import React from 'react';
import type { RoleId } from '../../types/common';
import '../../styles/identity.css';

interface IdentityTrayProps {
  roles?: RoleId[];
  onDragStart: (roleId: RoleId, e: React.DragEvent) => void;
}

export const IdentityTray: React.FC<IdentityTrayProps> = ({ roles = ['self', 'spouse', 'child', 'parent'], onDragStart }) => {
  const dragStart = (roleId: RoleId): React.DragEventHandler<HTMLDivElement> => (e) => {
    e.dataTransfer.setData('role-id', roleId);
    onDragStart(roleId, e);
  };

  const labelMap: Record<RoleId, string> = {
    self: '本人',
    spouse: '配偶',
    child: '子女',
    parent: '父母',
  };

  return (
    <div className="tray" aria-label="身份托盘">
      {roles.map((r) => (
        <div key={r} draggable onDragStart={dragStart(r)} className="tray-pill">
          {labelMap[r]}
        </div>
      ))}
    </div>
  );
};

export default IdentityTray;
