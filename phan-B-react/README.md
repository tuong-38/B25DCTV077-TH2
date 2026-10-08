Bài Tập Thực Hành: Quản Lý Thư Viện Lớp

Thông tin sinh viên:
Họ và tên: Phạm Lê Thiên Tường
Mã sinh viên: B25DCTV077
Lớp: B25DCTV077 - PTIT


So Sánh Cách Làm Giữa Phần A (Vanilla JS) và Phần B (ReactJS)

1. Phương pháp thao tác Giao diện (DOM vs Virtual DOM)

Phần A (Vanilla JS): Lập trình theo phong cách Mệnh lệnh (Imperative). Người viết mã phải chủ động thao tác trực tiếp với Real DOM bằng các phương thức như document.createElement(), appendChild(), innerHTML và tự lắng nghe các sự kiện thủ công.

Phần B (ReactJS): Lập trình theo phong cách Khai báo (Declarative). Giao diện được tự động cập nhật thông qua Virtual DOM. Khi trạng thái (state) thay đổi, React sẽ tự so sánh và chỉ cập nhật chính xác những phần tử HTML bị thay đổi.

2. Kiến trúc Mã nguồn & Tái sử dụng

Phần A (Vanilla JS): Mã nguồn xử lý dữ liệu và tạo giao diện nằm tập trung trong các file JavaScript độc lập. Việc tái sử dụng cấu trúc giao diện phức tạp đòi hỏi phải viết lại các hàm render thủ công.

Phần B (ReactJS): Giao diện được chia nhỏ thành các Component hoàn chỉnh (Header, Section, BookCard,...). Mỗi component tự quản lý logic hiển thị và nhận dữ liệu thông qua props (bao gồm cả props.children), giúp mã nguồn ngắn gọn, rõ ràng và có tính tái sử dụng rất cao.

3. Đồng bộ Trạng thái Dữ liệu (State Management)

Phần A (Vanilla JS): Cần gọi hàm render() hoặc thao tác DOM thủ công mỗi khi biến dữ liệu (books, favorites) thay đổi.

Phần B (ReactJS): Sử dụng Hook useState. Mọi sự thay đổi của dữ liệu được theo dõi tự động; chỉ cần cập nhật state via setState(), React sẽ đảm bảo giao diện luôn luôn đồng bộ với dữ liệu hiện tại.
