import React from "react";
import styled, { createGlobalStyle } from "styled-components";
import { Input, Button, Checkbox, Radio, Select } from "./theme";

const App: React.FC = () => {
  const buttonPrefixSuffix = () => <span role="img">🚫</span>;
  const handleChangeCheckbox = (e: React.FormEvent<HTMLInputElement>) => {
    console.log(e.currentTarget.checked);
  };
  const sayHi = () => {
    alert("hi!");
  };
  return (
    <div className="App">
      <GlobalStyle />
      <Section>
        <Title>INPUT</Title>
        <Input placeholder="default" />
        <br />
        <br />
        <Input type="password" placeholder="asdfasd" />
        <br />
        <br />
        <Input
          placeholder="Keyword Here"
          after={
            <Button type="primary" onClick={() => alert("Search")}>
              Search
            </Button>
          }
        />
        <br />
        <br />
        <Input placeholder="Change Event" onChange={() => console.log("HI!")} />
      </Section>
      <Section>
        <Title>Button</Title>
        <Button>Default</Button>
        <Button type="danger">danger</Button>
        <Button type="success">success</Button>
        <Button type="primary">primary</Button>
        <Button type="warning">warning</Button>
        <Button type="info">info</Button>
        <Button type="danger" prefix={buttonPrefixSuffix}>
          prefix
        </Button>
        <Button type="warning" suffix={buttonPrefixSuffix}>
          suffix
        </Button>
      </Section>
      <Section>
        <Title>Checkbox</Title>
        <Checkbox />
        <br />
        <br />
        <Checkbox label="Checkbox with label" />
        <br />
        <br />
        <Checkbox disabled label="disabled" />
        <br />
        <br />
        <Checkbox label="test" onChange={handleChangeCheckbox} />
      </Section>
      <Section>
        <Title>Radio</Title>
        <Radio label="A" />
        <br />
        <br />
        <Radio.Group>
          <Radio label="B" />
          <Radio label="C" />
          <Radio label="D" />
        </Radio.Group>
      </Section>
      <Section>
        <Title>Select</Title>
        <Select placeholder="선택하세요" defaultValue="ko">
          <Select.Option value="ko" title="한국">
            한국
          </Select.Option>
          <Select.Option value="jp">일본</Select.Option>
        </Select>
      </Section>
    </div>
  );
};
const GlobalStyle = createGlobalStyle`
  body {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }
`;

const Section = styled.section`
  padding: 20px;
  border-bottom: 1px solid #ddd;
`;

const Title = styled.h2`
  font-size: 20px;
  margin-bottom: 20px;
`;

export default App;
