CREATE TABLE ViTri(
    id_vi_tri INT PRIMARY KEY AUTO_INCREMENT,
    ten_vi_tri VARCHAR(250),
    tinh_thanh VARCHAR(250),
    quoc_gia VARCHAR(250),
    hinh_anh VARCHAR(250)
) 

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

CREATE TABLE NguoiDung(
    id_nguoi_dung INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(250),
    email VARCHAR(250),
    pass_word VARCHAR(250),
    phone VARCHAR(250),
    birth_day DATE,
    gender VARCHAR(250),
    role VARCHAR(250),
    avatar VARCHAR(255)
)

INSERT INTO NguoiDung (name, email, pass_word, phone, birth_day, gender, role, avatar) VALUES
('Nguyễn Văn A', 'nguyenvana@example.com', 'password1', '0987654321', '1990-05-15', 'Nam', 'User', 'avatar1.jpg'),
('Trần Thị B', 'tranthib@example.com', 'password2', '0123456789', '1985-08-20', 'Nữ', 'User', 'avatar2.jpg'),
('Lê Văn C', 'levanc@example.com', 'password3', '0369841752', '1992-12-10', 'Nam', 'User', 'avatar3.jpg'),
('Phạm Thị D', 'phamthid@example.com', 'password4', '0912345678', '1988-03-25', 'Nữ', 'User', 'avatar4.jpg'),
('Hoàng Văn E', 'hoangvane@example.com', 'password5', '0567891234', '1995-07-30', 'Nam', 'User', 'avatar5.jpg'),
('Nguyễn Thị F', 'nguyenthif@example.com', 'password6', '0345678912', '1993-10-05', 'Nữ', 'User', 'avatar6.jpg'),
('Trần Văn G', 'tranvang@example.com', 'password7', '0789456123', '1987-02-18', 'Nam', 'User', 'avatar7.jpg'),
('Lê Thị H', 'lethih@example.com', 'password8', '0991234567', '1991-06-20', 'Nữ', 'User', 'avatar8.jpg'),
('Phan Văn I', 'phanvani@example.com', 'password9', '0678912345', '1989-09-12', 'Nam', 'User', 'avatar9.jpg'),
('Vũ Thị K', 'vuthik@example.com', 'password10', '0555555555', '1994-11-28', 'Nữ', 'User', 'avatar10.jpg'),
('Đặng Văn L', 'dangvanl@example.com', 'password11', '0333333333', '1996-04-10', 'Nam', 'User', 'avatar11.jpg'),
('Bùi Thị M', 'buithim@example.com', 'password12', '0444444444', '1986-01-05', 'Nữ', 'User', 'avatar12.jpg'),
('Lý Văn N', 'lyvann@example.com', 'password13', '0575757575', '1990-08-15', 'Nam', 'User', 'avatar13.jpg'),
('Hồ Thị O', 'hothio@example.com', 'password14', '0888888888', '1984-12-20', 'Nữ', 'User', 'avatar14.jpg'),
('Đoàn Văn P', 'doanvanp@example.com', 'password15', '0777777777', '1997-03-28', 'Nam', 'User', 'avatar15.jpg');

CREATE TABLE Phong(
    id_phong INT PRIMARY KEY AUTO_INCREMENT,
    ten_phong VARCHAR(250),
    khach INT,
    phong_ngu INT,
    giuong INT,
    phong_tam INT,
    gia_tien FLOAT,
    mo_ta VARCHAR(250),
    may_giat BOOLEAN,
    ban_ui BOOLEAN,
    tivi BOOLEAN,
    dieu_hoa BOOLEAN,
    wifi BOOLEAN,
    bep BOOLEAN,
    do_xe BOOLEAN,
    ho_boi BOOLEAN,
    ma_vi_tri INT,
    FOREIGN KEY (ma_vi_tri) REFERENCES ViTri(id_vi_tri) ON DELETE CASCADE
) 

INSERT INTO Phong (ten_phong, khach, phong_ngu, giuong, phong_tam, gia_tien, mo_ta, may_giat, ban_ui, tivi, dieu_hoa, wifi, bep, do_xe, ho_boi, ma_vi_tri) VALUES
('Phòng Deluxe', 2, 1, 1, 1, 1000000, 'Phòng sang trọng với view đẹp', TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, 1),
('Studio Apartment', 1, 1, 1, 1, 800000, 'Phòng studio tiện nghi cho 1 người', TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, 2),
('Biệt thự riêng biệt', 6, 3, 3, 2, 3000000, 'Biệt thự sang trọng cho gia đình', TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, 3 ),
('Phòng Superior', 2, 1, 1, 1, 1200000, 'Phòng tiêu chuẩn với giá phải chăng', TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, 4),
('Penthouse Suite', 4, 2, 2, 2, 2500000, 'Suite tầng thượng với view đẹp', TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, 5),
('Căn hộ cao cấp', 3, 2, 2, 1, 1800000, 'Căn hộ sang trọng cho gia đình nhỏ', TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, 6),
('Phòng Family', 4, 2, 2, 2, 1500000, 'Phòng rộng rãi cho gia đình', TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, 7),
('Suite Executive', 2, 1, 1, 1, 2000000, 'Suite cao cấp với dịch vụ VIP', TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, 8),
('Biệt thự biển', 8, 4, 4, 3, 4000000, 'Biệt thự ngay bên bãi biển', TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, 9),
('Phòng Triple', 3, 2, 2, 1, 1400000, 'Phòng cho 3 người với giá hợp lý', TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, 10),
('Phòng Đôi', 2, 1, 1, 1, 1000000, 'Phòng tiêu chuẩn cho cặp đôi', TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, 11),
('Căn hộ dịch vụ', 4, 2, 2, 1, 2200000, 'Căn hộ với dịch vụ hoàn hảo', TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, 12),
('Phòng Quad', 4, 2, 2, 2, 1600000, 'Phòng tiện nghi cho 4 người', TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, 13),
('Suite Deluxe', 2, 1, 1, 1, 1800000, 'Suite sang trọng với dịch vụ VIP', TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, 14),
('Phòng Twin', 2, 1, 1, 1, 1200000, 'Phòng cho 2 người với giường Twin', TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, 15);

CREATE TABLE HinhPhong(
	id_hinh INT PRIMARY KEY AUTO_INCREMENT,
	public_id TEXT,
	url_hinh TEXT,
	id_phong INT,
	FOREIGN KEY (id_phong) REFERENCES Phong(id_phong) ON DELETE CASCADE
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

INSERT INTO DatPhong (ngay_den, ngay_di, so_luong_khach, ma_phong, ma_nguoi_dat)
VALUES
    ('2024-02-17', '2024-02-20', 2, 1, 1),
    ('2024-02-18', '2024-02-22', 3, 2, 2),
    ('2024-02-20', '2024-02-25', 4, 3, 3),
    ('2024-02-22', '2024-02-27', 2, 4, 4),
    ('2024-02-23', '2024-02-28', 1, 5, 5),
    ('2024-02-24', '2024-03-01', 2, 6, 6),
    ('2024-02-25', '2024-03-03', 3, 7, 7),
    ('2024-02-27', '2024-03-05', 2, 8, 8),
    ('2024-02-28', '2024-03-06', 4, 9, 9),
    ('2024-02-29', '2024-03-08', 2, 10, 15),
    ('2024-03-02', '2024-03-10', 3, 11, 11),
    ('2024-03-03', '2024-03-12', 2, 12, 12),
    ('2024-03-05', '2024-03-15', 5, 13, 11),
    ('2024-03-08', '2024-03-18', 3, 14, 14),
    ('2024-03-10', '2024-03-20', 2, 15, 15);


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

INSERT INTO BinhLuan (noi_dung, ngay_binh_luan, sao_binh_luan, ma_nguoi_binh_luan, ma_phong)
VALUES
    ('Phòng sạch sẽ và thoáng đãng', '2024-02-17', 5, 1, 1),
    ('Dịch vụ tốt, nhân viên thân thiện', '2024-02-18', 4, 2, 2),
    ('Không gian ấm cúng, tiện nghi', '2024-02-20', 4, 3, 3),
    ('Giá cả hợp lý, phòng ốc đẹp', '2024-02-22', 4, 4, 4),
    ('Dịch vụ ổn định, phục vụ nhanh chóng', '2024-02-23', 4, 5, 5),
    ('Phòng tiện nghi, giá cả phải chăng', '2024-02-24', 4, 6, 6),
    ('Đồ uống ngon, view đẹp', '2024-02-25', 4, 7, 7),
    ('Không gian yên tĩnh, lý tưởng để nghỉ ngơi', '2024-02-27', 4, 8, 8),
    ('Đánh giá cao về dịch vụ và không gian', '2024-02-28', 4, 9, 9),
    ('Phòng đẹp, nhân viên thân thiện', '2024-02-29', 4, 12, 10),
    ('Dịch vụ chuyên nghiệp, giá cả hợp lý', '2024-03-02', 4, 11, 11),
    ('Không gian lịch lãm, sạch sẽ', '2024-03-03', 4, 12, 12),
    ('Phòng ốc thoải mái, đẹp mắt', '2024-03-05', 4, 15, 13),
    ('Dịch vụ tốt, nhân viên thân thiện', '2024-03-08', 4, 14, 14),
    ('Giá cả phù hợp, phòng ốc sạch sẽ', '2024-03-10', 4, 15, 15);

