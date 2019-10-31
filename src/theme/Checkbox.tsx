import React from "react";
import styled from "styled-components";
import palette from "./palette";

interface ICheckboxProps {
  label?: string;
  [propName: string]: any;
}

const Checkbox = ({ label, ...props }: ICheckboxProps) => {
  return (
    <CheckboxWrap>
      <input type="checkbox" {...props} />
      <CheckboxStyle />
      {label && <LabelText>{label}</LabelText>}
    </CheckboxWrap>
  );
};

const CheckboxWrap = styled.label`
  position: relative;
  display: inline-flex;
  overflow: hidden;
  align-items: center;

  &[disabled] {
    cursor: not-allowed;
  }

  input[type="checkbox"] {
    position: absolute;
    left: -9999px;

    &:checked + * {
      background-color: ${palette.primary};

      &:after {
        content: "";
        display: block;
        width: 3px;
        height: 6px;
        border: solid #fff;
        border-width: 0 2px 2px 0;
        transform: rotate(45deg);
      }
    }

    &[disabled] + * {
      cursor: not-allowed;
      border: 1px solid ${palette.info};
      background-color: ${palette.lightInfo};

      &:after {
        content: "";
        display: block;
        width: 3px;
        height: 6px;
        border: solid #ddd;
        border-width: 0 2px 2px 0;
        transform: rotate(45deg);
      }
    }
  }
`;
const CheckboxStyle = styled.div`
  vertical-align: middle;
  position: relative;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 16px;
  height: 16px;
  background-color: #fff;
  border-radius: 2px;
  margin-right: 5px;
  border: 1px solid ${palette.primary};

  &:after {
    position: absolute;
  }
`;
const LabelText = styled.span`
  font-size: 13px;
`;

export default Checkbox;
