import React from 'react';
import './style.css';
import { SimpleCell, Avatar } from '@vkontakte/vkui';

type Group = {
  id: number;
  name: string;
  closed: boolean;
  avatar_color?: string;
  members_count: number;
  friends?: User[];
};

type User = {
  first_name: string;
  last_name: string;
};

function Card(props: Group) {
  const [description, setDescription] = React.useState(false);

  const avatarColor = props?.avatar_color;
  const nameGroup = props?.name;
  const closed = props?.closed ? 'Закрытая' : 'Открытая';
  const friends = props?.friends;
  const friendsLength = props.friends?.length;
  const members = props?.members_count;

  return (
    <SimpleCell
      onClick={friendsLength ? () => setDescription(!description) : void 0}
      className="Card"
      Component="label"
      before={avatarColor && <Avatar size={100} style={{ backgroundColor: avatarColor }} src="#" />}
      after={
        description && (
          <div className="Card-Info">
            {friends?.map((obj: User, i: number) => (
              <div key={i}>
                {obj?.first_name} {obj?.last_name}
              </div>
            ))}
          </div>
        )
      }
    >
      <div className="Card-Info">
        {nameGroup && <div>Наименование: {nameGroup}</div>}
        {closed && <div>Приватность: {closed}</div>}
        {typeof friendsLength === 'number' && <div>Кол-во друзей: {friendsLength}</div>}
        {members > 0 && <div>Кол-во подписчиков: {members}</div>}
      </div>
    </SimpleCell>
  );
}

export default React.memo(Card);
