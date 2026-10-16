CREATE TABLE `integration_events` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`provider` text NOT NULL,
	`user_id` text NOT NULL,
	`action` text NOT NULL,
	`created_at` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `integrations` (
	`provider` text PRIMARY KEY NOT NULL,
	`ciphertext` text NOT NULL,
	`iv` text NOT NULL,
	`version` integer DEFAULT 1 NOT NULL,
	`updated_by` text NOT NULL,
	`updated_at` text NOT NULL
);
