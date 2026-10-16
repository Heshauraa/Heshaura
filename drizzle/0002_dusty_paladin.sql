CREATE TABLE `order_events` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`order_id` text NOT NULL,
	`user_id` text NOT NULL,
	`action` text NOT NULL,
	`created_at` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `orders` (
	`id` text PRIMARY KEY NOT NULL,
	`number` text NOT NULL,
	`idempotency_key` text NOT NULL,
	`created_by` text NOT NULL,
	`mode` text NOT NULL,
	`status` text NOT NULL,
	`address` text NOT NULL,
	`items` text NOT NULL,
	`subtotal` integer NOT NULL,
	`shipping` integer,
	`total` integer,
	`payment_status` text NOT NULL,
	`tracking_number` text DEFAULT '' NOT NULL,
	`courier` text DEFAULT '' NOT NULL,
	`version` integer DEFAULT 1 NOT NULL,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `orders_number_unique` ON `orders` (`number`);--> statement-breakpoint
CREATE UNIQUE INDEX `orders_idempotency_key_unique` ON `orders` (`idempotency_key`);