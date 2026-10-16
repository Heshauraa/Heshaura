CREATE TABLE `payment_attempts` (
	`id` text PRIMARY KEY NOT NULL,
	`order_id` text NOT NULL,
	`request_hash` text NOT NULL,
	`key_version` integer NOT NULL,
	`credential_ciphertext` text NOT NULL,
	`credential_iv` text NOT NULL,
	`razorpay_order_id` text,
	`razorpay_payment_id` text,
	`state` text NOT NULL,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `payment_attempts_order_id_unique` ON `payment_attempts` (`order_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `payment_attempts_razorpay_order_id_unique` ON `payment_attempts` (`razorpay_order_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `payment_attempts_razorpay_payment_id_unique` ON `payment_attempts` (`razorpay_payment_id`);