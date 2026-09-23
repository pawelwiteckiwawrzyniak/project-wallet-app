import styled from 'styled-components';
import { BsGithub } from 'react-icons/bs';

export const TeamSheet = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;
export const TeamItem = styled.li`
  margin-left: 2px;
  margin-right: 2px;
  margin-bottom: 10px;
  padding: 5px;
  width: 150px;
  border-radius: 4px;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 1px 5px;
  color: $text-color;
  &:hover {
    box-shadow: rgba(0, 0, 0, 0.35) 0px 3px 10px;
    background-position: right center;
  }
`;
export const TeamItemImage = styled.img`
  border-radius: 50%;
  margin-left: auto;
  margin-right: auto;
  @media screen and (min-width: 320px) {
    display: none;
  }
  @media screen and (min-width: 768px) {
    display: block;
  }
`;
export const TeamItemName = styled.p`
  margin-top: 5px;
  font-size: 14px;
  font-weight: 700;
`;
export const TeamItemRole = styled.p`
  font-size: 13px;
    @media screen and (min-width: 320px) {
    display: none;
  }
  @media screen and (min-width: 768px) {
    display: block;
  }
`;
export const TeamItemSocials = styled(BsGithub)`
  @media screen and (min-width: 320px) {
    display: none;
  }
  @media screen and (min-width: 768px) {
    display: inline;
  }
`;
