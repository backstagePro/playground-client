
import * as React from 'react'
import { FC } from 'react';
import { Row, Col, Typography} from 'antd';
import { IArtefact } from '../src/state/stores/ProjectStore';
import styled from 'styled-components';

const ButtonWp = styled.div`
    background-color: white;
    cursor: pointer;
    padding: 10px;
    &:hover {
        background-color: #e6fcdc;
    }
`

const { Title } = Typography;

interface IProps {
    artefact: IArtefact,
    onClick?: () => void
}

const ArtefactButton: FC<IProps> = ({ artefact, onClick, children }) => {
    
    return (
        <ButtonWp>
            <Row onClick={onClick} justify="space-around" align="middle">
                <Col span="24">
                    <div>
                        <Title level={5}>{artefact.name}</Title>
                    </div>
                    <div>
                        {children}
                    </div>
                </Col>
            </Row>
        </ButtonWp>
    );
}

export default ArtefactButton;