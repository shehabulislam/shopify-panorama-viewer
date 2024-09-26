/*
  Warnings:

  - The primary key for the `PanoramaViewer` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `PanoramaViewer` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_PanoramaViewer" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "shop" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "img_src" TEXT,
    "video_src" TEXT,
    "width" TEXT NOT NULL,
    "height" TEXT NOT NULL,
    "autoRotate" BOOLEAN NOT NULL DEFAULT false,
    "hideDefaultControl" BOOLEAN NOT NULL DEFAULT false
);
INSERT INTO "new_PanoramaViewer" ("autoRotate", "height", "hideDefaultControl", "id", "img_src", "shop", "title", "type", "video_src", "width") SELECT "autoRotate", "height", "hideDefaultControl", "id", "img_src", "shop", "title", "type", "video_src", "width" FROM "PanoramaViewer";
DROP TABLE "PanoramaViewer";
ALTER TABLE "new_PanoramaViewer" RENAME TO "PanoramaViewer";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
