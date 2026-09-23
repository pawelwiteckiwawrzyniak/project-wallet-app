import React from 'react';
import teamArray from './team.json';
import {
  TeamSheet,
  TeamItem,
  TeamItemImage,
  TeamItemRole,
  TeamItemName,
  TeamItemSocials,
  
} from './TeamList.styled';

function TeamList() {
  return (
    <div>
      <TeamSheet>
        {teamArray.map(({ id, image, name, role, link }) => (
          <TeamItem key={id}>
            <TeamItemImage src={image} />
            <TeamItemName>{name}</TeamItemName>

            <TeamItemRole>{role}</TeamItemRole>
            <a href={link}>
              <TeamItemSocials />
            </a>
          </TeamItem>
        ))}
      </TeamSheet>
    </div>
  );
}

export default TeamList;