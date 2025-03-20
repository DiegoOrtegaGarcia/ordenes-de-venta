CREATE TABLE Productos (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(255) NOT NULL,
    precio DECIMAL(10, 2) NOT NULL
);

-- Crear tabla de descuentos
CREATE TABLE Descuentos (
    id INT PRIMARY KEY AUTO_INCREMENT,
    fecha DATETIME DEFAULT CURRENT_TIMESTAMP,
    valor INT NOT NULL
);

-- Crear tabla de clientes
CREATE TABLE Clientes (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(255) NOT NULL
);

-- Crear tabla de órdenes
CREATE TABLE Ordenes (
    id INT PRIMARY KEY AUTO_INCREMENT,
    fecha DATETIME DEFAULT CURRENT_TIMESTAMP,
    producto_id INT,
    cantidad INT NOT NULL,
    precio_final DECIMAL(10, 2) NOT NULL,
    cliente_id INT,
    descuento_id INT,
    FOREIGN KEY (producto_id) REFERENCES Productos(id),
    FOREIGN KEY (cliente_id) REFERENCES Clientes(id),
    FOREIGN KEY (descuento_id) REFERENCES Descuentos(id)
);