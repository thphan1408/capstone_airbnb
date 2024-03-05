const initAvatar = (name: string) => {
  const nameAvatar = name.split(' ').map(word => word.charAt(0)); // Lấy chữ cái đầu của từng từ trong tên
  const newAvatar = nameAvatar.join('').toUpperCase(); // Ghép các chữ cái đầu lại và chuyển thành chữ hoa
  return `https://ui-avatars.com/api/?name=${newAvatar}&background=random&size=200`;
};

export { initAvatar };
