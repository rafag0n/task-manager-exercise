import React from 'react';
import { FaTrash } from 'react-icons/fa';
import { LoadingIndicatorSmall } from '../atoms/loading-indicator';

type DeleteIconProps = {
    onClick: (e: React.MouseEvent) => void; 
    deleting: boolean;
}

export const DeleteIcon = ({ onClick, deleting }: DeleteIconProps) => {

    if (deleting) {
        return <LoadingIndicatorSmall color='gray' />;
    }

    return <FaTrash onClick={onClick} style={{ color: 'red', fontSize: '16px' }} />;
}