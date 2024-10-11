import { useEffect } from "react"; // Mengimpor useEffect untuk mengelola efek samping
import { useDispatch, useSelector } from "react-redux"; // Mengimpor useDispatch dan useSelector untuk Redux
import { asyncAddTodo, addTodoActionCreator } from "../states/todos/action"; // Mengimpor action untuk menambah todo
import TodoInput from "../components/TodoInput"; // Mengimpor komponen TodoInput
import { useNavigate } from "react-router-dom"; // Mengimpor useNavigate untuk navigasi halaman

function TodoAddPage() {
  // Menginisialisasi fungsi navigate untuk pindah halaman
  const navigate = useNavigate();
  // Menginisialisasi dispatch untuk mengirim action ke Redux
  const dispatch = useDispatch();
  // Mengambil state isAddTodo dari Redux untuk mengecek status penambahan todo
  const { isAddTodo = false } = useSelector((states) => states);

  // Menggunakan useEffect untuk melakukan sesuatu ketika isAddTodo berubah
  useEffect(() => {
    if (isAddTodo) {
      // Menampilkan notifikasi sukses menggunakan Swal saat todo berhasil ditambahkan
      // eslint-disable-next-line no-undef
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Todo berhasil ditambahkan!",
        showConfirmButton: false,
        timer: 700,
      });
      // Mengarahkan pengguna kembali ke halaman utama setelah todo ditambahkan
      navigate("/");
      // Mengirimkan action untuk mengatur ulang status isAddTodo ke false
      dispatch(addTodoActionCreator(false));
    }
  }, [isAddTodo, navigate, dispatch]); // Dependency array agar efek dipanggil saat isAddTodo, navigate, atau dispatch berubah

  // Fungsi yang dipanggil saat form todo di-submit
  const onAddTodo = ({ title, description }) => {
    // Mengirim action async untuk menambahkan todo baru
    dispatch(asyncAddTodo({ title, description }));
  };

  // Render komponen TodoInput dan pass props onAddTodo untuk menangani input todo
  return (
    <section>
      <div className="container pt-1">
        <TodoInput onAddTodo={onAddTodo} />
      </div>
    </section>
  );
}

export default TodoAddPage;
