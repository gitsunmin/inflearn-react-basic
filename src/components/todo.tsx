import { useEffect, useRef, useState } from 'react';

type Props = {
    title: string;
    checked: boolean;
    mode: 'edit' | 'read';
    onCheck: (checked: boolean) => void;
    onDelete: () => void;
    onEdit: (title: string) => void;
    onChangeMode: () => void;
}

export const Todo = ({
    title,
    checked,
    mode,
    onEdit,
    onChangeMode,
    onCheck,
    onDelete,
}: Props) => {
    const [editedTitle, setEditedTitle] = useState(title);
    const titleInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (mode === 'edit') {
            titleInputRef.current?.focus();
        }
    }, [mode]);

    return (
        <div className="flex gap-x-[12px] items-center text-[white] px-[12px] py-[8px] border-[1px] border-solid border-white">
            <div className='flex gap-x-[12px] items-center'>
                <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => onCheck(!checked)}
                />
                {
                    mode === 'read'
                        ? <span className={`${checked ? 'line-through' : ''} text-lg`}>{title}</span>
                        : <span className="text-lg">
                            <input
                                type="text"
                                ref={titleInputRef}
                                value={editedTitle}
                                onChange={(e) => setEditedTitle(e.target.value)}
                                onBlur={() => onEdit(editedTitle)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') onEdit(editedTitle);
                                }}
                            />
                        </span>
                }
            </div>
            <div className='flex gap-x-[12px] items-center'>
                <button className='px-[4px] py-[2px] border-[1px] border-solid border-white' onClick={onChangeMode}>수정</button>
                <button className='px-[4px] py-[2px] border-[1px] border-solid border-white' onClick={onDelete}>삭제</button>
            </div>
        </div>
    );
}