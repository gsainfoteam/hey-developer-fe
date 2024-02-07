import styled from "styled-components";

interface TextProps {
  fontWeight?: number;
  fontSize?: string;
  color?: string;
}

const Text = styled.span<TextProps>`
  font-size: ${({ fontSize }) => fontSize ?? "1em"};
  font-weight: ${({ fontWeight }) => fontWeight ?? 500};
  color: ${({ color }) => color ?? "black"};
`;

const MultipleText = styled.p`
  margin: 0;
`;

export { MultipleText, Text };
