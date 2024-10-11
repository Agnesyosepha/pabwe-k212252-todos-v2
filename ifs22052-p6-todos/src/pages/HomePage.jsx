import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import TodoList from "../components/TodoList";
import {
  asyncGetTodos,
  asyncDeleteTodo,
  deleteTodoActionCreator,
} from "../states/todos/action";

function HomePage() {
  // Mengambil todos dan isDeleteTodo dari state global menggunakan useSelector
  const { todos = [], isDeleteTodo = false } = useSelector((states) => states);

  // Mengambil parameter query dari URL (misalnya ?is_finished=true)
  const queryParams = new URLSearchParams(location.search);
  const is_finished = queryParams.get("is_finished") || "";

  // Menginisialisasi dispatch untuk mengirim action ke redux
  const dispatch = useDispatch();

  // useEffect dipanggil setiap kali dispatch, isDeleteTodo, atau is_finished berubah
  useEffect(() => {
    // Jika isDeleteTodo true, tampilkan notifikasi menggunakan Swal
    if (isDeleteTodo) {
      // eslint-disable-next-line no-undef
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Todo berhasil dihapus!",
        showConfirmButton: false,
        timer: 700,
      });
      // Set isDeleteTodo kembali ke false setelah menghapus todo
      dispatch(deleteTodoActionCreator(false));
    }

    // Memanggil action untuk mengambil todos (filtered by is_finished)
    dispatch(asyncGetTodos(is_finished));
  }, [dispatch, isDeleteTodo, is_finished]); // Dependency array untuk memantau perubahan

  // Fungsi untuk menghapus todo berdasarkan id
  const onDeleteTodo = (id) => {
    // Mengirim action untuk menghapus todo secara async
    dispatch(asyncDeleteTodo(id));
  };

  // Render komponen TodoList dan pass props todos serta onDeleteTodo
  return (
    <section>
      <div className="container pt-1">
        <TodoList todos={todos} onDeleteTodo={onDeleteTodo}></TodoList>
      </div>
    </section>
  );
}

export default HomePage;
