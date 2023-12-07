"use client"

import { useGlobalState } from '@/app/context/globalProvider'
import React from 'react'
import styled from 'styled-components';

interface Props {
    content: React.ReactNode;
}

function EditModal({content}: Props) {
    const {closeEditModal} = useGlobalState();
    const {theme} = useGlobalState();
  return (
    <ModalStyled theme={theme}>
        <div className="modal-overlay" onClick={closeEditModal}></div>
        <div className="modal-editContent">{content}</div>
        
    </ModalStyled>
  )
}

const ModalStyled = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height:100vh;
    z-index: 100;
    display:flex;
    justify-content: center;
    align-items:center;

    .modal-overlay{
        position:absolute;
        top: 0;
        left:0;
        width:100%;
        height:100vh;
        background-color: rgba(0,0,0,0.45);
        filter:blur(4px);
    }

    .modal-editContent{
        padding: 2rem;
        position:relative;
        max-width: 630px;
        width:100%;
        z-index: 100;
        border-radius: 1rem;
        background-color: ${props => props.theme.colorBg2};
        box-shadow: 0 0 1rem rgba(0,0,0,0.3);
    }
`;

export default EditModal