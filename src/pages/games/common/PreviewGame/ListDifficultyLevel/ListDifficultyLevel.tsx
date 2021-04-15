import React, { FC } from 'react';
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';
import { IFnSetComplexity } from '../../../interfaces/IFnSetComplexity';

const levels = ['Очень легко', 'Легко', 'Нормально', 'Средне', 'Сложно', 'Очень сложно'];

type IProps = {
  onSetComplexity: IFnSetComplexity;
}

const ListDifficultyLevel: FC<IProps> = ({ onSetComplexity }: IProps) => {
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const handleListItemClick = (index: number) => {
    setSelectedIndex(index);
    onSetComplexity(index);
  };

  return (
    <List component="nav" aria-label="main mailbox folders">
      {
        levels.map((name, index) => {
          const isSelected = selectedIndex === index;
          const key = `${name}-${index}`;

          return (
            <ListItem
              key={key}
              button
              selected={isSelected}
              onClick={() => handleListItemClick(index)}
            >
              <ListItemText primary={name} />
              {
                (isSelected) && (
                  <ListItemIcon style={{ minWidth: 'auto' }}>
                    <CheckIcon />
                  </ListItemIcon>
                )
              }
            </ListItem>
          );
        })
      }
    </List>
  );
};

export default ListDifficultyLevel;
