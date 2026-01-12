import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';

interface RegisterFormData {
  username: string;
  password: string;
  confirmPassword: string;
}

export function RegisterPage() {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterFormData>();

  const password = watch('password');

  const onSubmit = async (data: RegisterFormData) => {
    setIsLoading(true);
    try {
      await signup({
        username: data.username,
        password: data.password,
      });
      toast.success('登録が完了しました。ログインしてください。');
      navigate('/login');
    } catch (error) {
      toast.error('登録に失敗しました。ユーザー名が既に使用されている可能性があります。');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <div className="col-md-6 col-lg-4">
          <div className="card shadow">
            <div className="card-body p-4">
              <h2 className="card-title text-center mb-4">新規登録</h2>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-3">
                  <label htmlFor="username" className="form-label">
                    ユーザー名
                  </label>
                  <input
                    type="text"
                    className={`form-control ${errors.username ? 'is-invalid' : ''}`}
                    id="username"
                    {...register('username', {
                      required: 'ユーザー名は必須です',
                      minLength: {
                        value: 3,
                        message: 'ユーザー名は3文字以上で入力してください',
                      },
                      maxLength: {
                        value: 20,
                        message: 'ユーザー名は20文字以内で入力してください',
                      },
                      pattern: {
                        value: /^[a-zA-Z0-9_]+$/,
                        message: 'ユーザー名は英数字とアンダースコアのみ使用できます',
                      },
                    })}
                  />
                  {errors.username && (
                    <div className="invalid-feedback">{errors.username.message}</div>
                  )}
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    パスワード
                  </label>
                  <input
                    type="password"
                    className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                    id="password"
                    {...register('password', {
                      required: 'パスワードは必須です',
                      minLength: {
                        value: 6,
                        message: 'パスワードは6文字以上で入力してください',
                      },
                      pattern: {
                        value: /^(?=.*[a-zA-Z])(?=.*\d)/,
                        message: 'パスワードは英字と数字を含めてください',
                      },
                    })}
                  />
                  {errors.password && (
                    <div className="invalid-feedback">{errors.password.message}</div>
                  )}
                  <small className="text-muted">6文字以上、英字と数字を含む</small>
                </div>
                <div className="mb-3">
                  <label htmlFor="confirmPassword" className="form-label">
                    パスワード（確認）
                  </label>
                  <input
                    type="password"
                    className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}
                    id="confirmPassword"
                    {...register('confirmPassword', {
                      required: 'パスワードを再入力してください',
                      validate: (value) =>
                        value === password || 'パスワードが一致しません',
                    })}
                  />
                  {errors.confirmPassword && (
                    <div className="invalid-feedback">{errors.confirmPassword.message}</div>
                  )}
                </div>
                <button
                  type="submit"
                  className="btn btn-primary w-100"
                  disabled={isLoading}
                >
                  {isLoading ? '登録中...' : '登録'}
                </button>
              </form>
              <div className="text-center mt-3">
                <span className="text-muted">すでにアカウントをお持ちの方は </span>
                <Link to="/login">ログイン</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
