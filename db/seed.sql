INSERT INTO department(
    id, dep_name
) VALUES (1, "Engineering"), (2, "Accounting"), (3, "Tax"), (4, "Sales");

INSERT INTO role(
    id, title, salary, department_id
) VALUES (11, "Sofeware Engineer", 200000, 1), 
(12, "Accountant", 200000, 2),
(13, "Tax Manager", 250000, 3),
(14, "Tax Senior", 200000, 3),
(15, "Sales Lead", 100000, 4),
(16, "Salesperson", 80000, 4);


INSERT INTO employee(
    id, first_name, last_name, role_id, manager_id
) VALUES (21, "Max", "Lee",11,NULL),
(22, "Jenny", "Jo",12, NULL),
(23, "Tom", "Ford",13, NULL),
(24, "John", "Fisher",14,13),
(25, "Emma", "Showmi",15, NULL),
(26, "Sandy", "Lacane",16,15);