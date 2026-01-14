diff --git a/src/App.tsx b/src/App.tsx
index 585ad00..1fe0a33 100644
--- a/src/App.tsx
+++ b/src/App.tsx
@@ -7,6 +7,7 @@ import {
   FoodListPage,
   ShoppingListPage,
   DailyStockPage,
+  OtherStockPage,
   AboutPage,
 } from './pages';
 
@@ -52,6 +53,14 @@ function App() {
             </PrivateRoute>
           }
         />
+        <Route
+          path="/other-stock"
+          element={
+            <PrivateRoute>
+              <OtherStockPage />
+            </PrivateRoute>
+          }
+        />
 
         {/* Default Route */}
         <Route path="/" element={<Navigate to="/about" replace />} />
diff --git a/src/constants/categories.ts b/src/constants/categories.ts
index 0cfe1fd..f3314dd 100644
--- a/src/constants/categories.ts
+++ b/src/constants/categories.ts
@@ -47,3 +47,13 @@ export function isDailyStockCategory(categoryId: number | undefined): boolean {
   if (!categoryId) return false;
   return NO_EXPIRATION_CATEGORY_IDS.includes(categoryId as typeof NO_EXPIRATION_CATEGORY_IDS[number]);
 }
+
+export function isOtherCategory(categoryId: number | undefined): boolean {
+  if (!categoryId) return false;
+  return categoryId === CATEGORY_IDS.other;
+}
+
+export function isDailyCategory(categoryId: number | undefined): boolean {
+  if (!categoryId) return false;
+  return categoryId === CATEGORY_IDS.daily;
+}
diff --git a/src/pages/DailyStockPage.tsx b/src/pages/DailyStockPage.tsx
index 15c6146..ebd6d18 100644
--- a/src/pages/DailyStockPage.tsx
+++ b/src/pages/DailyStockPage.tsx
@@ -1,7 +1,7 @@
 import { useState, useMemo } from 'react';
 import { useFoods, useCreateFood, useUpdateFood, useDeleteFood } from '../hooks';
 import { FoodCard, FoodForm, ConfirmModal } from '../components';
-import { isDailyStockCategory } from '../constants';
+import { isDailyCategory } from '../constants';
 import type { FoodDTO } from '../types';
 
 export function DailyStockPage() {
@@ -10,9 +10,9 @@ export function DailyStockPage() {
   const updateFood = useUpdateFood();
   const deleteFood = useDeleteFood();
 
-  // 日用品・その他のみフィルター
+  // 日用品のみフィルター
   const items = useMemo(() => {
-    return allFoods?.filter(food => isDailyStockCategory(food.categoryId)) || [];
+    return allFoods?.filter(food => isDailyCategory(food.categoryId)) || [];
   }, [allFoods]);
 
   const [showForm, setShowForm] = useState(false);
diff --git a/src/pages/DashboardPage.tsx b/src/pages/DashboardPage.tsx
index ae62561..b73a642 100644
--- a/src/pages/DashboardPage.tsx
+++ b/src/pages/DashboardPage.tsx
@@ -78,7 +78,7 @@ export function DashboardPage() {
               <p className="card-text display-4">{getCategoryCount(CATEGORY_IDS.other)}</p>
             </div>
             <div className="card-footer bg-transparent border-0">
-              <Link to="/daily-stock" className="text-white">
+              <Link to="/other-stock" className="text-white">
                 一覧を見る
               </Link>
             </div>
diff --git a/src/pages/index.ts b/src/pages/index.ts
index 249af3c..73e429e 100644
--- a/src/pages/index.ts
+++ b/src/pages/index.ts
@@ -4,4 +4,5 @@ export { DashboardPage } from './DashboardPage';
 export { FoodListPage } from './FoodListPage';
 export { ShoppingListPage } from './ShoppingListPage';
 export { DailyStockPage } from './DailyStockPage';
+export { OtherStockPage } from './OtherStockPage';
 export { AboutPage } from './AboutPage';
