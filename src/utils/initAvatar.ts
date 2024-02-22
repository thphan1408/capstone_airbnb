const initAvatar = (name: string) => {
  const nameAvatar = name.split(' ');
  const newAvatar =
    nameAvatar[0].charAt(0) + nameAvatar[nameAvatar.length - 1].charAt(0);
  return `https://ui-avatars.com/api/?name=${newAvatar}&background=random&size=200`;
};

export { initAvatar };
