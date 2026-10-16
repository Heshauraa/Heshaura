CREATE TABLE `integration_checks` (
	`provider` text PRIMARY KEY NOT NULL,
	`credential_version` integer NOT NULL,
	`result` text NOT NULL,
	`checked_at` text NOT NULL
);
