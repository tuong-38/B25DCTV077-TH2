// Biến lưu trữ trạng thái ứng dụng
let books = [];
let favorites = JSON.parse(localStorage.getItem("fav_books")) || [];

// DOM Elements
const bookGrid = document.getElementById("bookGrid");
const statusBar = document.getElementById("statusBar");
const searchInput = document.getElementById("searchInput");
const genreSelect = document.getElementById("genreSelect");
const favCount = document.getElementById("favCount");
const addBookForm = document.getElementById("addBookForm");

// 1. Tải danh sách sách bằng async/await + fetch
async function loadBooks() {
  try {
    statusBar.textContent = "Đang tải...";
    const response = await fetch("./books.json");
    if (!response.ok) throw new Error("Không thể nạp dữ liệu sách!");
    
    books = await response.json();
    render();
  } catch (error) {
    statusBar.textContent = "Lỗi: " + error.message;
    statusBar.style.color = "red";
  }
}

// 2. Cập nhật danh sách thể loại động ở thanh lọc (dùng Set không trùng lặp)
function updateGenreFilter() {
  const currentSelected = genreSelect.value;
  genreSelect.innerHTML = '<option value="All">Tất cả thể loại</option>';
  
  // Trích xuất tất cả thể loại hiện có từ mảng books
  const genres = new Set(books.map((b) => b.genre));
  
  genres.forEach((genre) => {
    const opt = document.createElement("option");
    opt.value = genre;
    opt.textContent = genre;
    genreSelect.appendChild(opt);
  });

  // Giữ lại lựa chọn hiện tại nếu vẫn tồn tại
  if (Array.from(genres).includes(currentSelected)) {
    genreSelect.value = currentSelected;
  }
}

// 3. Render danh sách sách + Bộ lọc
function render() {
  updateGenreFilter(); // Cập nhật danh sách thể loại mỗi khi render

  const keyword = searchInput.value.toLowerCase().trim();
  const selectedGenre = genreSelect.value;

  // Lọc theo từ khóa và thể loại
  const filtered = books.filter((book) => {
    const matchName = book.title.toLowerCase().includes(keyword);
    const matchGenre = selectedGenre === "All" || book.genre === selectedGenre;
    return matchName && matchGenre;
  });

  // Cập nhật dòng trạng thái
  statusBar.textContent = `Đang hiển thị ${filtered.length} / ${books.length} cuốn`;
  statusBar.style.color = "#555";

  // Cập nhật số lượng yêu thích trên Header
  favCount.textContent = favorites.length;

  // Vẽ danh sách thẻ sách
  bookGrid.innerHTML = "";
  filtered.forEach((book) => {
    const isFav = favorites.includes(book.id);
    const card = document.createElement("div");
    card.className = "book-card";
    card.innerHTML = `
      <div>
        <h4>${book.title}</h4>
        <p><strong>Tác giả:</strong> ${book.author}</p>
        <p><strong>Thể loại:</strong> ${book.genre}</p>
        <p><strong>Năm XB:</strong> ${book.year}</p>
      </div>
      <div class="card-btns">
        <button class="btn btn-fav ${isFav ? "active" : ""}" data-id="${book.id}">
          ${isFav ? "★ Đã thích" : "☆ Yêu thích"}
        </button>
        <button class="btn btn-del" data-id="${book.id}">Xóa</button>
      </div>
    `;
    bookGrid.appendChild(card);
  });
}

// 4. Xử lý nút Yêu thích & Xóa bằng Event Delegation
bookGrid.addEventListener("click", (e) => {
  const target = e.target;
  const bookId = target.dataset.id;
  if (!bookId) return;

  // Nút Yêu thích
  if (target.classList.contains("btn-fav")) {
    if (favorites.includes(bookId)) {
      favorites = favorites.filter((id) => id !== bookId);
    } else {
      favorites.push(bookId);
    }
    localStorage.setItem("fav_books", JSON.stringify(favorites));
    render();
  }

  // Nút Xóa
  if (target.classList.contains("btn-del")) {
    if (confirm("Bạn có chắc chắn muốn xóa cuốn sách này?")) {
      books = books.filter((b) => b.id !== bookId);
      favorites = favorites.filter((id) => id !== bookId);
      localStorage.setItem("fav_books", JSON.stringify(favorites));
      render();
    }
  }
});

searchInput.addEventListener("input", render);
genreSelect.addEventListener("change", render);

// 5. Validate Form thêm sách
function validateForm() {
  let isValid = true;

  const title = document.getElementById("titleInput").value.trim();
  const author = document.getElementById("authorInput").value.trim();
  const genre = document.getElementById("genreInput").value.trim();
  const year = parseInt(document.getElementById("yearInput").value);

  // Reset thông báo lỗi
  document.querySelectorAll(".error-msg").forEach((el) => (el.textContent = ""));

  // Tên sách 
  if (title.length < 3) {
    document.getElementById("titleError").textContent = "Tên sách phải có ít nhất 3 ký tự!";
    isValid = false;
  }

  // Tác giả bắt buộc
  if (!author) {
    document.getElementById("authorError").textContent = "Tác giả không được để trống!";
    isValid = false;
  }

  // Thể loại bắt buộc
  if (!genre) {
    document.getElementById("genreError").textContent = "Thể loại không được để trống!";
    isValid = false;
  }

  // Năm xuất bản từ 1900 đến năm hiện tại
  const currentYear = new Date().getFullYear();
  if (isNaN(year) || year < 1900 || year > currentYear) {
    document.getElementById("yearError").textContent = `Năm phải từ 1900 đến ${currentYear}!`;
    isValid = false;
  }

  return isValid;
}

// Kiểm tra lỗi theo thời gian thực khi gõ
addBookForm.addEventListener("input", validateForm);

// Submit Form
addBookForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (!validateForm()) return;

  const newBook = {
    id: "B" + Date.now(),
    title: document.getElementById("titleInput").value.trim(),
    author: document.getElementById("authorInput").value.trim(),
    genre: document.getElementById("genreInput").value.trim(),
    year: parseInt(document.getElementById("yearInput").value),
  };

  // Thêm sách mới vào đầu danh sách
  books.unshift(newBook);
  render(); 
  addBookForm.reset();
  alert("Thêm sách mới thành công!");
});

loadBooks();