import React, { useState, useEffect } from "react";
import styled from "styled-components";
import palette from "./palette";
import uuid from "uuid";

interface ISelectProps {
  placeholder?: string;
  children?: JSX.Element[] | undefined;
  defaultValue?: string | undefined;
  [propName: string]: any;
}

interface IOptionProps {
  children: string;
  value: string;
}
const Select = ({ placeholder, children, defaultValue, ...props }: ISelectProps) => {
  const [currentValue, setCurrentValue] = useState<IOptionProps>({ children: "", value: "" });
  const [visible, setVisible] = useState(false);
  const [groupName, setGroupName] = useState<string>("");

  useEffect(() => {
    setDefaultValue();
    setGroupName(uuid());
  }, []);

  const handleChangeRadio = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
  };

  const setDefaultValue = () => {
    if (defaultValue && children) {
      children.forEach(({ props }) => {
        if (props.value === defaultValue) {
          setCurrentValue(props);
        }
      });
    }
  };

  return (
    <SelectBox {...props}>
      <SelectLabel type="text" placeholder={placeholder} value={currentValue.children} readOnly />
      <OptionWrap>
        {children &&
          children.map(item => {
            return <Option name={groupName} {...item} onChange={handleChangeRadio} key={uuid()} />;
          })}
      </OptionWrap>
    </SelectBox>
  );
};

const Option = ({ name, props, onChange, ...others }: any) => {
  const { children, ...innerOthers } = props;
  return (
    <OptionItem>
      <OptionLabel>
        <input type="radio" name={name} onChange={e => onChange(e, children)} {...innerOthers} />
        <span>{children}</span>
      </OptionLabel>
    </OptionItem>
  );
};

Select.Option = Option;

const SelectBox = styled.div`
  display: inline-flex;
  position: relative;
  flex-flow: column wrap;
  justify-content: center;
  font-size: 13px;
  color: #777;

  &:focus {
    border-color: ${palette.lightPrimary};
  }
`;
const SelectLabel = styled.input`
  font-size: 13px;
  height: 32px;
  outline: 0;
  padding: 0 5px;
  min-width: 180px;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: pointer;
`;
const OptionWrap = styled.ul`
  position: absolute;
  top: 100%;
  width: 100%;
  left: 0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  background-color: #fff;
  transform: translateY(10px);
  max-height: 200px;
  overflow-y: auto;
`;
const OptionItem = styled.li`
  height: 30px;
  line-height: 30px;
  padding: 0 10px;

  &[disabled] {
    background-color: #ddd;
    color: #777;
    outline: none;
    cursor: not-allowed;

    &:hover {
      color: #777;
      background-color: #ddd;
    }
  }

  &.on {
    background-color: ${palette.lightPrimary};
    color: #fff;
  }

  &:hover {
    color: #000;
  }
`;
const OptionLabel = styled.label`
  display: block;
  height: 100%;
  position: relative;
  overflow: hidden;
  cursor: inherit;

  &:focus {
    background-color: orange;
  }

  input[type="radio"] {
    position: absolute;
    left: -9999px;

    &:checked ~ span {
      background-color: ${palette.lightPrimary};
      color: #fff;
    }
  }
`;

export default Select;
