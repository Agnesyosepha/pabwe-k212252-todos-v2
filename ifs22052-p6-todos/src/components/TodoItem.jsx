import PropTypes from "prop-types"; // Mengimpor PropTypes untuk validasi tipe props
import { Link } from "react-router-dom"; // Mengimpor Link untuk navigasi antar halaman
import { postedAt } from "../utils/tools"; // Mengimpor fungsi untuk format waktu
import { FaClock, FaTrash } from "react-icons/fa6"; // Mengimpor ikon untuk digunakan pada tombol

// Komponen TodoItem menerima props 'todo' dan 'onDeleteTodo'
function TodoItem({ todo, onDeleteTodo }) {
  // Mengatur status badge (tanda) berdasarkan apakah todo sudah selesai atau belum
  let badgeStatus, badgeLabel;
  if (todo.is_finished) {
    badgeStatus = "badge bg-success text-white ms-3"; // Menampilkan badge hijau jika todo selesai
    badgeLabel = "Selesai"; // Label untuk status selesai
  } else {
    badgeStatus = "badge bg-warning text-dark ms-3"; // Menampilkan badge kuning jika todo belum selesai
    badgeLabel = "Belum Selesai"; // Label untuk status belum selesai
  }

  return (
    <div className="card mt-3">
      <div className="card-body">
        <div className="row align-items-center">
          {/* Menampilkan judul todo sebagai tautan */}
          <div className="col-8 d-flex">
            <h5>
              <Link to={`/todos/${todo.id}`} className="text-primary">
                {todo.title}
              </Link>
            </h5>
            {/* Menampilkan badge status todo */}
            <div>
              <span className={badgeStatus}>{badgeLabel}</span>
            </div>
          </div>

          {/* Tombol untuk menghapus todo */}
          <div className="col-4 text-end">
            <button
              type="button"
              onClick={() => {
                // Menggunakan SweetAlert untuk konfirmasi sebelum menghapus todo
                // eslint-disable-next-line no-undef
                Swal.fire({
                  title: "Hapus Todo", // Judul dialog
                  text: `Apakah kamu yakin ingin mehapus todo: 
${todo.title}?`, // Pesan konfirmasi dengan nama todo
                  icon: "warning", // Ikon peringatan
                  showCancelButton: true, // Menampilkan tombol batal
                  confirmButtonText: "Ya, Tetap Hapus", // Teks pada tombol konfirmasi
                  customClass: {
                    confirmButton: "btn btn-danger me-3 mb-4", // Styling untuk tombol konfirmasi
                    cancelButton: "btn btn-secondary mb-4", // Styling untuk tombol batal
                  },
                  buttonsStyling: false, // Mengatur custom styling
                }).then((result) => {
                  // Jika pengguna menekan tombol konfirmasi, jalankan onDeleteTodo
                  if (result.isConfirmed) {
                    onDeleteTodo(todo.id);
                  }
                });
              }}
              className="btn btn-sm btn-outline-danger"
            >
              <FaTrash /> Hapus {/* Ikon trash untuk tombol hapus */}
            </button>
          </div>

          {/* Menampilkan waktu pembuatan todo */}
          <div className="col-12">
            <div className="text-sm op-5">
              <FaClock /> {/* Ikon jam */}
              <span className="ps-2">{postedAt(todo.created_at)}</span>{" "}
              {/* Format waktu */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Definisi tipe dan bentuk data todo yang diterima oleh komponen ini menggunakan PropTypes
const todoItemShape = {
  id: PropTypes.number.isRequired, // ID todo wajib dan harus berupa angka
  title: PropTypes.string.isRequired, // Judul todo wajib dan harus berupa string
  is_finished: PropTypes.number.isRequired, // Status selesai wajib dan harus berupa angka
  cover: PropTypes.string, // Cover opsional dan berupa string
  created_at: PropTypes.string.isRequired, // Tanggal pembuatan wajib dan berupa string
  updated_at: PropTypes.string.isRequired, // Tanggal pembaruan wajib dan berupa string
};

// Validasi tipe props yang diterima oleh komponen TodoItem
TodoItem.propTypes = {
  todo: PropTypes.shape(todoItemShape).isRequired, // todo harus sesuai dengan bentuk todoItemShape
  onDeleteTodo: PropTypes.func.isRequired, // onDeleteTodo wajib dan harus berupa fungsi
};

// Ekspor bentuk data todo untuk digunakan di tempat lain
// eslint-disable-next-line react-refresh/only-export-components
export { todoItemShape };

// Ekspor komponen TodoItem sebagai default export
export default TodoItem;
