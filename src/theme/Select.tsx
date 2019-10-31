import React, { useState, useEffect, useRef } from "react";
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
  const [visible, setVisible] = useState<boolean>(false);
  const [groupName, setGroupName] = useState<string>("");
  useEffect(() => {
    setDefaultValue();
    setGroupName(uuid());
  }, []);

  const handleChangeRadio = (value: string, children: string) => {
    setCurrentValue({
      value,
      children
    });
    setVisible(false);
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

  const handleSelectKeyboard = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const KEY_CODE = {
      ENTER: 13,
      ARROW_TOP: 38,
      ARROW_BOTTOM: 40,
      ARROW_LEFT: 37,
      ARROW_RIGHT: 39,
      TAB: 9
    };
    switch (e.keyCode) {
      case KEY_CODE.ENTER:
        setVisible(!visible);
    }
  };

  return (
    <SelectBox>
      <SelectLabel
        type="text"
        {...props}
        placeholder={placeholder}
        value={currentValue.children}
        onClick={() => setVisible(!visible)}
        onKeyDown={e => handleSelectKeyboard(e)}
        readOnly
      />
      {visible && (
        <OptionWrap>
          {children &&
            children.map(item => (
              <Option
                name={groupName}
                {...item}
                selected={currentValue.value === item.props.value}
                onChange={handleChangeRadio}
                key={uuid()}
                tabIndex="0"
              />
            ))}
        </OptionWrap>
      )}
    </SelectBox>
  );
};

const Option = ({ name, props, onChange, tabIndex, selected, ...others }: any) => {
  const { children, ...innerOthers } = props;
  const handleOptionKeyboard = (e: React.KeyboardEvent<HTMLLabelElement>) => {
    if (e.keyCode === 13) {
      onChange(innerOthers.value, children);
    }
  };
  return (
    <OptionItem>
      <OptionLabel className={selected && "on"} tabIndex={tabIndex} onKeyDown={handleOptionKeyboard}>
        <input
          tabIndex="-1"
          type="radio"
          name={name}
          onChange={e => onChange(e.currentTarget.value, children)}
          {...innerOthers}
        />
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

  &:focus {
    border-color: ${palette.primary};
  }
`;
const OptionWrap = styled.ul`
  position: absolute;
  top: 100%;
  width: 100%;
  left: 0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  background-color: #fff;
  transform: translateY(2px);
  max-height: 200px;
  overflow-y: auto;
`;
const OptionItem = styled.li`
  height: 30px;
  line-height: 30px;
  cursor: pointer;

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
  padding: 0 10px;
  cursor: inherit;

  input[type="radio"] {
    position: absolute;
    left: -9999px;

    &:checked ~ span {
      background-color: ${palette.lightPrimary};
      color: #fff;
    }
  }

  &.on {
    background-color: ${palette.primary};
    color: #fff;
  }
`;

export default Select;
