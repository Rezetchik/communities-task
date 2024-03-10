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

class Store {
  groupColor(groups: Group[]) {
    const uniq = [...new Set(groups?.map((e) => e.avatar_color))].filter(function (e) {
      return e !== undefined;
    });
    if (groups?.some((element) => element.avatar_color === undefined)) {
      uniq.push('Пусто');
    }
    return uniq;
  }

  filterColor(groups: Group[], color: string) {
    let nameFilter = color;
    if (nameFilter != 'Все') {
      if (nameFilter == 'Пусто') {
        const uniq = groups?.filter((e) => e.avatar_color === undefined);
        return uniq;
      }
      const uniq = groups?.filter((e) =>
        e.avatar_color?.toUpperCase().includes(nameFilter.toUpperCase()),
      );
      return uniq;
    }
    return groups;
  }

  filterPrivacy(groups: Group[], privacy: string) {
    let nameFilter = privacy;
    if (nameFilter != 'Все') {
      const uniq = groups?.filter((e) => nameFilter == e.closed?.toString());
      return uniq;
    }
    return groups;
  }

  filterFriends(groups: Group[], friends: string) {
    let nameFilter = friends;
    if (nameFilter == 'true') {
      const uniq = groups?.filter((e) => typeof e.friends?.length === 'number');
      return uniq;
    }
    if (nameFilter == 'false') {
      const uniq = groups?.filter((e) => typeof e.friends?.length !== 'number');
      return uniq;
    }
    return groups;
  }
}

export default Store;
