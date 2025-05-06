import React from 'react';
import './Card.css';

/**
 * 카드 컴포넌트
 * @param {object} props - 컴포넌트 속성
 * @param {'default'|'elevated'|'outlined'} props.variant - 카드 변형
 * @param {string} props.title - 카드 제목
 * @param {string} props.subtitle - 카드 부제목
 * @param {React.ReactNode} props.media - 카드 미디어
 * @param {React.ReactNode} props.actions - 카드 하단 액션
 * @param {React.ReactNode} props.children - 카드 내용
 */
export const Card = ({
  variant = 'default',
  title,
  subtitle,
  media,
  actions,
  children,
  ...props
}) => {
  const classNames = [
    'card',
    `card-${variant}`,
  ].filter(Boolean).join(' ');

  return (
    <div className={classNames} {...props}>
      {media && <div className="card-media">{media}</div>}
      <div className="card-content">
        {title && (
          <div className="card-title">{title}</div>
        )}
        {subtitle && (
          <div className="card-subtitle">{subtitle}</div>
        )}
        <div className="card-body">{children}</div>
      </div>
      {actions && <div className="card-actions">{actions}</div>}
    </div>
  );
};

export default Card; 