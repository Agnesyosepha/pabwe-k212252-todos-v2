import { useEffect } from "react"; // Mengimpor useEffect dari React untuk side effects
import { useDispatch, useSelector } from "react-redux"; // Mengimpor hooks dari Redux untuk dispatch action dan mengambil state dari store
import UserDetail from "../components/UserDetail"; // Mengimpor komponen UserDetail untuk menampilkan detail pengguna
import {
  asyncSetIsUserChangePhoto, // Mengimpor action untuk async mengganti foto profil
  setIsUserChangePhotoActionCreator, // Mengimpor action creator untuk mengganti status perubahan foto
} from "../states/isUserChangePhoto/action";

// Komponen utama ProfilePage
function ProfilePage() {
  const dispatch = useDispatch(); // Menginisialisasi dispatch untuk mengirim aksi ke Redux store
  const { authLogin, isUserChangePhoto = false } = useSelector(
    (states) => states // Mengambil state authLogin dan isUserChangePhoto dari Redux store
  );

  // useEffect dipanggil saat isUserChangePhoto berubah
  useEffect(() => {
    if (isUserChangePhoto) {
      // Jika foto pengguna berhasil diubah, tampilkan notifikasi
      // eslint-disable-next-line no-undef
      Swal.fire({
        position: "top-end", // Posisi notifikasi di kanan atas
        icon: "success", // Ikon notifikasi sukses
        title: "Berhasil mengubah photo profile!", // Pesan sukses
        showConfirmButton: false, // Menghilangkan tombol konfirmasi
        timer: 1200, // Durasi notifikasi dalam milidetik (1,2 detik)
      });
      dispatch(setIsUserChangePhotoActionCreator(false)); // Mengatur status perubahan foto kembali ke false
    }
  }, [isUserChangePhoto, dispatch]); // useEffect dipicu saat isUserChangePhoto atau dispatch berubah

  // Fungsi yang dipanggil saat pengguna ingin mengubah foto profil
  const onUserChangePhoto = ({ photoFile }) => {
    dispatch(asyncSetIsUserChangePhoto({ photoFile })); // Mengirimkan aksi untuk mengubah foto secara asynchronous
  };

  // Tampilan halaman profil pengguna
  return (
    <section>
      <div className="container pt-1">
        {/* Menampilkan komponen UserDetail yang menerima authLogin dan fungsi onUserChangePhoto */}
        <UserDetail
          authLogin={authLogin} // Mengoper data login pengguna
          onUserChangePhoto={onUserChangePhoto} // Mengoper fungsi untuk mengubah foto
        ></UserDetail>
      </div>
    </section>
  );
}

// Mengekspor komponen ProfilePage sebagai default export
export default ProfilePage;
