CREATE TABLE NguoiDung(
    id_nguoi_dung INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(250),
    email VARCHAR(250),
    pass_word VARCHAR(250),
    phone VARCHAR(250),
    birth_day VARCHAR(250),
    gender VARCHAR(250),
    role VARCHAR(250),
    avatar VARCHAR(255)
) 

CREATE TABLE Phong(
    id_phong INT PRIMARY KEY AUTO_INCREMENT,
    ten_phong VARCHAR(250),
    khach INT,
    phong_ngu INT,
    giuong INT,
    phong_tam INT,
    gia_tien INT,
    mo_ta VARCHAR(250),
    may_giat BOOLEAN,
    ban_ui BOOLEAN,
    tivi BOOLEAN,
    dieu_hoa BOOLEAN,
    wifi BOOLEAN,
    bep BOOLEAN,
    do_xe BOOLEAN,
    ho_boi BOOLEAN,
    hinh_anh VARCHAR(250),
    ma_vi_tri INT,
    id_nguoi_dung INT,
    FOREIGN KEY (id_nguoi_dung) REFERENCES NguoiDung(id_nguoi_dung) ON DELETE CASCADE,
    FOREIGN KEY (ma_vi_tri) REFERENCES ViTri(id_vi_tri) ON DELETE CASCADE
) 

CREATE TABLE DatPhong(
    id_dat_phong INT PRIMARY KEY AUTO_INCREMENT,
    ngay_den DATE,
    ngay_di DATE,
    so_luong_khach INT,
    ma_phong INT,
    ma_nguoi_dat INT,
    FOREIGN KEY (ma_nguoi_dat) REFERENCES NguoiDung(id_nguoi_dung) ON DELETE CASCADE,
    FOREIGN KEY (ma_phong) REFERENCES Phong(id_phong) ON DELETE CASCADE
) 

CREATE TABLE BinhLuan(
    id_binh_luan INT PRIMARY KEY AUTO_INCREMENT,
    noi_dung VARCHAR(250),
    ngay_binh_luan DATE,
    sao_binh_luan INT,
    ma_nguoi_binh_luan INT,
    ma_phong INT,
    FOREIGN KEY (ma_nguoi_binh_luan) REFERENCES NguoiDung(id_nguoi_dung) ON DELETE CASCADE,
    FOREIGN KEY (ma_phong) REFERENCES Phong(id_phong) ON DELETE CASCADE
) 

CREATE TABLE ViTri(
    id_vi_tri INT PRIMARY KEY AUTO_INCREMENT,
    ten_vi_tri VARCHAR(250),
    tinh_thanh VARCHAR(250),
    quoc_gia VARCHAR(250),
    hinh_anh VARCHAR(250)
) 

--- Thêm data NguoiDung
INSERT INTO NguoiDung (name, email, pass_word, phone, birth_day, gender, role, avatar) VALUES
('John Doe', 'john@example.com', 'password123', '123456789', '1990-01-01', 'Male', 'User', 'avatar1.jpg'),
('Jane Smith', 'jane@example.com', 'password456', '987654321', '1991-02-02', 'Female', 'User', 'avatar2.jpg'),
('Michael Johnson', 'michael@example.com', 'password789', '555555555', '1992-03-03', 'Male', 'Admin', 'avatar3.jpg'),
('Emily Brown', 'emily@example.com', 'passwordabc', '444444444', '1993-04-04', 'Female', 'User', 'avatar4.jpg'),
('William Taylor', 'william@example.com', 'passworddef', '777777777', '1994-05-05', 'Male', 'User', 'avatar5.jpg'),
('Olivia Martinez', 'olivia@example.com', 'passwordghi', '222222222', '1995-06-06', 'Female', 'User', 'avatar6.jpg'),
('James Wilson', 'james@example.com', 'passwordjkl', '333333333', '1996-07-07', 'Male', 'User', 'avatar7.jpg'),
('Emma Anderson', 'emma@example.com', 'passwordmno', '666666666', '1997-08-08', 'Female', 'Admin', 'avatar8.jpg'),
('Alexander Thomas', 'alexander@example.com', 'passwordpqr', '999999999', '1998-09-09', 'Male', 'User', 'avatar9.jpg'),
('Sophia Jackson', 'sophia@example.com', 'passwordstu', '111111111', '1999-10-10', 'Female', 'User', 'avatar10.jpg'),
('Matthew White', 'matthew@example.com', 'passwordvwx', '222222222', '2000-11-11', 'Male', 'User', 'avatar11.jpg'),
('Ava Harris', 'ava@example.com', 'passwordyz', '333333333', '2001-12-12', 'Female', 'User', 'avatar12.jpg'),
('Ethan Martin', 'ethan@example.com', 'password123', '444444444', '2002-01-01', 'Male', 'User', 'avatar13.jpg'),
('Mia Thompson', 'mia@example.com', 'password456', '555555555', '2003-02-02', 'Female', 'User', 'avatar14.jpg'),
('Daniel Garcia', 'daniel@example.com', 'password789', '666666666', '2004-03-03', 'Male', 'User', 'avatar15.jpg');

--- Thêm data ViTri
INSERT INTO ViTri (ten_vi_tri, tinh_thanh, quoc_gia, hinh_anh) VALUES
('Resort Vũng Tàu', 'Vũng Tàu', 'Việt Nam', 'resort_vungtau.jpg'),
('Khách sạn Hồ Chí Minh', 'Hồ Chí Minh', 'Việt Nam', 'hotel_hochiminh.jpg'),
('Biệt thự Đà Nẵng', 'Đà Nẵng', 'Việt Nam', 'villa_danang.jpg'),
('Resort Phú Quốc', 'Phú Quốc', 'Việt Nam', 'resort_phuquoc.jpg'),
('Khách sạn Nha Trang', 'Nha Trang', 'Việt Nam', 'hotel_nhatrang.jpg'),
('Villa Hội An', 'Hội An', 'Việt Nam', 'villa_hoian.jpg'),
('Resort Cần Thơ', 'Cần Thơ', 'Việt Nam', 'resort_cantho.jpg'),
('Khách sạn Đà Lạt', 'Đà Lạt', 'Việt Nam', 'hotel_dalat.jpg'),
('Biệt thự Hạ Long', 'Hạ Long', 'Việt Nam', 'villa_halong.jpg'),
('Resort Ninh Bình', 'Ninh Bình', 'Việt Nam', 'resort_ninhbinh.jpg'),
('Khách sạn Huế', 'Huế', 'Việt Nam', 'hotel_hue.jpg'),
('Villa Đà Lat', 'Đà Lat', 'Việt Nam', 'villa_dalat.jpg'),
('Resort Sapa', 'Sapa', 'Việt Nam', 'resort_sapa.jpg'),
('Khách sạn Vũng Tàu', 'Vũng Tàu', 'Việt Nam', 'hotel_vungtau.jpg'),
('Biệt thự Phan Thiết', 'Phan Thiết', 'Việt Nam', 'villa_phanthiet.jpg');


--- Thêm data Phong
INSERT INTO Phong (ten_phong, khach, phong_ngu, giuong, phong_tam, gia_tien, mo_ta, may_giat, ban_ui, tivi, dieu_hoa, wifi, bep, do_xe, ho_boi, hinh_anh, ma_vi_tri, id_nguoi_dung) VALUES
('Phòng Deluxe', 2, 1, 1, 1, 1000000, 'Phòng sang trọng với view đẹp', TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, 'phong_deluxe.jpg', 1, 1),
('Studio Apartment', 1, 1, 1, 1, 800000, 'Phòng studio tiện nghi cho 1 người', TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, 'studio_apartment.jpg', 2, 3),
('Biệt thự riêng biệt', 6, 3, 3, 2, 3000000, 'Biệt thự sang trọng cho gia đình', TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, 'biet_thu.jpg', 3, 4),
('Phòng Superior', 2, 1, 1, 1, 1200000, 'Phòng tiêu chuẩn với giá phải chăng', TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, 'phong_superior.jpg', 4, 2),
('Penthouse Suite', 4, 2, 2, 2, 2500000, 'Suite tầng thượng với view đẹp', TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, 'penthouse_suite.jpg', 5, 15),
('Căn hộ cao cấp', 3, 2, 2, 1, 1800000, 'Căn hộ sang trọng cho gia đình nhỏ', TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, 'can_ho_cao_cap.jpg', 6, 12),
('Phòng Family', 4, 2, 2, 2, 1500000, 'Phòng rộng rãi cho gia đình', TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, 'phong_family.jpg', 7, 10),
('Suite Executive', 2, 1, 1, 1, 2000000, 'Suite cao cấp với dịch vụ VIP', TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, 'suite_executive.jpg', 8, 8),
('Biệt thự biển', 8, 4, 4, 3, 4000000, 'Biệt thự ngay bên bãi biển', TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, 'biet_thu_bien.jpg', 9, 7),
('Phòng Triple', 3, 2, 2, 1, 1400000, 'Phòng cho 3 người với giá hợp lý', TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, 'phong_triple.jpg', 10, 9),
('Phòng Đôi', 2, 1, 1, 1, 1000000, 'Phòng tiêu chuẩn cho cặp đôi', TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, 'phong_doi.jpg', 11, 5),
('Căn hộ dịch vụ', 4, 2, 2, 1, 2200000, 'Căn hộ với dịch vụ hoàn hảo', TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, 'can_ho_dich_vu.jpg', 12, 6),
('Phòng Quad', 4, 2, 2, 2, 1600000, 'Phòng tiện nghi cho 4 người', TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, 'phong_quad.jpg', 13, 3),
('Suite Deluxe', 2, 1, 1, 1, 1800000, 'Suite sang trọng với dịch vụ VIP', TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, 'suite_deluxe.jpg', 14, 2),
('Phòng Twin', 2, 1, 1, 1, 1200000, 'Phòng cho 2 người với giường Twin', TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, 'phong_twin.jpg', 15, 13);


--- Thêm data DatPhong
INSERT INTO DatPhong (ngay_den, ngay_di, so_luong_khach, ma_phong, ma_nguoi_dat) VALUES
('2024-03-01', '2024-03-05', 2, 1, 1),
('2024-03-02', '2024-03-04', 1, 2, 2),
('2024-03-03', '2024-03-06', 3, 3, 3),
('2024-03-04', '2024-03-07', 2, 4, 4),
('2024-03-05', '2024-03-08', 4, 5, 5),
('2024-03-06', '2024-03-09', 2, 6, 6),
('2024-03-07', '2024-03-10', 3, 7, 7),
('2024-03-08', '2024-03-11', 2, 8, 8),
('2024-03-09', '2024-03-12', 5, 9, 9),
('2024-03-10', '2024-03-13', 3, 10, 10),
('2024-03-11', '2024-03-14', 2, 11, 11),
('2024-03-12', '2024-03-15', 4, 12, 12),
('2024-03-13', '2024-03-16', 3, 13, 13),
('2024-03-14', '2024-03-17', 2, 14, 14),
('2024-03-15', '2024-03-18', 2, 15, 15);

--- Thêm data BinhLuan
INSERT INTO BinhLuan (noi_dung, ngay_binh_luan, sao_binh_luan, ma_nguoi_binh_luan, ma_phong) VALUES
('Phòng rất sạch sẽ và thoải mái', '2024-03-01', 5, 1, 1),
('Dịch vụ tốt, nhân viên thân thiện', '2024-03-02', 4, 2, 2),
('Không gian đẹp và yên tĩnh', '2024-03-03', 5, 3, 3),
('Giá cả phải chăng, phòng đẹp', '2024-03-04', 4, 4, 4),
('View từ phòng rất đẹp', '2024-03-05', 5, 5, 5),
('Dịch vụ ở đây rất tốt', '2024-03-06', 4, 6, 6),
('Phòng rộng rãi và thoải mái', '2024-03-07', 5, 7, 7),
('Đồ ăn ngon và phong phú', '2024-03-08', 4, 8, 8),
('Tiện nghi trong phòng đầy đủ', '2024-03-09', 5, 9, 9),
('Nhân viên rất nhiệt tình', '2024-03-10', 4, 10, 10),
('Phòng sạch sẽ và thoải mái', '2024-03-11', 5, 11, 11),
('Dịch vụ chuyên nghiệp', '2024-03-12', 4, 12, 12),
('Giá cả hợp lý, phòng đẹp', '2024-03-13', 5, 13, 13),
('View từ phòng đẹp và lãng mạn', '2024-03-14', 4, 14, 14),
('Đồ ăn ngon và phong phú', '2024-03-15', 5, 15, 15);
