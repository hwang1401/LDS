// 기본 MDX 스타일 컴포넌트
import React from 'react';

// MDX 문서에서 사용할 기본 스타일 컴포넌트
export const TokenGrid = ({ children }) => (
  <div className="token-grid">
    {children}
  </div>
);

export const TokenRow = ({ label, value, token, children }) => (
  <div className="token-row">
    {children || (
      <>
        <div className="token-preview">{value}</div>
        <div className="token-info">
          <div className="token-label">{label}</div>
          <div className="token-name">{token}</div>
          <div className="token-value">{value}</div>
        </div>
      </>
    )}
  </div>
);

export const ColorSwatch = ({ color, name, token }) => (
  <div className="color-swatch">
    <div className="color-preview" style={{ backgroundColor: color }}></div>
    <div className="color-info">
      <div className="color-name">{name}</div>
      <div className="color-token">{token}</div>
      <div className="color-value">{color}</div>
    </div>
  </div>
);

export default {
  TokenGrid,
  TokenRow,
  ColorSwatch
}; 