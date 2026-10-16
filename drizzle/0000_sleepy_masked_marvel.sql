CREATE TABLE `admins` (
	`user_id` text PRIMARY KEY NOT NULL,
	`email` text NOT NULL,
	`created_at` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `audit` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`user_id` text NOT NULL,
	`action` text NOT NULL,
	`product_id` integer,
	`created_at` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `products` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`slug` text NOT NULL,
	`description` text NOT NULL,
	`category` text NOT NULL,
	`audience` text NOT NULL,
	`status` text NOT NULL,
	`price` integer NOT NULL,
	`mrp` integer,
	`image` text NOT NULL,
	`variants` text NOT NULL,
	`seo_title` text NOT NULL,
	`seo_description` text NOT NULL,
	`demo` integer DEFAULT 0 NOT NULL,
	`version` integer DEFAULT 1 NOT NULL,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `products_slug_unique` ON `products` (`slug`);