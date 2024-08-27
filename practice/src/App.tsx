import styled, { keyframes } from "styled-components";

interface BoxProps {
  readonly bgColor: string;
}

const Father = styled.div`
  display: flex;
  background-color: ${(props) => props.theme.backgroundColor};
`;

const Title = styled.h1`
  color: ${(props) => props.theme.textColor};
`;

const Btn = styled.button`
  color: white;
  background-color: tomato;
  border: 0;
  border-radius: 15px;
`;

const Input = styled.input.attrs({ required: true, minLength: 10 })`
  background-color: tomato;
`;

const rotationAnimation = keyframes`
  0% {
    transform: rotate(0deg);
    border-radius: 0;
  }
  50% {
    border-radius: 100px;
  }
  100% {
    transform: rotate(360deg);
    border-radius: 0;
  }
`;

const Emoji = styled.span`
  font-size: 2rem;
`;

const Box = styled.div`
  width: 200px;
  height: 200px;
  background-color: tomato;
  animation: ${rotationAnimation} 1s linear infinite;
  display: flex;
  justify-content: center;
  align-items: center;

  ${Emoji}:hover {
    font-size: 4rem;
  }
`;

const BoxOne = styled.div<BoxProps>`
  background-color: ${(props) => props.bgColor};
  width: 100px;
  height: 100px;
`;

const Circle = styled(BoxOne)<BoxProps>`
  border-radius: 50%;
`;

function App() {
  return (
    <Father as="header">
      <div>
        <Title>Styled Components</Title>
      </div>
      <div>
        <Btn>Login</Btn>
        <Btn as="a" href="/">
          Login
        </Btn>
      </div>
      <div>
        <Input />
        <Input />
        <Input />
      </div>
      <div>
        <BoxOne bgColor="teal" />
      </div>
      <div>
        <Circle bgColor="tomato" />
      </div>
      <div>
        <Box>
          <Emoji>😀</Emoji>
          <Emoji as="p">😀</Emoji>
        </Box>
      </div>
    </Father>
  );
}

export default App;
