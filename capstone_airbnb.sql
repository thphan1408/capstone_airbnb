CREATE TABLE NguoiDung(
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(250),
    email VARCHAR(250),
    pass_word VARCHAR(250),
    phone VARCHAR(250),
    birth_day VARCHAR(250),
    gender VARCHAR(250),
    role VARCHAR(250)
) 

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