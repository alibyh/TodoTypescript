// TodoItem.style.ts
import styled from "styled-components";

interface StyledProps {
  headcolor?: string;
  backgroundcolor?: string;
}

export const H1Head = styled.h1<StyledProps>`
  font-size: 34px;
  width: 100%;
  color: ${(props) => props.headcolor};
`;
export const H3div = styled.h3<StyledProps>`
  color: ${(props) => props.headcolor};
`;

export const ListItemLi = styled.li<StyledProps>`
  width: 98%;
  list-style: none;
  font-size: 30px;
  background-color: ${(props) => props.backgroundcolor};
  border-radius: 12px;
  border: 1.5px solid lightgrey;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: ${(props) => props.headcolor};
`;

export const ListItemUl = styled.ul`
  width: max-content;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 16px;
  border-radius: 10px;
  border: 1.5px solid lightgrey;
`;

export const SelectButton = styled.select<StyledProps>`
  border: none;
  height: 60px;
  border-radius: 0.25em;
  padding: 0.25em 0.5em;
  font-size: 1.25rem;
  cursor: pointer;
  background-color: transparent;
  font-family: "Roboto Mono", monospace;
  color: ${(props) => props.headcolor};
`;