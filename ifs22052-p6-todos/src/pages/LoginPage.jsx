import { useDispatch } from "react-redux"; // Mengimpor useDispatch untuk mengirimkan action ke Redux
import LoginInput from "../components/LoginInput"; // Mengimpor komponen LoginInput
import { asyncSetAuthLogin } from "../states/authLogin/action"; // Mengimpor action untuk autentikasi login

function LoginPage() {
  // Menginisialisasi dispatch untuk mengirimkan action ke Redux
  const dispatch = useDispatch();

  // Fungsi untuk meng-handle login, menerima email dan password sebagai parameter
  const onAuthLogin = ({ email, password }) => {
    // Mengirim action asyncSetAuthLogin untuk proses login dengan email dan password yang dimasukkan
    dispatch(asyncSetAuthLogin({ email, password }));
  };

  // Render komponen LoginInput dan pass props onAuthLogin untuk menangani event login
  return (
    <div className="container pt-2">
      <LoginInput onAuthLogin={onAuthLogin} />
    </div>
  );
}

export default LoginPage;
