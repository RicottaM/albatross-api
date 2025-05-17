-- DropForeignKey
ALTER TABLE "users_points" DROP CONSTRAINT "users_points_point_id_fkey";

-- DropForeignKey
ALTER TABLE "users_points" DROP CONSTRAINT "users_points_user_id_fkey";

-- AddForeignKey
ALTER TABLE "users_points" ADD CONSTRAINT "users_points_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users_points" ADD CONSTRAINT "users_points_point_id_fkey" FOREIGN KEY ("point_id") REFERENCES "points"("id") ON DELETE CASCADE ON UPDATE CASCADE;
