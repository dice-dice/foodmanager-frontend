import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Navbar } from './Navbar';
import { AuthContext } from '../contexts/AuthContext';

const mockLogout = vi.fn();
const mockLogin = vi.fn();
const mockSignup = vi.fn();

const renderNavbar = (isAuthenticated: boolean, username?: string) => {
  return render(
    <BrowserRouter>
      <AuthContext.Provider
        value={{
          user: isAuthenticated ? { id: 1, username: username || 'testuser', roles: ['ROLE_USER'] } : null,
          isAuthenticated,
          isLoading: false,
          login: mockLogin,
          signup: mockSignup,
          logout: mockLogout,
        }}
      >
        <Navbar />
      </AuthContext.Provider>
    </BrowserRouter>
  );
};

describe('Navbar', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('未ログイン状態', () => {
    it('アプリ名が表示される', () => {
      renderNavbar(false);
      expect(screen.getByText('食材管理')).toBeInTheDocument();
    });

    it('アプリについてリンクが表示される', () => {
      renderNavbar(false);
      expect(screen.getByText('アプリについて')).toBeInTheDocument();
    });

    it('ログインリンクが表示される', () => {
      renderNavbar(false);
      expect(screen.getByText('ログイン')).toBeInTheDocument();
    });

    it('新規登録リンクが表示される', () => {
      renderNavbar(false);
      expect(screen.getByText('新規登録')).toBeInTheDocument();
    });

    it('ダッシュボードリンクは表示されない', () => {
      renderNavbar(false);
      expect(screen.queryByText('ダッシュボード')).not.toBeInTheDocument();
    });
  });

  describe('ログイン状態', () => {
    it('ダッシュボードリンクが表示される', () => {
      renderNavbar(true);
      expect(screen.getByText('ダッシュボード')).toBeInTheDocument();
    });

    it('冷蔵庫リンクが表示される', () => {
      renderNavbar(true);
      expect(screen.getByText('冷蔵庫')).toBeInTheDocument();
    });

    it('買い物リストリンクが表示される', () => {
      renderNavbar(true);
      expect(screen.getByText('買い物リスト')).toBeInTheDocument();
    });

    it('ユーザー名が表示される', () => {
      renderNavbar(true, 'yamada');
      expect(screen.getByText('yamada')).toBeInTheDocument();
    });

    it('ログアウトボタンが表示される', () => {
      renderNavbar(true);
      expect(screen.getByText('ログアウト')).toBeInTheDocument();
    });

    it('ログアウトボタンをクリックするとlogoutが呼ばれる', () => {
      renderNavbar(true);
      fireEvent.click(screen.getByText('ログアウト'));
      expect(mockLogout).toHaveBeenCalled();
    });

    it('ログインリンクは表示されない', () => {
      renderNavbar(true);
      expect(screen.queryByText('ログイン')).not.toBeInTheDocument();
    });
  });
});
