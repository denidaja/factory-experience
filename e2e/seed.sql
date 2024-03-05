TRUNCATE TABLE "user" CASCADE;
TRUNCATE TABLE "shift" CASCADE;
TRUNCATE TABLE "support_request" CASCADE;
TRUNCATE TABLE "volunteer_submissions" CASCADE;

-- Users
INSERT INTO "user" (id, email, password, name, roles, created_at, updated_at) VALUES
('d2a16298-7dd1-4a62-b13d-b4d6ad928f94', 'user0@example.com', '$2b$10$fNwDHErxVDJ6wdJ6U.QIsuJiIi9P4GQmg9eHutoWnaRniJnJaElFK', 'User 0', '1', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('a178229e-0197-4f99-9d80-9eda6f7352c9', 'user1@example.com', '$2b$10$fNwDHErxVDJ6wdJ6U.QIsuJiIi9P4GQmg9eHutoWnaRniJnJaElFK', 'User 1', '0', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('37083735-b073-4b01-b1a8-0e86bd6d0e9b', 'user2@example.com', '$2b$10$fNwDHErxVDJ6wdJ6U.QIsuJiIi9P4GQmg9eHutoWnaRniJnJaElFK', 'User 2', '0', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('fe72d4ba-e2e1-4ad1-a061-7d06222d681e', 'user3@example.com', '$2b$10$fNwDHErxVDJ6wdJ6U.QIsuJiIi9P4GQmg9eHutoWnaRniJnJaElFK', 'User 3', '0', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('90b04213-9f67-4f40-8359-c3bab6a331ed', 'user4@example.com', '$2b$10$fNwDHErxVDJ6wdJ6U.QIsuJiIi9P4GQmg9eHutoWnaRniJnJaElFK', 'User 4', '0', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('c4210f76-ca48-4892-8d47-5386115fbd03', 'user5@example.com', '$2b$10$fNwDHErxVDJ6wdJ6U.QIsuJiIi9P4GQmg9eHutoWnaRniJnJaElFK', 'User 5', '0', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('6a08cf05-a6fc-49c5-a979-edd98fce0676', 'user6@example.com', '$2b$10$fNwDHErxVDJ6wdJ6U.QIsuJiIi9P4GQmg9eHutoWnaRniJnJaElFK', 'User 6', '0', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('1182306e-be1f-4843-b486-df5836625293', 'user7@example.com', '$2b$10$fNwDHErxVDJ6wdJ6U.QIsuJiIi9P4GQmg9eHutoWnaRniJnJaElFK', 'User 7', '0', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('3ec235ed-2007-4573-bf33-47949831d39b', 'user8@example.com', '$2b$10$fNwDHErxVDJ6wdJ6U.QIsuJiIi9P4GQmg9eHutoWnaRniJnJaElFK', 'User 8', '0', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('2a003c3f-440e-4522-90a0-e676f0ab03be', 'user9@example.com', '$2b$10$fNwDHErxVDJ6wdJ6U.QIsuJiIi9P4GQmg9eHutoWnaRniJnJaElFK', 'User 9', '0', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Shifts
INSERT INTO "shift" (id, date, start_time, end_time, department, created_at, updated_at) VALUES
('2d8c96fe-a00f-4a92-b989-fc6d00b3a507', '2024-03-01', '08:00', '16:00', 'Wheel Department', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('ddd4dc5e-927b-4d07-bba4-841d203ade86', '2024-03-02', '08:00', '16:00', 'Door Department', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('95222fbd-6844-4db2-886a-f00fad737151', '2024-03-03', '08:00', '16:00', 'Glass Department', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('105d7a84-e680-4a21-ae63-5ed712c1071f', '2024-03-04', '08:00', '16:00', 'Engine Department', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('645190d1-0383-4f51-87c3-c602ea0e532e', '2024-03-05', '08:00', '16:00', 'Paint Department', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('2c17238c-0438-49f6-bfee-fe0cad96851e', '2024-03-06', '08:00', '16:00', 'Wheel Department', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('158210a3-a680-4cd0-9b5e-d5bd45fc5431', '2024-03-07', '08:00', '16:00', 'Door Department', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('255600c8-fbff-4bc9-bfc1-945367d250ae', '2024-03-08', '08:00', '16:00', 'Glass Department', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('c6fe5949-d76b-4fff-9323-23e8bea49cdc', '2024-03-09', '08:00', '16:00', 'Engine Department', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('3899bfe2-8796-46a8-b8c8-70630fe68636', '2024-03-10', '08:00', '16:00', 'Paint Department', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Support Requests
INSERT INTO "support_request" (id, description, number_needed, skills_required, shift_id, created_at, updated_at) VALUES
('705ace57-8620-4734-8418-6b596657f615', 'Help with wheel installment', 1, 'Welding', '2d8c96fe-a00f-4a92-b989-fc6d00b3a507', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('134143e0-f221-46e6-bfb0-fd53f131b54a', 'Assist in door assembly', 1, 'Assembly', '2d8c96fe-a00f-4a92-b989-fc6d00b3a507', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('0c057107-ff64-44ab-9440-18c796b0b457', 'Glass fitting assistance needed', 1, 'Fitting', 'ddd4dc5e-927b-4d07-bba4-841d203ade86', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('b1a9b064-882a-41a3-8407-a7477dc62844', 'Engine assembly support', 2, 'Mechanical Skills', 'ddd4dc5e-927b-4d07-bba4-841d203ade86', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('cbc8556d-ffd3-4b54-9815-5fbbd81b0671', 'Support in paint quality checks', 2, 'Quality Control', '95222fbd-6844-4db2-886a-f00fad737151', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('aed30f4c-6697-479c-be2c-916ed6d7a7e7', 'Help with wheel installment', 2, 'Welding', '95222fbd-6844-4db2-886a-f00fad737151', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('25bf2650-eefe-4397-ad10-a93ab979e47d', 'Assist in door assembly', 2, 'Assembly', '105d7a84-e680-4a21-ae63-5ed712c1071f', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('057a9fbb-97f7-4aac-a7ed-c075eeedcb0e', 'Glass fitting assistance needed', 3, 'Fitting', '105d7a84-e680-4a21-ae63-5ed712c1071f', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('32cb22eb-4d0f-402f-adf4-aec5d626139d', 'Engine assembly support', 3, 'Mechanical Skills', '645190d1-0383-4f51-87c3-c602ea0e532e', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('6d9c5a12-dac9-44ec-88b7-40e425f68764', 'Support in paint quality checks', 3, 'Quality Control', '645190d1-0383-4f51-87c3-c602ea0e532e', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('0bbb1443-d39e-42dc-a02d-3bfaba49b668', 'Help with wheel installment', 3, 'Welding', '2c17238c-0438-49f6-bfee-fe0cad96851e', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('3ce55ce6-9996-4cbd-bef8-97db6178e1f7', 'Assist in door assembly', 3, 'Assembly', '2c17238c-0438-49f6-bfee-fe0cad96851e', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('edfaa699-5385-45b6-85e5-44da79082460', 'Glass fitting assistance needed', 3, 'Fitting', '158210a3-a680-4cd0-9b5e-d5bd45fc5431', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('aeaa86b4-c624-4e3f-aabb-43cf16e460ee', 'Engine assembly support', 4, 'Mechanical Skills', '158210a3-a680-4cd0-9b5e-d5bd45fc5431', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('f2eb8812-7cba-4f8d-9d10-30fcacb41fa7', 'Support in paint quality checks', 4, 'Quality Control', '255600c8-fbff-4bc9-bfc1-945367d250ae', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('e04bbe72-5b10-434b-83c1-e8639faf9229', 'Help with wheel installment', 4, 'Welding', '255600c8-fbff-4bc9-bfc1-945367d250ae', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('e423efec-b1cf-4568-a596-addd76194cb0', 'Assist in door assembly', 4, 'Assembly', 'c6fe5949-d76b-4fff-9323-23e8bea49cdc', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('99ca295b-0894-4c52-879c-b8b0fae1003f', 'Glass fitting assistance needed', 5, 'Fitting', 'c6fe5949-d76b-4fff-9323-23e8bea49cdc', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('7b9ec396-2b8a-4bc5-8ab3-0f37be3a6224', 'Engine assembly support', 5, 'Mechanical Skills', '3899bfe2-8796-46a8-b8c8-70630fe68636', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('4e504b77-9bbe-487b-a7b6-37269694c511', 'Support in paint quality checks', 5, 'Quality Control', '3899bfe2-8796-46a8-b8c8-70630fe68636', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
