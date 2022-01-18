import { useRouter } from 'next/router';
import { parseCookies, setCookie } from 'nookies';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { AuthContext } from '../../contexts/AuthContext';
import { RoleUser } from '../../enums/enumRoleUser';
import { api } from '../../services/api';
import { options } from '../../utils/defaultToastOptions';

import styles from './styles.module.css';

type DataForm = {
  avatar_path: FileList;
}

export default function CardUser() {
  const router = useRouter();
  const { user, logoff, setUser } = useContext(AuthContext);
  const { register, handleSubmit, reset } = useForm({defaultValues: {
    avatar_path: null,
  }});
  const onSubmit = async (data: DataForm) => handleChangeAvatar(data);

  async function handleChangeAvatar(data: DataForm) {
    const form = new FormData();
    form.append("_method", "PUT");
    form.append("avatar_path", data.avatar_path[0]);

    try {
      const { 'meg.token': token } = parseCookies();
      api.defaults.headers['Authorization'] = `Bearer ${token}`;

      await api.post(`users/update-avatar/${user?.id}`, form, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      .then(function (success) {
        toast.success("Avatar atualizado com sucesso!", options);
        reset({
          avatar_path: null
        });
        setUser({
          ...user,
          avatar_path: success.data.user.avatar_path
        });
        const userString = JSON.stringify(user);
        setCookie(null, 'meg.user', userString);
        router.push("/minha-conta", undefined, { scroll: false });
      });
    }
    catch(error) {
      const string = "Ops! Algo não saiu como o esperado. Tente novamente ou entre em contato com o suporte.";

      if (!error.response) {
        // network error
        return toast.error(string, options);
      }
      switch (error.response.status) {
        case 401:
          return {
            redirect: {
              destination: '/sessao-expirada',
              permanent: false,
            }
          }
        case 400:
          toast.warning(error.response?.data.error.avatar_path[0] ? error.response?.data.error.avatar_path[0] : string, options);

        case 422:
          toast.warning(error.response?.data.error.avatar_path[0], options);

        case 500: 
          toast.error(string, options);
          break;

        default:
          toast.error(string, options);
          break;
      }
    }
  }
  
  return (
    <div className={`card-style p-4 col-4 ${styles["card-user"]}`}>
      <div className={styles["user-img"]}>
        <form
          autoComplete='off'
          method='post'
          onChange={handleSubmit(onSubmit)}
          encType='multipart/form-data'
        >
          <div className={`${styles["edit-user-img"]} input-file`}>
            <input
              type="file"
              id="avatar_path"
              name="avatar_path"
              {...register('avatar_path')}
            />
            <label htmlFor="avatar_path">
              <img src="/icons/edit.svg" alt="Editar imagem" />
            </label>
          </div>
        </form>
        <img src={user?.avatar_path ?? "/icons/user-gray.svg"} alt="Minha foto de perfil" />
      </div>

      <div className={`${styles["user-info"]} my-4 pb-2 border-bottom`}>
        <h4>{user?.name}</h4>
        <p><strong className='mr-2'>Email:</strong>{user?.email}</p>
        {user?.role === RoleUser.student && (
          <div className={`${styles.coins} mb-2`}>
            <img src="/icons/coins.svg" alt="Moedas" />
            <span>22 moedas</span>
          </div>
        )}
      </div>
      <button
        onClick={logoff}
        className='button button-blue-dark-outline text-uppercase'
      >Sair da conta</button>
    </div>
  );
}