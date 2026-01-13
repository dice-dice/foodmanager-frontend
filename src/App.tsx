import { Routes, Route, Navigate } from 'react-router-dom';
import { Layout, PrivateRoute } from './components';
import {
  LoginPage,
  RegisterPage,
  DashboardPage,
  FoodListPage,
  ShoppingListPage,
  DailyStockPage,
  AboutPage,
} from './pages';

function App() {
  return (
    <Layout>
      <Routes>
        {/* Public Routes */}
        <Route path="/about" element={<AboutPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <DashboardPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/foods"
          element={
            <PrivateRoute>
              <FoodListPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/shopping"
          element={
            <PrivateRoute>
              <ShoppingListPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/daily-stock"
          element={
            <PrivateRoute>
              <DailyStockPage />
            </PrivateRoute>
          }
        />

        {/* Default Route */}
        <Route path="/" element={<Navigate to="/about" replace />} />

        {/* 404 */}
        <Route
          path="*"
          element={
            <div className="text-center py-5">
              <h1>404</h1>
              <p>Page not found</p>
            </div>
          }
        />
      </Routes>
    </Layout>
  );
}

export default App;
