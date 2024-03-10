import React from 'react';

import FilterForm from './components/FilterForm';
import GroupResults from './components/GroupResults';
import Card from './components/Card';

import Store from './store';

interface Group {
  id: number;
  name: string;
  closed: boolean;
  avatar_color?: string;
  members_count: number;
  friends?: User[];
}
[];

interface User {
  first_name: string;
  last_name: string;
}

export default function App() {
  const store = new Store();
  const [data, setData] = React.useState<Group[]>([]);
  const [isLoaded, setIsLoaded] = React.useState<boolean>(true);
  const [error, setError] = React.useState<any | null>(null);

  const [groups, setGroups] = React.useState<Group[]>([]);

  const [color, setColor] = React.useState('Все');
  const [privacy, setPrivacy] = React.useState('Все');
  const [friends, setFriends] = React.useState('Все');
  const avatarColor = store.groupColor(data);

  React.useEffect(() => {
    const filterColor = store.filterColor(data, color);
    const filterPrivacy = store.filterPrivacy(data, privacy);
    const filterFriends = store.filterFriends(data, friends);
    const filter = filterColor
      .filter((el) => filterPrivacy.includes(el))
      .filter((el) => filterFriends.includes(el));
    setGroups(filter);
  }, [color, privacy, friends]);

  React.useEffect(() => {
    setTimeout(() => {
      fetch('http://localhost:8000/groups')
        .then((res) => {
          if (!res.ok) {
            throw Error('Error fetching groups data');
          }
          return res.json();
        })
        .then((json) => {
          setIsLoaded(false);
          setError(null);
          setGroups(json);
          setData(json);
        })
        .catch((err) => {
          setIsLoaded(false);
          setError(err.message);
        });
    }, 1000);
  }, []);

  return (
    <>
      <GroupResults>
        {error || (
          <>
            {avatarColor.length ? (
              <FilterForm
                avatarColor={avatarColor}
                setColor={setColor}
                setPrivacy={setPrivacy}
                setFriends={setFriends}
              />
            ) : (
              <p>Загрузка фильтра</p>
            )}
            {isLoaded && <p>Loading users...</p>}
            {groups.length > 0
              ? groups.map((group: Group) => <Card key={group.id} {...group} />)
              : isLoaded || <p>Нет таких групп</p>}
          </>
        )}
      </GroupResults>
    </>
  );
}
