# Sử dụng một image có hỗ trợ Nix
FROM nixos/nix

# Đặt thư mục làm thư mục làm việc của ứng dụng Laravel
WORKDIR /app

# Copy mã nguồn ứng dụng Laravel vào image
COPY . .

# Chạy lệnh cài đặt package từ file nix và làm sạch
RUN nix-env -if .nixpacks/nixpkgs-5148520bfab61f99fd25fb9ff7bfbb50dad3c9db.nix && nix-collect-garbage -d

# Expose cổng mặc định cho ứng dụng Laravel của bạn
EXPOSE 80

# (Các bước tiếp theo của triển khai Laravel của bạn)
