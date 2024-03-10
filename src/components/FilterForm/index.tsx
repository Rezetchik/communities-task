import React from 'react';
import './styles.css';
import { Group, Header, FormLayoutGroup, FormItem, RadioGroup, Radio } from '@vkontakte/vkui';

type FilterType = {
  avatarColor: (string | undefined)[];
  setColor: (e: any) => void;
  setPrivacy: (e: string) => void;
  setFriends: (e: string) => void;
};

function FilterForm(props: FilterType) {
  return (
    <Group mode="plain" className="FilterForm">
      <FormLayoutGroup>
        <Header>Фильтр</Header>
        {props.avatarColor.length ? (
          <>
            <FormItem top="Приватность">
              <RadioGroup mode="horizontal">
                <Radio
                  name="members"
                  value="all"
                  onClick={() => props.setPrivacy('Все')}
                  defaultChecked
                >
                  Все
                </Radio>
                <Radio name="members" value="classic" onClick={() => props.setPrivacy('false')}>
                  Открытая
                </Radio>
                <Radio name="members" value="regular" onClick={() => props.setPrivacy('true')}>
                  Закрытая
                </Radio>
              </RadioGroup>
            </FormItem>
            <FormItem top="Цвет аватарки">
              <RadioGroup mode="horizontal">
                <Radio
                  name="color"
                  value="all"
                  onClick={() => props.setColor('Все')}
                  defaultChecked
                >
                  Все
                </Radio>
                {props.avatarColor?.map((obj, i) => (
                  <Radio key={i} name="color" value={i} onClick={() => props.setColor(obj)}>
                    {obj}
                  </Radio>
                ))}
              </RadioGroup>
            </FormItem>
            <FormItem top="Наличие друзей в группе">
              <RadioGroup mode="horizontal">
                <Radio
                  name="friends"
                  value="all"
                  defaultChecked
                  onClick={() => props.setFriends('Все')}
                >
                  Все
                </Radio>
                <Radio name="friends" value="yes" onClick={() => props.setFriends('true')}>
                  Есть
                </Radio>
                <Radio name="friends" value="no" onClick={() => props.setFriends('false')}>
                  Нет
                </Radio>
              </RadioGroup>
            </FormItem>
          </>
        ) : (
          'Загрузка фильтра...'
        )}
      </FormLayoutGroup>
    </Group>
  );
}

export default React.memo(FilterForm);
