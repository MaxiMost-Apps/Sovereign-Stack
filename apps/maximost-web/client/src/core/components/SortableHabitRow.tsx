import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

export default function SortableHabitRow({ id, children, disabled }: any) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id, disabled
  });

  const style = { transform: CSS.Transform.toString(transform), transition, touchAction: 'none' };

  if (disabled) return <div className="mb-2">{children}</div>; // Static render

  // VANCE PROTOCOL: Decouple Activator (Handle) from Draggable Item
  return (
    <div ref={setNodeRef} style={style} className="touch-none mb-2">
      {React.cloneElement(children, { dragAttributes: attributes, dragListeners: listeners })}
    </div>
  );
}
