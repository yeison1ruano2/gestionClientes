INSERT INTO regiones (id,nombre) VALUES (1,'Sudamérica');
INSERT INTO regiones (id,nombre) VALUES (2,'Centroamérica');
INSERT INTO regiones (id,nombre) VALUES (3,'Norteamérica');
INSERT INTO regiones (id,nombre) VALUES (4,'Europa');
INSERT INTO regiones (id,nombre) VALUES (5,'Asia');
INSERT INTO regiones (id,nombre) VALUES (6,'Africa');
INSERT INTO regiones (id,nombre) VALUES (7,'Oceanía');
INSERT INTO regiones (id,nombre) VALUES (8,'Antártida');

/* Populate tabla clientes */
INSERT INTO clientes (nombre, apellido, email, fecha, region_id) VALUES('Andrés', 'Guzmán', 'profesor@bolsadeideas.com', '2018-01-01',1);
INSERT INTO clientes (nombre, apellido, email, fecha, region_id) VALUES('Mr. John', 'Doe', 'john.doe@gmail.com', '2018-01-02',2);
INSERT INTO clientes (nombre, apellido, email, fecha, region_id) VALUES('Linus', 'Torvalds', 'linus.torvalds@gmail.com', '2018-01-03',4);
INSERT INTO clientes (nombre, apellido, email, fecha, region_id) VALUES('Rasmus', 'Lerdorf', 'rasmus.lerdorf@gmail.com', '2018-01-04',4);
INSERT INTO clientes (nombre, apellido, email, fecha, region_id) VALUES('Erich', 'Gamma', 'erich.gamma@gmail.com', '2018-02-01',4);
INSERT INTO clientes (nombre, apellido, email, fecha, region_id) VALUES('Richard', 'Helm', 'richard.helm@gmail.com', '2018-02-10',3);
INSERT INTO clientes (nombre, apellido, email, fecha, region_id) VALUES('Ralph', 'Johnson', 'ralph.johnson@gmail.com', '2018-02-18',3);
INSERT INTO clientes (nombre, apellido, email, fecha, region_id) VALUES('John', 'Vlissides', 'john.vlissides@gmail.com', '2018-02-28',6);
INSERT INTO clientes (nombre, apellido, email, fecha, region_id) VALUES('Dr. James', 'Gosling', 'james.gosling@gmail.com', '2018-03-03',4);
INSERT INTO clientes (nombre, apellido, email, fecha, region_id) VALUES('Magma', 'Lee', 'magma.lee@gmail.com', '2018-03-04',1);
INSERT INTO clientes (nombre, apellido, email, fecha, region_id) VALUES('Tornado', 'Roe', 'tornado.roe@gmail.com', '2018-03-05',7);
INSERT INTO clientes (nombre, apellido, email, fecha, region_id) VALUES('Jade', 'Doe', 'jane.doe@gmail.com', '2018-03-06',8);

/*Creamos algunos usuarios con sus roles*/
INSERT INTO usuarios (username, password, enabled, nombre, apellido, email) VALUES ('Yeison','$2a$10$G9.S8BwNekITXPeGe90pfOVPuU39g1l/4Eh0DvPLvJkiyIb2G67S2',1,'Yeison','Ruano','yeisonstiven100@gmail.com');
INSERT INTO usuarios (username, password, enabled, nombre, apellido, email) VALUES ('admin','$2a$10$c8BQyo0srtG0t9JBDFWfMOGhQSVX4HLbUeHnwq18dLb0sLfwugwpm',1,'Jhon','Doe','Jhon@gmail.com');

INSERT INTO roles (nombre) VALUES ('ROLE_USER');
INSERT INTO roles (nombre) VALUES ('ROLE_ADMIN');

INSERT INTO usuarios_roles (usuario_id, role_id) VALUES (1,1);
INSERT INTO usuarios_roles (usuario_id, role_id) VALUES (2,2);
INSERT INTO usuarios_roles (usuario_id, role_id) VALUES (2,1);

/*Creamos tabla productos*/
INSERT INTO productos (nombre,precio,fecha) VALUES ('Panasonic Pantalla LCD',259990,NOW());
INSERT INTO productos (nombre,precio,fecha) VALUES ('Sony Camara digital DSC-W320B',123490,NOW());
INSERT INTO productos (nombre,precio,fecha) VALUES ('Apple iPod shuffle',1499990,NOW());
INSERT INTO productos (nombre,precio,fecha) VALUES ('Sony Notebook Z110',37990,NOW());
INSERT INTO productos (nombre,precio,fecha) VALUES ('Hewlett Packard Multifuncional F2280',69990,NOW());
INSERT INTO productos (nombre,precio,fecha) VALUES ('Bianchi Bicicleta Aro 26',69990,NOW());
INSERT INTO productos (nombre,precio,fecha) VALUES ('Mica Comoda 5 Cajones',299990,NOW());

/*Creamos algunas facturas*/
INSERT INTO facturas (descripcion,observacion,cliente_id,fecha) VALUES ('Factura equipos de oficina',null,1,NOW());
INSERT INTO facturas_items (cantidad,factura_id,producto_id) VALUES (1,1,1);
INSERT INTO facturas_items (cantidad,factura_id,producto_id) VALUES (2,1,4);
INSERT INTO facturas_items (cantidad,factura_id,producto_id) VALUES (1,1,5);
INSERT INTO facturas_items (cantidad,factura_id,producto_id) VALUES (1,1,7);

INSERT INTO facturas (descripcion,observacion,cliente_id,fecha) VALUES ('Factura Bicicleta','Alguna nota importante!',1,NOW());
INSERT INTO facturas_items (cantidad,factura_id,producto_id) VALUES (3,2,6);
