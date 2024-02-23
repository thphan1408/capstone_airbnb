CREATE TABLE NguoiDung(
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(250),
    email VARCHAR(250),
    pass_word VARCHAR(250),
    phone VARCHAR(250),
    birth_day VARCHAR(250),
    gender VARCHAR(250),
    role VARCHAR(250),
    avatar VARCHAR(255)
) 

ALTER TABLE NguoiDung 
Add avatar VARCHAR(255)

CREATE TABLE Phong(
    id INT PRIMARY KEY AUTO_INCREMENT,
    ten_phong VARCHAR(250),
    khach INT,
    phong_ngu INT,
    giuong INT,
    phong_tam INT,
    mo_ta VARCHAR(250),
    gia_tien INT,
    may_giat BOOLEAN,
    ban_la BOOLEAN,
    tivi BOOLEAN,
    dieu_hoa BOOLEAN,
    wifi BOOLEAN,
    bep BOOLEAN,
    do_xe BOOLEAN,
    ho_boi BOOLEAN,
    ban_ui BOOLEAN,
    hinh_anh VARCHAR(250),
    FOREIGN KEY (id) REFERENCES NguoiDung(id) ON DELETE CASCADE
) 

CREATE TABLE DatPhong(
    id INT PRIMARY KEY AUTO_INCREMENT,
    ma_phong INT,
    ngay_den DATE,
    ngay_di DATE,
    so_luong_khach INT,
    ma_nguoi_dat INT,
    FOREIGN KEY (id) REFERENCES NguoiDung(id) ON DELETE CASCADE,
    FOREIGN KEY (id) REFERENCES Phong(id) ON DELETE CASCADE
) 

CREATE TABLE BinhLuan(
    id INT PRIMARY KEY AUTO_INCREMENT,
    ma_cong_viec INT,
    ma_nguoi_binh_luan INT,
    ngay_binh_luan DATE,
    noi_dung VARCHAR(250),
    sao_binh_luan INT,
    FOREIGN KEY (id) REFERENCES NguoiDung(id) ON DELETE CASCADE,
    FOREIGN KEY (id) REFERENCES Phong(id) ON DELETE CASCADE
) 

CREATE TABLE ViTri(
    id INT PRIMARY KEY AUTO_INCREMENT,
    ten_vi_tri VARCHAR(250),
    tinh_thanh VARCHAR(250),
    quoc_gia INT,
    hinh_anh VARCHAR(250),
    FOREIGN KEY (id) REFERENCES Phong(id) ON DELETE CASCADE
)


--- Thêm data NguoiDung
INSERT INTO NguoiDung (name, email, pass_word, phone, birth_day, gender, role, avatar) VALUES
('Người dùng 1', 'user1@example.com', 'password1', '123456789', '1990-01-01', 'Nam', 'User', 'avatar1.jpg'),
('Người dùng 2', 'user2@example.com', 'password2', '987654321', '1991-02-02', 'Nữ', 'User', 'avatar2.jpg'),
('Người dùng 3', 'user3@example.com', 'password3', '555555555', '1992-03-03', 'Nam', 'User', 'avatar3.jpg'),
('Người dùng 4', 'user4@example.com', 'password4', '444444444', '1993-04-04', 'Nữ', 'User', 'avatar4.jpg'),
('Người dùng 5', 'user5@example.com', 'password5', '777777777', '1994-05-05', 'Nam', 'User', 'avatar5.jpg'),
('Người dùng 6', 'user6@example.com', 'password6', '222222222', '1995-06-06', 'Nữ', 'User', 'avatar6.jpg'),
('Người dùng 7', 'user7@example.com', 'password7', '333333333', '1996-07-07', 'Nam', 'User', 'avatar7.jpg'),
('Người dùng 8', 'user8@example.com', 'password8', '666666666', '1997-08-08', 'Nữ', 'User', 'avatar8.jpg'),
('Người dùng 9', 'user9@example.com', 'password9', '999999999', '1998-09-09', 'Nam', 'User', 'avatar9.jpg'),
('Người dùng 10', 'user10@example.com', 'password10', '111111111', '1999-10-10', 'Nữ', 'User', 'avatar10.jpg'),
('Người dùng 11', 'user11@example.com', 'password11', '222222222', '2000-11-11', 'Nam', 'User', 'avatar11.jpg'),
('Người dùng 12', 'user12@example.com', 'password12', '333333333', '2001-12-12', 'Nữ', 'User', 'avatar12.jpg'),
('Người dùng 13', 'user13@example.com', 'password13', '444444444', '2002-01-01', 'Nam', 'User', 'avatar13.jpg'),
('Người dùng 14', 'user14@example.com', 'password14', '555555555', '2003-02-02', 'Nữ', 'User', 'avatar14.jpg'),
('Người dùng 15', 'user15@example.com', 'password15', '666666666', '2004-03-03', 'Nam', 'User', 'avatar15.jpg');

