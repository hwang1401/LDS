import React, { useState } from 'react';
import './Form.css';
import Button from '../../primitives/Button';

/**
 * 폼 패턴 컴포넌트
 * @param {object} props - 컴포넌트 속성
 * @param {string} props.title - 폼 제목
 * @param {Array} props.fields - 폼 필드 배열 [{name, label, type, required, placeholder, ...restProps}]
 * @param {function} props.onSubmit - 제출 핸들러
 * @param {string} props.submitText - 제출 버튼 텍스트
 * @param {string} props.cancelText - 취소 버튼 텍스트
 * @param {function} props.onCancel - 취소 핸들러
 */
export const Form = ({
  title,
  fields = [],
  onSubmit,
  submitText = '제출',
  cancelText = '취소',
  onCancel,
  ...props
}) => {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // 에러 메시지 제거
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    fields.forEach(field => {
      if (field.required && !formData[field.name]) {
        newErrors[field.name] = `${field.label}은(는) 필수 항목입니다.`;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit && onSubmit(formData);
    }
  };

  const handleCancel = (e) => {
    e.preventDefault();
    onCancel && onCancel();
  };

  return (
    <div className="form-container">
      {title && <h3 className="form-title">{title}</h3>}
      
      <form className="form" onSubmit={handleSubmit} {...props}>
        {fields.map((field, index) => {
          const { name, label, type = 'text', required, placeholder, ...restProps } = field;
          
          return (
            <div key={index} className="form-field">
              <label className="form-label">
                {label}
                {required && <span className="form-required">*</span>}
              </label>
              
              <input
                type={type}
                name={name}
                value={formData[name] || ''}
                onChange={handleChange}
                placeholder={placeholder}
                className={`form-input ${errors[name] ? 'form-input-error' : ''}`}
                {...restProps}
              />
              
              {errors[name] && (
                <div className="form-error">{errors[name]}</div>
              )}
            </div>
          );
        })}
        
        <div className="form-actions">
          {onCancel && (
            <Button
              variant="secondary"
              appearance="outlined"
              onClick={handleCancel}
            >
              {cancelText}
            </Button>
          )}
          
          <Button
            variant="primary"
            type="submit"
          >
            {submitText}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Form; 