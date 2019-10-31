import React from "react";
import styled from "styled-components";
import palette from "./palette";
import uuid from "uuid";

interface IRadioProps {
  label?: string;
  [propName: string]: any;
}

const Radio = ({ label, ...props }: IRadioProps) => {
  return (
    <RadioWrap className="radio-item">
      <input type="radio" {...props} />
      <RadioStyle />
      {label ? <LabelText>{label}</LabelText> : ""}
    </RadioWrap>
  );
};

const RadioGroup = ({ children }: any) => {
  const groupName = uuid();
  return (
    <RadioOuterWrap>
      {children.map((item: IRadioProps) => (
        <Radio {...item.props} key={uuid()} name={groupName} />
      ))}
    </RadioOuterWrap>
  );
};

Radio.Group = RadioGroup;

const RadioOuterWrap = styled.div`
  display: flex;

  .radio-item {
    margin-right: 5px;

    &:nth-last-of-type(1) {
      margin-right: 0;
    }
  }
`;

const RadioWrap = styled.label`
  position: relative;
  display: inline-flex;
  overflow: hidden;
  align-items: center;

  &[disabled] {
    cursor: not-allowed;
  }

  input[type="radio"] {
    position: absolute;
    left: -9999px;

    &:checked + * {
      background-color: ${palette.primary};

      &:after {
        transform: translate(-50%, -50%) scale(1);
      }
    }

    &[disabled] + * {
      cursor: not-allowed;
      border: 1px solid ${palette.info};
      background-color: ${palette.lightInfo};

      &:after {
        transform: translate(-50%, -50%) scale(1);
      }
    }
  }
`;

const RadioStyle = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 16px;
  height: 16px;
  background-color: #fff;
  border-radius: 50%;
  margin-right: 5px;
  border: 1px solid ${palette.primary};

  &:after {
    content: "";
    display: block;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background-color: #fff;
    position: absolute;
    left: 50%;
    top: 50%;
    transition: transform 0.1s linear;
    transform: translate(-50%, -50%) scale(0);
  }
`;

const LabelText = styled.span`
  font-size: 13px;
`;

export default Radio;
