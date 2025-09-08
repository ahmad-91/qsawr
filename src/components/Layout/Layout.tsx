import React from 'react';
import styled from 'styled-components';
import AppBar from './AppBar';

const LayoutContainer = styled.div<{ showAppBar: boolean }>`
  min-height: 100vh;
  background: ${({ theme }) => theme.currentMode?.color?.gradients?.primary || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'};
  padding-top: ${({ showAppBar }) => showAppBar ? '80px' : '0'}; /* Dynamic padding based on AppBar */
`;

const PageContent = styled.main`
  padding: ${({ theme }) => theme.theme?.spacing?.xl || '2rem'};
  max-width: 1400px;
  margin: 0 auto;
  width: 100%;
`;

interface LayoutProps {
  children: React.ReactNode;
  showAppBar?: boolean; // Make AppBar optional
}

const Layout: React.FC<LayoutProps> = ({ children, showAppBar = true }) => {
  return (
    <LayoutContainer showAppBar={showAppBar}>
      {showAppBar && <AppBar />}
      <PageContent>
        {children}
      </PageContent>
    </LayoutContainer>
  );
};

export default Layout;
