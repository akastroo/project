import React, { useState } from 'react';
import QrScanner from 'react-qr-scanner';
import styled from 'styled-components';

const Container = styled.div`
  text-align: center;
  padding: 20px;
  background-color: #f2f2f2;
  min-height: 100vh;
`;

const Title = styled.h1`
  color: #6a1b9a;
  margin-bottom: 20px;
`;

const ScannerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
`;

const QRScanner = styled(QrScanner)`
  max-width: 100%;
`;

const Popup = styled.div`
  background-color: #6a1b9a;
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  position: absolute;
  top: 20px;
  right: 20px;
  z-index: 1;
`;

const ToggleButton = styled.button`
  background-color: #6a1b9a;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  margin-top: 10px;
  cursor: pointer;
`;

const EscanearIngresso = () => {
  const [resultadoScan, setResultadoScan] = useState(null);
  const [popupVisible, setPopupVisible] = useState(false);
  const [facingMode, setFacingMode] = useState('environment'); // Começa com a câmera traseira

  const handleError = (error) => {
    console.error('Erro ao escanear o QR Code:', error);
  };

  const fecharPopup = () => {
    setResultadoScan(null);
    setPopupVisible(false);
  };

  const toggleCamera = () => {
    setFacingMode((prevFacingMode) =>
      prevFacingMode === 'environment' ? 'user' : 'environment'
    );
  };

  return (
    <Container>
      <Title>Escanear Ingresso</Title>
      <ScannerContainer>
        <QRScanner
          onError={handleError}
          facingMode={facingMode}
          onScan={(result) => {
            if (result) {
              // Simule uma lista de ingressos válidos
              const ingressosValidos = [/* Lista de ingressos válidos */];

              if (ingressosValidos.includes(result)) {
                // Ingresso válido - atualize o estado para exibir o popup
                setResultadoScan('Ingresso Válido');
                setPopupVisible(true);

                // Aqui você pode implementar a lógica para marcar o ingresso como utilizado na base de dados
              } else {
                // Ingresso inválido - atualize o estado para exibir o popup
                setResultadoScan('Ingresso Inválido');
                setPopupVisible(true);
              }
            }
          }}
        />
        {resultadoScan && <Popup onClick={fecharPopup}>{resultadoScan}</Popup>}
        <ToggleButton onClick={toggleCamera}>
          Alternar Câmera ({facingMode === 'environment' ? 'Frontal' : 'Traseira'})
        </ToggleButton>
      </ScannerContainer>
    </Container>
  );
};

export default EscanearIngresso;
